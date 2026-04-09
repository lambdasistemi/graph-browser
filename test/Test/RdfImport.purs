module Test.RdfImport where

import Prelude

import Data.Array as Array
import Data.Either (Either(..))
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Effect.Class (liftEffect)
import FFI.Oxigraph as Oxigraph
import Node.Encoding (Encoding(..))
import Node.FS.Sync (readTextFile)
import Rdf.Import as Rdf.Import
import Test.Spec (Spec, describe, it)
import Test.Spec.Assertions (shouldEqual, shouldSatisfy)

fixtureBase :: String
fixtureBase = "https://example.org/standard#"

spec :: Spec Unit
spec = describe "RDF import fallback behavior" do

  it "imports standard descriptions, links, predicate IRIs, and reified edge descriptions" do
    turtle <- liftEffect $ readTextFile UTF8 "test/data/standard-predicate-primary.ttl"
    quads <- liftEffect $ Oxigraph.parseQuads "text/turtle" fixtureBase turtle
    case Rdf.Import.importGraph quads of
      Left err -> fail err
      Right imported -> do
        let
          alice = Map.lookup "alice" imported.graph.nodes
          bob = Map.lookup "bob" imported.graph.nodes
          knowsEdge = Array.find (\e -> e.source == "alice" && e.target == "bob") imported.graph.edges
          advisesEdge = Array.find (\e -> e.source == "carol" && e.target == "bob") imported.graph.edges
        case alice of
          Nothing -> fail "missing alice node"
          Just node -> do
            node.description `shouldEqual` "Standard Alice description"
            map _.url node.links `shouldEqual` [ "https://example.org/alice-doc" ]
            node.ontologyRef `shouldEqual`
              Just { label: "Student", iri: "https://example.org/standard#Student" }
        case bob of
          Nothing -> fail "missing bob node"
          Just node ->
            map _.url node.links `shouldEqual` [ "https://example.org/bob-doc" ]
        case knowsEdge of
          Nothing -> fail "missing knows edge"
          Just edge -> do
            edge.description `shouldEqual` "Alice knows Bob via standard reification."
            edge.predicateRef `shouldEqual`
              Just { label: "knows", iri: "https://example.org/standard#knows" }
        case advisesEdge of
          Nothing -> fail "missing advises edge"
          Just edge -> do
            edge.description `shouldEqual` "GB assertion description wins."
            edge.predicateRef `shouldEqual`
              Just { label: "advises", iri: "https://example.org/standard#advises" }

  it "keeps gb-specific node metadata authoritative over standard fallbacks" do
    turtle <- liftEffect $ readTextFile UTF8 "test/data/standard-predicate-primary.ttl"
    quads <- liftEffect $ Oxigraph.parseQuads "text/turtle" fixtureBase turtle
    case Rdf.Import.importGraph quads of
      Left err -> fail err
      Right imported -> do
        let carol = Map.lookup "carol" imported.graph.nodes
        case carol of
          Nothing -> fail "missing carol node"
          Just node -> do
            node.description `shouldEqual` "GB Carol description"
            node.links `shouldSatisfy` \links ->
              Array.length links == 1
                && Array.head (map _.url links) == Just "https://example.org/carol-gb"

  where
  fail msg = shouldEqual msg ""
