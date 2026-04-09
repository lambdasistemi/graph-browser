module Test.ConfigDecode where

import Prelude

import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Argonaut.Parser (jsonParser)
import Graph.Decode (decodeConfig)
import Test.Spec (Spec, describe, it)
import Test.Spec.Assertions (shouldEqual)

spec :: Spec Unit
spec = describe "Graph.Decode.decodeConfig" do

  it "keeps legacy single graphSource support" do
    let
      body =
        """
        {
          "title": "Legacy",
          "description": "single source",
          "sourceUrl": "https://example.org/repo",
          "graphSource": {
            "format": "text/turtle",
            "path": "data/rdf/graph.ttl"
          },
          "kinds": {}
        }
        """
    case jsonParser body >>= decodeConfig of
      Left err -> fail err
      Right config -> do
        config.graphSource `shouldEqual`
          Just { format: "text/turtle", path: "data/rdf/graph.ttl" }
        config.graphSources `shouldEqual`
          [ { format: "text/turtle", path: "data/rdf/graph.ttl" } ]

  it "decodes ordered graphSources for merged RDF datasets" do
    let
      body =
        """
        {
          "title": "Merged",
          "description": "multiple sources",
          "sourceUrl": "https://example.org/repo",
          "graphSources": [
            { "format": "text/turtle", "path": "data/rdf/graph.ttl" },
            { "format": "text/turtle", "path": "data/rdf/core-ontology.ttl" },
            { "format": "text/turtle", "path": "data/rdf/application-ontology.ttl" }
          ],
          "kinds": {}
        }
        """
    case jsonParser body >>= decodeConfig of
      Left err -> fail err
      Right config -> do
        config.graphSource `shouldEqual` Nothing
        map _.path config.graphSources `shouldEqual`
          [ "data/rdf/graph.ttl"
          , "data/rdf/core-ontology.ttl"
          , "data/rdf/application-ontology.ttl"
          ]

  where
  fail msg = shouldEqual msg ""
