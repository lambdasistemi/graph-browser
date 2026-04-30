# Graph Browser

An interactive knowledge graph browser with guided tours. Graph data is declared in `data/config.json` and loaded from RDF graph sources.

**Demo:** https://lambdasistemi.github.io/graph-browser/

## Features

- Selectable graph layouts: fCoSE, ELK, Cola, Dagre, Concentric
- Click to focus, depth controls (1/2/3/All) for neighborhood size
- Hover nodes and edges for descriptions
- Full-text search across all labels and descriptions
- Guided tours with narrative text and inline links
- Fully data-driven: title, kinds, colors, shapes all from config
- **Universal viewer**: browse any repo's graph via `?repo=owner/repo`
- **Repo management**: add, switch, and delete repos from a left panel
- **Per-repo state**: each repo remembers selected node, depth, tutorial progress, and explicit layout choice
- **Dual output**: `lib` (embeddable viewer) and `app` (hosted universal viewer)
- **Deep-linking**: share `?repo=owner/repo` URLs that auto-load
- **Token support**: encrypted storage for private repo access
- **Prompt builder**: generate context-rich prompts to improve nodes and edges via PR
- **Views**: named subgraph lenses — filter a shared node/edge catalog by topic with per-view tours
- **Self-documenting**: graph-browser's own architecture is browsable as a graph with views
- **CI validation action**: reusable GitHub Action to validate any data repo
- **Build action**: assemble a deployable site from graph-browser data with zero build tools
- **RDF-first self-graph**: graph-browser’s own architecture is authored and served from RDF graph sources
- **RDF export**: derive Turtle and N-Quads from the authored graph model through the Oxigraph FFI path

## Data Format

Your repository needs a `data/` directory with:

### `data/config.json` (required)

```json
{
  "title": "My Knowledge Graph",
  "description": "What this graph is about.",
  "sourceUrl": "https://github.com/you/your-repo",
  "graphSources": [
    { "format": "text/turtle", "path": "data/rdf/graph.ttl" },
    { "format": "text/turtle", "path": "data/rdf/core-ontology.ttl" },
    { "format": "text/turtle", "path": "data/rdf/application-ontology.ttl" }
  ],
  "kinds": {
    "concept": { "label": "Concept", "color": "#79c0ff", "shape": "round-octagon" },
    "entity": { "label": "Entity", "color": "#58a6ff", "shape": "ellipse" }
  }
}
```

`config.json` is the stable entry point. It supplies viewer metadata, node kind styling, and the ordered RDF graph sources to load.

Use `graphSources` for the primary graph plus ontology layers:

```json
{
  "title": "My Knowledge Graph",
  "description": "What this graph is about.",
  "sourceUrl": "https://github.com/you/your-repo",
  "graphSources": [
    { "format": "text/turtle", "path": "data/rdf/graph.ttl" },
    { "format": "text/turtle", "path": "data/rdf/core-ontology.ttl" },
    { "format": "text/turtle", "path": "data/rdf/application-ontology.ttl" }
  ],
  "kinds": {
    "concept": { "label": "Concept", "color": "#79c0ff", "shape": "round-octagon" }
  }
}
```

`graphSources` is loaded in order and merged into one runtime dataset for both rendering and SPARQL queries.

### RDF graph sources

The current runtime importer supports RDF syntaxes understood by Oxigraph, including Turtle, JSON-LD, and N-Quads. The cleanest machine-oriented option is the exported `graph.nq`:

```json
{
  "title": "My Knowledge Graph",
  "description": "What this graph is about.",
  "sourceUrl": "https://github.com/you/your-repo",
  "graphSources": [
    { "format": "application/n-quads", "path": "data/rdf/graph.nq" }
  ],
  "kinds": {
    "concept": { "label": "Concept", "color": "#79c0ff", "shape": "round-octagon" }
  }
}
```

In this mode:

- `config.json` still supplies viewer metadata and node kind styling
- the graph itself is imported from RDF
- `graphSources` can merge instance RDF with ontology RDF at runtime

External node links are imported from `foaf:page` and `rdfs:seeAlso`.
The viewer labels those links from the URL hostname by default, so users
see labels like `github.com` or `hydra-voting.intersectmbo.org` instead
of generic predicate names. For a more precise label, add an
`rdf:Statement` for the link triple with `rdfs:label`:

```turtle
ex:proposal rdfs:seeAlso <https://milestones.projectcatalyst.io/projects/1300132> .

[] a rdf:Statement ;
  rdf:subject ex:proposal ;
  rdf:predicate rdfs:seeAlso ;
  rdf:object <https://milestones.projectcatalyst.io/projects/1300132> ;
  rdfs:label "Catalyst milestone tracker" .
```

### `data/tutorials/index.json` (optional)

