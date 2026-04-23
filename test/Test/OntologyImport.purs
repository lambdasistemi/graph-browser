module Test.OntologyImport where

import Prelude

import Data.Array as Array
import Data.Argonaut.Parser (jsonParser)
import Data.Map as Map
import Data.Set as Set
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Traversable (for_)
import Effect.Class (liftEffect)
import FFI.Oxigraph as Oxigraph
import Graph.Query (decodeQueryCatalog)
import Node.Encoding (Encoding(..))
import Node.FS.Sync (readTextFile)
import Rdf.Import as Rdf.Import
import Test.Spec (Spec, describe, it)
import Test.Spec.Assertions (shouldEqual, shouldSatisfy)

fixtureBase :: String
fixtureBase = "https://example.org/ontology#"

spec :: Spec Unit
spec = describe "Ontology import" do

  it "imports ontology classes, edges, and generated kinds from RDF triples" do
    turtle <- liftEffect $ readTextFile UTF8 "test/data/ontology-only.ttl"
    quads <- liftEffect $ Oxigraph.parseQuads "text/turtle" fixtureBase turtle
    case Rdf.Import.importGraph quads of
      Left err -> fail err
      Right imported -> do
        let
          nodeIds = Set.fromFoldable
            (map _.id (Map.values imported.graph.nodes))
          edgeLabels = Set.fromFoldable (map _.label imported.graph.edges)
        nodeIds `shouldSatisfy` \s ->
          Set.member "owl-domainentity" s
            && Set.member "owl-student" s
            && Set.member "owl-learningunit" s
        edgeLabels `shouldSatisfy` \s ->
          Set.member "subclass of" s
            && Set.member "teaches" s
            && Set.member "equivalent to" s
            && Set.member "equivalent property" s
        imported.ontologyKinds `shouldSatisfy` \k ->
          not (Array.null (Map.toUnfoldable k :: Array _))

  it "ontology catalog queries resolve to imported ontology node ids on the fixture" do
    turtle <- liftEffect $ readTextFile UTF8 "test/data/ontology-only.ttl"
    quads <- liftEffect $ Oxigraph.parseQuads "text/turtle" fixtureBase turtle
    store <- liftEffect do
      s <- Oxigraph.createStore
      Oxigraph.loadRdf s "text/turtle" fixtureBase "" turtle
      pure s
    catalogBody <- liftEffect $ readTextFile UTF8 "data/queries.json"
    case jsonParser catalogBody >>= decodeQueryCatalog, Rdf.Import.importGraph quads of
      Left err, _ -> fail err
      _, Left err -> fail err
      Right catalog, Right imported -> do
        let
          ontologyQueries = Array.filter
            (\q -> Array.elem "ontology" q.tags && Array.null q.parameters)
            catalog
          graphNodeIds = Set.fromFoldable
            (map _.id (Map.values imported.graph.nodes))
        ontologyQueries `shouldSatisfy` \qs -> Array.length qs > 0
        for_ ontologyQueries \query -> do
          ids <- liftEffect $ Oxigraph.querySparqlNodeIds store query.sparql
          ids `shouldSatisfy` \xs -> Array.length xs > 0
          let idSet = Set.fromFoldable ids
          idSet `shouldSatisfy` \s -> Set.subset s graphNodeIds

  it "falls back to dcterms:description for ontology node text" do
    let
      turtle =
        """
        @prefix ex: <https://example.org/ontology#> .
        @prefix owl: <http://www.w3.org/2002/07/owl#> .
        @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
        @prefix dcterms: <http://purl.org/dc/terms/> .

        ex:NodeConcept a owl:Class ;
          rdfs:label "Node Concept" ;
          dcterms:description "Description from dcterms." .
        """
    quads <- liftEffect $ Oxigraph.parseQuads "text/turtle" fixtureBase turtle
    case Rdf.Import.importGraph quads of
      Left err -> fail err
      Right imported -> do
        let node = Map.lookup "owl-nodeconcept" imported.graph.nodes
        case node of
          Nothing -> fail "missing ontology node"
          Just ontologyNode ->
            ontologyNode.description `shouldEqual` "Description from dcterms."

  where
  fail msg = shouldEqual msg ""
