module Vocab.Publish.Main where

import Prelude

import Control.Alt ((<|>))
import Data.Array as Array
import Data.Either (Either(..))
import Data.Foldable (foldl)
import Data.Map as Map
import Data.Maybe (Maybe(..), fromMaybe)
import Data.String as String
import Data.String.Common (joinWith, split)
import Data.String.Pattern (Pattern(..), Replacement(..))
import Data.Traversable (sequence, traverse)
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Class.Console as Console
import Effect.Exception (try)
import FFI.Node as Node
import FFI.Oxigraph as Oxigraph
import FFI.Oxigraph (ImportedRdfQuad)
import FFI.Uri (decodeUriComponent)

type Options =
  { outputDir :: String
  , siteBasePath :: String
  , sourcePaths :: Array String
  }

type NamespaceDocument =
  { namespace :: String
  , relativePath :: String
  , title :: String
  , sourceArtifacts :: Array String
  , terms :: Array TermEntry
  }

type TermEntry =
  { iri :: String
  , fragment :: String
  , compact :: String
  , label :: String
  , description :: String
  , termType :: String
  }

rdfType :: String
rdfType = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"

rdfsLabel :: String
rdfsLabel = "http://www.w3.org/2000/01/rdf-schema#label"

rdfsComment :: String
rdfsComment = "http://www.w3.org/2000/01/rdf-schema#comment"

dctermsDescription :: String
dctermsDescription = "http://purl.org/dc/terms/description"

owlClass :: String
owlClass = "http://www.w3.org/2002/07/owl#Class"

owlObjectProperty :: String
owlObjectProperty = "http://www.w3.org/2002/07/owl#ObjectProperty"

owlDatatypeProperty :: String
owlDatatypeProperty = "http://www.w3.org/2002/07/owl#DatatypeProperty"

owlAnnotationProperty :: String
owlAnnotationProperty = "http://www.w3.org/2002/07/owl#AnnotationProperty"

rdfsClass :: String
rdfsClass = "http://www.w3.org/2000/01/rdf-schema#Class"

main :: Effect Unit
main = do
  args <- Node.getArgv
  case parseOptions args of
    Left err -> failWith err
    Right options -> run options

run :: Options -> Effect Unit
run options = do
  quadSets <- traverse loadSourceQuads options.sourcePaths
  case sequence quadSets of
    Left err -> failWith err
    Right loaded -> do
      let docs = namespaceDocuments options.siteBasePath options.sourcePaths (Array.concat loaded)
      if Array.null docs then
        failWith "No publishable ontology namespaces found in Turtle sources"
      else do
        _ <- traverse (writeNamespaceDocument options.outputDir) docs
        Console.log ("Published ontology namespaces: " <> joinWith ", " (map _.relativePath docs))

loadSourceQuads :: String -> Effect (Either String (Array ImportedRdfQuad))
loadSourceQuads path = do
  textResult <- tryReadTextFile path
  case textResult of
    Left _ -> pure (Left ("Failed to read ontology Turtle source: " <> path))
    Right content -> do
      parseResult <- try (Oxigraph.parseQuads "text/turtle" "https://graph-browser.invalid/" content)
      pure case parseResult of
        Left _ -> Left ("Failed to parse ontology Turtle source: " <> path)
        Right quads -> Right quads

namespaceDocuments :: String -> Array String -> Array ImportedRdfQuad -> Array NamespaceDocument
namespaceDocuments siteBasePath sourcePaths quads =
  mapMaybeNamespaceDocument grouped
  where
  grouped =
    foldl
      ( \acc iri ->
          case namespaceKey siteBasePath iri of
            Nothing -> acc
            Just namespace ->
              Map.alter
                (Just <<< appendUnique iri <<< fromMaybe [])
                namespace
                acc
      )
      Map.empty
      (publishableSubjects siteBasePath quads)

  mapMaybeNamespaceDocument namespaces =
    Array.mapMaybe
      ( \(Tuple namespace iris) ->
          let
            entries = Array.sortBy compareTermEntries (map (termEntry quads namespace) iris)
          in
            if Array.null entries then
              Nothing
            else
              Just
                { namespace
                , relativePath: namespaceRelativePath siteBasePath namespace
                , title: namespaceTitle namespace
                , sourceArtifacts: sourcePaths
                , terms: entries
                }
      )
      (Map.toUnfoldable namespaces :: Array (Tuple String (Array String)))

