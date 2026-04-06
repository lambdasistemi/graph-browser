module Rdf.Export.Main where

import Prelude

import Data.Array as Array
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Class.Console as Console
import FFI.Json (parseJson)
import FFI.Node as Node
import Graph.Decode (decodeConfig, decodeGraph)
import Rdf.Export as Export

type Options =
  { dataDir :: String
  , outputDir :: String
  }

main :: Effect Unit
main = do
  args <- Node.getArgv
  case parseOptions args of
    Left err -> failWith err
    Right options -> run options

run :: Options -> Effect Unit
run options = do
  configPath <- Node.joinPath [ options.dataDir, "config.json" ]
  graphPath <- Node.joinPath [ options.dataDir, "graph.json" ]
  configText <- Node.readTextFile configPath
  graphText <- Node.readTextFile graphPath
  let configResult = decodeConfig (parseJson configText)
  let graphResult = decodeGraph (parseJson graphText)
  case configResult, graphResult of
    Left err, _ -> failWith ("Failed to decode config.json: " <> err)
    _, Left err -> failWith ("Failed to decode graph.json: " <> err)
    Right config, Right graph -> do
      files <- Export.exportFiles config graph
      Node.makeDirectory options.outputDir
      coreOntologyPath <- Node.joinPath [ options.outputDir, "core-ontology.ttl" ]
      applicationOntologyPath <- Node.joinPath [ options.outputDir, "application-ontology.ttl" ]
      coreMermaidPath <- Node.joinPath [ options.outputDir, "core-ontology.mmd" ]
      applicationMermaidPath <- Node.joinPath [ options.outputDir, "application-ontology.mmd" ]
      ttlPath <- Node.joinPath [ options.outputDir, "graph.ttl" ]
      nqPath <- Node.joinPath [ options.outputDir, "graph.nq" ]
      Node.writeTextFile coreOntologyPath files.coreOntology
      Node.writeTextFile applicationOntologyPath files.applicationOntology
      Node.writeTextFile coreMermaidPath files.coreMermaid
      Node.writeTextFile applicationMermaidPath files.applicationMermaid
      Node.writeTextFile ttlPath files.turtle
      Node.writeTextFile nqPath files.nquads
      Console.log ("Exported RDF to " <> options.outputDir)

parseOptions :: Array String -> Either String Options
parseOptions = go
  { dataDir: "data"
  , outputDir: "data/rdf"
  }
  where
  go options remaining = case Array.uncons remaining of
    Nothing -> Right options
    Just { head: "--data-dir", tail } -> case Array.uncons tail of
      Nothing -> Left "--data-dir requires a value"
      Just { head: value, tail: rest } ->
        go (options { dataDir = value }) rest
    Just { head: "--output-dir", tail } -> case Array.uncons tail of
      Nothing -> Left "--output-dir requires a value"
      Just { head: value, tail: rest } ->
        go (options { outputDir = value }) rest
    Just { head: arg } ->
      Left ("Unknown argument: " <> arg)

failWith :: String -> Effect Unit
failWith message = do
  Console.error message
  Node.setExitCode 1
