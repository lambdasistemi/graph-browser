# Feature Specification: RDF Export for Graph Data Interoperability

**Feature Branch**: `005-rdf-export`
**Created**: 2026-04-06
**Status**: Draft
**Input**: GitHub issue #30 — RDF export for graph data interoperability

## User Scenarios & Testing

### User Story 1 - Export an existing graph dataset as RDF (Priority: P1)

A graph author keeps writing `data/graph.json` and `data/config.json` in the current format, then runs the existing build or validation workflow and receives RDF artifacts for the same graph. The RDF output gives every node a stable URI, maps node kinds to RDF classes, maps edges to RDF predicates, and preserves the human-readable metadata needed for downstream linked-data tools.

**Why this priority**: Export is the immediate scope called out in the issue. Without a reliable RDF export, there is no interoperability surface to build on.

**Independent Test**: Run the export on a valid `data/` directory and inspect the generated Turtle or JSON-LD. Every JSON node and edge is represented in RDF with stable identifiers and recoverable metadata.

**Acceptance Scenarios**:

1. **Given** a valid `data/config.json` and `data/graph.json`, **When** the export runs, **Then** it produces at least one RDF artifact containing every node and edge from the source graph
2. **Given** a node with `id`, `label`, `kind`, `group`, `description`, and `links`, **When** it is exported, **Then** the RDF output contains a stable URI for that node plus triples for those properties
3. **Given** an edge with `source`, `target`, `label`, and `description`, **When** it is exported, **Then** the RDF output contains a predicate triple between the exported node URIs plus annotation metadata for the edge label and description

---

### User Story 2 - Publish and validate RDF artifacts in the pipeline (Priority: P1)

A maintainer enables RDF export in the existing GitHub Action workflow. CI validates that the RDF export is syntactically correct and consistent with the source JSON data, and the build action publishes the generated RDF files alongside the existing site assets.

**Why this priority**: Export that only works locally is not enough. The issue explicitly allows export as a CLI or as a build/validate pipeline step, and maintainers need a repeatable path.

**Independent Test**: Run the validate/build actions on a repository with valid graph data. The workflow emits RDF artifacts and fails if the export is malformed or inconsistent.

**Acceptance Scenarios**:

1. **Given** a repository using the standard graph-browser `data/` layout, **When** the validation workflow runs, **Then** it checks the generated RDF artifacts for syntax and structural consistency
2. **Given** a successful site build, **When** the build action completes, **Then** the exported RDF files are available in the assembled output beside the existing JSON assets
3. **Given** invalid source data that prevents a coherent RDF mapping, **When** export runs in CI, **Then** the workflow fails with a message identifying the conflicting source record

---

### User Story 3 - Merge multiple graph exports through a shared vocabulary (Priority: P2)

An analyst exports two different graph-browser datasets and loads both RDF outputs into a linked-data tool. Because the exports use the same vocabulary and predictable URI rules, the analyst can query across both graphs without reverse-engineering each dataset’s private conventions.

**Why this priority**: Interoperability is the reason for introducing RDF, but it depends on a functioning export first.

**Independent Test**: Export two datasets that share some kinds, groups, and relationship labels. Load both into one RDF store and verify that a cross-dataset query can target those shared terms.

**Acceptance Scenarios**:

1. **Given** two graph-browser datasets exported independently, **When** both are loaded into one RDF store, **Then** shared graph-browser vocabulary terms are identical across both exports
2. **Given** two datasets that both use the same node kind or edge label, **When** they are exported, **Then** those concepts resolve to the same vocabulary IRIs rather than dataset-specific duplicates
3. **Given** dataset-local node IDs that happen to have the same string value, **When** both datasets are exported, **Then** their node URIs remain distinct and collision-free

---

### User Story 4 - Prepare for future RDF import and SPARQL navigation (Priority: P3)

A future implementer wants to consume the exported RDF in graph-browser or query it through SPARQL. The export format already preserves enough information to reconstruct graph-browser nodes and edges without inventing undocumented conventions later.

**Why this priority**: Import is explicitly future scope in the issue. The export should not block that future, but it does not need to implement it now.

**Independent Test**: Review the exported RDF and confirm there is enough information to infer node records, edge records, and dataset metadata needed by a future importer.