publishableSubjects :: String -> Array ImportedRdfQuad -> Array String
publishableSubjects siteBasePath quads =
  Array.nub $ Array.mapMaybe publishableSubject quads
  where
  publishableSubject quad =
    namespaceKey siteBasePath quad.subject *> pure quad.subject

termEntry :: Array ImportedRdfQuad -> String -> String -> TermEntry
termEntry quads namespace iri =
  { iri
  , fragment
  , compact: compactName namespace fragment
  , label: fromMaybe (fallbackLabel fragment) (literalValue quads iri rdfsLabel)
  , description:
      fromMaybe
        ""
        ( literalValue quads iri dctermsDescription
            <|> literalValue quads iri rdfsComment
        )
  , termType: classifyTerm quads iri
  }
  where
  fragment = String.drop (String.length namespace) iri

classifyTerm :: Array ImportedRdfQuad -> String -> String
classifyTerm quads iri =
  if hasType owlClass then "owl:Class"
  else if hasType rdfsClass then "rdfs:Class"
  else if hasType owlObjectProperty then "owl:ObjectProperty"
  else if hasType owlDatatypeProperty then "owl:DatatypeProperty"
  else if hasType owlAnnotationProperty then "owl:AnnotationProperty"
  else "term"
  where
  hasType typeIri =
    Array.any
      ( \quad ->
          quad.subject == iri
            && quad.predicate == rdfType
            && quad.object.termType == "NamedNode"
            && quad.object.value == typeIri
      )
      quads

compactName :: String -> String -> String
compactName namespace fragment =
  namespacePrefix namespace <> ":" <> decodeOrOriginal fragment

namespacePrefix :: String -> String
namespacePrefix = namespaceTail

namespaceTitle :: String -> String
namespaceTitle namespace =
  case namespaceTail namespace of
    "terms" -> "Vocabulary Terms"
    "kinds" -> "Vocabulary Kinds"
    "groups" -> "Vocabulary Groups"
    "edges" -> "Vocabulary Edges"
    tailName -> "Vocabulary " <> tailName

namespaceRelativePath :: String -> String -> String
namespaceRelativePath siteBasePath namespace =
  let path = namespacePath namespace
      trimmedBase = normalizedBasePath siteBasePath
      withoutBase =
        if trimmedBase /= "" && String.take (String.length trimmedBase) path == trimmedBase then
          String.drop (String.length trimmedBase) path
        else
          path
      parts = Array.filter (_ /= "") (split (Pattern "/") withoutBase)
  in joinWith "/" parts

namespaceKey :: String -> String -> Maybe String
namespaceKey siteBasePath iri = do
  idx <- String.lastIndexOf (Pattern "#") iri
  let namespace = String.take (idx + 1) iri
      path = namespacePath namespace
      base = normalizedBasePath siteBasePath
  if isHttpNamespace namespace && isVocabPath base path then
    Just namespace
  else
    Nothing

namespacePath :: String -> String
namespacePath namespace =
  case String.indexOf (Pattern "://") withoutFragment of
    Nothing -> namespace
    Just schemeIdx ->
      let
        afterScheme = String.drop (schemeIdx + 3) withoutFragment
      in
        case String.indexOf (Pattern "/") afterScheme of
          Nothing -> "/"
          Just slashIdx -> "/" <> String.drop (slashIdx + 1) afterScheme
  where
  withoutFragment =
    case String.lastIndexOf (Pattern "#") namespace of
      Just idx -> String.take idx namespace
      Nothing -> namespace

