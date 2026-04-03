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

### Option 1: Deploy your own

1. Clone this repo
2. Replace `example/data/` with your data
3. `nix develop -c just serve` to preview
4. Deploy `dist/` (with your data copied in) to GitHub Pages

### Option 2: Use the hosted version

Coming soon: `https://lambdasistemi.github.io/graph-browser/?repo=owner/repo` will load data from any GitHub Pages site.

## Development

```bash
nix develop -c just ci      # lint + build + bundle
nix develop -c just serve   # serve example on port 10002
nix develop -c just dev     # watch mode
```

## JSON Schemas

Validate your data against the schemas in [`schema/`](schema/):

- [`config.schema.json`](schema/config.schema.json) — configuration
- [`graph.schema.json`](schema/graph.schema.json) — nodes and edges
- [`tutorial.schema.json`](schema/tutorial.schema.json) — guided tour
- [`tutorial-index.schema.json`](schema/tutorial-index.schema.json) — tour list

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
