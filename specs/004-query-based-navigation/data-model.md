# Data Model: Query-Based Navigation

## Named Query (the unified artifact)

A named query is the single abstraction for views, tour stops, catalog entries, and any subgraph selection.

```
NamedQuery:
  id: String          -- kebab-case identifier (e.g. "all-ui-components")
  name: String        -- human-readable display name
  description: String -- what this query shows
  sparql: String      -- the SPARQL SELECT/CONSTRUCT query
  parameters: Array Parameter  -- optional, empty for static queries
  tags: Array String  -- optional, e.g. ["view", "tour:setup-guide"]
```

## Parameter

```
Parameter:
  name: String        -- variable name in SPARQL (e.g. "kind")
  label: String       -- display label (e.g. "Node kind")
  type: "string" | "node" | "kind"  -- determines input widget
  default: Maybe String -- optional default value
```

## Query Catalog

Shipped as a single JSON file (`data/queries.json`):

```json
[
  {
    "id": "all-ui-components",
    "name": "All UI Components",
    "description": "Every node of type UIComponent",
    "sparql": "PREFIX gb: <...> SELECT ?node WHERE { ?node a gb:UIComponent }",
    "parameters": [],
    "tags": ["view"]
  },
  {
    "id": "neighbors-of",
    "name": "Neighbors of a node",
    "description": "Direct connections to a chosen node",
    "sparql": "PREFIX gb: <...> SELECT ?node WHERE { { $node ?p ?node } UNION { ?node ?p $node } }",
    "parameters": [
      { "name": "node", "label": "Center node", "type": "node" }
    ],
    "tags": []
  }
]
```

## Tour

Tours reference queries by ID. Shipped in `data/tours/index.json` and individual files, same as today but with query references instead of node IDs:

```json
{
  "id": "architecture-walkthrough",
  "title": "Architecture Walkthrough",
  "description": "How graph-browser is built",
  "stops": [
    {
      "queryId": "all-ui-components",
      "title": "The UI Layer",
      "narrative": "The browser is built from [Halogen](node:halogen) components..."
    },
    {
      "queryId": "build-pipeline",
      "title": "Build System",
      "narrative": "Nix orchestrates the build..."
    }
  ]
}
```

Note: `depth` disappears — the query itself determines the scope.

## Turtle Data

Graph data ships as `.ttl` files instead of `graph.json`. The ontology (#33) defines the vocabulary.

Example `data/graph.ttl`:
```turtle
@prefix gb: <https://lambdasistemi.github.io/graph-browser/ontology#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

gb:viewer a gb:UIComponent ;
    rdfs:label "Viewer" ;
    gb:group "ui" ;
    gb:description "The central Halogen component." .

gb:main gb:mounts gb:viewer .
```

## Config

`config.json` remains for kind display metadata (colors, shapes) since these are rendering concerns, not RDF data:

```json
{
  "title": "Graph Browser Architecture",
  "kinds": {
    "UIComponent": { "label": "UI Component", "color": "#f778ba", "shape": "round-octagon" }
  }
}
```

Kind IDs in config must match the class local names in the ontology (e.g. `gb:UIComponent` → `"UIComponent"`).

## Data URL Changes

Current `DataUrls`:
```
configUrl, graphUrl, tutorialIndexUrl, baseUrl
```

New `DataUrls`:
```
configUrl, turtleUrl, queryCatalogUrl, tourIndexUrl, baseUrl
```

## Migration Path

During transition, data repos can ship both formats. The manifest (`.graph-browser.json`) indicates which format:

```json
{
  "format": "rdf",
  "config": "data/config.json",
  "turtle": "data/graph.ttl",
  "queries": "data/queries.json",
  "tours": "data/tours/index.json"
}
```

Legacy repos without `format` field default to the current JSON model.