```json
[
  {
    "id": "my-tour",
    "title": "Guided Tour",
    "description": "Walk through the key concepts.",
    "file": "data/tutorials/my-tour.json"
  }
]
```

### `data/tutorials/<name>.json`

```json
{
  "id": "my-tour",
  "title": "Guided Tour",
  "description": "Walk through the key concepts.",
  "stops": [
    {
      "node": "unique-id",
      "depth": 1,
      "title": "Stop Title",
      "narrative": "Narrative text. Use [link text](node:node-id) for graph links and [link text](https://url) for external links.\n\nParagraphs separated by double newlines."
    }
  ]
}
```

### `data/queries.json` (optional)

Query catalog entries can drive the left-hand query panel. Queries tagged with `"view"` act as named graph views, and can declare an optional default layout.

```json
[
  {
    "id": "build-validation",
    "name": "Build & Validation",
    "description": "CI and validation flow.",
    "sparql": "SELECT ?node WHERE { ?node ?p ?o }",
    "tags": ["view"],
    "layout": "dagre"
  }
]
```

Supported layout IDs are `fcose`, `elk`, `cola`, `dagre`, and `concentric`. An authored `layout` is the default for that view until the user explicitly picks a different layout for the repo.

### `data/views/<name>.json` (optional)

Views filter the graph into topic-specific subgraphs. Each view selects edges by triple and includes its own tours.

```json
{
  "name": "My Topic",
  "description": "A focused lens on this topic.",
  "layout": "concentric",
  "edges": [
    ["node-a", "node-b", "relates to"],
    ["node-c", "node-d", "depends on"]
  ],
  "tours": [
    {
      "id": "intro",
      "title": "Introduction",
      "description": "Walk through the basics.",
      "stops": [
        { "node": "node-a", "depth": 1, "title": "Start Here", "narrative": "..." }
      ]
    }
  ]
}
```

Legacy view files also support the same optional `layout` field and layout IDs as `data/queries.json`.

A `data/views/index.json` listing available views must also be committed:

```json
[
  { "name": "My Topic", "description": "...", "file": "my-topic.json" }
]
```

If no views are defined, the full graph is shown with tutorials from `data/tutorials/`.

### Available shapes

`ellipse`, `round-rectangle`, `diamond`, `round-hexagon`, `rectangle`, `round-octagon`, `barrel`, `round-pentagon`, `triangle`, `star`

## Usage

### Option 1: Data repo with GitHub Pages (recommended)

Create a repo with just a `data/` directory and this workflow:

```yaml
# .github/workflows/pages.yml
name: Deploy
on:
  workflow_dispatch:
  push:
    branches: [main]
permissions:
  pages: write
  id-token: write
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: lambdasistemi/graph-browser/validate-action@v0.4.1
        with:
          version: v0.4.1
      - uses: lambdasistemi/graph-browser/build-action@v0.4.1
        with:
          version: v0.4.1
      - uses: actions/upload-pages-artifact@v4
        with:
          path: site
      - id: deployment
        uses: actions/deploy-pages@v5
```

No build tools needed — the actions download the pinned `lib-bundle.tar.gz` and `schemas.tar.gz` from the release and assemble the site.

