-- | Pure prompt assembly for the LLM context builder.
module PromptBuilder
  ( buildNodePrompt
  , buildEdgePrompt
  ) where

import Prelude

import Data.Array as Array
import Data.String (null) as S
import Graph.Types (Config, Edge, Graph, Node)

-- | Schema base URL (graph-browser's GitHub Pages).
schemaBase :: String
schemaBase = "https://lambdasistemi.github.io/graph-browser/schema/"

-- | Build a prompt for a node with its connected edges.
buildNodePrompt :: Config -> Graph -> Node -> String -> String
buildNodePrompt config graph node userText =
  let
    connectedEdges = Array.filter
      (\e -> e.source == node.id || e.target == node.id)
      graph.edges
  in
    section "Context" (contextBlock config)
      <> section "JSON Schemas" schemasBlock
      <> section "Current Node" (nodeJson node)
      <> section "Connected Edges" (edgesJson connectedEdges)
      <> section "File Paths" filePathsBlock
      <> userSection userText
      <> prSection config

-- | Build a prompt for an edge with its endpoint nodes.
buildEdgePrompt :: Config -> Graph -> Edge -> Node -> Node -> String -> String
buildEdgePrompt config _graph edge sourceNode targetNode userText =
  section "Context" (contextBlock config)
    <> section "JSON Schemas" schemasBlock
    <> section "Current Edge" (edgeJson edge)
    <> section "Source Node" (nodeJson sourceNode)
    <> section "Target Node" (nodeJson targetNode)
    <> section "File Paths" filePathsBlock
    <> userSection userText
    <> prSection config

-- Helpers

section :: String -> String -> String
section title body = "## " <> title <> "\n\n" <> body <> "\n\n"

contextBlock :: Config -> String
contextBlock config
  | S.null config.sourceUrl = "You are working with a knowledge graph."
  | otherwise = "You are working with a knowledge graph defined at: " <> config.sourceUrl

schemasBlock :: String
schemasBlock =
  "- Graph schema: " <> schemaBase <> "graph.schema.json\n"
    <> "- Config schema: " <> schemaBase <> "config.schema.json\n"
    <> "- Tutorial schema: " <> schemaBase <> "tutorial.schema.json\n"
    <> "- Tutorial index schema: " <> schemaBase <> "tutorial-index.schema.json"

nodeJson :: Node -> String
nodeJson n =
  "```json\n"
    <> "{\n"
    <> "  \"id\": " <> quote n.id <> ",\n"
    <> "  \"label\": " <> quote n.label <> ",\n"
    <> "  \"kind\": " <> quote n.kind <> ",\n"
    <> "  \"group\": " <> quote n.group <> ",\n"
    <> "  \"description\": " <> quote n.description <> ",\n"
    <> "  \"links\": [" <> linksJson n.links <> "]\n"
    <> "}\n"
    <> "```"

edgeJson :: Edge -> String
edgeJson e =
  "```json\n"
    <> "{\n"
    <> "  \"source\": " <> quote e.source <> ",\n"
    <> "  \"target\": " <> quote e.target <> ",\n"
    <> "  \"label\": " <> quote e.label <> ",\n"
    <> "  \"description\": " <> quote e.description <> "\n"
    <> "}\n"
    <> "```"

edgesJson :: Array Edge -> String
edgesJson edges
  | Array.null edges = "_No connected edges._"
  | otherwise = Array.intercalate "\n\n" (map edgeJson edges)

linksJson :: Array { label :: String, url :: String } -> String
linksJson links
  | Array.null links = ""
  | otherwise = "\n" <> Array.intercalate ",\n" (map linkJson links) <> "\n  "
  where
  linkJson l =
    "    { \"label\": " <> quote l.label <> ", \"url\": " <> quote l.url <> " }"

filePathsBlock :: String
filePathsBlock =
  "- Graph data: `data/graph.json`\n"
    <> "- Config: `data/config.json`\n"
    <> "- Tutorials: `data/tutorials/`"

userSection :: String -> String
userSection text
  | S.null text = ""
  | otherwise = section "Task" text

prSection :: Config -> String
prSection config
  | S.null config.sourceUrl = ""
  | otherwise = section "How to Submit Changes"
      ( "Fork the repository at " <> config.sourceUrl
          <> ", edit the relevant JSON files listed above, "
          <> "validate against the schemas, and open a pull request."
      )

-- | Escape and quote a string for JSON output.
quote :: String -> String
quote s = "\"" <> escapeJson s <> "\""

-- | Minimal JSON string escaping.
foreign import escapeJson :: String -> String
