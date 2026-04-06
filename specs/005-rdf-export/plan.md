# Implementation Plan: RDF Export for Graph Data Interoperability

**Branch**: `005-rdf-export` | **Date**: 2026-04-06 | **Spec**: [spec.md](spec.md)

## Summary

Add a deterministic RDF export pipeline that converts `data/config.json` and `data/graph.json` into linked-data artifacts, publishes them with the existing build output, and validates them in CI. The export keeps JSON as the authoring source of truth while defining a shared graph-browser vocabulary that future RDF import and SPARQL features can consume.

## Technical Context

**Language/Version**: PureScript app plus Bash/Node-based GitHub Actions and repository scripts  
**Primary Dependencies**: Node.js, existing `validate-action`, existing `build-action`, JSON source schemas  
**Storage**: Repository `data/` directory plus generated RDF files in build output  
**Testing**: Schema validation, referential integrity checks, RDF syntax validation in CI  
**Target Platform**: GitHub Actions runners and static site output on GitHub Pages  
**Project Type**: Library + App + GitHub Actions + data export tooling  
**Performance Goals**: Export should complete fast enough for repository CI on the current self-graph dataset  
**Constraints**: Preserve JSON as source of truth, keep builds reproducible, avoid hardcoded domain semantics outside the shared vocabulary  
**Scale/Scope**: Single-dataset export first, multi-dataset interoperability by shared terms and collision-free URIs

## Constitution Check

| Gate | Status | Notes |
|------|--------|-------|
| Data-Driven, Zero Hardcoding | Pass | RDF is derived from graph data and config, not encoded by hand in app logic |
| PureScript for Logic, JS FFI for Rendering | Pass | This feature is export/validation tooling; no new rendering logic required |
| Nix-First Builds | Pass | Export tooling must run in the existing reproducible dev/build environment |
| Library/App Split | Pass | RDF export is data-pipeline work shared by both app and lib consumers |
| Schema-Validated Data | Pass with follow-up | Existing JSON schemas remain authoritative; RDF validation is added as an extra gate |
| Accessibility of Information | Pass | RDF broadens reuse without changing the authored graph semantics |

## Project Structure

### Documentation (this feature)

```text
specs/005-rdf-export/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
└── tasks.md
```

### Source Code Changes

```text
schema/
  manifest.schema.json            # extend with RDF artifact metadata
  rdf-export.schema.json          # optional schema for generated export manifest

scripts/
  export-rdf.mjs                  # new deterministic JSON -> RDF exporter
  validate-rdf.mjs                # new RDF-specific validation entrypoint

build-action/
  action.yml                      # generate/publish RDF files during site assembly

validate-action/
  action.yml                      # validate RDF output and stale artifact consistency

data/
  rdf/                            # generated dogfood RDF artifacts for graph-browser itself
```

**Structure Decision**: Keep the implementation in repository-local Node scripts invoked from the existing GitHub composite actions. This keeps export logic out of the PureScript viewer and makes the feature reusable by downstream data repositories.

## Phase 0: Research Decisions

1. Choose the canonical RDF serializations:
   - Turtle as the human-reviewable export format
   - One machine-oriented secondary format for tooling interoperability
2. Define the URI strategy:
   - Dataset base IRI
   - Node resource path pattern
   - Stable normalization rule for edge-label predicates
3. Decide how edge metadata is represented:
   - Direct triples for traversal
   - Supplemental metadata structure that preserves label and description without losing the simple graph edge semantics
4. Define the boundary with issue #33:
   - Export may ship a minimal project vocabulary now
   - The vocabulary must be compatible with later ontology formalization

## Phase 1: Export Data Model

**Goal**: Specify exactly what RDF gets generated from the existing JSON model.

1. Dataset metadata
   - Graph title, description, source URL, export timestamp/version, and dataset base IRI

2. Node mapping
   - `node.id` -> dataset-scoped URI
   - `node.kind` -> shared class IRI
   - `node.group` -> shared group term or dataset-scoped organizational resource
   - `node.label`, `node.description`, `node.links` -> descriptive predicates

3. Edge mapping
   - `edge.label` -> shared predicate IRI via deterministic normalization
   - `edge.source` / `edge.target` -> subject/object node URIs
   - `edge.description` and original label text -> preserved as edge annotations in a recoverable form

4. Export manifest
   - Record where Turtle and secondary RDF outputs were written
   - Record the vocabulary version used by the export

## Phase 2: Tooling Integration

**Goal**: Make RDF export part of the normal repository workflow.

1. Add `scripts/export-rdf.mjs`
   - Input: `data/config.json`, `data/graph.json`
   - Output: generated RDF files plus an export manifest
   - Deterministic ordering so diffs are stable in git and CI

2. Update `build-action/action.yml`
   - Generate RDF as part of site assembly
   - Copy RDF files into the built `site/data/` tree
   - Surface clear logs listing exported files

3. Update `validate-action/action.yml`
   - Run the exporter in validation mode or compare committed outputs to regenerated ones
   - Validate RDF syntax for each generated artifact
   - Fail on mismatches between JSON source data and RDF output

4. Update schema/manifest handling
   - Extend manifest metadata so downstream repos can advertise RDF artifact locations if needed
   - Keep backward compatibility with repos that only publish JSON for now

## Phase 3: Dogfooding and Interoperability Proof

**Goal**: Prove the export is usable beyond a single repository.

1. Export graph-browser’s own `data/` directory into RDF
2. Check in generated artifacts if the repo chooses committed outputs, or verify them in CI if outputs are build-only
3. Add a small interoperability proof:
   - document one example query over the exported self-graph
   - verify that shared vocabulary terms remain stable across repeated exports

## Validation Strategy

| Check | Scope | Failure Condition |
|-------|-------|-------------------|
| JSON source validation | Existing data files | Source JSON does not pass current schemas or referential integrity |
| RDF syntax validation | Generated Turtle and secondary format | RDF parser rejects generated output |
| Deterministic regeneration | Export outputs | Regenerated RDF differs from checked-in or staged artifact unexpectedly |
| Coverage check | Export mapping | Any source node or edge is missing from RDF |
| Vocabulary stability | Shared terms | Same kind or edge label maps to different IRIs across exports |
| URI collision safety | Multi-dataset mergeability | Two datasets could produce the same node URI for different resources |

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Edge annotations are awkward in plain RDF triples | Loss of edge metadata or round-trip fidelity | Separate traversal predicate from preserved edge metadata in a documented pattern |
| Base IRI selection is unstable across repositories | Broken mergeability and changing URIs | Derive base IRI from explicit dataset metadata with deterministic fallback |
| Vocabulary evolves later in issue #33 | Export churn or incompatible consumers | Keep the first vocabulary minimal, versioned, and intentionally aligned with #33 |
| CI adds new parser/tool dependencies | Build instability | Use lightweight Node-based tooling already compatible with the repo’s Nix environment |

## Dependencies

- **Issue #33** influences the long-term ontology shape, but this feature can proceed with a minimal compatible vocabulary if #33 is not finished first
- **Issue #41** depends on this feature to provide RDF data for query-based navigation
