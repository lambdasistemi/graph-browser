# Implementation Plan: Standard RDF Predicates As Primary Data Source

**Branch**: `008-standard-rdf-predicates` | **Date**: 2026-04-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-standard-rdf-predicates/spec.md`

## Summary

Extend the existing RDF importer so graph-browser can read standard RDF predicates as fallback sources for node descriptions, external links, and edge hover text, while keeping current `gb:` predicates authoritative. Keep the mapping logic in PureScript, use the existing Oxigraph quad parser, and start with standard RDF reification for edge annotations rather than introducing a new parser shape for RDF-star.

## Technical Context

**Language/Version**: PureScript with JavaScript FFI on the existing Spago workspace  
**Primary Dependencies**: Halogen, Argonaut, Oxigraph `0.5.6`, Cytoscape.js  
**Storage**: N/A at runtime beyond existing in-memory graph import and browser localStorage for viewer state  
**Testing**: `spago test` via `just ci`, targeted RDF import fixtures, validate-action RDF parsing checks  
**Target Platform**: Browser-hosted viewer plus Node-based validation/build scripts
**Project Type**: Web application plus reusable viewer library  
**Performance Goals**: Preserve current RDF import responsiveness for repo-scale graphs and avoid extra full-graph passes beyond what is needed for fallback lookup  
**Constraints**: Preserve backward compatibility for JSON-backed repos and existing gb-vocabulary RDF repos; keep import semantics in PureScript; avoid inventing domain logic in JavaScript  
**Scale/Scope**: One importer enhancement touching RDF-backed datasets, validation expectations, and documentation of supported RDF predicate precedence

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| Data-Driven, Zero Hardcoding | Pass | Predicate precedence is part of the RDF input contract, not dataset-specific logic |
| PureScript for Logic, JS FFI for Rendering | Pass | Fallback and precedence logic stays in `Rdf.Import`; JS FFI remains a thin Oxigraph wrapper |
| Nix-First Builds | Pass | No new build pipeline or network-dependent step is introduced |
| Library/App Split | Pass | Import changes stay in shared graph-loading code used by both outputs |
| Schema-Validated Data | Pass | No new JSON schema field is required; README and import contract document accepted RDF shapes |
| Accessibility of Information | Pass | Standard metadata fallback directly improves node and edge context shown to users |

Post-design re-check: still passes. The design keeps the RDF importer declarative and shared, with no new constitution violations.

## Project Structure

### Documentation (this feature)

```text
specs/008-standard-rdf-predicates/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── rdf-import-surface.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── FFI/
│   ├── Oxigraph.js
│   └── Oxigraph.purs
├── Graph/
│   └── Types.purs
├── Rdf/
│   └── Import.purs
├── Viewer.purs
└── Lib.purs

validate-action/
└── action.yml

README.md
```

**Structure Decision**: Keep the change inside the existing shared RDF import path. `Rdf.Import` owns predicate precedence and edge-annotation mapping, `FFI.Oxigraph.*` only changes if an additional parsed term shape becomes unavoidable, `Viewer.purs` remains the caller, `validate-action/action.yml` verifies supported RDF input, and `README.md` documents the accepted RDF contract.

## Phase 0: Research Outcomes

- Choose deterministic fallback precedence: existing `gb:` predicates first, then standard RDF predicates.
- Use `dcterms:description` for node description fallback.
- Use `foaf:page` first and `rdfs:seeAlso` second for external-link fallback when no `gb:externalLink` structure exists.
- Support edge descriptions through standard RDF reification first; do not require RDF-star support in this iteration.
- Keep the parser output as simple quads; implement annotation matching in PureScript instead of moving import semantics into JS.

## Phase 1: Design Plan

1. Extend `Rdf.Import` with declarative predicate lookup helpers for literals, named-node fallbacks, and precedence rules.
2. Add node import support for standard description and link predicates without regressing `gb:externalLink`.
3. Add edge-description extraction from reified statements that point back to an imported source/predicate/target triple.
4. Preserve current `gb:EdgeAssertion` handling as the highest-precedence source for edge hover text.
5. Add focused tests and validation fixtures for:
   - `dcterms:description`
   - `foaf:page`
   - `rdfs:seeAlso`
   - reified edge descriptions
   - precedence when both gb and standard predicates exist
6. Update user-facing docs to state the supported predicate set and precedence rules explicitly.

## Validation Strategy

| Check | Purpose | Expected Result |
|-------|---------|-----------------|
| RDF import fixture test | Verify fallback semantics in PureScript | Imported graph matches expected node links, descriptions, and edge hover text |
| Existing RDF fixture regression | Verify gb-vocabulary compatibility | Existing gb-based RDF import behavior stays unchanged |
| `just ci` | Verify build, test, and bundle integrity | Full CI passes |
| Validate action with RDF-backed repo fixture | Verify CI-facing input contract | Supported standard-predicate datasets parse and validate |

## Complexity Tracking

No constitution exceptions or extra complexity waivers are required for this plan.
