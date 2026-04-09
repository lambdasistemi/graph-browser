# Feature Specification: Auto-Generate Ontology View from OWL/RDFS Triples

**Feature Branch**: `007-owl-ontology-view`  
**Created**: 2026-04-09  
**Status**: Draft  
**Input**: User description: "Auto-generate ontology view from OWL/RDFS triples"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Class Hierarchy (Priority: P1)

A knowledge map author loads an RDF dataset that includes OWL/RDFS ontology triples (e.g. `owl:Class`, `rdfs:subClassOf`). Without any manual configuration, the graph browser detects the ontology structure and presents a browsable view of the class hierarchy as a graph — classes appear as nodes and subclass relationships appear as edges.

**Why this priority**: This is the core value — making invisible ontology structure visible. Without this, authors must manually duplicate ontology classes as `gb:Node` entries, which drifts from the ontology source of truth.

**Independent Test**: Load a Turtle file containing `owl:Class` and `rdfs:subClassOf` triples. Verify that classes appear as nodes and subclass edges are rendered without any `gb:Node` entries in the data.

**Acceptance Scenarios**:

1. **Given** an RDF dataset containing `owl:Class` declarations, **When** the viewer loads the data, **Then** each class appears as a node in the graph with its label derived from `rdfs:label` or the IRI local name.
2. **Given** an RDF dataset with `rdfs:subClassOf` relationships, **When** the viewer renders the ontology view, **Then** subclass relationships appear as directed edges from subclass to superclass.
3. **Given** an ontology with a deep class hierarchy (3+ levels), **When** the viewer renders, **Then** nodes are visually distinguishable by their depth in the hierarchy (e.g. different styling per depth level).

---

### User Story 2 - View Property Relationships (Priority: P2)

The author sees `owl:ObjectProperty` definitions rendered as edges between their `rdfs:domain` and `rdfs:range` classes, revealing how the ontology connects concepts.

**Why this priority**: Properties define the relational structure of the ontology. Without seeing them, the viewer only shows the taxonomy (is-a) but not the relational model (has-a, relates-to).

**Independent Test**: Load a Turtle file with `owl:ObjectProperty` declarations that have `rdfs:domain` and `rdfs:range`. Verify edges appear between the domain and range classes with the property label.

**Acceptance Scenarios**:

1. **Given** an `owl:ObjectProperty` with `rdfs:domain` and `rdfs:range` pointing to classes, **When** the viewer renders, **Then** an edge appears from the domain class node to the range class node, labeled with the property name.
2. **Given** an `owl:ObjectProperty` without `rdfs:domain` or `rdfs:range`, **When** the viewer renders, **Then** the property is omitted from the graph (no orphan edges).

---

### User Story 3 - View Alignment Edges (Priority: P3)

The author sees `owl:equivalentClass` and `owl:equivalentProperty` relationships rendered as alignment edges, showing how the domain ontology maps to other vocabularies.

**Why this priority**: Alignment edges reveal cross-vocabulary mappings, useful for ontology authors working with multiple vocabularies (e.g. mapping a domain ontology to `gb:` terms).

**Independent Test**: Load a Turtle file with `owl:equivalentClass` triples. Verify that equivalence edges appear between the mapped classes with distinct visual styling.

**Acceptance Scenarios**:

1. **Given** two classes linked by `owl:equivalentClass`, **When** the viewer renders, **Then** a visually distinct edge (different from subclass/property edges) connects the two class nodes.
2. **Given** two properties linked by `owl:equivalentProperty`, **When** the viewer renders, **Then** a visually distinct edge connects the domain/range pairs or the property representations.

---

### User Story 4 - Mixed Ontology and Instance Data (Priority: P2)

The author loads an RDF dataset that contains both ontology triples and `gb:Node` instance data. The viewer presents both: the instance graph and the ontology structure, allowing the author to see how instances relate to their ontology classes.

**Why this priority**: Real-world datasets mix ontology definitions with instance data. The viewer must handle both without losing either.

**Independent Test**: Load a dataset with both `owl:Class` definitions and `gb:Node` instances typed to those classes. Verify both appear in the graph.

**Acceptance Scenarios**:

1. **Given** a dataset with both ontology classes and `gb:Node` instances, **When** the viewer loads, **Then** both ontology class nodes and instance nodes are rendered.
2. **Given** a `gb:Node` instance typed as an `owl:Class` that also appears in the ontology, **When** the viewer renders, **Then** the instance is visually distinguishable from the class node in the ontology view.

---

### User Story 5 - Browse Ontology in Isolation via Queries (Priority: P1)

The author wants to see just the ontology structure without the noise of instance-level nodes. SPARQL queries in the query catalog let the author filter the graph to show only ontology classes, only a specific subtree, or only property relationships.

**Why this priority**: Without this, ontology nodes are mixed into a potentially large instance graph with no way to isolate them. Browsability is the core promise.

**Independent Test**: Load a mixed dataset (ontology + instances). Execute the "Ontology Classes" query from the catalog. Verify only ontology-derived nodes are shown.