normalizedBasePath :: String -> String
normalizedBasePath base
  | base == "" = ""
  | String.take 1 base == "/" = trimTrailingSlash base
  | otherwise = trimTrailingSlash ("/" <> base)

trimTrailingSlash :: String -> String
trimTrailingSlash value =
  if String.length value > 1 && String.drop (String.length value - 1) value == "/" then
    String.take (String.length value - 1) value
  else
    value

isHttpNamespace :: String -> Boolean
isHttpNamespace namespace =
  String.take 7 namespace == "http://"
    || String.take 8 namespace == "https://"

isVocabPath :: String -> String -> Boolean
isVocabPath base path
  | base == "" = String.take 7 path == "/vocab/"
  | otherwise =
      let prefix = base <> "/vocab/"
      in String.take (String.length prefix) path == prefix

namespaceTail :: String -> String
namespaceTail namespace =
  let withoutHash =
        case String.lastIndexOf (Pattern "#") namespace of
          Just idx -> String.take idx namespace
          Nothing -> namespace
      pieces = Array.filter (_ /= "") (split (Pattern "/") withoutHash)
  in fromMaybe namespace (Array.last pieces)

fallbackLabel :: String -> String
fallbackLabel fragment = decodeOrOriginal fragment

decodeOrOriginal :: String -> String
decodeOrOriginal value =
  fromMaybe value (hushDecode value)

hushDecode :: String -> Maybe String
hushDecode value =
  let decoded = decodeUriComponent value
  in Just decoded

literalValue :: Array ImportedRdfQuad -> String -> String -> Maybe String
literalValue quads subject predicate =
  Array.head
    ( Array.mapMaybe
        ( \quad ->
            if
              quad.subject == subject
                && quad.predicate == predicate
                && quad.object.termType == "Literal" then
              Just quad.object.value
            else
              Nothing
        )
        quads
    )

appendUnique :: forall a. Eq a => a -> Array a -> Array a
appendUnique item items =
  if Array.elem item items then items else items <> [ item ]

compareTermEntries :: TermEntry -> TermEntry -> Ordering
compareTermEntries left right = compare left.fragment right.fragment

writeNamespaceDocument :: String -> NamespaceDocument -> Effect Unit
writeNamespaceDocument outputDir doc = do
  targetDir <- Node.joinPath [ outputDir, doc.relativePath ]
  targetPath <- Node.joinPath [ targetDir, "index.html" ]
  Node.makeDirectory targetDir
  Node.writeTextFile targetPath (renderNamespaceDocument doc)

renderNamespaceDocument :: NamespaceDocument -> String
renderNamespaceDocument doc =
  joinWith "\n"
    [ "<!doctype html>"
    , "<html lang=\"en\">"
    , "<head>"
    , "  <meta charset=\"utf-8\">"
    , "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"
    , "  <title>" <> escapeHtml doc.title <> "</title>"
    , "  <style>"
    , "    :root { color-scheme: dark; font-family: \"Iosevka Web\", \"IBM Plex Sans\", sans-serif; background: #10141c; color: #e8edf5; }"
    , "    body { margin: 0; background: radial-gradient(circle at top left, #1d2633, #10141c 55%); }"
    , "    main { max-width: 960px; margin: 0 auto; padding: 3rem 1.5rem 4rem; }"
    , "    a { color: #8cc8ff; }"
    , "    .meta { display: flex; flex-wrap: wrap; gap: 1rem; margin: 1rem 0 2rem; color: #b8c3d4; }"
    , "    .term { border-top: 1px solid rgba(255,255,255,0.12); padding: 1rem 0 1.25rem; }"
    , "    .term h2 { margin: 0 0 0.4rem; font-size: 1.1rem; }"
    , "    code { background: rgba(255,255,255,0.08); padding: 0.15rem 0.35rem; border-radius: 0.3rem; }"
    , "    .term-type { color: #ffcd7a; font-size: 0.95rem; }"
    , "    .fragment { color: #b8c3d4; font-size: 0.92rem; }"
    , "  </style>"
    , "</head>"
    , "<body>"
    , "  <main>"
    , "    <p><a href=\"../../docs/ontology/\">Ontology documentation</a></p>"
    , "    <h1>" <> escapeHtml doc.title <> "</h1>"
    , "    <p>This namespace document is generated automatically from ontology Turtle during the build.</p>"
    , "    <div class=\"meta\">"
    , "      <span>Namespace: <code>" <> escapeHtml doc.namespace <> "</code></span>"
    , "      <span>Source TTL: " <> renderSourceArtifacts doc.sourceArtifacts <> "</span>"
    , "    </div>"
    , joinWith "\n" (map renderTermEntry doc.terms)
    , "  </main>"
    , "</body>"
    , "</html>"
    ]

