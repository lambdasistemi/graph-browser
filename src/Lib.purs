module Lib where

import Prelude

import Effect (Effect)
import Effect.Aff (Aff)
import Halogen.Aff as HA
import Halogen.VDom.Driver (runUI)
import Viewer as Viewer

main :: Effect Unit
main = HA.runHalogenAff do
  body <- HA.awaitBody
  runUI Viewer.viewer
    { configUrl: "data/config.json"
    , graphUrl: "data/graph.json"
    , tutorialIndexUrl: "data/tutorials/index.json"
    , baseUrl: ""
    }
    body
