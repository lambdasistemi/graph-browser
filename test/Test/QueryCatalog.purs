module Test.QueryCatalog where

import Prelude

import Data.Argonaut.Parser (jsonParser)
import Data.Either (Either(..), isLeft)
import Data.Maybe (Maybe(..))
import Graph.Query (decodeQueryCatalog)
import Layout (LayoutId(..))
import Test.Spec (Spec, describe, it)
import Test.Spec.Assertions (shouldEqual, shouldSatisfy)

spec :: Spec Unit
spec = describe "Graph.Query.decodeQueryCatalog" do

  it "decodes a minimal query" do
    let
      json = """[{
        "id": "all-nodes",
        "name": "All Nodes",
        "description": "Every node",
        "sparql": "SELECT ?node WHERE { ?node a ?type }"
      }]"""
    case jsonParser json >>= decodeQueryCatalog of
      Left err -> fail err
      Right catalog -> do
        (map _.id catalog) `shouldEqual` [ "all-nodes" ]
        (map _.name catalog) `shouldEqual` [ "All Nodes" ]
        (map _.parameters catalog) `shouldEqual` [ [] ]
        (map _.tags catalog) `shouldEqual` [ [] ]
        (map _.layout catalog) `shouldEqual` [ Nothing ]

  it "decodes parameters and tags" do
    let
      json = """[{
        "id": "by-kind",
        "name": "By Kind",
        "description": "Nodes of a kind",
        "sparql": "SELECT ?node WHERE { ?node a $kind }",
        "parameters": [{
          "name": "kind",
          "label": "Node Kind",
          "type": "kind"
        }],
        "tags": ["view", "parameterized"]
      }]"""
    case jsonParser json >>= decodeQueryCatalog of
      Left err -> fail err
      Right catalog -> do
        let q = catalog
        (map _.tags q) `shouldEqual`
          [ [ "view", "parameterized" ] ]
        (map _.layout q) `shouldEqual` [ Nothing ]
        case map _.parameters q of
          [ [ p ] ] -> do
            p.name `shouldEqual` "kind"
            p.label `shouldEqual` "Node Kind"
            p.paramType `shouldEqual` "kind"
          _ -> fail "expected one query with one parameter"

  it "decodes an empty catalog" do
    case jsonParser "[]" >>= decodeQueryCatalog of
      Left err -> fail err
      Right catalog ->
        catalog `shouldEqual` []

  it "decodes an optional layout" do
    let
      json = """[{
        "id": "module-flow",
        "name": "Module Flow",
        "description": "Flow view",
        "sparql": "SELECT ?node WHERE { ?node ?p ?o }",
        "tags": ["view"],
        "layout": "dagre"
      }]"""
    case jsonParser json >>= decodeQueryCatalog of
      Left err -> fail err
      Right catalog ->
        (map _.layout catalog) `shouldEqual` [ Just Dagre ]

  it "ignores an invalid layout value" do
    let
      json = """[{
        "id": "broken-layout",
        "name": "Broken Layout",
        "description": "Still decodes",
        "sparql": "SELECT ?node WHERE { ?node ?p ?o }",
        "layout": "unknown-layout"
      }]"""
    case jsonParser json >>= decodeQueryCatalog of
      Left err -> fail err
      Right catalog ->
        (map _.layout catalog) `shouldEqual` [ Nothing ]

  it "rejects missing required fields" do
    let
      json = """[{ "id": "broken" }]"""
    (jsonParser json >>= decodeQueryCatalog)
      `shouldSatisfy` isLeft

  where
  fail msg = shouldEqual msg ""
