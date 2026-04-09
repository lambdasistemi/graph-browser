# Feature Specification: Make RDF the Only Graph Source of Truth

**Feature Branch**: `010-rdf-only-source-truth`  
**Created**: 2026-04-09  
**Status**: Draft  
**Input**: User description: "Make RDF the only graph source of truth and remove graph.json authoring"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Maintain the self-graph from RDF only (Priority: P1)

As a maintainer of graph-browser, I want the repository’s own graph to be authored and regenerated from RDF/Turtle only, so the repo no longer carries `data/graph.json` as a competing source of truth.

**Why this priority**: The user explicitly wants the two-source-of-truth problem removed before any more ontology work continues.

**Independent Test**: Remove `data/graph.json`, run the normal build and RDF-generation workflow, and verify the self-graph still renders and the repository still builds successfully.

**Acceptance Scenarios**:

1. **Given** the graph-browser repo, **When** the maintainer updates the self-graph, **Then** RDF/Turtle is the authoritative representation and `data/graph.json` is not required.
2. **Given** the build and docs workflow, **When** it runs in this repo, **Then** it succeeds without reading `data/graph.json`.

---

### User Story 2 - Validate RDF-first repositories in CI (Priority: P1)

As a maintainer of an RDF-backed graph-browser dataset, I want CI to validate configurations that use `graphSources` without needing a duplicate JSON graph file, so RDF-first repos are treated as first-class.

**Why this priority**: The self-graph already uses `graphSources`, and current validation still assumes JSON too strongly.

**Independent Test**: Run the validation flow on a repo that has `config.json` with ordered `graphSources` and no `graph.json`, and verify the action succeeds for valid RDF inputs and fails clearly for missing RDF sources.

**Acceptance Scenarios**:

1. **Given** `config.json` with `graphSources`, **When** validation runs, **Then** it checks the RDF sources without requiring `graph.json`.
2. **Given** an RDF source listed in `graphSources` is missing or malformed, **When** validation runs, **Then** validation fails with a clear RDF-specific error.

---

### User Story 3 - Understand the repo and product as RDF-first (Priority: P2)

As a user or downstream maintainer reading the docs and using the packaged lib, I want graph-browser to present RDF as the primary graph representation so the product no longer signals that JSON is the default source of truth.

**Why this priority**: Even if the runtime works, the repo still misleads users if docs and defaults keep describing `graph.json` as primary.

**Independent Test**: Inspect the README, packaged defaults, and self-graph content references. They should describe RDF-backed configuration as primary for this repo and no longer claim that `graph.json` is the authored self-graph source.

**Acceptance Scenarios**:

1. **Given** the README and related prompts, **When** a user reads the setup instructions, **Then** RDF-backed graphs are presented as the primary path for this repo.
2. **Given** the self-graph application and docs, **When** a user inspects references to the graph source, **Then** they no longer describe `data/graph.json` as the authoritative graph source for graph-browser itself.

### Edge Cases

- What happens when a downstream repo still uses only `graph.json`? Existing compatibility may remain, but it must be explicitly described as compatibility rather than the canonical self-graph authoring path.
- What happens when `config.json` declares multiple RDF sources in order? Validation and export must respect the full ordered list, not just the legacy singleton `graphSource`.
- What happens when the RDF import cannot reconstruct the graph-browser model needed for export or validation? The failure must be explicit and block the build rather than silently falling back to stale JSON.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The graph-browser repository MUST no longer require `data/graph.json` as an authored source for its own self-graph.
- **FR-002**: The repository build and documentation workflows MUST operate from RDF-backed graph sources declared in `config.json`.
- **FR-003**: The RDF export/generation workflow MUST be able to derive its graph model from configured RDF sources, not only from `graph.json`.
- **FR-004**: The validation workflow MUST accept RDF-backed configurations that use `graphSources` without requiring `graph.json`.
- **FR-005**: The product documentation MUST stop describing `graph.json` as the primary self-graph source of truth for this repo.
- **FR-006**: Any remaining JSON graph support MUST be treated as compatibility behavior, not the canonical self-graph workflow.

### Key Entities *(include if feature involves data)*

- **Self-Graph Source**: The authoritative representation of the graph-browser repository’s own graph content.
- **RDF Graph Source List**: The ordered `graphSources` entries declared in `config.json` and used for runtime loading and validation.
- **Compatibility JSON Graph**: Any remaining support for `graph.json` kept only for backward compatibility with downstream repos.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The graph-browser repo builds and serves its self-graph successfully with no `data/graph.json` present.
- **SC-002**: Validation passes for the repo’s RDF-backed configuration without requiring `graph.json`.
- **SC-003**: The README and primary user-facing setup guidance no longer describe `graph.json` as the self-graph’s source of truth.
- **SC-004**: Follow-up ontology publication work can proceed without depending on parallel JSON and RDF graph authoring in this repo.

## Assumptions

- The existing Turtle data under `data/rdf/` is sufficiently complete to serve as the repository’s authoritative self-graph input.
- `config.json` remains the stable entry point for viewer metadata and graph source declarations.
- Downstream JSON compatibility may remain temporarily, but the graph-browser repo itself will be migrated first.
