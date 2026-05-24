# Feature Specification: Standard RDF Predicates As Primary Data Source

**Feature Branch**: `008-standard-rdf-predicates`  
**Created**: 2026-04-09  
**Status**: Draft  
**Input**: GitHub issue #49 — Support standard RDF predicates as primary data source

## User Scenarios & Testing

### User Story 1 - Read standard node metadata directly from RDF (Priority: P1)

A dataset author already has RDF data using standard vocabularies such as Dublin Core, FOAF, and RDFS. They point graph-browser at that data and expect node descriptions and external links to appear without duplicating the same information into graph-browser-specific predicates.

**Why this priority**: This is the core user value of the request. Without it, every dataset still has to duplicate basic semantic content into `gb:` triples.

**Independent Test**: Load RDF where nodes use `dcterms:description`, `foaf:page`, or `rdfs:seeAlso`, with no `gb:description` or `gb:externalLink` triples. The viewer shows the same descriptions and outbound links a user would expect from a gb-annotated dataset.

**Acceptance Scenarios**:

1. **Given** RDF data where a node has `dcterms:description` and no `gb:description`, **When** the graph is imported, **Then** the node description shown in graph-browser comes from `dcterms:description`
2. **Given** RDF data where a node has `foaf:page` and no `gb:externalLink`, **When** the graph is imported, **Then** graph-browser exposes that page as the node's external link
3. **Given** RDF data where a node has `rdfs:seeAlso` and no `gb:externalLink`, **When** the graph is imported, **Then** graph-browser exposes that reference as the node's external link
4. **Given** RDF data where both graph-browser-specific and standard predicates are present for the same field, **When** the graph is imported, **Then** the graph-browser-specific value remains authoritative

---

### User Story 2 - Attach edge hover text without gb:EdgeAssertion boilerplate (Priority: P1)

A dataset author wants edge descriptions in the viewer but does not want to encode them exclusively through the current `gb:EdgeAssertion` structure. They want graph-browser to accept descriptions attached to the edge triple itself through standard RDF annotation patterns.

**Why this priority**: Edge descriptions are currently the biggest remaining place where gb-specific structure leaks into the semantic layer and forces duplication.

**Independent Test**: Load RDF that carries an edge description via an annotated triple pattern, without a `gb:EdgeAssertion` node. The viewer shows the edge hover text.

**Acceptance Scenarios**:

1. **Given** RDF data where an edge triple has an associated description through a supported annotation pattern, **When** the graph is imported, **Then** graph-browser shows that description as hover text for the corresponding edge
2. **Given** RDF data where the same edge also has a `gb:EdgeAssertion` description, **When** the graph is imported, **Then** the graph-browser-specific edge description remains authoritative
3. **Given** RDF data with no supported edge description metadata, **When** the graph is imported, **Then** the edge still renders normally without hover text

---

### User Story 3 - Keep gb: vocabulary focused on presentation hints (Priority: P2)

A dataset author uses standard ontologies such as PROV-O, SKOS, FOAF, and Dublin Core as the primary semantic layer and wants graph-browser-specific terms only where they represent browser presentation concepts with no standard equivalent, such as kind, group, color, or shape.

**Why this priority**: This is the architectural outcome the issue is pushing toward, but it depends on the P1 stories already working.

**Independent Test**: Load a dataset whose domain semantics are expressed primarily through standard vocabularies and whose `gb:` triples are limited to rendering hints. The graph remains usable without duplicating semantic content into `gb:` fields.

**Acceptance Scenarios**:

1. **Given** a dataset that uses standard vocabularies for descriptions, references, and domain relationships, **When** it is loaded into graph-browser, **Then** graph-browser renders it without requiring duplicate gb-specific semantic triples
2. **Given** a dataset that still uses the current gb-specific predicates everywhere, **When** it is loaded into graph-browser, **Then** existing behavior is unchanged

---

### User Story 4 - Link imported ontology terms to their documentation (Priority: P2)

A graph-browser user hovers or inspects a node or edge whose semantics come from a standard ontology term such as FOAF, OWL, SKOS, PROV-O, or Dublin Core. They want the right pane to preserve the underlying ontology reference instead of stripping it down to plain text, and they want a clickable link to the ontology term documentation when that term is a standard IRI.

**Why this priority**: Standard-predicate support is less useful if the UI discards the identity of the ontology term. The user needs to see not just the rendered label, but where that label comes from.

**Independent Test**: Load RDF where a node kind or edge predicate comes from a standard ontology IRI. Open the node or edge details in the right pane. Verify the pane includes a clickable link to the ontology term rather than only a stripped local label.

**Acceptance Scenarios**:

