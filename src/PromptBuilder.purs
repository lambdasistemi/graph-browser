-- | Pure prompt assembly for the LLM context builder.
module PromptBuilder
  ( buildNodePrompt
  , buildEdgePrompt
  , buildQueryPrompt
  , buildTourPrompt
  ) where

import Prelude

import Data.Array as Array
import Data.Map as Map
import Data.Maybe (Maybe(..), isJust)
import Data.String (null) as S
import Data.Tuple (Tuple(..), snd)
import FFI.Uri (encodeUriComponent)
import Graph.Query (QueryCatalog)
import Graph.Types (Config, Edge, Graph, Node)
import Tutorial (Tutorial)

-- | Schema base URL (graph-browser's GitHub Pages).
schemaBase :: String
schemaBase = "https://lambdasistemi.github.io/graph-browser/schema/"

-- | RDF vocabulary base.
vocabBase :: String
vocabBase = "https://lambdasistemi.github.io/graph-browser/vocab"

-- | Whether the config declares an RDF graph source.
isRdf :: Config -> Boolean
isRdf config = isJust config.graphSource

-- | Build a prompt for a node with its connected edges.
buildNodePrompt :: Config -> Graph -> Node -> String -> String
buildNodePrompt config graph node userText =
  let
    connectedEdges = Array.filter
      (\e -> e.source == node.id || e.target == node.id)
      graph.edges
  in
    section "Context" (contextBlock config)
      <> section "Schemas" (schemasBlock config)
      <> section "Current Node" (renderNode config node)
      <> section "Connected Edges"
        (renderEdges config connectedEdges)
      <> section "File Paths" (filePathsBlock config)
      <> userSection userText
      <> prSection config

-- | Build a prompt for an edge with its endpoint nodes.
buildEdgePrompt
  :: Config -> Graph -> Edge -> Node -> Node -> String -> String
buildEdgePrompt config _graph edge sourceNode targetNode userText =
  section "Context" (contextBlock config)
    <> section "Schemas" (schemasBlock config)
    <> section "Current Edge" (renderEdge config edge)
    <> section "Source Node" (renderNode config sourceNode)
    <> section "Target Node" (renderNode config targetNode)
    <> section "File Paths" (filePathsBlock config)
    <> userSection userText
    <> prSection config

-- | Build a prompt to author a new SPARQL query for the catalog.
buildQueryPrompt
  :: Config -> Graph -> QueryCatalog -> String -> String
buildQueryPrompt config graph catalog userText =
  section "Context" (contextBlock config)
    <> section "Ontology Prefixes" (prefixBlock config)
    <> section "Query Catalog Schema" queryCatalogSchemaBlock
    <> section "Existing Queries" (existingQueriesBlock catalog)
    <> section "Available Nodes" (availableNodesBlock graph)
    <> section "SPARQL Examples" sparqlExamples
    <> section "File Paths" (filePathsBlock config)
    <> section "Instructions" queryInstructions
    <> userSection userText
    <> prSection config

-- | Build a prompt to author a new guided tour.
buildTourPrompt
  :: Config
  -> Graph
  -> Array Tutorial
  -> QueryCatalog
  -> String
  -> String
buildTourPrompt config graph tours catalog userText =
  section "Context" (contextBlock config)
    <> section "Schemas" (schemasBlock config)
    <> section "Available Nodes" (availableNodesBlock graph)
    <> section "Existing Tours" (existingToursBlock tours)
    <>
      ( if Array.null catalog then ""
        else section "Query Catalog"
          (existingQueriesBlock catalog)
      )
    <> section "File Paths" (filePathsBlock config)
    <> section "Instructions" tourInstructions
    <> userSection userText
    <> prSection config

-- Helpers

section :: String -> String -> String
section title body = "## " <> title <> "\n\n" <> body <> "\n\n"

contextBlock :: Config -> String
contextBlock config
  | S.null config.sourceUrl =
      "You are working with a knowledge graph."
  | otherwise =
      "You are working with a knowledge graph defined at: "
        <> config.sourceUrl

-- | Ontology prefix declarations for SPARQL queries.
prefixBlock :: Config -> String
prefixBlock config =
  "```sparql\n"
    <> "PREFIX gb:  <"
    <> vocabBase
    <> "/terms#>\n"
    <> "PREFIX gbk: <"
    <> vocabBase
    <> "/kinds#>\n"
    <> "PREFIX gbg: <"
    <> vocabBase
    <> "/groups#>\n"
    <> "PREFIX gbe: <"
    <> vocabBase
    <> "/edges#>\n"
    <> "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n"
    <> "PREFIX dcterms: <http://purl.org/dc/terms/>\n"
    <> "PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n"
    <> datasetPrefix config
    <> "```\n\n"
    <> "Node IRIs: `<{sourceUrl}/rdf/node/{id}>`\n"
    <> "Kind IRIs: `gbk:{kind-id}` · "
    <> "Group IRIs: `gbg:{group-id}` · "
    <> "Edge predicates: `gbe:{url-encoded-label}`\n"
    <> "Key properties: `gb:nodeId` (string ID), "
    <> "`gb:group` (group IRI), "
    <> "`dcterms:description` (descriptions), "
    <> "`foaf:page` / `rdfs:seeAlso` (external links)"

datasetPrefix :: Config -> String
datasetPrefix config
  | S.null config.sourceUrl = ""
  | otherwise =
      "PREFIX data: <" <> config.sourceUrl <> "/rdf/node/>\n"

schemasBlock :: Config -> String
schemasBlock config =
  if isRdf config then
    "- Config schema: " <> schemaBase <> "config.schema.json\n"
      <> "- Query catalog schema: "
      <> schemaBase
      <> "query-catalog.schema.json\n"
      <> "- Tutorial schema: "
      <> schemaBase
      <> "tutorial.schema.json\n"
      <> "- Tutorial index schema: "
      <> schemaBase
      <> "tutorial-index.schema.json"
  else
    "- Graph schema: " <> schemaBase <> "graph.schema.json\n"
      <> "- Config schema: "
      <> schemaBase
      <> "config.schema.json\n"
      <> "- Tutorial schema: "
      <> schemaBase
      <> "tutorial.schema.json\n"
      <> "- Tutorial index schema: "
      <> schemaBase
      <> "tutorial-index.schema.json"

queryCatalogSchemaBlock :: String
queryCatalogSchemaBlock =
  "Each query is a JSON object:\n"
    <> "- `id`: kebab-case (pattern: `^[a-z0-9][a-z0-9._-]*$`)\n"
    <> "- `name`: display name\n"
    <> "- `description`: what this query shows\n"
    <> "- `sparql`: SPARQL SELECT returning `?node`\n"
    <> "- `parameters`: optional `[{name, label, type, default}]`"
    <> " — type: `string` | `node` | `kind`\n"
    <> "- `tags`: optional — `\"view\"` for views,"
    <> " `\"tour:tour-id\"` for tour stops\n\n"
    <> "Schema: "
    <> schemaBase
    <> "query-catalog.schema.json"

existingQueriesBlock :: QueryCatalog -> String
existingQueriesBlock catalog
  | Array.null catalog = "_No existing queries._"
  | otherwise =
      Array.intercalate "\n" (map queryLine catalog)
      where
      queryLine q =
        "- **" <> q.name <> "** (`" <> q.id <> "`): "
          <> q.description
          <> tagsNote q.tags
      tagsNote tags
        | Array.null tags = ""
        | otherwise =
            " [" <> Array.intercalate ", " tags <> "]"

existingToursBlock :: Array Tutorial -> String
existingToursBlock tours
  | Array.null tours = "_No existing tours._"
  | otherwise =
      Array.intercalate "\n" (map tourLine tours)
      where
      tourLine t =
        "- **" <> t.title <> "** (`" <> t.id <> "`): "
          <> t.description
          <> " ("
          <> show (Array.length t.stops)
          <> " stops)"

availableNodesBlock :: Graph -> String
availableNodesBlock graph =
  let
    nodes :: Array (Tuple String Node)
    nodes = Map.toUnfoldable graph.nodes
    sorted = Array.sortBy
      (\a b -> compare (snd a).group (snd b).group)
      nodes
    grouped = Array.groupBy
      (\a b -> (snd a).group == (snd b).group)
      sorted
  in
    Array.intercalate "\n"
      ( map
          ( \grp ->
              let
                items = Array.fromFoldable grp
                group = case Array.head items of
                  Just (Tuple _ n) -> n.group
                  Nothing -> "unknown"
                nodeList = map
                  ( \(Tuple _ n) ->
                      "  - `" <> n.id <> "` — "
                        <> n.label
                        <> " ("
                        <> n.kind
                        <> ")"
                  )
                  items
              in
                "### " <> group <> "\n"
                  <> Array.intercalate "\n" nodeList
          )
          (map Array.fromFoldable grouped)
      )

sparqlExamples :: String
sparqlExamples =
  "Match by node ID:\n"
    <> "```sparql\n"
    <> "SELECT ?node WHERE { ?node gb:nodeId \"some-id\" }\n"
    <> "```\n\n"
    <> "Match by kind or group:\n"
    <> "```sparql\n"
    <> "SELECT ?node WHERE { ?node a gbk:actor }\n"
    <> "SELECT ?node WHERE { ?node gb:group gbg:core }\n"
    <> "```\n\n"
    <> "Find by edge relationship:\n"
    <> "```sparql\n"
    <> "SELECT DISTINCT ?node WHERE {\n"
    <> "  ?node gbe:votes%20on ?target .\n"
    <> "  ?target gb:nodeId ?targetId\n"
    <> "}\n"
    <> "```\n\n"
    <> "Parameterized (use `$name` placeholders):\n"
    <> "```sparql\n"
    <> "SELECT ?node WHERE { ?node a gbk:$kindId }\n"
    <> "```"

queryInstructions :: String
queryInstructions =
  "Generate a SPARQL query for the catalog. Requirements:\n"
    <> "1. Return `?node` containing node IRIs\n"
    <> "2. Use the ontology prefixes above\n"
    <> "3. Output valid JSON matching the query catalog schema\n"
    <> "4. Use a unique kebab-case `id`\n"
    <> "5. For parameterized queries, use `$paramName`"
    <> " placeholders"

tourInstructions :: String
tourInstructions =
  "Generate a guided tour. Requirements:\n"
    <> "1. Follow the tutorial schema\n"
    <> "2. Reference only node IDs from the graph\n"
    <> "3. Each stop: `node` (ID), `depth` (1-3 focused,"
    <> " 99 all), `title`, `narrative`\n"
    <> "4. Narratives: `[text](node:id)` for graph links,"
    <> " `[text](https://url)` for external\n"
    <> "5. Aim for 4-12 stops per tour\n"
    <> "6. Output valid JSON matching the tutorial schema"

-- | Render a node — Turtle for RDF repos, JSON for legacy.
renderNode :: Config -> Node -> String
renderNode config n
  | isRdf config = nodeTurtle config n
  | otherwise = nodeJson n

-- | Render edges.
renderEdges :: Config -> Array Edge -> String
renderEdges _ edges
  | Array.null edges = "_No connected edges._"
renderEdges config edges
  | isRdf config =
      Array.intercalate "\n\n" (map (edgeTurtle config) edges)
  | otherwise =
      Array.intercalate "\n\n" (map edgeJson edges)

-- | Render a single edge.
renderEdge :: Config -> Edge -> String
renderEdge config e
  | isRdf config = edgeTurtle config e
  | otherwise = edgeJson e

-- Turtle rendering

nodeIri :: Config -> String -> String
nodeIri config nodeId
  | S.null config.sourceUrl =
      "<urn:graph-browser:"
        <> encodeUriComponent config.title
        <> "/node/"
        <> nodeId
        <> ">"
  | otherwise =
      "<" <> config.sourceUrl <> "/rdf/node/"
        <> nodeId
        <> ">"

nodeTurtle :: Config -> Node -> String
nodeTurtle config n =
  "```turtle\n"
    <> nodeIri config n.id
    <> "\n"
    <> "  a gbk:"
    <> n.kind
    <> " ;\n"
    <> "  rdfs:label "
    <> quote n.label
    <> " ;\n"
    <> "  gb:nodeId "
    <> quote n.id
    <> " ;\n"
    <> "  gb:group gbg:"
    <> n.group
    <> " ;\n"
    <> "  dcterms:description "
    <> quote n.description
    <> " .\n"
    <> "```"

edgeTurtle :: Config -> Edge -> String
edgeTurtle config e =
  "```turtle\n"
    <> nodeIri config e.source
    <> " gbe:"
    <> encodeUriComponent e.label
    <> " "
    <> nodeIri config e.target
    <> " .\n"
    <> "```"

-- JSON rendering (legacy)

nodeJson :: Node -> String
nodeJson n =
  "```json\n"
    <> "{\n"
    <> "  \"id\": "
    <> quote n.id
    <> ",\n"
    <> "  \"label\": "
    <> quote n.label
    <> ",\n"
    <> "  \"kind\": "
    <> quote n.kind
    <> ",\n"
    <> "  \"group\": "
    <> quote n.group
    <> ",\n"
    <> "  \"description\": "
    <> quote n.description
    <> ",\n"
    <> "  \"links\": ["
    <> linksJson n.links
    <> "]\n"
    <> "}\n"
    <> "```"

edgeJson :: Edge -> String
edgeJson e =
  "```json\n"
    <> "{\n"
    <> "  \"source\": "
    <> quote e.source
    <> ",\n"
    <> "  \"target\": "
    <> quote e.target
    <> ",\n"
    <> "  \"label\": "
    <> quote e.label
    <> ",\n"
    <> "  \"description\": "
    <> quote e.description
    <> "\n"
    <> "}\n"
    <> "```"

linksJson :: Array { label :: String, url :: String } -> String
linksJson links
  | Array.null links = ""
  | otherwise =
      "\n"
        <> Array.intercalate ",\n" (map linkJson links)
        <> "\n  "
      where
      linkJson l =
        "    { \"label\": " <> quote l.label
          <> ", \"url\": "
          <> quote l.url
          <> " }"

filePathsBlock :: Config -> String
filePathsBlock config =
  if isRdf config then
    case config.graphSource of
      Just gs ->
        "- Graph (RDF, edit this): `" <> gs.path <> "`\n"
          <> "- Config: `data/config.json`\n"
          <> "- Query catalog: `data/queries.json`\n"
          <> "- Tutorials: `data/tutorials/`"
      Nothing ->
        "- Config: `data/config.json`\n"
          <> "- Query catalog: `data/queries.json`\n"
          <> "- Tutorials: `data/tutorials/`"
  else
    "- Graph: `data/graph.json`\n"
      <> "- Config: `data/config.json`\n"
      <> "- Tutorials: `data/tutorials/`"

userSection :: String -> String
userSection text
  | S.null text = ""
  | otherwise = section "Task" text

prSection :: Config -> String
prSection config
  | S.null config.sourceUrl = ""
  | isRdf config = section "How to Submit Changes"
      ( "Fork " <> config.sourceUrl
          <> ". For graph data, edit the RDF file listed above"
          <> " (Turtle). "
          <> "For queries, edit `data/queries.json`. "
          <> "For tours, add/edit in `data/tutorials/`. "
          <> "Validate against schemas and open a PR."
      )
  | otherwise = section "How to Submit Changes"
      ( "Fork the repository at " <> config.sourceUrl
          <> ", edit the relevant JSON files listed above, "
          <> "validate against the schemas, and open a"
          <> " pull request."
      )

-- | Quote a string for Turtle/JSON output.
quote :: String -> String
quote s = "\"" <> escapeTurtle s <> "\""

-- | Minimal Turtle string escaping (same chars as JSON).
foreign import escapeJson :: String -> String

escapeTurtle :: String -> String
escapeTurtle = escapeJson
