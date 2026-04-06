module Rdf.Export
  ( ExportFiles
  , exportFiles
  ) where

import Prelude

import Data.Array as Array
import Data.Map as Map
import Data.String.Common (joinWith, split)
import Data.String.Pattern (Pattern(..))
import Data.Tuple (Tuple(..))
import Effect (Effect)
import FFI.Oxigraph as Oxigraph
import FFI.Uri (encodeUriComponent)
import Graph.Types (Config, Graph)

type ExportFiles =
  { coreOntology :: String
  , applicationOntology :: String
  , coreMermaid :: String
  , applicationMermaid :: String
  , turtle :: String
  , nquads :: String
  }

vocabBase :: String
vocabBase = "https://lambdasistemi.github.io/graph-browser/vocab"

gbTerms :: String
gbTerms = vocabBase <> "/terms#"

gbKinds :: String
gbKinds = vocabBase <> "/kinds#"

gbGroups :: String
gbGroups = vocabBase <> "/groups#"

gbEdges :: String
gbEdges = vocabBase <> "/edges#"

rdfType :: String
rdfType = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"

rdfProperty :: String
rdfProperty = "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"

rdfsClass :: String
rdfsClass = "http://www.w3.org/2000/01/rdf-schema#Class"

rdfsLabel :: String
rdfsLabel = "http://www.w3.org/2000/01/rdf-schema#label"

dctermsTitle :: String
dctermsTitle = "http://purl.org/dc/terms/title"

dctermsDescription :: String
dctermsDescription = "http://purl.org/dc/terms/description"

dctermsIsPartOf :: String
dctermsIsPartOf = "http://purl.org/dc/terms/isPartOf"

xsdInteger :: String
xsdInteger = "http://www.w3.org/2001/XMLSchema#integer"

xsdAnyUri :: String
xsdAnyUri = "http://www.w3.org/2001/XMLSchema#anyURI"

exportFiles :: Config -> Graph -> Effect ExportFiles
exportFiles config graph = do
  dataset <- Oxigraph.serializeQuads (buildQuads config graph)
  pure
    { coreOntology: coreOntologyTurtle
    , applicationOntology: applicationOntologyTurtle config graph
    , coreMermaid: coreOntologyMermaid
    , applicationMermaid: applicationOntologyMermaid config graph
    , turtle: dataset.turtle
    , nquads: dataset.nquads
    }