**Acceptance Scenarios**:

1. **Given** an exported RDF graph, **When** a future importer reads it, **Then** it can recover node identity, labels, kinds, groups, and descriptions from the RDF alone
2. **Given** an exported RDF graph, **When** a future importer reads relationship triples, **Then** it can recover the original graph-browser edge label and description metadata

### Edge Cases

- What happens when two datasets contain the same node ID? Export must namespace node URIs by dataset identity so merged graphs do not collide.
- What happens when an edge label contains spaces or punctuation? Export must map it to a stable predicate IRI and preserve the original human-readable label separately.
- What happens when optional node links are absent? Export still succeeds and simply omits link triples.
- What happens when `sourceUrl` is empty or unsuitable as a URI base? Export must fall back to a deterministic local base IRI rather than producing invalid identifiers.
- What happens when the source JSON changes after RDF artifacts were committed? CI must detect stale or inconsistent RDF output.

## Requirements

### Functional Requirements

- **FR-001**: System MUST export the current `data/graph.json` and `data/config.json` model into RDF without requiring authors to rewrite their source data format
- **FR-002**: System MUST produce Turtle output for every export run
- **FR-003**: System MUST also support a machine-friendly RDF serialization for downstream tooling, either JSON-LD or N-Quads
- **FR-004**: System MUST assign every dataset a stable base IRI and derive node URIs from that base plus the node ID
- **FR-005**: System MUST ensure node URIs from different datasets remain distinct even when node IDs are identical
- **FR-006**: System MUST map each node kind to a stable vocabulary term that is shared across exported datasets
- **FR-007**: System MUST map each edge label to a stable vocabulary term that is shared across exported datasets
- **FR-008**: System MUST preserve each node’s label, group, description, and external links in the RDF output
- **FR-009**: System MUST preserve each edge’s human-readable label and description in the RDF output, even when the executable predicate IRI is normalized
- **FR-010**: System MUST emit dataset-level metadata describing the exported graph so downstream tools can identify the graph source
- **FR-011**: System MUST expose the export through a repeatable project workflow, either a repository CLI command or the existing validate/build action pipeline
- **FR-012**: System MUST validate that generated RDF is syntactically correct before publishing it in CI
- **FR-013**: System MUST fail export when required source records cannot be converted into a coherent RDF graph
- **FR-014**: System MUST document the graph-browser RDF vocabulary used by the export
- **FR-015**: System MUST keep the JSON source format as the authoring source of truth for this feature scope
- **FR-016**: System MUST preserve enough RDF information for a future importer to reconstruct graph-browser nodes and edges without consulting undocumented side channels

### Key Entities

- **Dataset IRI**: The canonical identifier for one exported graph-browser dataset. It namespaces node URIs and identifies the source graph in merged RDF stores.
- **Node Resource**: The RDF resource representing one graph-browser node, including its stable URI and descriptive properties.
- **Relationship Predicate**: The normalized vocabulary IRI used for an edge label when connecting two node resources.
- **Relationship Assertion**: The RDF representation of one graph-browser edge, including the subject node, predicate, object node, and preserved annotation metadata.
- **Vocabulary Term**: A shared RDF class or property IRI representing graph-browser concepts such as node kinds, edge labels, groups, or dataset metadata.
- **Export Manifest**: The build-time description of which RDF files were generated and where downstream tools can find them.

## Success Criteria

### Measurable Outcomes

- **SC-001**: A valid graph-browser dataset exports to RDF with 100% coverage of source nodes and edges
- **SC-002**: CI catches malformed or stale RDF artifacts before publication for every repository using the export workflow
- **SC-003**: Two independently exported datasets can be loaded into one RDF store and queried with shared graph-browser vocabulary terms without manual remapping
- **SC-004**: A future importer can reconstruct the original node and edge catalog from the exported RDF with no missing required fields

## Assumptions

- Existing repositories continue to author `graph.json` and `config.json`; RDF is an additional published representation, not an immediate replacement
- The lightweight graph-browser ontology may begin as a project-local vocabulary and later be formalized further in issue #33 without breaking exported data
- Tutorials and views are out of scope for the first export increment unless they are needed for dataset metadata consistency
- The initial implementation can treat RDF import and in-browser SPARQL querying as follow-on work rather than part of this ticket
