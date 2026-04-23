module Viewer.Loader where

import Prelude

import Data.Argonaut.Decode.Class (decodeJson)
import Data.Argonaut.Decode.Error (printJsonDecodeError)
import Data.Argonaut.Parser (jsonParser)
import Data.Argonaut.Parser as AP
import Data.Array as Array
import Data.Either (Either(..))
import Data.Foldable (foldl, for_)
import Data.Map as Map
import Data.Maybe (Maybe(..), isJust)
import Data.String as String
import Data.Traversable (traverse)
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Aff (Aff, try)
import Effect.Aff.Class (liftAff)
import Effect.Class (liftEffect)
import FFI.Oxigraph as Oxigraph
import FFI.Uri (absoluteUrl)
import Fetch (Method(..), fetch)
import Graph.Decode (decodeConfig, decodeGraph)
import Graph.Query as Query
import Graph.Types (Config, Graph, KindDef, KindId)
import Graph.Views as Views
import Rdf.Import as Rdf.Import
import Tutorial (Tutorial, decodeTutorial)
import Viewer.Types (TutorialEntry)

lmapShow :: forall a. Either _ a -> Either String a
lmapShow (Left e) = Left (printJsonDecodeError e)
lmapShow (Right a) = Right a

-- | Resolve a possibly-relative path against a base URL.
-- | If the path starts with "http" it's returned as-is.
-- | Otherwise it's appended to the base URL.
resolveUrl :: String -> String -> String
resolveUrl base path =
  if String.take 4 path == "http" then path
  else base <> path

graphSourceLocations
  :: forall r
   . { baseUrl :: String, graphUrl :: String | r }
  -> Config
  -> Array { format :: String, url :: String }
graphSourceLocations urls cfg =
  case cfg.graphSources of
    sources | not (Array.null sources) ->
      map
        ( \source ->
            { format: source.format
            , url: resolveUrl urls.baseUrl source.path
            }
        )
        sources
    _ ->
      case cfg.graphSource of
        Just source ->
          [ { format: source.format
            , url: resolveUrl urls.baseUrl source.path
            }
          ]
        Nothing ->
          [ { format: "application/json"
            , url: urls.graphUrl
            }
          ]

isRdfConfig :: Config -> Boolean
isRdfConfig cfg = not (Array.null cfg.graphSources) || isJust cfg.graphSource

isJsonGraphFormat :: String -> String -> Boolean
isJsonGraphFormat format url =
  format == "application/json"
    || format == "json"
    || String.drop (String.length url - 5) url == ".json"

loadConfig :: String -> Aff (Either String Config)
loadConfig url = do
  resp <- fetch url { method: GET }
  body <- resp.text
  pure case AP.jsonParser body of
    Left err -> Left err
    Right json -> decodeConfig json

loadGraphData
  :: Array { format :: String, url :: String }
  -> Aff (Either String { graph :: Graph, ontologyKinds :: Map.Map KindId KindDef })
loadGraphData locations =
  case Array.uncons locations of
    Nothing -> pure (Left "no graph source configured")
    Just { head: location, tail: [] }
      | isJsonGraphFormat location.format location.url -> do
          resp <- fetch location.url { method: GET }
          body <- resp.text
          pure case jsonParser body of
            Left err -> Left err
            Right json ->
              map
                ( \graph ->
                    { graph
                    , ontologyKinds: Map.empty
                    }
                )
                (decodeGraph json)
    _ -> do
      parsed <- try do
        quadSets <- traverse fetchAndParseRdf locations
        pure
          ( Rdf.Import.importGraph
              (Array.concat quadSets)
          )
      pure case parsed of
        Left err -> Left (show err)
        Right result -> result

fetchAndParseRdf
  :: { format :: String, url :: String }
  -> Aff (Array Oxigraph.ImportedRdfQuad)
fetchAndParseRdf location = do
  resp <- fetch location.url { method: GET }
  body <- resp.text
  absUrl <- liftEffect (absoluteUrl location.url)
  liftEffect $ Oxigraph.parseQuads location.format absUrl body

loadSparqlStore
  :: Array { format :: String, url :: String }
  -> Aff (Either String Oxigraph.OxigraphStore)
loadSparqlStore locations = do
  parsed <- try do
    store <- liftEffect Oxigraph.createStore
    for_ locations \location -> do
      resp <- fetch location.url { method: GET }
      body <- resp.text
      absUrl <- liftEffect (absoluteUrl location.url)
      liftEffect $ Oxigraph.loadRdf store location.format absUrl "" body
    pure store
  pure case parsed of
    Left err -> Left (show err)
    Right store -> Right store

loadQueryCatalog
  :: String -> Aff (Either String Query.QueryCatalog)