buildQuads :: Config -> Graph -> Array Oxigraph.RdfQuad
buildQuads config graph =
  datasetQuads
    <> kindQuads
    <> groupQuads
    <> predicateQuads
    <> nodeQuads
    <> edgeQuads
  where
  dataset = datasetIri config

  datasetQuads =
    [ quadNamed dataset rdfType (gbTerms <> "Dataset")
    , quadLiteral dataset dctermsTitle config.title
    , quadLiteral dataset dctermsDescription config.description
    , quadTypedLiteral dataset (gbTerms <> "nodeCount") (show (Array.length nodes)) xsdInteger
    , quadTypedLiteral dataset (gbTerms <> "edgeCount") (show (Array.length graph.edges)) xsdInteger
    ]
      <> if config.sourceUrl == "" then [] else [ quadTypedLiteral dataset (gbTerms <> "sourceRepository") config.sourceUrl xsdAnyUri ]

  kindQuads =
    Array.concatMap
      ( \(Tuple kindId kindDef) ->
          let
            kind = kindIri kindId
          in
            [ quadNamed kind rdfType rdfsClass
            , quadLiteral kind rdfsLabel kindDef.label
            , quadLiteral kind (gbTerms <> "kindId") kindId
            , quadLiteral kind (gbTerms <> "color") kindDef.color
            , quadLiteral kind (gbTerms <> "shape") kindDef.shape
            ]
      )
      kinds

  groupQuads =
    Array.concatMap
      ( \group ->
          let
            iri = groupIri group
          in
            [ quadNamed iri rdfType (gbTerms <> "Group")
            , quadLiteral iri rdfsLabel group
            , quadLiteral iri (gbTerms <> "groupId") group
            ]
      )
      groups

  predicateQuads =
    Array.concatMap
      ( \label ->
          let
            iri = edgePredicateIri label
          in
            [ quadNamed iri rdfType rdfProperty
            , quadLiteral iri rdfsLabel label
            , quadLiteral iri (gbTerms <> "edgeLabel") label
            ]
      )
      edgeLabels

  nodeQuads =
    Array.concatMap
      ( \(Tuple _ node) ->
          let
            iri = nodeIri dataset node.id

            linkQuads =
              Array.concat
                ( Array.mapWithIndex
                    ( \index link ->
                        let
                          linkIri = iri <> "/link/" <> show index
                        in
                          [ quadNamed linkIri rdfType (gbTerms <> "ExternalLink")
                          , quadLiteral linkIri rdfsLabel link.label
                          , quadTypedLiteral linkIri (gbTerms <> "url") link.url xsdAnyUri
                          , quadNamed iri (gbTerms <> "externalLink") linkIri
                          ]
                    )
                    node.links
                )
          in
            [ quadNamed iri rdfType (gbTerms <> "Node")
            , quadNamed iri rdfType (kindIri node.kind)
            , quadNamed iri dctermsIsPartOf dataset
            , quadLiteral iri (gbTerms <> "nodeId") node.id
            , quadLiteral iri rdfsLabel node.label
            , quadNamed iri (gbTerms <> "group") (groupIri node.group)
            , quadLiteral iri (gbTerms <> "description") node.description
            ]
              <> linkQuads
      )
      nodes

  edgeQuads =
    Array.concat
      ( Array.mapWithIndex
          ( \index edge ->
              let
                source = nodeIri dataset edge.source
                target = nodeIri dataset edge.target
                predicate = edgePredicateIri edge.label
                assertion = dataset <> "/edge/" <> show index
              in
                [ quadNamed source predicate target
                , quadNamed assertion rdfType (gbTerms <> "EdgeAssertion")
                , quadNamed assertion dctermsIsPartOf dataset
                , quadTypedLiteral assertion (gbTerms <> "edgeIndex") (show index) xsdInteger
                , quadNamed assertion (gbTerms <> "from") source
                , quadNamed assertion (gbTerms <> "to") target
                , quadNamed assertion (gbTerms <> "predicate") predicate
                , quadLiteral assertion rdfsLabel edge.label
                , quadLiteral assertion (gbTerms <> "description") edge.description
                ]
          )
          graph.edges
      )

  kinds = Array.sortBy compareKindPairs (Map.toUnfoldable config.kinds :: Array (Tuple String _))
  nodes = Array.sortBy compareNodePairs (Map.toUnfoldable graph.nodes :: Array (Tuple String _))
  groups = Array.nub (Array.sort (map (\(Tuple _ node) -> node.group) nodes))
  edgeLabels = Array.nub (Array.sort (map _.label graph.edges))

compareKindPairs :: forall a. Tuple String a -> Tuple String a -> Ordering
compareKindPairs (Tuple left _) (Tuple right _) = compare left right

compareNodePairs :: forall a. Tuple String a -> Tuple String a -> Ordering
compareNodePairs (Tuple left _) (Tuple right _) = compare left right

datasetIri :: Config -> String
datasetIri config
  | config.sourceUrl /= "" = config.sourceUrl <> "/rdf"
  | otherwise = "urn:graph-browser:" <> encodeUriComponent config.title

nodeIri :: String -> String -> String
nodeIri dataset nodeId = dataset <> "/node/" <> nodeId

kindIri :: String -> String
kindIri kindId = gbKinds <> encodeUriComponent kindId

groupIri :: String -> String
groupIri group = gbGroups <> encodeUriComponent group

edgePredicateIri :: String -> String
edgePredicateIri label = gbEdges <> encodeUriComponent label

quadNamed :: String -> String -> String -> Oxigraph.RdfQuad
quadNamed subject predicate object =
  { subject
  , predicate
  , object:
      { termType: "NamedNode"
      , value: object
      , datatype: ""
      }
  }

