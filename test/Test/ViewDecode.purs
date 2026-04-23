module Test.ViewDecode where

import Prelude

import Data.Argonaut.Parser (jsonParser)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Graph.Views (decodeView)
import Layout (LayoutId(..))
import Test.Spec (Spec, describe, it)
import Test.Spec.Assertions (shouldEqual)

spec :: Spec Unit
spec = describe "Graph.Views.decodeView" do

  it "decodes an optional layout" do
    let
      json = """{
        "name": "Architecture Rings",
        "description": "Grouped by concern",
        "layout": "concentric",
        "edges": [["viewer", "query-panel", "contains"]],
        "tours": []
      }"""
    case jsonParser json >>= decodeView of
      Left err -> fail err
      Right view ->
        view.layout `shouldEqual` Just Concentric

  it "ignores an invalid layout value" do
    let
      json = """{
        "name": "Broken Layout",
        "description": "Falls back",
        "layout": "nope",
        "edges": [["viewer", "query-panel", "contains"]],
        "tours": []
      }"""
    case jsonParser json >>= decodeView of
      Left err -> fail err
      Right view ->
        view.layout `shouldEqual` Nothing

  where
  fail msg = shouldEqual msg ""
