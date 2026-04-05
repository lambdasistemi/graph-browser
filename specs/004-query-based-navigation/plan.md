# Implementation Plan: Query-Based Navigation

**Spec**: `specs/004-query-based-navigation/spec.md`
**Status**: Draft

## Phase 1: Foundation — Oxigraph Integration (Stories 1, 2)

### 1.1 Add Oxigraph WASM dependency

- Add `oxigraph` to `package.json`
- Update esbuild config to handle WASM file (copy to dist or serve alongside)
- Update `flake.nix` to include oxigraph in the build
- Verify `nix build` works with the WASM binary

### 1.2 FFI.Oxigraph module

New JS FFI wrapper (`src/FFI/Oxigraph.js` + `src/FFI/Oxigraph.purs`):
- `initOxigraph :: Effect (Promise Unit)` — compile WASM
- `createStore :: Effect OxigraphStore` — create empty store
- `loadTurtle :: OxigraphStore -> String -> Effect (Promise Unit)` — load Turtle string into store
- `querySparql :: OxigraphStore -> String -> Effect (Promise (Array (Object String)))` — execute SELECT, return bindings as key-value objects

Keep it thin — just the FFI boundary. PureScript handles result interpretation.

### 1.3 Turtle data loading

Modify the initialization flow in `Viewer.purs`:
- Fetch `.ttl` file from `turtleUrl`
- Init Oxigraph, create store, load Turtle content
- Run a bootstrap SPARQL query to extract all nodes and edges into the existing `Graph` type
- This preserves the entire downstream pipeline (Cytoscape rendering, neighborhood, subgraph)

**Bootstrap query:**
```sparql
SELECT ?id ?label ?kind ?group ?description WHERE {
  ?node a ?kindClass .
  ?node rdfs:label ?label .
  ?node gb:group ?group .
  OPTIONAL { ?node gb:description ?description }
  BIND(REPLACE(STR(?node), ".*#", "") AS ?id)
  BIND(REPLACE(STR(?kindClass), ".*#", "") AS ?kind)
}
```

Similar query for edges. Result maps to existing `Node` / `Edge` types.

### 1.4 Query catalog loading and display

- Define `NamedQuery` type in a new `Graph/Query.purs` module
- Add JSON decoder for query catalog (`data/queries.json`)
- Fetch catalog alongside Turtle data
- Replace the search panel UI with a query catalog panel:
  - List of query names + descriptions
  - Substring filter over names/descriptions (replaces current `Graph.Search`)
  - Click a query → execute via Oxigraph → get result node IDs → filter graph → render

### 1.5 Query execution → graph filtering

When a query is selected:
1. Execute SPARQL against the Oxigraph store
2. Extract result node IDs from bindings
3. Build a `Set NodeId` from results
4. Call existing `subgraph(resultSet, fullGraph)` to filter
5. Render via existing pipeline

This reuses `Graph.Operations.subgraph` — only the input set changes (from neighborhood BFS to SPARQL results).

**State changes in Viewer:**
- Add `oxigraphStore :: Maybe OxigraphStore`
- Add `queryCatalog :: Array NamedQuery`
- Add `activeQuery :: Maybe NamedQuery`
- Add `catalogFilter :: String` (replaces `searchQuery`)
- Remove `searchResults :: Array SearchResult`

## Phase 2: Parameters and Views (Stories 3, 4)

### 2.1 Parameterized queries

- Parse `parameters` array from catalog entries
- When a parameterized query is selected, render input fields in the panel
- On submit, bind parameter values into the SPARQL template (string replacement of `$name` placeholders)
- Execute the bound query

### 2.2 Views as named queries

- Remove `Graph/Views.purs` (edge-triple model)
- Remove view index/file loading
- Views are now queries tagged with `"view"` in the catalog
- The view picker dropdown becomes a filtered view of the catalog (tag filter)
- Saving a view = saving a named query to localStorage (user-created queries)

### 2.3 View schemas

- Remove `schema/view.schema.json`
- Add `schema/query-catalog.schema.json` for the new catalog format
- Update `GENERATE.md` to reference new schemas

## Phase 3: URL Sharing and Tours (Stories 5, 6)

### 3.1 URL encoding

- Encode active query ID + parameter values in URL params: `?query=all-ui-components&kind=Module`
- On load, check URL for query reference → auto-execute
- Uses existing `FFI.Url` module

### 3.2 Tour migration

- Update `Tutorial` type: stops reference `queryId` instead of `node` + `depth`
- `applyTutorialStop` executes the stop's query instead of centering on a node
- Stop narrative links still work (they navigate within the query result)
- Update `schema/tutorial.schema.json`
- Migrate existing tutorial data files

## Phase 4: CI and Validation

### 4.1 Update validate-action

The current `validate-action` validates `graph.json` + `config.json` against JSON schemas and checks referential integrity (edge sources/targets exist, kinds exist, tutorial nodes exist, view edges exist in graph).

For Turtle + queries, the validation changes to:
- **Turtle syntax validation**: Parse `.ttl` with a Turtle parser (or load into Oxigraph CLI) — syntax errors fail CI
- **Query catalog schema validation**: New `schema/query-catalog.schema.json` validated with ajv
- **SPARQL syntax validation**: Each query in the catalog is parsed/validated (dry-run against the loaded store)
- **Tour referential integrity**: Tour stops reference query IDs that exist in the catalog
- **Config/ontology consistency**: Kind IDs in `config.json` match class local names in the Turtle data
- **Dual-format support**: Detect format from manifest and run the appropriate validation path

Update the action to handle both legacy JSON and new RDF formats based on manifest.

### 4.2 Update CI workflow

- `ci.yml` validate step already uses `./validate-action` — the action itself changes, workflow stays the same
- Add Oxigraph CLI or a Node-based Turtle parser to the nix devShell for CI validation
- Ensure `just ci` still covers lint + build + bundle + validate

### 4.3 Remove legacy modules

- Remove `Graph/Search.purs` (replaced by catalog filter)
- Remove `Graph/Views.purs` (replaced by named queries)
- Remove `Graph/Decode.purs` graph decoder (Turtle replaces graph.json)
- Keep `Graph/Decode.purs` config decoder (config.json remains)

### 4.4 Data migration tooling

- Script to convert `graph.json` → `graph.ttl` (for existing data repos)
- Script to convert view files → query catalog entries
- Script to convert tutorial stops (node+depth) → query references
- Update `GENERATE.md` prompt templates for Turtle + query catalog

### 4.5 Backward compatibility

- Manifest `format` field determines loading path and validation path
- Legacy repos (no `format` field) use current JSON pipeline + JSON validation
- New repos use Turtle + queries pipeline + RDF validation
- Eventually deprecate JSON path

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Oxigraph WASM bundle size (~300KB) | Slower initial load | Lazy-load WASM after first paint |
| SPARQL query errors from user/LLM-authored queries | Broken views | Validate queries on catalog load, surface errors inline |
| Nix build complexity with WASM | CI breakage | Test `nix build` early in Phase 1 |
| esbuild WASM handling | Build failures | May need custom plugin or manual copy step |
| Performance on large graphs (1000+ nodes) | Slow queries | Benchmark Oxigraph on target graph sizes in Phase 1 |

## Dependencies

- **#33** (ontology) — defines the RDF vocabulary used in Turtle files
- **#30** (RDF export) — produces the Turtle data from existing JSON

These should be completed first, or at minimum the ontology vocabulary must be agreed before Phase 1 data loading can be tested with real data.
