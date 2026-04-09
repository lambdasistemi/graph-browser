module Test.SelfGraph where

import Prelude

import Data.Array as Array
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Set as Set
import Data.Traversable (for_)
import Effect.Class as Effect.Class
import Effect.Class (liftEffect)
import FFI.Oxigraph as Oxigraph
import Graph.Query (decodeQueryCatalog)
import Tutorial (decodeTutorial)
import Data.Argonaut.Parser (jsonParser)
import Node.Encoding (Encoding(..))
import Node.FS.Sync (readTextFile)
import Test.Spec (Spec, describe, it)
import Test.Spec.Assertions (shouldEqual, shouldSatisfy)

loadStore
  :: forall m
   . Effect.Class.MonadEffect m
  => String
  -> String
  -> m Oxigraph.OxigraphStore
loadStore baseIri path = liftEffect do
  turtle <- readTextFile UTF8 path
  s <- Oxigraph.createStore
  Oxigraph.loadTurtle s baseIri turtle
  pure s

graphBase :: String
graphBase = "https://github.com/lambdasistemi/graph-browser/rdf/"

spec :: Spec Unit
spec = describe "Self-graph integration" do

  it "loads the real graph.ttl into a store" do
    store <- loadStore graphBase "data/rdf/graph.ttl"
    ids <- liftEffect $ Oxigraph.querySparqlNodeIds store
      "SELECT ?node WHERE { ?node a ?type }"
    ids `shouldSatisfy` \a -> Array.length a > 0

  it "decodes the real queries.json" do
    body <- liftEffect $ readTextFile UTF8 "data/queries.json"
    case jsonParser body >>= decodeQueryCatalog of
      Left err -> fail err
      Right catalog ->
        catalog `shouldSatisfy` \a -> Array.length a > 0

  it "every non-parameterized catalog query returns results against graph.ttl" do
    store <- loadStore graphBase "data/rdf/graph.ttl"
    body <- liftEffect $ readTextFile UTF8 "data/queries.json"
    case jsonParser body >>= decodeQueryCatalog of
      Left err -> fail err
      Right catalog -> do
        let static = Array.filter
              (\q -> Array.null q.parameters && not (Array.elem "ontology" q.tags))
              catalog
        for_ static \q -> do
          ids <- liftEffect $
            Oxigraph.querySparqlNodeIds store q.sparql
          ids `shouldSatisfy` \a -> Array.length a > 0

  it "query result node IDs exist in the graph" do
    store <- loadStore graphBase "data/rdf/graph.ttl"
    allIds <- liftEffect $ Oxigraph.querySparqlNodeIds store
      "PREFIX gb: <https://lambdasistemi.github.io/graph-browser/vocab/terms#>\nSELECT ?node WHERE { ?node gb:nodeId ?id }"
    let allIdSet = Set.fromFoldable allIds
    moduleIds <- liftEffect $ Oxigraph.querySparqlNodeIds store
      "PREFIX gbk: <https://lambdasistemi.github.io/graph-browser/vocab/kinds#>\nSELECT ?node WHERE { ?node a gbk:module }"
    let moduleIdSet = Set.fromFoldable moduleIds
    moduleIdSet `shouldSatisfy` \s -> Set.subset s allIdSet

  describe "Views via SPARQL" do

    it "view-tagged queries exist in catalog" do
      body <- liftEffect $ readTextFile UTF8 "data/queries.json"
      case jsonParser body >>= decodeQueryCatalog of
        Left err -> fail err
        Right catalog -> do
          let views = Array.filter
                (\q -> Array.elem "view" q.tags) catalog
          views `shouldSatisfy` \a -> Array.length a > 0

    it "view queries produce subsets of the full graph" do
      store <- loadStore graphBase "data/rdf/graph.ttl"
      allIds <- liftEffect $ Oxigraph.querySparqlNodeIds store
        "SELECT ?node WHERE { ?node a ?type }"
      let allIdSet = Set.fromFoldable allIds
      body <- liftEffect $ readTextFile UTF8 "data/queries.json"
      case jsonParser body >>= decodeQueryCatalog of
        Left err -> fail err
        Right catalog -> do
          let views = Array.filter
                (\q -> Array.elem "view" q.tags && not (Array.elem "ontology" q.tags))
                catalog
          for_ views \q -> do
            ids <- liftEffect $
              Oxigraph.querySparqlNodeIds store q.sparql
            let idSet = Set.fromFoldable ids
            -- Non-empty
            ids `shouldSatisfy` \a -> Array.length a > 0
            -- Strict subset (view shouldn't be the full graph)
            idSet `shouldSatisfy` \s ->
              Set.subset s allIdSet && s /= allIdSet

    it "build-validation view includes expected nodes" do
      store <- loadStore graphBase "data/rdf/graph.ttl"
      body <- liftEffect $ readTextFile UTF8 "data/queries.json"
      case jsonParser body >>= decodeQueryCatalog of
        Left err -> fail err
        Right catalog -> do
          let mBuild = Array.find (\q -> q.id == "build-validation") catalog
          case mBuild of
            Nothing -> fail "build-validation query not found"
            Just q -> do
              ids <- liftEffect $
                Oxigraph.querySparqlNodeIds store q.sparql
              let idSet = Set.fromFoldable ids
              -- Should include known build/validation nodes
              idSet `shouldSatisfy` \s ->
                Set.member "nix-flake" s
                  || Set.member "validate-action" s

    it "ui-rendering view includes expected nodes" do
      store <- loadStore graphBase "data/rdf/graph.ttl"
      body <- liftEffect $ readTextFile UTF8 "data/queries.json"
      case jsonParser body >>= decodeQueryCatalog of
        Left err -> fail err
        Right catalog -> do
          let mUi = Array.find (\q -> q.id == "ui-rendering") catalog
          case mUi of
            Nothing -> fail "ui-rendering query not found"
            Just q -> do
              ids <- liftEffect $
                Oxigraph.querySparqlNodeIds store q.sparql
              let idSet = Set.fromFoldable ids
              idSet `shouldSatisfy` \s ->
                Set.member "viewer" s
                  && Set.member "ffi-cytoscape" s

  describe "Tours via SPARQL" do

    it "tutorial stops with queryId reference valid catalog entries" do
      catalogBody <- liftEffect $ readTextFile UTF8 "data/queries.json"
      case jsonParser catalogBody >>= decodeQueryCatalog of
        Left err -> fail err
        Right catalog -> do
          let catalogIds = Set.fromFoldable (map _.id catalog)
          -- Check data-pipeline tutorial
          tutBody <- liftEffect $ readTextFile UTF8
            "data/tutorials/data-pipeline.json"
          case jsonParser tutBody >>= decodeTutorial of
            Left err -> fail err
            Right tut ->
              for_ tut.stops \stop ->
                case stop.queryId of
                  Nothing -> pure unit
                  Just qid ->
                    catalogIds `shouldSatisfy` \s ->
                      Set.member qid s

    it "tour queryId queries return results against graph.ttl" do
      store <- loadStore graphBase "data/rdf/graph.ttl"
      catalogBody <- liftEffect $ readTextFile UTF8 "data/queries.json"
      case jsonParser catalogBody >>= decodeQueryCatalog of
        Left err -> fail err
        Right catalog -> do
          tutBody <- liftEffect $ readTextFile UTF8
            "data/tutorials/data-pipeline.json"
          case jsonParser tutBody >>= decodeTutorial of
            Left err -> fail err
            Right tut ->
              for_ tut.stops \stop ->
                case stop.queryId of
                  Nothing -> pure unit
                  Just qid -> do
                    let mQuery = Array.find
                          (\q -> q.id == qid) catalog
                    case mQuery of
                      Nothing ->
                        fail ("query not found: " <> qid)
                      Just query -> do
                        ids <- liftEffect $
                          Oxigraph.querySparqlNodeIds store
                            query.sparql
                        ids `shouldSatisfy` \a ->
                          Array.length a > 0

  where
  fail msg = shouldEqual msg ""
