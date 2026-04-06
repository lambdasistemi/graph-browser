module Rdf.Import
  ( importGraph
  ) where

import Prelude

import Data.Array as Array
import Data.Either (Either(..))
import Data.Map as Map
import Data.Maybe (Maybe(..), fromMaybe, maybe)
import Data.String as String
import Data.String.Common (split)
import Data.String.Pattern (Pattern(..))
import Data.Tuple (Tuple(..))
import Data.Traversable (traverse)
import FFI.Oxigraph (ImportedRdfQuad)
import FFI.Uri (decodeUriComponent)
import Graph.Build (buildGraph)
import Graph.Types (Edge, Graph, Link, Node)

gbTerms :: String
gbTerms = "https://lambdasistemi.github.io/graph-browser/vocab/terms#"

gbKinds :: String
gbKinds = "https://lambdasistemi.github.io/graph-browser/vocab/kinds#"

gbGroups :: String
gbGroups = "https://lambdasistemi.github.io/graph-browser/vocab/groups#"

rdfType :: String
rdfType = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"

rdfsLabel :: String
rdfsLabel = "http://www.w3.org/2000/01/rdf-schema#label"

gbNode :: String
gbNode = gbTerms <> "Node"

gbEdgeAssertion :: String
gbEdgeAssertion = gbTerms <> "EdgeAssertion"

gbNodeId :: String
gbNodeId = gbTerms <> "nodeId"

gbGroup :: String
gbGroup = gbTerms <> "group"

gbGroupId :: String
gbGroupId = gbTerms <> "groupId"

gbDescription :: String
gbDescription = gbTerms <> "description"

gbExternalLink :: String
gbExternalLink = gbTerms <> "externalLink"

gbUrl :: String
gbUrl = gbTerms <> "url"

gbFrom :: String
gbFrom = gbTerms <> "from"

gbTo :: String
gbTo = gbTerms <> "to"

importGraph :: Array ImportedRdfQuad -> Either String Graph
importGraph quads = do
  nodeRecords <- traverse (importNode quads) (subjectsWithType gbNode quads)
  let
    nodeIdByIri =
      Map.fromFoldable
        (map (\record -> Tuple record.iri record.node.id) nodeRecords)
  edges <- traverse (importEdge quads nodeIdByIri) (subjectsWithType gbEdgeAssertion quads)
  pure $ buildGraph (map _.node nodeRecords) edges

type NodeRecord =
  { iri :: String
  , node :: Node
  }

importNode :: Array ImportedRdfQuad -> String -> Either String NodeRecord
importNode quads iri = do
  id <- requireLiteral quads iri gbNodeId "node id"
  label <- requireLiteral quads iri rdfsLabel "node label"
  description <- requireLiteral quads iri gbDescription "node description"
  kind <- case findKindIri quads iri of
    Nothing -> Left ("RDF node is missing a graph-browser kind: " <> iri)
    Just kindIri -> Right (decodeVocabularySuffix gbKinds kindIri)
  groupIri <- requireNamedObject quads iri gbGroup "node group"
  let
    group = fromMaybe (decodeVocabularySuffix gbGroups groupIri)
      (literalValue quads groupIri gbGroupId)
    links = Array.mapMaybe (importLink quads) (namedObjectValues quads iri gbExternalLink)
  pure
    { iri
    , node:
        { id
        , label
        , kind
        , group
        , description
        , links
        }
    }

importLink :: Array ImportedRdfQuad -> String -> Maybe Link
importLink quads iri = do
  url <- literalValue quads iri gbUrl
  let label = fromMaybe url (literalValue quads iri rdfsLabel)
  pure { label, url }

importEdge
  :: Array ImportedRdfQuad
  -> Map.Map String String
  -> String
  -> Either String Edge
importEdge quads nodeIdByIri iri = do
  sourceIri <- requireNamedObject quads iri gbFrom "edge source"
  targetIri <- requireNamedObject quads iri gbTo "edge target"
  source <- maybe
    (Left ("RDF edge references unknown source node: " <> sourceIri))
    Right
    (Map.lookup sourceIri nodeIdByIri)
  target <- maybe
    (Left ("RDF edge references unknown target node: " <> targetIri))
    Right
    (Map.lookup targetIri nodeIdByIri)
  label <- requireLiteral quads iri rdfsLabel "edge label"
  let description = fromMaybe "" (literalValue quads iri gbDescription)
  pure { source, target, label, description }

subjectsWithType :: String -> Array ImportedRdfQuad -> Array String
subjectsWithType typeIri quads =
  Array.nub
    ( Array.mapMaybe
        ( \quad ->
            if
              quad.predicate == rdfType
                && quad.object.termType == "NamedNode"
                && quad.object.value == typeIri then
              Just quad.subject
            else
              Nothing
        )
        quads
    )

findKindIri :: Array ImportedRdfQuad -> String -> Maybe String
findKindIri quads iri =
  Array.find (\value -> value /= gbNode)
    (namedObjectValues quads iri rdfType)

literalValue
  :: Array ImportedRdfQuad
  -> String
  -> String
  -> Maybe String
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

namedObjectValues
  :: Array ImportedRdfQuad
  -> String
  -> String
  -> Array String
namedObjectValues quads subject predicate =
  Array.mapMaybe
    ( \quad ->
        if
          quad.subject == subject
            && quad.predicate == predicate
            && quad.object.termType == "NamedNode" then
          Just quad.object.value
        else
          Nothing
    )
    quads

requireLiteral
  :: Array ImportedRdfQuad
  -> String
  -> String
  -> String
  -> Either String String
requireLiteral quads subject predicate fieldName =
  case literalValue quads subject predicate of
    Just value -> Right value
    Nothing ->
      Left ("Missing " <> fieldName <> " on RDF subject " <> subject)

requireNamedObject
  :: Array ImportedRdfQuad
  -> String
  -> String
  -> String
  -> Either String String
requireNamedObject quads subject predicate fieldName =
  case Array.head (namedObjectValues quads subject predicate) of
    Just value -> Right value
    Nothing ->
      Left ("Missing " <> fieldName <> " on RDF subject " <> subject)

decodeVocabularySuffix :: String -> String -> String
decodeVocabularySuffix prefix iri
  | String.take (String.length prefix) iri == prefix =
      decodeUriComponent (String.drop (String.length prefix) iri)
  | otherwise =
      case Array.last (split (Pattern "#") iri) of
        Just suffix -> decodeUriComponent suffix
        Nothing -> iri