quadLiteral :: String -> String -> String -> Oxigraph.RdfQuad
quadLiteral subject predicate value =
  { subject
  , predicate
  , object:
      { termType: "Literal"
      , value
      , datatype: ""
      }
  }

quadTypedLiteral :: String -> String -> String -> String -> Oxigraph.RdfQuad
quadTypedLiteral subject predicate value datatype =
  { subject
  , predicate
  , object:
      { termType: "Literal"
      , value
      , datatype
      }
  }

coreOntologyTurtle :: String
coreOntologyTurtle =
  joinWith "\n" coreOntologyLines

applicationOntologyTurtle :: Config -> Graph -> String
applicationOntologyTurtle config graph =
  joinWith "\n" $
    applicationOntologyHeader
      <> [ "" ]
      <> kindDeclarations
      <> [ "" ]
      <> groupDeclarations
      <> [ "" ]
      <> edgeDeclarations
  where
  applicationOntologyHeader =
    [ "@prefix gb: <" <> gbTerms <> "> ."
    , "@prefix gbkind: <" <> gbKinds <> "> ."
    , "@prefix gbgroup: <" <> gbGroups <> "> ."
    , "@prefix gbedge: <" <> gbEdges <> "> ."
    , "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> ."
    , "@prefix owl: <http://www.w3.org/2002/07/owl#> ."
    , "@prefix dcterms: <http://purl.org/dc/terms/> ."
    , ""
    , "<" <> vocabBase <> "/application-ontology> a owl:Ontology ;"
    , "  rdfs:label \"Graph Browser application vocabulary\" ;"
    , "  dcterms:description \"Repository-specific vocabulary generated from graph-browser config and graph data.\" ;"
    , "  owl:imports <" <> vocabBase <> "/ontology> ;"
    , "  owl:versionInfo \"0.1.0\" ."
    ]

  kindDeclarations =
    Array.concatMap
      ( \(Tuple kindId kindDef) ->
          [ "gbkind:" <> encodeUriComponent kindId <> " a owl:Class ;"
          , "  rdfs:label " <> quoted kindDef.label <> " ;"
          , "  gb:kindId " <> quoted kindId <> " ;"
          , "  gb:color " <> quoted kindDef.color <> " ;"
          , "  gb:shape " <> quoted kindDef.shape <> " ;"
          , "  rdfs:subClassOf gb:Node ."
          , ""
          ]
      )
      (Array.sortBy compareKindPairs (Map.toUnfoldable config.kinds :: Array (Tuple String _)))

  groupDeclarations =
    Array.concatMap
      ( \group ->
          [ "gbgroup:" <> encodeUriComponent group <> " a gb:Group ;"
          , "  rdfs:label " <> quoted group <> " ;"
          , "  gb:groupId " <> quoted group <> " ."
          , ""
          ]
      )
      (Array.nub (Array.sort (map (\(Tuple _ node) -> node.group) (Map.toUnfoldable graph.nodes :: Array (Tuple String _)))))

  edgeDeclarations =
    Array.concatMap
      ( \label ->
          [ "gbedge:" <> encodeUriComponent label <> " a owl:ObjectProperty ;"
          , "  rdfs:label " <> quoted label <> " ;"
          , "  rdfs:subPropertyOf gb:EdgeRelation ;"
          , "  gb:edgeLabel " <> quoted label <> " ;"
          , "  rdfs:domain gb:Node ;"
          , "  rdfs:range gb:Node ."
          , ""
          ]
      )
      (Array.nub (Array.sort (map _.label graph.edges)))