loadQueryCatalog url = do
  result <- try $ fetch url { method: GET }
  case result of
    Left _ -> pure (Left "no query catalog")
    Right resp -> do
      body <- resp.text
      pure case AP.jsonParser body of
        Left err -> Left err
        Right json -> Query.decodeQueryCatalog json

loadTutorialIndex
  :: String -> Aff (Either String (Array TutorialEntry))
loadTutorialIndex url = do
  resp <- fetch url { method: GET }
  body <- resp.text
  pure case AP.jsonParser body of
    Left err -> Left err
    Right json -> lmapShow $ decodeJson json

loadTutorialFile :: String -> Aff (Either String Tutorial)
loadTutorialFile file = do
  resp <- fetch file { method: GET }
  body <- resp.text
  pure case AP.jsonParser body of
    Left err -> Left err
    Right json -> decodeTutorial json

loadViewIndex
  :: String -> Aff (Either String (Array Views.ViewIndexEntry))
loadViewIndex url = do
  result <- try $ fetch url { method: GET }
  case result of
    Left _ -> pure (Left "no views")
    Right resp -> do
      body <- resp.text
      pure case AP.jsonParser body of
        Left err -> Left err
        Right json -> Views.decodeViewIndex json

loadViewFile :: String -> Aff (Either String Views.View)
loadViewFile url = do
  resp <- fetch url { method: GET }
  body <- resp.text
  pure case AP.jsonParser body of
    Left err -> Left err
    Right json -> Views.decodeView json

discoverParamOptions
  :: Oxigraph.OxigraphStore
  -> Array Query.Parameter
  -> Effect (Map.Map String (Array String))
discoverParamOptions store params = do
  pairs <- traverse discoverOne params
  pure $ Map.fromFoldable pairs
  where
  discoverOne p = do
    values <- Oxigraph.querySparqlStrings store
      (discoveryQuery p)
    let
      labels = Array.sort $ Array.nub $
        map extractLocalName values
    pure (Tuple p.name labels)

  discoveryQuery p | p.paramType == "kind" =
    "PREFIX gbk: <https://lambdasistemi.github.io/graph-browser/vocab/kinds#>\n"
      <> "SELECT DISTINCT ?v WHERE { ?node a ?v . FILTER(STRSTARTS(STR(?v), STR(gbk:))) }"
  discoveryQuery p | p.paramType == "node" && p.name == "root" =
    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n"
      <> "SELECT DISTINCT ?v WHERE {\n"
      <> "  ?child rdfs:subClassOf ?ancestor .\n"
      <> "  FILTER(isIRI(?child) && isIRI(?ancestor) && ?child != ?ancestor)\n"
      <> "  BIND(CONCAT(\"owl-\", LCASE(REPLACE(REPLACE(STR(?ancestor), \"^.*(#|/)\", \"\"), \"[^A-Za-z0-9]+\", \"-\"))) AS ?v)\n"
      <> "}"
  discoveryQuery p | p.paramType == "node" =
    "PREFIX gb: <https://lambdasistemi.github.io/graph-browser/vocab/terms#>\n"
      <> "PREFIX owl: <http://www.w3.org/2002/07/owl#>\n"
      <> "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n"
      <> "SELECT DISTINCT ?v WHERE {\n"
      <> "  { ?node gb:nodeId ?v }\n"
      <> "  UNION {\n"
      <> "    { ?class a owl:Class }\n"
      <> "    UNION { ?class a rdfs:Class }\n"
      <> "    BIND(CONCAT(\"owl-\", LCASE(REPLACE(REPLACE(STR(?class), \"^.*(#|/)\", \"\"), \"[^A-Za-z0-9]+\", \"-\"))) AS ?v)\n"
      <> "  }\n"
      <> "}"
  discoveryQuery p | p.paramType == "group" =
    "PREFIX gb: <https://lambdasistemi.github.io/graph-browser/vocab/terms#>\n"
      <> "SELECT DISTINCT ?v WHERE { ?node gb:group ?v }"
  discoveryQuery _ =
    "SELECT DISTINCT ?v WHERE { ?s ?p ?v . FILTER(isLiteral(?v)) } LIMIT 100"

  extractLocalName v =
    let
      hash = String.lastIndexOf (String.Pattern "#") v
      slash = String.lastIndexOf (String.Pattern "/") v
      sep = case hash, slash of
        Just h, Just s -> Just (max h s)
        Just h, Nothing -> Just h
        Nothing, Just s -> Just s
        Nothing, Nothing -> Nothing
    in
      case sep of
        Just i -> String.drop (i + 1) v
        Nothing -> v

bindParameters :: String -> Map.Map String String -> String
bindParameters sparql values =
  foldl
    ( \acc (Tuple name value) ->
        String.replaceAll
          (String.Pattern ("$" <> name))
          (String.Replacement value)
          acc
    )
    sparql
    (Map.toUnfoldable values :: Array (Tuple String String))
