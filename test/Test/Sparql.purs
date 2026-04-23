module Test.Sparql where

import Prelude

import Data.Set as Set
import Effect.Class (liftEffect)
import FFI.Oxigraph as Oxigraph
import Test.Spec (Spec, describe, it)
import Test.Spec.Assertions (shouldEqual, shouldSatisfy)

sampleTurtle :: String
sampleTurtle =
  """
  @prefix gb: <https://example.org/gb#> .
  @prefix gbk: <https://example.org/kinds#> .
  @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

  gb:viewer a gbk:component ;
      rdfs:label "Viewer" ;
      gb:group "ui" .

  gb:search a gbk:module ;
      rdfs:label "Search" ;
      gb:group "logic" .

  gb:cytoscape a gbk:ffi ;
      rdfs:label "Cytoscape" ;
      gb:group "rendering" .

  gb:operations a gbk:module ;
      rdfs:label "Operations" ;
      gb:group "logic" .
  """

baseIri :: String
baseIri = "https://example.org/gb#"

spec :: Spec Unit
spec = describe "SPARQL store" do

  it "creates a store and loads turtle" do
    store <- liftEffect do
      s <- Oxigraph.createStore
      Oxigraph.loadRdf s "text/turtle" baseIri "" sampleTurtle
      pure s
    -- If we get here without exception, loading succeeded
    pure unit

  it "queries all nodes" do
    store <- liftEffect do
      s <- Oxigraph.createStore
      Oxigraph.loadRdf s "text/turtle" baseIri "" sampleTurtle
      pure s
    ids <- liftEffect $ Oxigraph.querySparqlNodeIds store
      "SELECT ?node WHERE { ?node a ?type }"
    Set.fromFoldable ids `shouldEqual`
      Set.fromFoldable
        [ "viewer", "search", "cytoscape", "operations" ]

  it "queries nodes by kind" do
    store <- liftEffect do
      s <- Oxigraph.createStore
      Oxigraph.loadRdf s "text/turtle" baseIri "" sampleTurtle
      pure s
    ids <- liftEffect $ Oxigraph.querySparqlNodeIds store
      "PREFIX gbk: <https://example.org/kinds#>\nSELECT ?node WHERE { ?node a gbk:module }"
    Set.fromFoldable ids `shouldEqual`
      Set.fromFoldable [ "search", "operations" ]

  it "returns empty for no matches" do
    store <- liftEffect do
      s <- Oxigraph.createStore
      Oxigraph.loadRdf s "text/turtle" baseIri "" sampleTurtle
      pure s
    ids <- liftEffect $ Oxigraph.querySparqlNodeIds store
      "PREFIX gbk: <https://example.org/kinds#>\nSELECT ?node WHERE { ?node a gbk:nonexistent }"
    ids `shouldEqual` []

  it "querySparql returns binding records" do
    store <- liftEffect do
      s <- Oxigraph.createStore
      Oxigraph.loadRdf s "text/turtle" baseIri "" sampleTurtle
      pure s
    rows <- liftEffect $ Oxigraph.querySparql store
      "PREFIX gbk: <https://example.org/kinds#>\nSELECT ?node WHERE { ?node a gbk:ffi }"
    (map (\_ -> unit) rows) `shouldSatisfy` \r ->
      not (eq r [])