coreOntologyLines :: Array String
coreOntologyLines =
  [ "@prefix gb: <" <> gbTerms <> "> ."
  , "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> ."
  , "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> ."
  , "@prefix owl: <http://www.w3.org/2002/07/owl#> ."
  , "@prefix dcterms: <http://purl.org/dc/terms/> ."
  , "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> ."
  , ""
  , "<" <> vocabBase <> "/ontology> a owl:Ontology ;"
  , "  rdfs:label \"Graph Browser core vocabulary\" ;"
  , "  dcterms:description \"Shared graph-browser ontology for datasets, views, tutorials, queries, and edge assertions.\" ;"
  , "  owl:versionInfo \"0.1.0\" ."
  , ""
  , "gb:Dataset a owl:Class ;"
  , "  rdfs:label \"Dataset\" ;"
  , "  dcterms:description \"A graph-browser dataset exported to RDF.\" ."
  , ""
  , "gb:Node a owl:Class ;"
  , "  rdfs:label \"Node\" ;"
  , "  dcterms:description \"A graph-browser node resource.\" ."
  , ""
  , "gb:Group a owl:Class ;"
  , "  rdfs:label \"Group\" ;"
  , "  dcterms:description \"An organizational group used by graph-browser nodes.\" ."
  , ""
  , "gb:EdgeAssertion a owl:Class ;"
  , "  rdfs:label \"Edge assertion\" ;"
  , "  dcterms:description \"Metadata resource preserving the original graph-browser edge record.\" ."
  , ""
  , "gb:ExternalLink a owl:Class ;"
  , "  rdfs:label \"External link\" ;"
  , "  dcterms:description \"External URL associated with a graph-browser node.\" ."
  , ""
  , "gb:Tutorial a owl:Class ;"
  , "  rdfs:label \"Tutorial\" ;"
  , "  dcterms:description \"A guided tour through a graph-browser graph.\" ."
  , ""
  , "gb:TutorialStop a owl:Class ;"
  , "  rdfs:label \"Tutorial stop\" ;"
  , "  dcterms:description \"An ordered stop within a graph-browser tutorial.\" ."
  , ""
  , "gb:View a owl:Class ;"
  , "  rdfs:label \"View\" ;"
  , "  dcterms:description \"A named graph-browser view selecting a subset of graph edges, with optional scoped tours.\" ."
  , ""
  , "gb:EdgeReference a owl:Class ;"
  , "  rdfs:label \"Edge reference\" ;"
  , "  dcterms:description \"A structural reference to an edge triple inside a view definition.\" ."
  , ""
  , "gb:QueryCatalog a owl:Class ;"
  , "  rdfs:label \"Query catalog\" ;"
  , "  dcterms:description \"A collection of named graph-browser queries.\" ."
  , ""
  , "gb:NamedQuery a owl:Class ;"
  , "  rdfs:label \"Named query\" ;"
  , "  dcterms:description \"A named SPARQL query used for graph-browser navigation, views, or tours.\" ."
  , ""
  , "gb:QueryParameter a owl:Class ;"
  , "  rdfs:label \"Query parameter\" ;"
  , "  dcterms:description \"A parameter placeholder bound when executing a named query.\" ."
  , ""
  , "gb:Node rdfs:subClassOf"
  , "  [ a owl:Restriction ;"
  , "    owl:onProperty gb:nodeId ;"
  , "    owl:qualifiedCardinality \"1\"^^xsd:nonNegativeInteger ;"
  , "    owl:onDataRange xsd:string"
  , "  ] ,"
  , "  [ a owl:Restriction ;"
  , "    owl:onProperty gb:group ;"
  , "    owl:qualifiedCardinality \"1\"^^xsd:nonNegativeInteger ;"
  , "    owl:onClass gb:Group"
  , "  ] ."
  , ""
  , "gb:Tutorial rdfs:subClassOf"
  , "  [ a owl:Restriction ;"
  , "    owl:onProperty gb:hasStop ;"
  , "    owl:allValuesFrom gb:TutorialStop"
  , "  ] ."
  , ""
  , "gb:View rdfs:subClassOf"
  , "  [ a owl:Restriction ;"
  , "    owl:onProperty gb:hasEdgeReference ;"
  , "    owl:allValuesFrom gb:EdgeReference"
  , "  ] ,"
  , "  [ a owl:Restriction ;"
  , "    owl:onProperty gb:hasScopedTutorial ;"
  , "    owl:allValuesFrom gb:Tutorial"
  , "  ] ."
  , ""
  , "gb:QueryCatalog rdfs:subClassOf"
  , "  [ a owl:Restriction ;"
  , "    owl:onProperty gb:hasNamedQuery ;"
  , "    owl:allValuesFrom gb:NamedQuery"
  , "  ] ."
  , ""
  , "gb:NamedQuery rdfs:subClassOf"
  , "  [ a owl:Restriction ;"
  , "    owl:onProperty gb:queryText ;"
  , "    owl:qualifiedCardinality \"1\"^^xsd:nonNegativeInteger ;"
  , "    owl:onDataRange xsd:string"
  , "  ] ,"
  , "  [ a owl:Restriction ;"
  , "    owl:onProperty gb:hasParameter ;"
  , "    owl:allValuesFrom gb:QueryParameter"
  , "  ] ."
  , ""
  , "gb:QueryParameter rdfs:subClassOf"
  , "  [ a owl:Restriction ;"
  , "    owl:onProperty gb:parameterName ;"
  , "    owl:qualifiedCardinality \"1\"^^xsd:nonNegativeInteger ;"
  , "    owl:onDataRange xsd:string"
  , "  ] ,"
  , "  [ a owl:Restriction ;"
  , "    owl:onProperty gb:parameterType ;"
  , "    owl:maxQualifiedCardinality \"1\"^^xsd:nonNegativeInteger ;"
  , "    owl:onDataRange xsd:string"
  , "  ] ,"
  , "  [ a owl:Restriction ;"
  , "    owl:onProperty gb:defaultValue ;"
  , "    owl:maxQualifiedCardinality \"1\"^^xsd:nonNegativeInteger ;"
  , "    owl:onDataRange xsd:string"
  , "  ] ."
  , ""
  , "gb:EdgeAssertion rdfs:subClassOf"
  , "  [ a owl:Restriction ;"
  , "    owl:onProperty gb:from ;"
  , "    owl:qualifiedCardinality \"1\"^^xsd:nonNegativeInteger ;"
  , "    owl:onClass gb:Node"
  , "  ] ,"
  , "  [ a owl:Restriction ;"
  , "    owl:onProperty gb:to ;"
  , "    owl:qualifiedCardinality \"1\"^^xsd:nonNegativeInteger ;"
  , "    owl:onClass gb:Node"
  , "  ] ,"
  , "  [ a owl:Restriction ;"
  , "    owl:onProperty gb:predicate ;"
  , "    owl:qualifiedCardinality \"1\"^^xsd:nonNegativeInteger ;"
  , "    owl:onClass rdf:Property"
  , "  ] ."
  , ""
  , "gb:EdgeRelation a owl:ObjectProperty ;"
  , "  rdfs:label \"edge relation\" ;"
  , "  dcterms:description \"A direct relationship predicate between two graph-browser nodes.\" ;"
  , "  rdfs:domain gb:Node ;"
  , "  rdfs:range gb:Node ."
  , ""
  , "gb:sourceRepository a owl:DatatypeProperty ;"
  , "  rdfs:label \"source repository\" ;"
  , "  dcterms:description \"Repository URL from config.sourceUrl.\" ;"
  , "  rdfs:domain gb:Dataset ;"
  , "  rdfs:range xsd:anyURI ."
  , ""
  , "gb:nodeCount a owl:DatatypeProperty ;"
  , "  rdfs:label \"node count\" ;"
  , "  rdfs:domain gb:Dataset ;"
  , "  rdfs:range xsd:integer ."
  , ""
  , "gb:edgeCount a owl:DatatypeProperty ;"
  , "  rdfs:label \"edge count\" ;"
  , "  rdfs:domain gb:Dataset ;"
  , "  rdfs:range xsd:integer ."
  , ""
  , "gb:kindId a owl:AnnotationProperty ;"
  , "  rdfs:label \"kind id\" ."
  , ""
  , "gb:color a owl:AnnotationProperty ;"
  , "  rdfs:label \"color\" ."
  , ""
  , "gb:shape a owl:AnnotationProperty ;"
  , "  rdfs:label \"shape\" ."
  , ""
  , "gb:groupId a owl:AnnotationProperty ;"
  , "  rdfs:label \"group id\" ."
  , ""
  , "gb:edgeLabel a owl:AnnotationProperty ;"
  , "  rdfs:label \"edge label\" ."
  , ""
  , "gb:nodeId a owl:DatatypeProperty ;"
  , "  rdfs:label \"node id\" ;"
  , "  rdfs:domain gb:Node ;"
  , "  rdfs:range xsd:string ."
  , ""
  , "gb:group a owl:ObjectProperty ;"
  , "  rdfs:label \"group\" ;"
  , "  rdfs:domain gb:Node ;"
  , "  rdfs:range gb:Group ."
  , ""
  , "gb:description a owl:DatatypeProperty ;"
  , "  rdfs:label \"description\" ;"
  , "  rdfs:domain gb:Node ;"
  , "  rdfs:range xsd:string ."
  , ""
  , "gb:externalLink a owl:ObjectProperty ;"
  , "  rdfs:label \"external link\" ;"
  , "  rdfs:domain gb:Node ;"
  , "  rdfs:range gb:ExternalLink ."
  , ""
  , "gb:url a owl:DatatypeProperty ;"
  , "  rdfs:label \"url\" ;"
  , "  rdfs:domain gb:ExternalLink ;"
  , "  rdfs:range xsd:anyURI ."
  , ""
  , "gb:hasTutorial a owl:ObjectProperty ;"
  , "  rdfs:label \"has tutorial\" ;"
  , "  rdfs:domain gb:Dataset ;"
  , "  rdfs:range gb:Tutorial ."
  , ""
  , "gb:hasStop a owl:ObjectProperty ;"
  , "  rdfs:label \"has stop\" ;"
  , "  rdfs:domain gb:Tutorial ;"
  , "  rdfs:range gb:TutorialStop ."
  , ""
  , "gb:focusNode a owl:ObjectProperty ;"
  , "  rdfs:label \"focus node\" ;"
  , "  rdfs:domain gb:TutorialStop ;"
  , "  rdfs:range gb:Node ."
  , ""
  , "gb:depth a owl:DatatypeProperty ;"
  , "  rdfs:label \"depth\" ;"
  , "  rdfs:domain gb:TutorialStop ;"
  , "  rdfs:range xsd:integer ."
  , ""
  , "gb:narrative a owl:DatatypeProperty ;"
  , "  rdfs:label \"narrative\" ;"
  , "  rdfs:domain gb:TutorialStop ;"
  , "  rdfs:range xsd:string ."
  , ""
  , "gb:stepIndex a owl:DatatypeProperty ;"
  , "  rdfs:label \"step index\" ;"
  , "  rdfs:domain gb:TutorialStop ;"
  , "  rdfs:range xsd:integer ."
  , ""
  , "gb:hasView a owl:ObjectProperty ;"
  , "  rdfs:label \"has view\" ;"
  , "  rdfs:domain gb:Dataset ;"
  , "  rdfs:range gb:View ."
  , ""
  , "gb:hasEdgeReference a owl:ObjectProperty ;"
  , "  rdfs:label \"has edge reference\" ;"
  , "  rdfs:domain gb:View ;"
  , "  rdfs:range gb:EdgeReference ."
  , ""
  , "gb:edgeSource a owl:ObjectProperty ;"
  , "  rdfs:label \"edge source\" ;"
  , "  rdfs:domain gb:EdgeReference ;"
  , "  rdfs:range gb:Node ."
  , ""
  , "gb:edgeTarget a owl:ObjectProperty ;"
  , "  rdfs:label \"edge target\" ;"
  , "  rdfs:domain gb:EdgeReference ;"
  , "  rdfs:range gb:Node ."
  , ""
  , "gb:edgeReferenceLabel a owl:DatatypeProperty ;"
  , "  rdfs:label \"edge reference label\" ;"
  , "  rdfs:domain gb:EdgeReference ;"
  , "  rdfs:range xsd:string ."
  , ""
  , "gb:hasScopedTutorial a owl:ObjectProperty ;"
  , "  rdfs:label \"has scoped tutorial\" ;"
  , "  rdfs:domain gb:View ;"
  , "  rdfs:range gb:Tutorial ."
  , ""
  , "gb:hasQueryCatalog a owl:ObjectProperty ;"
  , "  rdfs:label \"has query catalog\" ;"
  , "  rdfs:domain gb:Dataset ;"
  , "  rdfs:range gb:QueryCatalog ."
  , ""
  , "gb:hasNamedQuery a owl:ObjectProperty ;"
  , "  rdfs:label \"has named query\" ;"
  , "  rdfs:domain gb:QueryCatalog ;"
  , "  rdfs:range gb:NamedQuery ."
  , ""
  , "gb:queryText a owl:DatatypeProperty ;"
  , "  rdfs:label \"query text\" ;"
  , "  rdfs:domain gb:NamedQuery ;"
  , "  rdfs:range xsd:string ."
  , ""
  , "gb:hasParameter a owl:ObjectProperty ;"
  , "  rdfs:label \"has parameter\" ;"
  , "  rdfs:domain gb:NamedQuery ;"
  , "  rdfs:range gb:QueryParameter ."
  , ""
  , "gb:parameterName a owl:DatatypeProperty ;"
  , "  rdfs:label \"parameter name\" ;"
  , "  rdfs:domain gb:QueryParameter ;"
  , "  rdfs:range xsd:string ."
  , ""
  , "gb:parameterType a owl:DatatypeProperty ;"
  , "  rdfs:label \"parameter type\" ;"
  , "  rdfs:domain gb:QueryParameter ;"
  , "  rdfs:range xsd:string ."
  , ""
  , "gb:defaultValue a owl:DatatypeProperty ;"
  , "  rdfs:label \"default value\" ;"
  , "  rdfs:domain gb:QueryParameter ;"
  , "  rdfs:range xsd:string ."
  , ""
  , "gb:tag a owl:DatatypeProperty ;"
  , "  rdfs:label \"tag\" ;"
  , "  rdfs:domain gb:NamedQuery ;"
  , "  rdfs:range xsd:string ."
  , ""
  , "gb:predicate a owl:ObjectProperty ;"
  , "  rdfs:label \"predicate\" ;"
  , "  rdfs:domain gb:EdgeAssertion ;"
  , "  rdfs:range rdf:Property ."
  , ""
  , "gb:from a owl:ObjectProperty ;"
  , "  rdfs:label \"from\" ;"
  , "  rdfs:domain gb:EdgeAssertion ;"
  , "  rdfs:range gb:Node ."
  , ""
  , "gb:to a owl:ObjectProperty ;"
  , "  rdfs:label \"to\" ;"
  , "  rdfs:domain gb:EdgeAssertion ;"
  , "  rdfs:range gb:Node ."
  , ""
  , "gb:edgeIndex a owl:DatatypeProperty ;"
  , "  rdfs:label \"edge index\" ;"
  , "  rdfs:domain gb:EdgeAssertion ;"
  , "  rdfs:range xsd:integer ."
  ]

