# Research: Query-Based Navigation

## Oxigraph WASM

- **Package**: `oxigraph` on npm
- **Import**: `import init, * as oxigraph from './node_modules/oxigraph/web.js'`
- **Init**: `await init()` — compiles WASM, must complete before queries
- **Load Turtle**: `store.load(turtleContent, { format: "text/turtle", baseIRI: "..." })`
- **Query**: `store.query("SELECT ?s ?o WHERE { ?s ?p ?o }")` — returns iterable of bindings
- **Bundle size**: ~300KB+ uncompressed WASM
- **Browser requirements**: WeakRef, WASM reference types (all modern browsers)
- **Recommendation**: Wrap in WebWorker (via comlink) to avoid blocking main thread during large loads
- **Supported formats**: Turtle, TriG, N-Triples, N-Quads, RDF/XML, JSON-LD, N3

## Format Decision: Turtle

Validated by LLM benchmarking (this session):
- Haiku: 13/13 on both Turtle and JSON-LD
- Mistral 7B: 8/9 on Turtle, 5/9 on JSON-LD (SPARQL authoring broke on JSON-LD)
- Turtle maps 1:1 to SPARQL patterns — what you see is what you query
- JSON-LD `@context` aliasing confuses weak models writing SPARQL

## Current Architecture (what changes)

### Data Loading
- `Viewer.purs` fetches `config.json` + `graph.json` → decodes → `buildGraph`
- **Replaces with**: Fetch `.ttl` → load into Oxigraph store → query for display

### Search (Graph/Search.purs)
- Substring matching on node labels/descriptions/kinds
- **Replaced entirely** by catalog search (substring on query names/descriptions)

### Views (Graph/Views.purs)
- Edge-triple lists (`[source, target, label]`) filtered to subgraphs
- View index + individual view files
- **Replaced by**: Named queries in the catalog tagged as views

### Tours (Tutorial.purs)
- Node ID + depth per stop
- Global tutorials + view-scoped tutorials embedded in view files
- **Replaced by**: Ordered sequences of named query references

### Graph Rendering
- `renderGraph` → `neighborhood(depth, nodeId)` → `subgraph(hood)` → `toElements` → Cytoscape
- **Changes to**: SPARQL query → result node IDs → `subgraph(resultSet)` → `toElements` → Cytoscape
- The Cytoscape layer stays the same — only the input to `subgraph` changes

## Integration Points

### esbuild
- Currently bundles `cytoscape` + `cytoscape-fcose` from npm
- Oxigraph WASM needs special handling — the `.wasm` file must be served alongside JS
- Options: (a) copy WASM to dist in build, (b) inline as base64 (large), (c) let esbuild handle via loader

### PureScript FFI
- New FFI module: `FFI.Oxigraph` wrapping init, load, query
- Returns results as Foreign, decoded in PureScript
- Async operations (init, load) need Effect/Aff wrapping

### Data URL Changes
- `DataUrls` record needs: `turtleUrl`, `queryCatalogUrl` instead of `graphUrl`
- `configUrl` may still exist for kind definitions (colors, shapes) OR these move into the ontology
- Backward compatibility: detect format by URL extension or manifest field
