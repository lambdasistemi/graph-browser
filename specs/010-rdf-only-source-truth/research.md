# Research: Make RDF the Only Graph Source of Truth

## Decision: Remove `data/graph.json` from this repo now

- **Why**: The self-graph already runs from `graphSources` at runtime, so keeping `data/graph.json` adds confusion without adding functional value.
- **Rejected alternative**: Keep `graph.json` until a later cleanup. Rejected because it preserves the exact two-source-of-truth problem the user wants removed first.

## Decision: Teach export workflows to start from RDF

- **Why**: `just export-rdf` currently assumes JSON authoring, which blocks removal of `data/graph.json`.
- **Rejected alternative**: Delete export tooling entirely. Rejected because the repo still needs generated ontology and diagram artifacts.

## Decision: Keep downstream JSON compatibility out of the critical path

- **Why**: The user asked to eliminate mixed authoring in this repo before further work, not to break every downstream JSON-backed repo immediately.
- **Rejected alternative**: Remove all JSON graph support globally in the same change. Rejected as too broad for a safe first migration.

