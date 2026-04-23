module Test.Main where

import Prelude

import Effect (Effect)
import Effect.Aff (launchAff_)
import Test.ConfigDecode as ConfigDecode
import Test.OntologyImport as OntologyImport
import Test.RdfImport as RdfImport
import Test.Spec.Reporter (consoleReporter)
import Test.Spec.Runner (runSpec)
import Test.QueryCatalog as QueryCatalog
import Test.Sparql as Sparql
import Test.SelfGraph as SelfGraph
import Test.ViewDecode as ViewDecode

main :: Effect Unit
main = launchAff_ $ runSpec [ consoleReporter ] do
  ConfigDecode.spec
  OntologyImport.spec
  QueryCatalog.spec
  RdfImport.spec
  Sparql.spec
  SelfGraph.spec
  ViewDecode.spec
