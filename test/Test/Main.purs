module Test.Main where

import Prelude

import Effect (Effect)
import Effect.Aff (launchAff_)
import Test.Spec.Reporter (consoleReporter)
import Test.Spec.Runner (runSpec)
import Test.QueryCatalog as QueryCatalog
import Test.Sparql as Sparql
import Test.SelfGraph as SelfGraph

main :: Effect Unit
main = launchAff_ $ runSpec [ consoleReporter ] do
  QueryCatalog.spec
  Sparql.spec
  SelfGraph.spec
