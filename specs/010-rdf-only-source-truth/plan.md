# Implementation Plan: Make RDF the Only Graph Source of Truth

**Branch**: `010-rdf-only-source-truth` | **Date**: 2026-04-09 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/010-rdf-only-source-truth/spec.md`

## Summary

Remove `data/graph.json` from the graph-browser repo and make the self-graph build/tooling operate from RDF sources declared in `data/config.json`. The key changes are: teach `Rdf.Export.Main` to import from configured RDF sources, update validation to understand ordered `graphSources`, and rewrite repo docs so RDF is the authoritative self-graph representation while JSON remains compatibility-only.

## Technical Context

**Language/Version**: PureScript (Spago), shell/Node in GitHub Actions  
**Primary Dependencies**: Halogen, Oxigraph WASM FFI, AJV, GitHub Actions composite validation  
**Storage**: Static repo files under `data/` and `data/rdf/`  
**Testing**: `just test`, `nix build .#app`, targeted validation checks  
**Target Platform**: Browser + GitHub Actions + GitHub Pages  
**Project Type**: Web application with data-generation and CI tooling  
**Performance Goals**: No material regression in local build or CI validation time  
**Constraints**: Preserve downstream compatibility where possible, but make the self-repo RDF-first now  
**Scale/Scope**: Self-graph repo workflow, validation, docs, and packaged defaults

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Data-Driven, Zero Hardcoding | PASS | Graph data remains externalized; only the source format authority changes |
| II. PureScript for Logic, JS FFI for Rendering | PASS | RDF import/export remains in PureScript |
| III. Nix-First Builds | PASS | Verification still runs through existing Nix-based workflows |
| IV. Library/App Split | PASS WITH CARE | Packaged defaults and lib docs must reflect RDF-first self-graph without breaking downstream compatibility |
| V. Schema-Validated Data | PASS | Config/tutorial/view schemas remain, but validation logic must stop assuming JSON-only graph authoring |
| VI. Accessibility of Information | PASS | Removes confusing mixed-source behavior that currently obscures the real data model |

## Project Structure

```text
src/
├── Rdf/Export/Main.purs       # MODIFY: load Graph from config-declared RDF sources
├── Rdf/Import.purs            # REUSE: reconstruct Graph from RDF
├── Viewer.purs                # REUSE existing RDF-first loading logic
├── Lib.purs                   # REVIEW: packaged defaults/docs consistency
└── RepoDiscovery.purs         # REVIEW: convention assumptions

validate-action/action.yml     # MODIFY: support graphSources as first-class
README.md                      # MODIFY: RDF-first repo guidance
data/config.json               # KEEP: stable entry point with graphSources
data/graph.json                # DELETE: no longer authored in this repo
data/tutorials/*.json          # REVIEW: stale JSON-centric wording
```

## Design Decisions

### D1: Migrate the repo, not the entire product model, in one step

Keep compatibility for downstream JSON-backed repos where practical, but remove JSON authoring from this repository immediately.

### D2: Use configured RDF sources as the input to export workflows

`Rdf.Export.Main` should decode `config.json`, load the configured RDF graph sources, import them into the in-memory graph model, and then emit any derived RDF artifacts from that reconstructed graph.

### D3: Treat `graphSources` as the primary RDF configuration shape

Validation and docs should prioritize the ordered `graphSources` list, with `graphSource` treated as legacy singleton compatibility.

### D4: Update product messaging from “JSON-first with RDF option” to “RDF-first self-graph, JSON compatibility”

The README and self-graph descriptions must stop claiming `graph.json` is the canonical authored source for graph-browser itself.

