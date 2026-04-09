# Implementation Plan: Publish Dereferenceable Ontology Namespaces

**Branch**: `009-publish-ontology-namespaces` | **Date**: 2026-04-09 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/009-publish-ontology-namespaces/spec.md`

## Summary

Publish real namespace documents at the existing `https://lambdasistemi.github.io/graph-browser/vocab/...` URLs by generating them automatically from ontology Turtle during the build/deploy path. The implementation should preserve the current ontology IRIs, keep the viewer’s ontology identity UI, and move namespace publication into a reusable automation path so downstream repos can publish their own ontology namespaces without writing hardcoded term catalogs.

## Technical Context

**Language/Version**: PureScript (Spago), JavaScript FFI only where already present, shell/GitHub Actions for build wiring  
**Primary Dependencies**: Halogen, Oxigraph WASM FFI, MkDocs, GitHub Pages workflow  
**Storage**: Static files in the deployed Pages artifact  
**Testing**: `just test`, `nix build`, Pages-style local build, manual browser verification against local build and deployed preview  
**Target Platform**: Browser and GitHub Pages static hosting  
**Project Type**: Web application plus generated static documentation assets  
**Performance Goals**: Namespace publication should fit inside the existing docs/build workflow without adding a large custom maintenance burden  
**Constraints**: Preserve existing ontology IRIs; keep Turtle as source of truth; avoid per-project hardcoded term inventories; make the publication path reusable  
**Scale/Scope**: Graph-browser core vocabulary plus repository-derived kinds, groups, and edge predicates, with a reusable path for downstream repos

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Data-Driven, Zero Hardcoding | PASS | Namespace pages must be derived from Turtle triples, not maintained term-by-term in source |
| II. PureScript for Logic, JS FFI for Rendering | PASS | Parsing/generation logic belongs in PureScript; no new JS business logic is needed |
| III. Nix-First Builds | PASS | Publication belongs in the existing Nix-backed build/deploy flow |
| IV. Library/App Split | PASS | Viewer identity rendering remains shared; namespace publication is a deploy-time artifact concern |
| V. Schema-Validated Data | PASS | No new JSON schema is required; ontology publication is derived from TTL inputs already produced by the repo |
| VI. Accessibility of Information | PASS | This feature directly improves inspectability and trust of ontology-backed content |

## Project Structure

### Documentation (this feature)

```text
specs/009-publish-ontology-namespaces/
├── plan.md
├── research.md
├── data-model.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── Viewer.purs                 # REUSE/MODIFY if needed: ontology identity in the right panel
├── Rdf/
│   ├── Export.purs            # REUSE: ontology IRIs and exported TTL remain authoritative inputs
│   └── Export/
│       └── Main.purs          # POSSIBLE REUSE if namespace generation is wired near export
├── Ontology/
│   └── ...                    # POSSIBLE NEW/REUSED parsing/publishing logic derived from TTL
└── FFI/
    └── Node.purs/.js          # REUSE: writing generated namespace pages into dist

justfile                        # MODIFY: add namespace generation into the build/docs path
.github/workflows/pages.yml     # MODIFY: ensure deployed Pages artifact contains generated /vocab/... pages
README.md                       # MODIFY: document namespace publication and fragment behavior
docs/                           # OPTIONAL MODIFY: link human docs to the published namespace pages
```

**Structure Decision**: Keep ontology publication derived from Turtle and wire it into the existing build/deploy path. Avoid introducing a repo-specific hardcoded vocabulary module that would have to be rewritten in downstream repos.

## Design Decisions

### D1: Preserve existing ontology IRIs

**Decision**: Keep the current `https://lambdasistemi.github.io/graph-browser/vocab/...#...` IRIs unchanged.

**Rationale**: Existing RDF exports and downstream references already use these identifiers. The problem is publication, not naming.

### D2: Generate namespace pages from Turtle

**Decision**: Build namespace pages by reading ontology Turtle inputs or triples derived from them.

**Rationale**: Turtle is the ontology source of truth. Downstream repos should not need to maintain hand-written term catalogs in code.

### D3: Put namespace publication in the build/deploy path

**Decision**: The Pages artifact assembly must generate `/vocab/terms`, `/vocab/kinds`, `/vocab/groups`, and `/vocab/edges`.

**Rationale**: The feature only matters if the deployed site contains those paths. Local-only generation is insufficient.

### D4: Keep viewer ontology provenance in scope

**Decision**: The right-hand panel continues to show compact prefixed terms, full term links, and namespace links only when ontology provenance exists.

**Rationale**: Publishing namespace pages alone is not enough unless users can navigate to them from the graph UI.

### D5: Human-readable first, reusable later

**Decision**: First iteration generates stable human-readable namespace pages from TTL, with links back to the underlying ontology artifacts.

**Rationale**: This satisfies dereferenceability now and creates the right reusable abstraction for downstream repos without blocking on content negotiation.
