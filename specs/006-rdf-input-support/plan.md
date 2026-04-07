# Implementation Plan: RDF Input Support For Downstream Graph Providers

**Branch**: `006-rdf-input-support` | **Date**: 2026-04-06 | **Spec**: [spec.md](spec.md)

## Summary

Keep `config.json` as the viewer entry point, add an optional RDF graph source declaration there, and import RDF into the existing graph-browser `Graph` type. Use Oxigraph only as a parser FFI; keep graph-browser mapping logic in PureScript. Extend validation so RDF-backed repos can omit `graph.json`.

## Technical Context

**Language/Version**: PureScript + thin JavaScript FFI
**Primary Dependencies**: Halogen, Argonaut, Oxigraph
**Testing**: `just ci`, targeted validation action checks, manual viewer load
**Target Platform**: Browser plus GitHub Actions
**Constraints**: Preserve JSON compatibility; avoid moving graph semantics into JavaScript

## Constitution Check

| Gate | Status | Notes |
|------|--------|-------|
| Data-Driven, Zero Hardcoding | Pass | Source selection stays config-driven |
| PureScript for Logic, JS FFI for Rendering | Pass | RDF mapping stays in PureScript; JS only parses RDF |
| Schema-Validated Data | Pass | Config schema gains RDF source declaration |
| Library/App Split | Pass | Import lives in shared viewer/graph code |

## Project Structure

```text
schema/
  config.schema.json          # extend with optional graphSource

src/
  Graph/Types.purs            # add graph source type to Config
  Graph/Decode.purs           # decode graphSource from config
  Rdf/Import.purs             # PureScript RDF -> Graph mapping
  FFI/Oxigraph.purs           # add parse wrapper types
  FFI/Oxigraph.js             # add thin parse function
  Viewer.purs                 # choose JSON vs RDF graph source at load time

validate-action/
  action.yml                  # allow RDF-backed repos without graph.json

README.md                     # document config-driven RDF graph sources
specs/006-rdf-input-support/  # this feature's spec artifacts
```

## Implementation Phases

### Phase 1: Config And Runtime Source Selection

1. Extend `config.schema.json` with optional `graphSource`
2. Decode that field into `Config`
3. In `Viewer.Initialize`, choose between legacy JSON graph loading and RDF graph loading based on config

### Phase 2: PureScript RDF Import

1. Add a thin Oxigraph parse FFI returning plain quads
2. Implement `Rdf.Import` to:
   - discover node resources
   - reconstruct node fields
   - reconstruct edge assertions
   - build the existing `Graph`
3. Keep all graph-browser semantics in PureScript

### Phase 3: Validation And Docs

1. Update validate-action for RDF-backed repos
2. Document the new config shape and supported RDF formats

## Validation Strategy

| Check | When | Expected Result |
|-------|------|-----------------|
| Config schema | Every repo | `graphSource` accepted only when valid |
| JSON fallback | Legacy repo | Existing behavior unchanged |
| RDF parse | RDF-backed repo | Configured RDF file parses successfully |
| Graph import | RDF-backed repo | Viewer reconstructs graph and renders |
