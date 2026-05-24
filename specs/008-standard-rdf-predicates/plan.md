# Implementation Plan: Standard RDF Predicates As Primary Data Source

**Branch**: `008-standard-rdf-predicates` | **Date**: 2026-04-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-standard-rdf-predicates/spec.md`

## Summary

Extend the existing RDF importer so graph-browser can read standard RDF predicates as fallback sources for node descriptions, external links, and edge hover text, while keeping current `gb:` predicates authoritative. Preserve standard ontology IRIs strongly enough that the right pane can link to their documentation instead of stripping them down to local labels. Keep the mapping logic in PureScript, use the existing Oxigraph quad parser, and start with standard RDF reification for edge annotations rather than introducing a new parser shape for RDF-star.

## Technical Context

**Language/Version**: PureScript with JavaScript FFI on the existing Spago workspace  
**Primary Dependencies**: Halogen, Argonaut, Oxigraph `0.5.6`, Cytoscape.js  
**Storage**: N/A at runtime beyond existing in-memory graph import and browser localStorage for viewer state  
**Testing**: `spago test` via `just ci`, targeted RDF import fixtures, validate-action RDF parsing checks  
**Target Platform**: Browser-hosted viewer plus Node-based validation/build scripts
**Project Type**: Web application plus reusable viewer library  
**Performance Goals**: Preserve current RDF import responsiveness for repo-scale graphs and avoid extra full-graph passes beyond what is needed for fallback lookup  
**Constraints**: Preserve backward compatibility for JSON-backed repos and existing gb-vocabulary RDF repos; keep import semantics in PureScript; avoid inventing domain logic in JavaScript  
**Scale/Scope**: One importer and details-pane enhancement touching RDF-backed datasets, UI metadata preservation, validation expectations, and documentation of supported RDF predicate precedence

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

**Structure Decision**: Keep the change inside the existing shared RDF import path plus the existing details UI. `Rdf.Import` owns predicate precedence, ontology-reference preservation, and edge-annotation mapping; `Graph.Types.purs` carries any extra metadata the UI needs; `Viewer.purs` renders clickable ontology links in the right pane; `FFI.Oxigraph.*` only changes if an additional parsed term shape becomes unavoidable; `validate-action/action.yml` verifies supported RDF input; and `README.md` documents the accepted RDF contract.

## Phase 0: Research Outcomes

- Choose deterministic fallback precedence: existing `gb:` predicates first, then standard RDF predicates.
- Use `dcterms:description` for node description fallback.
- Use `foaf:page` first and `rdfs:seeAlso` second for external-link fallback when no `gb:externalLink` structure exists.
- Support edge descriptions through standard RDF reification first; do not require RDF-star support in this iteration.
- Keep the parser output as simple quads; implement annotation matching in PureScript instead of moving import semantics into JS.
- Preserve ontology IRIs for standard node and edge semantics so the right pane can link to term documentation instead of only showing stripped labels.

## Phase 1: Design Plan

1. Extend `Graph.Types.purs` and `Rdf.Import.purs` so imported node and edge records can preserve ontology references alongside rendered labels.
2. Add node import support for standard description and link predicates without regressing `gb:externalLink`.
3. Add edge-description extraction from reified statements that point back to an imported source/predicate/target triple.
4. Preserve current `gb:EdgeAssertion` handling as the highest-precedence source for edge hover text.
5. Update `Viewer.purs` so the right pane renders clickable ontology documentation links when preserved ontology IRIs are available.
6. Add focused tests and validation fixtures for:
   - `dcterms:description`
   - `foaf:page`
   - `rdfs:seeAlso`
   - reified edge descriptions
   - ontology-reference preservation in the right pane
   - precedence when both gb and standard predicates exist
7. Update user-facing docs to state the supported predicate set, precedence rules, and ontology-link behavior explicitly.

## Validation Strategy

| Check | Purpose | Expected Result |
|-------|---------|-----------------|
| RDF import fixture test | Verify fallback semantics in PureScript | Imported graph matches expected node links, descriptions, and edge hover text |
| Existing RDF fixture regression | Verify gb-vocabulary compatibility | Existing gb-based RDF import behavior stays unchanged |
| `just ci` | Verify build, test, and bundle integrity | Full CI passes |
| Validate action with RDF-backed repo fixture | Verify CI-facing input contract | Supported standard-predicate datasets parse and validate |

## Complexity Tracking

No constitution exceptions or extra complexity waivers are required for this plan.