**Acceptance Scenarios**:

1. **Given** a mixed dataset with ontology and instance nodes, **When** the user selects the "Ontology Classes" query, **Then** only `owl:Class`-derived nodes and their edges are displayed.
2. **Given** the ontology query catalog, **When** the user selects "Class Hierarchy", **Then** only subclass relationships are shown as a tree-like graph.
3. **Given** a parameterized "Ontology Subtree" query, **When** the user selects a root class, **Then** only that class and its descendants are displayed.

---

### User Story 6 - Guided Ontology Tour (Priority: P2)

The author can start a tutorial that walks through the ontology structure stop by stop, highlighting key classes, their relationships, and how the ontology connects to the instance data.

**Why this priority**: Tours are the primary way graph-browser makes complex structures accessible (Constitution Principle VI). An auto-generated or hand-crafted tour for the ontology ensures users can understand it progressively.

**Independent Test**: Start the "Ontology Walkthrough" tour. Verify each stop focuses on a specific ontology region using query-based filtering.

**Acceptance Scenarios**:

1. **Given** a dataset with ontology triples, **When** the user starts the ontology tour, **Then** the first stop shows an overview of all ontology classes.
2. **Given** the ontology tour is active, **When** the user advances to a stop focused on a specific class, **Then** the graph filters to show that class and its immediate neighbors (subclasses, properties).

---

### Edge Cases

- What happens when an `owl:Class` has no `rdfs:label`? The IRI local name (fragment or last path segment) is used as the display label.
- What happens when a class hierarchy contains cycles (`A subClassOf B subClassOf A`)? The viewer renders both edges without entering an infinite loop; depth styling uses the shortest path from any root.
- What happens when an RDF dataset contains no ontology triples at all? The viewer behaves exactly as before — only the instance graph is shown.
- What happens when `owl:ObjectProperty` has multiple `rdfs:domain` or `rdfs:range` values? An edge is rendered for each domain-range combination.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST detect ontology triples (`owl:Class`, `rdfs:subClassOf`, `owl:ObjectProperty`, `owl:equivalentClass`, `owl:equivalentProperty`) in loaded RDF data.
- **FR-002**: System MUST generate graph nodes for each `owl:Class` (and `rdfs:Class`) found in the dataset.
- **FR-003**: System MUST generate graph edges for each `rdfs:subClassOf` relationship.
- **FR-004**: System MUST generate graph edges for each `owl:ObjectProperty` that has both `rdfs:domain` and `rdfs:range` defined.
- **FR-005**: System MUST generate graph edges for `owl:equivalentClass` and `owl:equivalentProperty` relationships.
- **FR-006**: System MUST derive node labels from `rdfs:label` when available, falling back to the IRI local name.
- **FR-007**: System MUST style ontology class nodes by their depth in the class hierarchy.
- **FR-008**: System MUST work with any OWL/RDFS ontology, not just Cardano-specific vocabularies.
- **FR-009**: System MUST preserve existing instance graph rendering when ontology triples are present alongside `gb:Node` data.
- **FR-010**: System MUST NOT require any manual `gb:Node` duplication to render ontology classes.
- **FR-011**: System MUST provide SPARQL queries in the query catalog to isolate ontology classes, class hierarchy, and property relationships from the full graph.
- **FR-012**: System MUST provide a tutorial/tour that walks through the ontology structure with query-based stops.

### Key Entities

- **Ontology Class**: An `owl:Class` or `rdfs:Class` in the RDF data, rendered as a graph node with hierarchy depth metadata.
- **Object Property**: An `owl:ObjectProperty` connecting domain and range classes, rendered as an edge.
- **Subclass Relationship**: An `rdfs:subClassOf` triple, rendered as a directed edge from child to parent class.
- **Alignment Mapping**: An `owl:equivalentClass` or `owl:equivalentProperty` triple, rendered as a distinct edge type.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Any OWL/RDFS ontology with class definitions is browsable in graph-browser without manual `gb:Node` entries.
- **SC-002**: Ontology class hierarchy is visually distinguishable from instance-level data at a glance.
- **SC-003**: Loading a dataset with 40+ classes and 30+ properties renders a complete, navigable ontology view.
- **SC-004**: Existing RDF datasets without ontology triples continue to render identically to current behavior (zero regression).
- **SC-005**: The ontology can be viewed in isolation within 2 clicks from the query catalog.
- **SC-006**: A guided tour walks through the ontology structure in logical order (overview → hierarchy → properties → alignments).

## Assumptions

- The RDF input support (spec 006) is fully functional — the viewer can already load and parse RDF in multiple formats.
- Oxigraph WASM is available for SPARQL queries and quad extraction.
- Ontology triples coexist in the same RDF source file as instance data (no separate ontology file loading required for v1).
- `owl:DatatypeProperty` is out of scope for v1 — only object properties (which connect classes) are rendered as edges.
- `owl:Restriction`, `owl:unionOf`, and other complex OWL constructs are out of scope for v1.
