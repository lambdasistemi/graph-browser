module Rdf.Export.Main where

import Prelude

import Data.Array as Array
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Traversable (sequence, traverse)
import Effect (Effect)
import Effect.Class.Console as Console
import Effect.Exception (try)
import FFI.Json (parseJson)
import FFI.Node as Node
import Graph.Decode (decodeConfig, decodeGraph)
import Graph.Types (Config, Graph, GraphSource)
import FFI.Oxigraph as Oxigraph
import Rdf.Import as Import
import Data.String as String
import Data.String.Pattern (Pattern(..))
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
  configText <- Node.readTextFile configPath
  let configResult = decodeConfig (parseJson configText)
  case configResult of
    Left err -> failWith ("Failed to decode config.json: " <> err)
    Right config -> do
      graphResult <- loadGraph options config
      case graphResult of
        Left err -> failWith err
        Right graph -> do
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

loadGraph :: Options -> Config -> Effect (Either String Graph)
loadGraph options config =
  case authoredRdfSources config of
    [] -> loadJsonGraph options
    sources -> loadRdfGraph sources

loadJsonGraph :: Options -> Effect (Either String Graph)
loadJsonGraph options = do
  graphPath <- Node.joinPath [ options.dataDir, "graph.json" ]
  graphResult <- tryReadTextFile graphPath
  case graphResult of
    Left _ ->
      pure (Left "No authored RDF graph sources configured and data/graph.json was not found")
    Right graphText ->
      pure case decodeGraph (parseJson graphText) of
        Left err -> Left ("Failed to decode graph.json: " <> err)
        Right graph -> Right graph

loadRdfGraph :: Array GraphSource -> Effect (Either String Graph)
loadRdfGraph sources = do
  quadSets <- traverse loadSourceQuads sources
  pure case sequence quadSets of
    Left err -> Left err
    Right loaded ->
      let quads = Array.concat loaded
      in Import.importInstanceGraph quads

loadSourceQuads :: GraphSource -> Effect (Either String (Array Oxigraph.ImportedRdfQuad))
loadSourceQuads source = do
  textResult <- tryReadTextFile source.path
  case textResult of
    Left _ -> pure (Left ("Failed to read RDF graph source: " <> source.path))
    Right content -> do
      parseResult <- try (Oxigraph.parseQuads source.format "https://graph-browser.invalid/" content)
      pure case parseResult of
        Left _ -> Left ("Failed to parse RDF graph source: " <> source.path)
        Right quads -> Right quads

tryReadTextFile :: String -> Effect (Either String String)
tryReadTextFile path = do
  result <- try (Node.readTextFile path)
  pure case result of
    Left _ -> Left path
    Right text -> Right text

authoredRdfSources :: Config -> Array GraphSource
authoredRdfSources config =
  let
    declared =
      if Array.null config.graphSources then
        case config.graphSource of
          Just source -> [ source ]
          Nothing -> []
      else
        config.graphSources
    filtered = Array.filter (not <<< isDerivedOntologySource) declared
  in
    if Array.null filtered then declared else filtered

isDerivedOntologySource :: GraphSource -> Boolean
isDerivedOntologySource source =
  String.contains (Pattern "core-ontology.") source.path
    || String.contains (Pattern "application-ontology.") source.path

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
