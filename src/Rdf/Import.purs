module Rdf.Import
  ( importGraph
  , importInstanceGraph
  ) where

import Prelude

import Data.Array as Array
import Data.Either (Either(..))
import Data.Foldable (foldl)
import Data.Map as Map
import Data.Maybe (Maybe(..), fromMaybe)
import Data.String as String
import Data.String.Common (split)
import Data.String.Pattern (Pattern(..))
import Data.Traversable (traverse)
import Data.Tuple (Tuple(..))
import FFI.Oxigraph (ImportedRdfQuad)
import FFI.Uri (decodeUriComponent)
import Graph.Build (buildGraph)
import Graph.Types (Edge, Graph, KindDef, Link, Node, OntologyReference)
import Ontology.Extract as Ontology

gbTerms :: String
gbTerms = "https://lambdasistemi.github.io/graph-browser/vocab/terms#"

gbKinds :: String
gbKinds = "https://lambdasistemi.github.io/graph-browser/vocab/kinds#"

gbGroups :: String
gbGroups = "https://lambdasistemi.github.io/graph-browser/vocab/groups#"

gbEdges :: String
gbEdges = "https://lambdasistemi.github.io/graph-browser/vocab/edges#"

rdfType :: String
rdfType = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"

rdfStatement :: String
rdfStatement = "http://www.w3.org/1999/02/22-rdf-syntax-ns#Statement"

rdfSubject :: String
rdfSubject = "http://www.w3.org/1999/02/22-rdf-syntax-ns#subject"

rdfPredicate :: String
rdfPredicate = "http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate"

rdfObject :: String
rdfObject = "http://www.w3.org/1999/02/22-rdf-syntax-ns#object"

rdfsLabel :: String
rdfsLabel = "http://www.w3.org/2000/01/rdf-schema#label"

rdfsSeeAlso :: String
rdfsSeeAlso = "http://www.w3.org/2000/01/rdf-schema#seeAlso"

dctermsDescription :: String
dctermsDescription = "http://purl.org/dc/terms/description"

foafPage :: String
foafPage = "http://xmlns.com/foaf/0.1/page"

gbNode :: String
gbNode = gbTerms <> "Node"

gbNodeId :: String
gbNodeId = gbTerms <> "nodeId"

gbGroup :: String
gbGroup = gbTerms <> "group"

gbGroupId :: String
gbGroupId = gbTerms <> "groupId"

importGraph
  :: Array ImportedRdfQuad
  -> Either String { graph :: Graph, ontologyKinds :: Map.Map String KindDef }
importGraph quads = do
  baseGraph <- importInstanceGraph quads
  let ontology = Ontology.extractOntology quads
  pure
    { graph: buildGraph (Array.fromFoldable (Map.values baseGraph.nodes) <> ontology.nodes) (baseGraph.edges <> ontology.edges)
    , ontologyKinds: ontology.kinds
    }

importInstanceGraph :: Array ImportedRdfQuad -> Either String Graph
importInstanceGraph quads = do
  nodeRecords <- traverse (importNode quads) (subjectsWithType gbNode quads)
  let
    nodeIdByIri =
      Map.fromFoldable
        (map (\record -> Tuple record.iri record.node.id) nodeRecords)
    reifiedDescriptions = reifiedDescriptionMap quads
    relationEdges = importRelationEdges quads nodeIdByIri reifiedDescriptions
  pure $
    buildGraph
      (map _.node nodeRecords)
      (mergeEdges relationEdges)

type NodeRecord =
  { iri :: String
  , node :: Node
  }

importNode :: Array ImportedRdfQuad -> String -> Either String NodeRecord
importNode quads iri = do
  id <- requireLiteral quads iri gbNodeId "node id"
  label <- requireLiteral quads iri rdfsLabel "node label"
  kind <- case findKindIri quads iri of
    Nothing -> Left ("RDF node is missing a graph-browser kind: " <> iri)
    Just kindIri -> Right (decodeVocabularySuffix gbKinds kindIri)
  groupIri <- requireNamedObject quads iri gbGroup "node group"
  let
    group = fromMaybe (decodeVocabularySuffix gbGroups groupIri)
      (literalValue quads groupIri gbGroupId)
    description = fromMaybe "" (literalValue quads iri dctermsDescription)
    links = fallbackLinks quads iri
    ontologyRef = semanticTypeReference quads iri
    sources = subjectSources quads iri
  pure
    { iri
    , node:
        { id
        , label
        , kind
        , group
        , description
        , links
        , ontologyRef
        , sources
        }
    }

-- | Distinct, non-empty graph IRIs that contributed at least one
-- | statement with `iri` as subject.
subjectSources :: Array ImportedRdfQuad -> String -> Array String
subjectSources quads iri =
  Array.nub
    ( Array.mapMaybe
        ( \quad ->
            if quad.subject == iri && quad.graph /= "" then Just quad.graph
            else Nothing
        )
        quads
    )

fallbackLinks :: Array ImportedRdfQuad -> String -> Array Link
fallbackLinks quads subject =
  dedupeLinks
    ( Array.mapMaybe (namedLink quads foafPage) (namedObjectValues quads subject foafPage)
        <> Array.mapMaybe (namedLink quads rdfsSeeAlso) (namedObjectValues quads subject rdfsSeeAlso)
    )

namedLink :: Array ImportedRdfQuad -> String -> String -> Maybe Link
namedLink quads predicate url =
  if isAbsoluteIri url then
    Just
      { label: fromMaybe (decodeVocabularySuffix "" predicate) (literalValue quads predicate rdfsLabel)
      , url
      }
  else
    Nothing

