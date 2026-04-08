module Test.SelfGraph where

import Prelude

import Data.Array as Array
import Data.Either (Either(..))
import Data.Set as Set
import Data.Traversable (for_)
import Effect.Class as Effect.Class
import Effect.Class (liftEffect)
import FFI.Oxigraph as Oxigraph
import Graph.Query (decodeQueryCatalog)
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

  it "every catalog query returns results against graph.ttl" do
    store <- loadStore graphBase "data/rdf/graph.ttl"
    body <- liftEffect $ readTextFile UTF8 "data/queries.json"
    case jsonParser body >>= decodeQueryCatalog of
      Left err -> fail err
      Right catalog ->
        for_ catalog \q -> do
          ids <- liftEffect $
            Oxigraph.querySparqlNodeIds store q.sparql
          ids `shouldSatisfy` \a -> Array.length a > 0

  it "query result node IDs exist in the graph" do
    store <- loadStore graphBase "data/rdf/graph.ttl"
    -- All node IRIs
    allIds <- liftEffect $ Oxigraph.querySparqlNodeIds store
      "PREFIX gb: <https://lambdasistemi.github.io/graph-browser/vocab/terms#>\nSELECT ?node WHERE { ?node gb:nodeId ?id }"
    let allIdSet = Set.fromFoldable allIds
    -- Module IRIs
    moduleIds <- liftEffect $ Oxigraph.querySparqlNodeIds store
      "PREFIX gbk: <https://lambdasistemi.github.io/graph-browser/vocab/kinds#>\nSELECT ?node WHERE { ?node a gbk:module }"
    let moduleIdSet = Set.fromFoldable moduleIds
    moduleIdSet `shouldSatisfy` \s -> Set.subset s allIdSet

  where
  fail msg = shouldEqual msg ""