coreOntologyMermaid :: String
coreOntologyMermaid =
  joinWith "\n"
    [ "flowchart LR"
    , "  Core[\"core ontology\"]"
    , "  Dataset[\"gb:Dataset\"]"
    , "  Node[\"gb:Node\"]"
    , "  Group[\"gb:Group\"]"
    , "  EdgeAssertion[\"gb:EdgeAssertion\"]"
    , "  ExternalLink[\"gb:ExternalLink\"]"
    , "  Tutorial[\"gb:Tutorial\"]"
    , "  TutorialStop[\"gb:TutorialStop\"]"
    , "  View[\"gb:View\"]"
    , "  EdgeReference[\"gb:EdgeReference\"]"
    , "  QueryCatalog[\"gb:QueryCatalog\"]"
    , "  NamedQuery[\"gb:NamedQuery\"]"
    , "  QueryParameter[\"gb:QueryParameter\"]"
    , "  EdgeRelation[\"gb:EdgeRelation\"]"
    , "  Core --> Dataset"
    , "  Core --> Node"
    , "  Core --> Group"
    , "  Core --> EdgeAssertion"
    , "  Core --> ExternalLink"
    , "  Core --> Tutorial"
    , "  Core --> TutorialStop"
    , "  Core --> View"
    , "  Core --> EdgeReference"
    , "  Core --> QueryCatalog"
    , "  Core --> NamedQuery"
    , "  Core --> QueryParameter"
    , "  Core --> EdgeRelation"
    , "  Dataset -->|has many| Node"
    , "  Dataset -->|has tutorials| Tutorial"
    , "  Dataset -->|has views| View"
    , "  Dataset -->|has query catalogs| QueryCatalog"
    , "  Node -->|belongs to 1| Group"
    , "  Node -->|links to| ExternalLink"
    , "  Tutorial -->|has stops 0..*| TutorialStop"
    , "  TutorialStop -->|focuses on| Node"
    , "  View -->|has edge refs 0..*| EdgeReference"
    , "  View -->|has scoped tutorials 0..*| Tutorial"
    , "  EdgeReference -->|edge source| Node"
    , "  EdgeReference -->|edge target| Node"
    , "  QueryCatalog -->|has named queries 0..*| NamedQuery"
    , "  NamedQuery -->|has parameters 0..*| QueryParameter"
    , "  EdgeAssertion -->|from 1| Node"
    , "  EdgeAssertion -->|to 1| Node"
    , "  EdgeAssertion -->|predicate 1| EdgeRelation"
    ]

