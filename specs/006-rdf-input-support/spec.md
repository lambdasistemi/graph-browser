# Feature Specification: RDF Input Support For Downstream Graph Providers

**Feature Branch**: `006-rdf-input-support`
**Created**: 2026-04-06
**Status**: Draft
**Input**: GitHub issue #33 — RDF input support for downstream graph providers

## User Scenarios & Testing

### User Story 1 - Render a graph from RDF while keeping config.json (Priority: P1)

A downstream data provider keeps `data/config.json` as the stable entry point, but replaces `data/graph.json` with an RDF asset declared in that config. The viewer loads the RDF, maps it into the existing in-memory graph model, and renders the graph exactly like a JSON-backed repo.

**Why this priority**: This is the missing runtime half of the RDF interoperability work. Without it, downstream providers cannot switch from JSON graph files to RDF.

**Independent Test**: Point the viewer at a repo that has `data/config.json` plus an RDF graph source declaration and no `data/graph.json`. The graph renders with the same node and edge behavior as before.

**Acceptance Scenarios**:

1. **Given** a repo with `data/config.json` declaring an RDF graph source, **When** the viewer initializes, **Then** it loads the RDF graph and renders nodes and edges without requiring `data/graph.json`
2. **Given** the same repo, **When** the RDF uses the published graph-browser vocabulary for kinds, groups, and edge assertions, **Then** the importer reconstructs the graph-browser node and edge catalog
3. **Given** a repo with the existing JSON files only, **When** the viewer initializes, **Then** behavior is unchanged

---

### User Story 2 - Validate RDF-backed repos in CI (Priority: P1)

A maintainer wants CI to accept RDF-backed repos without forcing them to keep a duplicate `graph.json`. Validation still checks `config.json`, confirms the RDF source file exists, and rejects unreadable RDF input early.

**Why this priority**: Runtime support without CI support still leaves downstream providers blocked.

**Independent Test**: Run the validate action on a repo with `config.json` pointing at RDF and no `graph.json`. Validation passes for valid RDF and fails for missing or malformed RDF.

**Acceptance Scenarios**:

1. **Given** `config.json` with `graphSource`, **When** the validate action runs, **Then** it validates config and parses the RDF source without requiring `graph.json`
2. **Given** a bad RDF file, **When** validation runs, **Then** the action fails with a parse error
3. **Given** a JSON-backed repo, **When** validation runs, **Then** the existing graph and tutorial checks still run unchanged

## Edge Cases

- What happens when both `graph.json` and `graphSource` are present? The configured RDF source wins only when explicitly declared; otherwise JSON remains the default.
- What happens when RDF is missing graph-browser metadata for a node or edge? Import fails with a clear error rather than silently inventing values.
- What happens when the RDF syntax is Turtle or JSON-LD instead of N-Quads? The importer uses the declared format from `config.json`.

## Requirements

### Functional Requirements

- **FR-001**: The system MUST keep `data/config.json` as the stable configuration entry point
- **FR-002**: The system MUST keep `data/graph.json` supported for backward compatibility
- **FR-003**: `config.json` MUST be able to declare an alternative RDF graph source with a path and RDF format
- **FR-004**: The viewer MUST load the configured RDF graph source and map it into the existing graph-browser graph model
- **FR-005**: The RDF import mapping MUST be implemented in PureScript; JavaScript MAY only provide thin parser FFI
- **FR-006**: The importer MUST reconstruct node IDs, labels, kinds, groups, descriptions, links, and edge records from the RDF vocabulary already published by graph-browser
- **FR-007**: The validate action MUST accept RDF-backed repos that omit `graph.json`
- **FR-008**: The validate action MUST fail clearly when the configured RDF source is missing or cannot be parsed

### Key Entities

- **Graph Source**: The configured payload backing the graph, either legacy JSON or an RDF asset declared in `config.json`
- **RDF Graph Source**: A file such as Turtle, JSON-LD, or N-Quads containing graph-browser vocabulary terms and instance data
- **Imported Graph**: The in-memory graph-browser graph reconstructed from RDF and passed to the existing viewer flow

## Success Criteria

- **SC-001**: A repo can render successfully with `config.json` plus RDF graph data and no `graph.json`
- **SC-002**: Existing JSON-backed repos continue to work with zero changes
- **SC-003**: RDF import keeps the existing node/edge rendering and interaction behavior intact
- **SC-004**: CI rejects unreadable RDF-backed repos before deployment