> **Pin both the action ref and the `version:` input to the same release tag.** Replace `v0.4.1` with whatever release you want; check [Releases](https://github.com/lambdasistemi/graph-browser/releases) for the latest. Upstream changes to graph-browser only reach your deployed site when you bump these pins.

### Option 2: Use the hosted universal viewer

Visit `https://lambdasistemi.github.io/graph-browser/?repo=owner/repo` to browse any repo with a `data/` directory.

Supported URL parameters:

- `?repo=owner/repo` — the data repository to load.
- `?branch=<ref>` — load `data/` from a non-`main` git ref (branch, tag, or commit SHA) via raw GitHub URLs. Without this parameter the viewer tries `main`, then `master`. Useful for previewing in-progress work before merge.
- `?theme=light|dark|auto` — force a colour palette or follow the OS preference.

### Option 3: Use as a Nix flake input

```nix
# In your flake.nix
inputs.graph-browser.url = "github:lambdasistemi/graph-browser";

# Use the lib output (viewer only, no repo management)
packages.default = graph-browser.packages.${system}.lib;
```

### Manifest (optional)

Add `.graph-browser.json` to your repo root to customize data paths:

```json
{
  "config": "data/config.json",
  "graph": "data/rdf/graph.ttl",
  "tutorials": "data/tutorials/index.json"
}
```

Without a manifest, the app looks for `data/` on the repo's main branch via raw GitHub URLs. When `?branch=<ref>` is set, the manifest and the `data/` fallback are both resolved against that ref.

## Development

```bash
nix develop -c just ci          # lint + build + bundle
nix develop -c just export-rdf  # regenerate data/rdf from the graph sources declared in data/config.json
nix develop -c just publish-vocab # generate /vocab/... namespace pages from ontology Turtle
nix develop -c just validate-rdf # validate RDF artifacts with SHACL
nix develop -c just build-docs  # build docs, copy RDF artifacts, and publish /vocab/... pages into dist
nix develop -c just serve       # serve example on port 10002
nix develop -c just dev         # watch mode
nix develop -c just bundle-app  # bundle app (with repo panel)
nix develop -c just bundle-lib  # bundle lib (viewer only)
nix build .#app                 # nix build app output
nix build .#lib                 # nix build lib output
```

## RDF Export

`just export-rdf` runs the PureScript export entrypoint `Rdf.Export.Main`, which reconstructs the graph model from the configured graph sources and emits the derived RDF artifacts. The low-level triple storage and serialization is delegated through the thin Oxigraph FFI layer in `src/FFI/Oxigraph.js`.

The command writes:

- `data/rdf/graph.ttl`
- `data/rdf/graph.nq`
- `data/rdf/core-ontology.ttl`
- `data/rdf/application-ontology.ttl`
- `data/rdf/core-ontology.mmd`
- `data/rdf/application-ontology.mmd`
- `data/rdf/shapes.ttl`
- `data/rdf/application-shapes.ttl`

`core-ontology.ttl` is the shared graph-browser ontology. `application-ontology.ttl` is the repo-specific extension generated from local kinds, groups, and edge labels. `core-ontology.mmd` and `application-ontology.mmd` are generated Mermaid views of the same structures for lightweight visualization and Pages publishing.

`just publish-vocab` reads the ontology Turtle artifacts and generates human-browsable namespace pages under:

- `dist/vocab/terms`
- `dist/vocab/kinds`
- `dist/vocab/groups`
- `dist/vocab/edges`

Those pages are generated automatically from Turtle during the docs/site build. They are not maintained as a separate hardcoded term catalog.

This matters because ontology IRIs like `https://lambdasistemi.github.io/graph-browser/vocab/terms#Node` rely on the namespace document `https://lambdasistemi.github.io/graph-browser/vocab/terms` being published. The `#Node` fragment is client-side only.

Downstream repos can use the same Turtle-driven generator through the reusable action:

```yaml
- uses: lambdasistemi/graph-browser/vocab-publish-action@main
  with:
    sources: data/rdf/core-ontology.ttl,data/rdf/application-ontology.ttl
    output-dir: site
    site-base-path: /your-repo-name
```

`just validate-rdf` runs two SHACL checks:

- `graph.ttl` against `shapes.ttl` for shared graph-browser instance structure
- `application-ontology.ttl` against `application-shapes.ttl` for application vocabulary compatibility with the core ontology

That gives downstream applications an explicit contract: they are free to define their own ontology terms, but kinds must still extend `gb:Node`, groups must still use `gb:Group`, and application predicates must still refine `gb:EdgeRelation`.

## Schemas

Validate your data against the schemas in [`schema/`](schema/):

- [`config.schema.json`](schema/config.schema.json) — configuration
- [`query-catalog.schema.json`](schema/query-catalog.schema.json) — query catalog and query-backed views
- [`tutorial.schema.json`](schema/tutorial.schema.json) — guided tour
- [`tutorial-index.schema.json`](schema/tutorial-index.schema.json) — tour list
- [`view.schema.json`](schema/view.schema.json) — view (subgraph lens with tours)
- [`manifest.schema.json`](schema/manifest.schema.json) — `.graph-browser.json` manifest

### CI Validation for Data Repos

Graph-browser publishes a reusable GitHub Action that validates your data against all schemas, checks edge integrity, kind references, duplicate IDs, and tutorial node references. Pin both the action ref and the `version:` input to the same release tag:

```yaml
- uses: lambdasistemi/graph-browser/validate-action@v0.4.1
  with:
    version: v0.4.1         # required — picks the schemas.tar.gz from this release
    data-dir: data          # optional, default: data
    # Or, for hermetic builds, point at a local schema directory and skip the download:
    # schema-dir: schema
```

## Generating Data with an LLM

See [`GENERATE.md`](GENERATE.md) for prompt templates to generate graph data, tutorials, and configuration using Claude, ChatGPT, or any AI assistant with web access. The prompts are designed to produce valid JSON matching the schemas above.

## Tech Stack

- **PureScript** + **Halogen** — typed functional UI
- **Cytoscape.js** + **fCoSE** — graph visualization
- **Nix flake** — reproducible dev environment
- **mkSpagoDerivation** — sandboxed Nix build
- **Spago** — PureScript build

## Projects Using Graph Browser

- [Cardano Governance Graph](https://github.com/lambdasistemi/cardano-governance-graph) — interactive knowledge graph of Cardano's on-chain governance
- [Local LLM Graph](https://github.com/lambdasistemi/local-llm-graph) — local LLM ecosystem: models, engines, quantization, hybrid cloud/local setups