applicationOntologyMermaid :: Config -> Graph -> String
applicationOntologyMermaid config graph =
  joinWith "\n" $
    [ "flowchart LR"
    , "  App[\"application ontology\"]"
    , "  CoreNode[\"gb:Node\"]"
    , "  CoreGroup[\"gb:Group\"]"
    , "  CoreEdge[\"gb:EdgeRelation\"]"
    , "  App -->|imports| CoreNode"
    , "  App -->|imports| CoreGroup"
    , "  App -->|imports| CoreEdge"
    ]
      <> kindLines
      <> groupLines
      <> edgeLines
  where
  kinds = Array.sortBy compareKindPairs (Map.toUnfoldable config.kinds :: Array (Tuple String _))
  groups = Array.nub (Array.sort (map (\(Tuple _ node) -> node.group) (Map.toUnfoldable graph.nodes :: Array (Tuple String _))))
  edgeLabels = Array.nub (Array.sort (map _.label graph.edges))

  kindLines =
    Array.concatMap
      ( \(Tuple index (Tuple kindId kindDef)) ->
          let
            nodeId = "Kind" <> show index
          in
            [ "  " <> nodeId <> "[\"" <> mermaidLabel ("gbkind:" <> kindId <> "\\n" <> kindDef.label) <> "\"]"
            , "  App --> " <> nodeId
            , "  " <> nodeId <> " -->|subClassOf| CoreNode"
            ]
      )
      (Array.mapWithIndex Tuple kinds)

  groupLines =
    Array.concatMap
      ( \(Tuple index group) ->
          let
            nodeId = "Group" <> show index
          in
            [ "  " <> nodeId <> "[\"" <> mermaidLabel ("gbgroup:" <> group) <> "\"]"
            , "  App --> " <> nodeId
            , "  " <> nodeId <> " -->|instanceOf| CoreGroup"
            ]
      )
      (Array.mapWithIndex Tuple groups)

  edgeLines =
    Array.concatMap
      ( \(Tuple index label) ->
          let
            nodeId = "Edge" <> show index
          in
            [ "  " <> nodeId <> "[\"" <> mermaidLabel ("gbedge:" <> label) <> "\"]"
            , "  App --> " <> nodeId
            , "  " <> nodeId <> " -->|subPropertyOf| CoreEdge"
            ]
      )
      (Array.mapWithIndex Tuple edgeLabels)

quoted :: String -> String
quoted value =
  "\"" <> value <> "\""

mermaidLabel :: String -> String
mermaidLabel =
  joinWith "<br/>" <<< split (Pattern "\n")