importRelationEdges
  :: Array ImportedRdfQuad
  -> Map.Map String String
  -> Map.Map String String
  -> Array Edge
importRelationEdges quads nodeIdByIri reifiedDescriptions =
  Array.mapMaybe
    ( \quad -> do
        guardNamedNodeRelation quad nodeIdByIri
        source <- Map.lookup quad.subject nodeIdByIri
        target <- Map.lookup quad.object.value nodeIdByIri
        let label = predicateLabel quads quad.predicate
        pure
          { source
          , target
          , label
          , description:
              fromMaybe ""
                (Map.lookup (edgeKey quad.subject quad.predicate quad.object.value) reifiedDescriptions)
          , predicateRef: predicateReference quads quad.predicate
          , sources:
              if quad.graph == "" then []
              else [ quad.graph ]
          }
    )
    quads

mergeEdges :: Array Edge -> Array Edge
mergeEdges edges =
  Array.fromFoldable $ Map.values $ foldl insertEdge Map.empty edges
  where
  insertEdge acc edge =
    Map.alter
      (Just <<< mergeInto edge)
      (edgeIdentity edge)
      acc

  mergeInto edge Nothing = edge
  mergeInto edge (Just existing) =
    { source: existing.source
    , target: existing.target
    , label:
        if edge.description /= "" && preferNew edge existing then edge.label
        else existing.label
    , description:
        if edge.description /= "" then edge.description
        else existing.description
    , predicateRef: choosePredicateRef existing.predicateRef edge.predicateRef
    , sources: Array.nub (existing.sources <> edge.sources)
    }

  preferNew edge existing =
    case existing.predicateRef, edge.predicateRef of
      Nothing, Just _ -> true
      _, _ -> existing.description == ""

  choosePredicateRef left right = case left of
    Just _ -> left
    Nothing -> right

  edgeIdentity edge =
    edge.source <> "|" <> edge.target <> "|" <> predicateKey edge

  predicateKey edge = case edge.predicateRef of
    Just ref -> ref.iri
    Nothing -> "label:" <> edge.label

guardNamedNodeRelation
  :: ImportedRdfQuad
  -> Map.Map String String
  -> Maybe Unit
guardNamedNodeRelation quad nodeIdByIri =
  if
    quad.predicate /= rdfType
      && quad.object.termType == "NamedNode"
      && Map.member quad.subject nodeIdByIri
      && Map.member quad.object.value nodeIdByIri then
    Just unit
  else
    Nothing

reifiedDescriptionMap :: Array ImportedRdfQuad -> Map.Map String String
reifiedDescriptionMap quads =
  foldl insertDescription Map.empty (subjectsWithType rdfStatement quads)
  where
  insertDescription acc statementIri =
    case
      literalValue quads statementIri dctermsDescription,
      Array.head (namedObjectValues quads statementIri rdfSubject),
      Array.head (namedObjectValues quads statementIri rdfPredicate),
      Array.head (namedObjectValues quads statementIri rdfObject)
      of
      Just description, Just sourceIri, Just predicateIri, Just targetIri ->
        Map.insert (edgeKey sourceIri predicateIri targetIri) description acc
      _, _, _, _ -> acc

semanticTypeReference :: Array ImportedRdfQuad -> String -> Maybe OntologyReference
semanticTypeReference quads iri =
  Array.findMap
    ( \typeIri ->
        if isSemanticOntologyIri typeIri then
          Just (ontologyReference quads typeIri)
        else
          Nothing
    )
    (namedObjectValues quads iri rdfType)

predicateReference :: Array ImportedRdfQuad -> String -> Maybe OntologyReference
predicateReference quads iri =
  if isSemanticOntologyIri iri then
    Just (ontologyReference quads iri)
  else
    Nothing

ontologyReference :: Array ImportedRdfQuad -> String -> OntologyReference
ontologyReference quads iri =
  { label: fromMaybe (decodeVocabularySuffix "" iri) (literalValue quads iri rdfsLabel)
  , iri
  }

predicateLabel :: Array ImportedRdfQuad -> String -> String
predicateLabel quads iri =
  fromMaybe (decodeVocabularySuffix "" iri) (literalValue quads iri rdfsLabel)

dedupeLinks :: Array Link -> Array Link
dedupeLinks links =
  Array.fromFoldable $ Map.values $
    foldl (\acc link -> Map.insert link.url link acc) Map.empty links

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
  Array.find (\value -> String.take (String.length gbKinds) value == gbKinds)
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

edgeKey :: String -> String -> String -> String
edgeKey sourceIri predicateIri targetIri =
  sourceIri <> "|" <> predicateIri <> "|" <> targetIri

isSemanticOntologyIri :: String -> Boolean
isSemanticOntologyIri iri =
  isAbsoluteIri iri
    && not (String.take (String.length gbTerms) iri == gbTerms)
    && not (String.take (String.length gbKinds) iri == gbKinds)
    && not (String.take (String.length gbGroups) iri == gbGroups)
    && not (String.take (String.length gbEdges) iri == gbEdges)

isAbsoluteIri :: String -> Boolean
isAbsoluteIri iri =
  String.take 7 iri == "http://"
    || String.take 8 iri == "https://"

decodeVocabularySuffix :: String -> String -> String
decodeVocabularySuffix prefix iri
  | prefix /= ""
      && String.take (String.length prefix) iri == prefix =
      decodeUriComponent (String.drop (String.length prefix) iri)
  | otherwise =
      case Array.last (split (Pattern "#") iri) of
        Just suffix | suffix /= iri -> decodeUriComponent suffix
        _ ->
          case Array.last (split (Pattern "/") iri) of
            Just suffix -> decodeUriComponent suffix
            Nothing -> iri
