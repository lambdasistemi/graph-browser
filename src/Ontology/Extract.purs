module Ontology.Extract
  ( extractOntology
  , extractClasses
  , computeDepths
  , classesToNodes
  , generateOntologyKinds
  , extractSubclassEdges
  , extractPropertyEdges
  , extractAlignmentEdges
  ) where

import Prelude

import Data.Array as Array
import Data.Foldable (foldl)
import Data.Map as Map
import Data.Maybe (Maybe(..), fromMaybe, maybe)
import Data.Set as Set
import Data.String as String
import Data.String.Common (split)
import Data.String.Pattern (Pattern(..), Replacement(..))
import Data.Tuple (Tuple(..))
import FFI.Oxigraph (ImportedRdfQuad)
import FFI.Uri (decodeUriComponent)
import Graph.Types (Edge, KindDef, KindId, Node)

type OntologyClass =
  { iri :: String
  , label :: String
  , comment :: String
  }

type SubclassLink =
  { subIri :: String
  , superIri :: String
  }

type OntologyExtraction =
  { nodes :: Array Node
  , edges :: Array Edge
  , kinds :: Map.Map KindId KindDef
  }

rdfType :: String
rdfType = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"

owlClass :: String
owlClass = "http://www.w3.org/2002/07/owl#Class"

rdfsClass :: String
rdfsClass = "http://www.w3.org/2000/01/rdf-schema#Class"

rdfsSubclassOf :: String
rdfsSubclassOf = "http://www.w3.org/2000/01/rdf-schema#subClassOf"

owlObjectProperty :: String
owlObjectProperty = "http://www.w3.org/2002/07/owl#ObjectProperty"

rdfsDomain :: String
rdfsDomain = "http://www.w3.org/2000/01/rdf-schema#domain"

rdfsRange :: String
rdfsRange = "http://www.w3.org/2000/01/rdf-schema#range"

owlEquivalentClass :: String
owlEquivalentClass = "http://www.w3.org/2002/07/owl#equivalentClass"

owlEquivalentProperty :: String
owlEquivalentProperty = "http://www.w3.org/2002/07/owl#equivalentProperty"

rdfsLabel :: String
rdfsLabel = "http://www.w3.org/2000/01/rdf-schema#label"

rdfsComment :: String
rdfsComment = "http://www.w3.org/2000/01/rdf-schema#comment"

dctermsDescription :: String
dctermsDescription = "http://purl.org/dc/terms/description"

owlThing :: String
owlThing = "http://www.w3.org/2002/07/owl#Thing"

extractOntology :: Array ImportedRdfQuad -> OntologyExtraction
extractOntology quads =
  let
    classes = extractClasses quads
    subclassLinks = extractSubclassLinks quads
    depths = computeDepths (map (\cls -> { iri: cls.iri }) classes) subclassLinks
    nodeIdByIri = Map.fromFoldable
      (map (\cls -> Tuple cls.iri (ontologyNodeId cls.iri)) classes)
    nodes = classesToNodes classes depths
    subclassEdges = extractSubclassEdges quads nodeIdByIri
    propertyEdges = extractPropertyEdges quads nodeIdByIri
    alignmentEdges = extractAlignmentEdges quads nodeIdByIri
  in
    { nodes
    , edges:
        dedupeEdges
          (subclassEdges <> propertyEdges <> alignmentEdges)
    , kinds: generateOntologyKinds depths
    }