renderTermEntry :: TermEntry -> String
renderTermEntry entry =
  joinWith "\n"
    [ "    <section class=\"term\" id=\"" <> escapeHtml entry.fragment <> "\">"
    , "      <h2><code>" <> escapeHtml entry.compact <> "</code></h2>"
    , "      <div class=\"fragment\">#" <> escapeHtml entry.fragment <> "</div>"
    , "      <div class=\"term-type\">" <> escapeHtml entry.termType <> "</div>"
    , "      <p><strong>" <> escapeHtml entry.label <> "</strong></p>"
    , if entry.description == "" then "      <p>No description provided in the ontology.</p>"
      else "      <p>" <> escapeHtml entry.description <> "</p>"
    , "      <p><a href=\"" <> escapeHtml entry.iri <> "\">Term IRI</a></p>"
    , "    </section>"
    ]

renderSourceArtifacts :: Array String -> String
renderSourceArtifacts sourcePaths =
  joinWith ", "
    ( map
        ( \path ->
            let href = publishedArtifactHref path
            in "<a href=\"" <> escapeHtml href <> "\">" <> escapeHtml href <> "</a>"
        )
        sourcePaths
    )

publishedArtifactHref :: String -> String
publishedArtifactHref path =
  if String.take 9 path == "data/rdf/" then
    "../../rdf/" <> String.drop 9 path
  else
    path

escapeHtml :: String -> String
escapeHtml =
  String.replaceAll (Pattern "&") (Replacement "&amp;")
    >>> String.replaceAll (Pattern "<") (Replacement "&lt;")
    >>> String.replaceAll (Pattern ">") (Replacement "&gt;")
    >>> String.replaceAll (Pattern "\"") (Replacement "&quot;")

tryReadTextFile :: String -> Effect (Either String String)
tryReadTextFile path = do
  result <- try (Node.readTextFile path)
  pure case result of
    Left _ -> Left path
    Right text -> Right text

parseOptions :: Array String -> Either String Options
parseOptions = go
  { outputDir: "dist"
  , siteBasePath: "/graph-browser"
  , sourcePaths:
      [ "data/rdf/core-ontology.ttl"
      , "data/rdf/application-ontology.ttl"
      ]
  }
  where
  go options remaining = case Array.uncons remaining of
    Nothing -> Right options
    Just { head: "--output-dir", tail } -> case Array.uncons tail of
      Nothing -> Left "--output-dir requires a value"
      Just { head: value, tail: rest } ->
        go (options { outputDir = value }) rest
    Just { head: "--site-base-path", tail } -> case Array.uncons tail of
      Nothing -> Left "--site-base-path requires a value"
      Just { head: value, tail: rest } ->
        go (options { siteBasePath = value }) rest
    Just { head: "--sources", tail } -> case Array.uncons tail of
      Nothing -> Left "--sources requires a comma-separated value"
      Just { head: value, tail: rest } ->
        go
          ( options
              { sourcePaths = Array.filter (_ /= "") (split (Pattern ",") value)
              }
          )
          rest
    Just { head: arg } ->
      Left ("Unknown argument: " <> arg)

failWith :: String -> Effect Unit
failWith message = do
  Console.error message
  Node.setExitCode 1