1. **Given** an imported node or edge that is backed by a standard ontology IRI, **When** the user views its details in the right pane, **Then** graph-browser shows a clickable link to that ontology term
2. **Given** an imported node or edge whose display label is derived from an ontology term, **When** the user views its details, **Then** graph-browser preserves both the human-readable label and the original ontology reference
3. **Given** an imported node or edge that is not backed by a standard ontology IRI, **When** the user views its details, **Then** graph-browser does not invent a documentation link

### Edge Cases

- What happens when multiple standard fallback predicates are present for the same node field? The system must choose a deterministic result rather than exposing inconsistent values across runs.
- What happens when a fallback predicate value is present but unusable for display, such as an empty literal or malformed link target? The importer must ignore the unusable value and continue evaluating remaining sources.
- What happens when the dataset uses standard predicates for semantic content but omits required graph-browser presentation hints such as kind or other rendering metadata? The system must fail clearly if those browser-specific requirements are still mandatory.
- What happens when an edge annotation pattern is syntactically valid RDF but cannot be mapped unambiguously to a single displayed edge? The system must not invent hover text for the wrong edge.
- What happens when the importer can derive a readable ontology label but the underlying ontology IRI is missing from the UI model? The system must preserve the source IRI strongly enough that the right pane can link to it.

## Requirements

### Functional Requirements

- **FR-001**: The system MUST support `dcterms:description` as a fallback source for node descriptions when `gb:description` is absent.
- **FR-002**: The system MUST support `foaf:page` as a fallback source for node external links when `gb:externalLink` is absent.
- **FR-003**: The system MUST support `rdfs:seeAlso` as a fallback source for node external links when `gb:externalLink` is absent.
- **FR-004**: The system MUST preserve current graph-browser-specific predicates as the authoritative source whenever both gb-specific and standard fallback predicates are present for the same field.
- **FR-005**: The system MUST support at least one RDF annotation pattern that allows an edge description to be attached to the edge triple itself without requiring the full `gb:EdgeAssertion` structure.
- **FR-006**: The system MUST map supported edge annotation patterns into the existing edge-hover behavior visible in graph-browser.
- **FR-007**: The system MUST keep existing RDF datasets that rely on `gb:description`, `gb:externalLink`, and `gb:EdgeAssertion` working without behavior regression.
- **FR-008**: The system MUST allow datasets to use standard RDF vocabularies as the primary source of semantic content while reserving `gb:` vocabulary for graph-browser-specific presentation metadata.
- **FR-009**: The system MUST document which standard predicates and edge-annotation patterns are supported, including their precedence relative to existing gb-specific predicates.
- **FR-010**: The system MUST preserve the original ontology IRI for imported standard node and edge semantics when it derives a rendered label from that ontology term.
- **FR-011**: The right pane MUST expose a clickable documentation link for imported standard ontology terms when a stable ontology IRI is available.

### Key Entities

- **Standard Metadata Predicate**: A non-graph-browser RDF predicate, such as `dcterms:description`, `foaf:page`, or `rdfs:seeAlso`, that can supply graph-browser-visible metadata.
- **Presentation Predicate**: A graph-browser-specific RDF predicate used for rendering concerns that do not have a standard semantic equivalent in the browser's model.
- **Annotated Edge**: A graph relationship whose descriptive metadata is attached directly to the triple through a supported RDF annotation pattern rather than through a standalone `gb:EdgeAssertion` structure.
- **Predicate Precedence Rule**: The rule that determines which value graph-browser uses when both gb-specific and fallback standard predicates are present.
- **Ontology Reference**: The original standard ontology IRI behind a rendered node kind, node type, or edge predicate, preserved so the UI can link to the authoritative term documentation.

## Success Criteria

### Measurable Outcomes

- **SC-001**: A dataset with no duplicated gb-specific node descriptions or external-link triples still renders the expected node descriptions and links when it uses the supported standard predicates.
- **SC-002**: A dataset with edge descriptions expressed through a supported edge annotation pattern shows the same edge hover text outcome as an equivalent dataset encoded with `gb:EdgeAssertion`.
- **SC-003**: Existing RDF-backed datasets that rely on gb-specific predicates continue to render with no loss of node metadata, edge metadata, or link behavior.
- **SC-004**: Project documentation makes the supported fallback predicates and precedence rules explicit enough that a downstream dataset author can model data correctly without reading the importer source code.
- **SC-005**: When imported node or edge semantics come from a standard ontology IRI, the right pane exposes a working clickable link to that term instead of only a stripped label.

## Assumptions

- The existing RDF import path from `006-rdf-input-support` remains the foundation for this feature.
- Graph-browser-specific rendering metadata such as kind, group, shape, and color still has no standard replacement in scope for this feature.
- Supporting standard predicates as fallbacks is sufficient for the first iteration; full ontology-driven inference is out of scope.
- The set of supported edge annotation patterns can be intentionally limited as long as it covers a practical non-`gb:EdgeAssertion` authoring path and is documented clearly.
