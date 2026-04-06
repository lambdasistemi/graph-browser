# Research: RDF Export for Graph Data Interoperability

## Current Data Model

- `data/graph.json` is the canonical graph payload:
  - nodes carry `id`, `label`, `kind`, `group`, `description`, and optional `links`
  - edges carry `source`, `target`, `label`, and `description`
- `data/config.json` carries dataset metadata:
  - `title`, `description`, `sourceUrl`
  - `kinds` map from kind IDs to display metadata

## Existing Pipeline Constraints

- `validate-action/action.yml` currently validates JSON schemas plus referential integrity only
- `build-action/action.yml` currently copies `data/` and generates a view index, but has no export stage
- `manifest.schema.json` currently declares JSON file locations only

## Export Design Decisions

### 1. JSON remains the source of truth

The issue asks for RDF support starting from export. The least disruptive path is:

- keep `graph.json` and `config.json` as authored inputs
- derive RDF deterministically from those files
- use CI to guarantee the RDF is current and valid

This satisfies interoperability without forcing existing repositories onto a new authoring model.

### 2. Dataset-scoped node URIs are mandatory

Node IDs are only unique within one graph dataset today. If two repositories both contain `viewer`, `main`, or `drep`, bare ID-based URIs would collide when merged. The export therefore needs:

- one canonical dataset base IRI
- node resources under that base, for example `.../node/<id>`

This is the minimum requirement for safe multi-graph loading.

### 3. Shared vocabulary must be separate from dataset resources

Kinds, edge-label predicates, and other reusable concepts should not live under dataset-specific namespaces. Otherwise two exports that both mean "component" or "depends on" would become incomparable.

Recommendation:

- dataset resources stay under dataset base IRIs
- graph-browser vocabulary terms live under one shared vocabulary namespace

### 4. Edge metadata needs a two-layer representation

A simple RDF triple is ideal for interoperability:

- subject = source node URI
- predicate = normalized edge-label vocabulary term
- object = target node URI

But graph-browser edges also carry:

- original human-readable label text
- edge description text

Those need to be preserved in a companion structure or annotation pattern so future import can recover the original edge record.

### 5. Start with Turtle plus one machine-oriented format

The issue mentions Turtle and JSON-LD. A pragmatic export shape is:

- Turtle for review, diffs, and examples
- one machine-oriented companion serialization for downstream tooling

The exact secondary format can be finalized during implementation as long as the spec requirement for dual output is met.

## Recommended Scope Boundary

### In scope

- Export from JSON to RDF
- Shared vocabulary for kinds, groups, edge labels, and dataset metadata
- CI/build integration
- Deterministic, documented URI strategy

### Out of scope

- In-browser RDF loading
- RDF import back into graph-browser
- SPARQL UI or query catalog execution
- Tutorial/view RDF export unless needed as metadata groundwork

## Consequences for Follow-on Work

- Issue #41 can depend on the exported RDF assets rather than inventing a fresh RDF shape
- Issue #33 can formalize and expand the vocabulary without invalidating the first exporter, provided the initial terms are versioned and conservative
