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
spec = describe "RDF import standard metadata behavior" do

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
            node.links `shouldEqual`
              [ { label: "example.org", url: "https://example.org/alice-doc" } ]
            node.ontologyRef `shouldEqual`
              Just { label: "Student", iri: "https://example.org/standard#Student" }
        case bob of
          Nothing -> fail "missing bob node"
          Just node ->
            node.links `shouldEqual`
              [ { label: "Bob evidence page", url: "https://example.org/bob-doc" } ]
        case knowsEdge of
          Nothing -> fail "missing knows edge"
          Just edge -> do
            edge.description `shouldEqual` "Alice knows Bob via standard reification."
            edge.predicateRef `shouldEqual`
              Just { label: "knows", iri: "https://example.org/standard#knows" }
        case advisesEdge of
          Nothing -> fail "missing advises edge"
          Just edge -> do
            edge.description `shouldEqual` "Standard reified description wins."
            edge.predicateRef `shouldEqual`
              Just { label: "advises", iri: "https://example.org/standard#advises" }

  it "ignores legacy gb-specific descriptions and links" do
    turtle <- liftEffect $ readTextFile UTF8 "test/data/standard-predicate-primary.ttl"
    quads <- liftEffect $ Oxigraph.parseQuads "text/turtle" fixtureBase turtle
    case Rdf.Import.importGraph quads of
      Left err -> fail err
      Right imported -> do
        let carol = Map.lookup "carol" imported.graph.nodes
        case carol of
          Nothing -> fail "missing carol node"
          Just node -> do
            node.description `shouldEqual` "Standard Carol description"
            node.links `shouldSatisfy` \links ->
              Array.null links

  where
  fail msg = shouldEqual msg ""