extractClasses :: Array ImportedRdfQuad -> Array OntologyClass
extractClasses quads =
  map
    ( \iri ->
        { iri
        , label: fromMaybe (displayName iri) (literalValue quads iri rdfsLabel)
        , comment:
            fromMaybe
              (fromMaybe "" (literalValue quads iri dctermsDescription))
              (literalValue quads iri rdfsComment)
        }
    )
    (subjectsWithType owlClass quads <> subjectsWithType rdfsClass quads # Array.nub)

computeDepths
  :: Array { iri :: String }
  -> Array { subIri :: String, superIri :: String }
  -> Map.Map String Int
computeDepths classes subclassLinks =
  let
    classSet = Set.fromFoldable (map _.iri classes)
    normalizedLinks = Array.filter
      ( \link ->
          Set.member link.subIri classSet
            && (Set.member link.superIri classSet || link.superIri == owlThing)
      )
      subclassLinks
    rootIris = roots (map _.iri classes) normalizedLinks
    start = if Array.null rootIris then map _.iri classes else rootIris
  in
    go (map (\iri -> Tuple iri 0) start) Map.empty
  where
  childrenByParent = foldl
    ( \acc link ->
        Map.alter
          (Just <<< appendUnique link.subIri <<< fromMaybe [])
          link.superIri
          acc
    )
    Map.empty
    subclassLinks

  roots iris links =
    Array.filter
      ( \iri ->
          Array.null
            ( Array.filter
                (\link -> link.subIri == iri && link.superIri /= owlThing)
                links
            )
      )
      iris

  go queue depths =
    case Array.uncons queue of
      Nothing -> ensureZeroDepth classes depths
      Just { head: Tuple iri depth, tail } ->
        case Map.lookup iri depths of
          Just current | current <= depth -> go tail depths
          _ ->
            let
              nextDepths = Map.insert iri depth depths
              children = fromMaybe []
                (Map.lookup iri childrenByParent)
              nextQueue =
                tail
                  <> map (\child -> Tuple child (depth + 1)) children
            in
              go nextQueue nextDepths

ensureZeroDepth
  :: Array { iri :: String }
  -> Map.Map String Int
  -> Map.Map String Int
ensureZeroDepth classes depths =
  foldl
    (\acc cls -> Map.insertWith min cls.iri 0 acc)
    depths
    classes

classesToNodes
  :: Array OntologyClass
  -> Map.Map String Int
  -> Array Node
classesToNodes classes depths =
  map
    ( \cls ->
        let
          depth = fromMaybe 0 (Map.lookup cls.iri depths)
        in
          { id: ontologyNodeId cls.iri
          , label: cls.label
          , kind: ontologyKindId depth
          , group: "ontology"
          , description: cls.comment
          , links:
              [ { label: "Ontology IRI", url: cls.iri }
              ]
          , ontologyRef: Just
              { label: cls.label
              , iri: cls.iri
              }
          , sources: []
          }
    )
    classes

generateOntologyKinds :: Map.Map String Int -> Map.Map KindId KindDef
generateOntologyKinds depths =
  Map.fromFoldable
    ( map
        ( \depth ->
            Tuple
              (ontologyKindId depth)
              { label: "Ontology Class (depth " <> show depth <> ")"
              , color: depthColor depth
              , shape: "diamond"
              }
        )
        depthLevels
    )
  where
  depthLevels =
    Array.sort
      ( Array.nub
          ( map (\(Tuple _ depth) -> depth)
              (Map.toUnfoldable depths :: Array (Tuple String Int))
          )
      )

extractSubclassEdges
  :: Array ImportedRdfQuad
  -> Map.Map String String
  -> Array Edge
extractSubclassEdges quads nodeIdByIri =
  Array.mapMaybe
    ( \link -> do
        source <- Map.lookup link.subIri nodeIdByIri
        target <- Map.lookup link.superIri nodeIdByIri
        pure
          { source
          , target
          , label: "subclass of"
          , description: ""
          , predicateRef: Just
              { label: "subClassOf"
              , iri: rdfsSubclassOf
              }
          , sources: []
          }
    )
    (extractSubclassLinks quads)

extractPropertyEdges
  :: Array ImportedRdfQuad
  -> Map.Map String String
  -> Array Edge
extractPropertyEdges quads nodeIdByIri =
  dedupeEdges
    ( Array.concatMap
        ( \propertyIri ->
            let
              domains = namedObjectValues quads propertyIri rdfsDomain
              ranges = namedObjectValues quads propertyIri rdfsRange
              label = fromMaybe (displayName propertyIri)
                (literalValue quads propertyIri rdfsLabel)
              description = fromMaybe ""
                (literalValue quads propertyIri rdfsComment)
            in
              Array.concatMap
                ( \domainIri ->
                    Array.mapMaybe
                      ( \rangeIri -> do
                          source <- Map.lookup domainIri nodeIdByIri
                          target <- Map.lookup rangeIri nodeIdByIri
                          pure
                            { source
                            , target
                            , label
                            , description
                            , predicateRef: Just
                                { label
                                , iri: propertyIri
                                }
                            , sources: []
                            }
                      )
                      ranges
                )
                domains
        )
        (subjectsWithType owlObjectProperty quads)
    )

extractAlignmentEdges
  :: Array ImportedRdfQuad
  -> Map.Map String String
  -> Array Edge
extractAlignmentEdges quads nodeIdByIri =
  dedupeEdges
    (classEdges <> propertyEdges)
  where
  classEdges =
    Array.mapMaybe
      ( \quad ->
          if
            quad.predicate == owlEquivalentClass
              && quad.object.termType == "NamedNode" then do
            source <- Map.lookup quad.subject nodeIdByIri
            target <- Map.lookup quad.object.value nodeIdByIri
            pure
              { source
              , target
              , label: "equivalent to"
              , description: ""
              , predicateRef: Just
                  { label: "equivalentClass"
                  , iri: owlEquivalentClass
                  }
              , sources: []
              }
          else
            Nothing
      )
      quads

  propertyEdges =
    Array.concatMap
      ( \quad ->
          if
            quad.predicate == owlEquivalentProperty
              && quad.object.termType == "NamedNode" then
            equivalentPropertyEdges
              quad.subject
              quad.object.value
          else
            []
      )
      quads

  equivalentPropertyEdges left right =
    let
      leftDomains = namedObjectValues quads left rdfsDomain
      rightDomains = namedObjectValues quads right rdfsDomain
      leftRanges = namedObjectValues quads left rdfsRange
      rightRanges = namedObjectValues quads right rdfsRange
    in
      mkPairEdges leftDomains rightDomains
        <> mkPairEdges leftRanges rightRanges

  mkPairEdges lefts rights =
    Array.concatMap
      ( \leftIri ->
          Array.mapMaybe
            ( \rightIri -> do
                source <- Map.lookup leftIri nodeIdByIri
                target <- Map.lookup rightIri nodeIdByIri
                pure
                  { source
                  , target
                  , label: "equivalent property"
                  , description: ""
                  , predicateRef: Just
                      { label: "equivalentProperty"
                      , iri: owlEquivalentProperty
                      }
                  , sources: []
                  }
            )
            rights
      )
      lefts

extractSubclassLinks :: Array ImportedRdfQuad -> Array SubclassLink
extractSubclassLinks quads =
  Array.mapMaybe
    ( \quad ->
        if
          quad.predicate == rdfsSubclassOf
            && quad.object.termType == "NamedNode" then
          Just { subIri: quad.subject, superIri: quad.object.value }
        else
          Nothing
    )
    quads

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

ontologyNodeId :: String -> String
ontologyNodeId iri =
  "owl-" <> normalizeId (localName iri)

ontologyKindId :: Int -> String
ontologyKindId depth = "owl-class-" <> show depth

displayName :: String -> String
displayName = decodeUriComponent <<< localName

localName :: String -> String
localName iri =
  case Array.last (split (Pattern "#") iri) of
    Just suffix | suffix /= iri -> suffix
    _ ->
      case Array.last (split (Pattern "/") iri) of
        Just suffix -> suffix
        Nothing -> iri

normalizeId :: String -> String
normalizeId raw =
  let
    lower = String.toLower raw
    hyphenated =
      foldl
        (\acc pattern -> String.replaceAll (Pattern pattern) (Replacement "-") acc)
        lower
        [ " "
        , "_"
        , "."
        , ":"
        ]
  in
    String.replaceAll (Pattern "--") (Replacement "-") hyphenated

depthColor :: Int -> String
depthColor depth =
  let
    amount = min 75 (depth * 15)
    lighten component =
      component + (((255 - component) * amount) / 100)
  in
    "rgb("
      <> show (lighten 155)
      <> ", "
      <> show (lighten 89)
      <> ", "
      <> show (lighten 182)
      <> ")"

appendUnique :: forall a. Eq a => a -> Array a -> Array a
appendUnique item items =
  if Array.elem item items then items else items <> [ item ]

dedupeEdges :: Array Edge -> Array Edge
dedupeEdges edges =
  Array.fromFoldable
    (Map.values edgeMap)
  where
  edgeMap = Map.fromFoldable
    ( map
        (\edge -> Tuple (edgeKey edge) edge)
        edges
    )

  edgeKey edge =
    edge.source <> "|" <> edge.target <> "|" <> predicateKey edge

  predicateKey edge = case edge.predicateRef of
    Just ref -> ref.iri
    Nothing -> "label:" <> edge.label
