# Graph Browser

An interactive knowledge graph browser with guided tours. Point it at any repository with the right JSON data format.

**Demo:** https://lambdasistemi.github.io/graph-browser/

## Features

- Force-directed graph layout (fCoSE) with adaptive spacing
- Click to focus, depth controls (1/2/3/All) for neighborhood size
- Hover nodes and edges for descriptions
- Full-text search across all labels and descriptions
- Guided tours with narrative text and inline links
- Fully data-driven: title, kinds, colors, shapes all from config
- **Universal viewer**: browse any repo's graph via `?repo=owner/repo`
- **Repo management**: add, switch, and delete repos from a left panel
- **Per-repo state**: each repo remembers selected node, depth, tutorial progress
- **Dual output**: `lib` (embeddable viewer) and `app` (hosted universal viewer)
- **Deep-linking**: share `?repo=owner/repo` URLs that auto-load
- **Token support**: encrypted storage for private repo access
- **Prompt builder**: generate context-rich prompts to improve nodes and edges via PR
- **Self-documenting**: graph-browser's own architecture is browsable as a graph
- **CI validation action**: reusable GitHub Action to validate any data repo

## Data Format

Your repository needs a `data/` directory with:

### `data/config.json` (required)

```json
{
  "title": "My Knowledge Graph",
  "description": "What this graph is about.",
  "sourceUrl": "https://github.com/you/your-repo",
  "kinds": {
    "concept": { "label": "Concept", "color": "#79c0ff", "shape": "round-octagon" },
    "entity": { "label": "Entity", "color": "#58a6ff", "shape": "ellipse" }
  }
}
```

### `data/graph.json` (required)

```json
{
  "nodes": [
    {
      "id": "unique-id",
      "label": "Display Name",
      "kind": "concept",
      "group": "optional-grouping",
      "description": "What this node represents and why it matters.",
      "links": [
        { "label": "External Link", "url": "https://..." }
      ]
    }
  ],
  "edges": [
    {
      "source": "node-a",
      "target": "node-b",
      "label": "relates to",
      "description": "Why this relationship exists."
    }
  ]
}
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
      - uses: lambdasistemi/graph-browser/validate-action@main
      - uses: lambdasistemi/graph-browser/build-action@main
      - uses: actions/upload-pages-artifact@v4
        with:
          path: site
      - id: deployment
        uses: actions/deploy-pages@v5
```

No build tools needed — the actions download the app and assemble the site.

### Option 2: Use the hosted universal viewer

Visit `https://lambdasistemi.github.io/graph-browser/?repo=owner/repo` to browse any repo with a `data/` directory.

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
  "graph": "data/graph.json",
  "tutorials": "data/tutorials/index.json"
}
```

Without a manifest, the app looks for `data/` on the repo's main branch via raw GitHub URLs.

## Development

```bash
nix develop -c just ci          # lint + build + bundle
nix develop -c just serve       # serve example on port 10002
nix develop -c just dev         # watch mode
nix develop -c just bundle-app  # bundle app (with repo panel)
nix develop -c just bundle-lib  # bundle lib (viewer only)
nix build .#app                 # nix build app output
nix build .#lib                 # nix build lib output
```

## JSON Schemas

Validate your data against the schemas in [`schema/`](schema/):

- [`config.schema.json`](schema/config.schema.json) — configuration
- [`graph.schema.json`](schema/graph.schema.json) — nodes and edges
- [`tutorial.schema.json`](schema/tutorial.schema.json) — guided tour
- [`tutorial-index.schema.json`](schema/tutorial-index.schema.json) — tour list
- [`manifest.schema.json`](schema/manifest.schema.json) — `.graph-browser.json` manifest

### CI Validation for Data Repos

Graph-browser publishes a reusable GitHub Action that validates your data against all schemas, checks edge integrity, kind references, duplicate IDs, and tutorial node references. Add it as a step in your workflow:

```yaml
- uses: lambdasistemi/graph-browser/validate-action@main
  with:
    data-dir: data          # optional, default: data
    schema-ref: main        # optional, pin to tag/sha
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
