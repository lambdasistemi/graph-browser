module Viewer.Helpers where

import Prelude

import Data.Array as Array
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.String as String
import Data.String.Common (joinWith, split)
import Data.String.Pattern (Pattern(..))
import Data.Tuple (Tuple(..))
import Graph.Types (Config, KindDef, KindId, Node, OntologyReference)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Viewer.Types (Action(..), OntologyIdentity, PromptMode(..))

cls
  :: forall r i
   . String
  -> HH.IProp (class :: String | r) i
cls = HP.class_ <<< HH.ClassName

lookupKind :: Config -> KindId -> KindDef
lookupKind cfg kid = case Map.lookup kid cfg.kinds of
  Just def -> def
  Nothing ->
    { label: kid, color: "#8b949e", shape: "ellipse" }

kindColor :: Config -> KindId -> String
kindColor cfg kid = (lookupKind cfg kid).color

kindLabel :: Config -> KindId -> String
kindLabel cfg kid = (lookupKind cfg kid).label

shouldRenderOntologyReference :: String -> Boolean
shouldRenderOntologyReference iri =
  (String.take 7 iri == "http://" || String.take 8 iri == "https://")
    && not
      ( String.take 52 iri
          == "https://lambdasistemi.github.io/graph-browser/vocab/"
      )

ontologyIdentity :: Node -> Maybe OntologyIdentity
ontologyIdentity node = do
  iri <- ontologyIri node
  let
    compact = compactIri iri
    namespace = namespaceIri iri
    namespaceLabel = namespaceName namespace
  pure { iri, compact, namespace, namespaceLabel }

ontologyIri :: Node -> Maybe String
ontologyIri node = map _.iri node.ontologyRef

compactIri :: String -> String
compactIri iri =
  case Array.find matchPrefix knownPrefixes of
    Just (Tuple prefix namespace) ->
      prefix <> ":" <> String.drop (String.length namespace) iri
    Nothing -> iri
  where
  matchPrefix (Tuple _ namespace) =
    String.take (String.length namespace) iri == namespace

namespaceIri :: String -> String
namespaceIri iri =
  case Array.find matchPrefix knownPrefixes of
    Just (Tuple _ namespace) -> namespace
    Nothing ->
      case String.lastIndexOf (Pattern "#") iri of
        Just idx -> String.take (idx + 1) iri
        Nothing ->
          case split (Pattern "/") iri of
            [] -> iri
            parts ->
              case Array.unsnoc parts of
                Just { init } -> joinWith "/" init <> "/"
                Nothing -> iri
  where
  matchPrefix (Tuple _ namespace) =
    String.take (String.length namespace) iri == namespace

namespaceName :: String -> String
namespaceName namespace =
  case Array.find (\(Tuple _ known) -> known == namespace) knownPrefixes of
    Just (Tuple prefix _) -> prefix
    Nothing -> namespace

knownPrefixes :: Array (Tuple String String)
knownPrefixes =
  [ Tuple "owl" "http://www.w3.org/2002/07/owl#"
  , Tuple "rdf" "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  , Tuple "rdfs" "http://www.w3.org/2000/01/rdf-schema#"
  , Tuple "xsd" "http://www.w3.org/2001/XMLSchema#"
  , Tuple "dcterms" "http://purl.org/dc/terms/"
  , Tuple "gb" "https://lambdasistemi.github.io/graph-browser/vocab/terms#"
  , Tuple "gbkind" "https://lambdasistemi.github.io/graph-browser/vocab/kinds#"
  , Tuple "gbgroup" "https://lambdasistemi.github.io/graph-browser/vocab/groups#"
  , Tuple "gbedge" "https://lambdasistemi.github.io/graph-browser/vocab/edges#"
  ]

depthBtn
  :: forall m
   . Int
  -> Int
  -> H.ComponentHTML Action () m
depthBtn n current =
  HH.button
    [ cls
        ( "depth-btn"
            <>
              if n == current then " active"
              else ""
        )
    , HE.onClick \_ -> SetDepth n
    ]
    [ HH.text (show n) ]

renderOntologyReference
  :: forall m
   . String
  -> Maybe OntologyReference
  -> H.ComponentHTML Action () m
renderOntologyReference _ Nothing = HH.text ""
renderOntologyReference title (Just ref) =
  if shouldRenderOntologyReference ref.iri then
    HH.div [ cls "connections" ]
      [ HH.h3_ [ HH.text title ]
      , HH.a
          [ HP.href ref.iri
          , HP.target "_blank"
          , HP.rel "noopener"
          ]
          [ HH.text ref.label ]
      ]
  else
    HH.text ""

renderPromptBuilder
  :: forall m
   . { promptInput :: String, promptCopied :: Boolean | _ }
  -> PromptMode
  -> String
  -> H.ComponentHTML Action () m
renderPromptBuilder state mode title =
  HH.div [ cls "prompt-builder" ]
    [ HH.h3_ [ HH.text title ]
    , HH.textarea
        [ cls "prompt-textarea"
        , HP.value state.promptInput
        , HP.placeholder (promptPlaceholder mode)
        , HP.rows 3
        , HE.onValueInput SetPromptInput
        ]
    , HH.div [ cls "prompt-actions" ]
        [ HH.button
            [ cls
                ( "prompt-copy-btn"
                    <>
                      if state.promptCopied then " copied"
                      else ""
                )
            , HE.onClick \_ -> CopyPrompt
            ]
            [ HH.text
                ( if state.promptCopied then "Copied!"
                  else "Copy prompt"
                )
            ]
        ]
    ]

promptPlaceholder :: PromptMode -> String
promptPlaceholder PromptNode =
  "e.g. Add missing connections, update description..."
promptPlaceholder PromptEdge =
  "e.g. Refine this relationship, add details..."
promptPlaceholder PromptQuery =
  "e.g. Find all actors that can vote on treasury actions..."
promptPlaceholder PromptTour =
  "e.g. A tour explaining how DRep delegation works..."
