# Research: Auto-Generate Ontology View from OWL/RDFS Triples

## R1: OWL/RDFS predicate recognition

**Decision**: Recognize these predicates from the loaded quads:
- `rdf:type owl:Class` and `rdf:type rdfs:Class` → class nodes
- `rdfs:subClassOf` → hierarchy edges
- `rdf:type owl:ObjectProperty` + `rdfs:domain` + `rdfs:range` → property edges
- `owl:equivalentClass` → alignment edges
- `owl:equivalentProperty` → alignment edges

**Rationale**: These are the core OWL/RDFS vocabulary terms that define class hierarchies and relationships. They cover the W3C OWL 2 profile without requiring complex OWL constructs (restrictions, unions, intersections).

**Alternatives considered**: 
- Full OWL 2 parsing including `owl:Restriction`, `owl:unionOf` — too complex for v1, most ontologies don't use these heavily
- SPARQL-based extraction from Oxigraph store — would work but adds dependency on store being loaded; quads are already available

## R2: Hierarchy depth computation

**Decision**: BFS from root classes (classes with no `rdfs:subClassOf` parent, or whose parent is `owl:Thing`). Depth 0 = root. In case of cycles, use shortest path.

**Rationale**: BFS naturally handles DAG hierarchies and produces minimum depth for classes with multiple parents. Cycle detection is built into BFS (visited set).

**Alternatives considered**:
- DFS — doesn't guarantee shortest path in DAGs with multiple inheritance
- Topological sort — doesn't handle cycles gracefully

## R3: Collision avoidance between ontology and instance node IDs

**Decision**: Prefix ontology-derived node IDs with `owl-`. The `gb:nodeId` values from instance imports are user-defined and unlikely to start with `owl-`.

**Rationale**: Simple, predictable, no runtime collision check needed. The prefix is short enough to not clutter the UI.

**Alternatives considered**:
- Full IRI as node ID — too long, breaks Cytoscape layout
- Hash-based IDs — not human-readable, harder to debug

## R4: Color scheme for hierarchy depth

**Decision**: Base color `#9b59b6` (purple, distinct from typical kind colors). Depth 0 gets full saturation. Each subsequent depth level gets 15% lighter. Shape: `diamond` for all ontology classes to distinguish from instance nodes (typically `ellipse` or `round-rectangle`).

**Rationale**: Purple is unused in the default config kinds. Lightening by depth creates visual hierarchy. Diamond shape provides instant visual distinction.

**Alternatives considered**:
- Different shapes per depth — too many shapes, confusing
- Hue rotation per depth — harder to see as a related group

## R5: Handling ontology-only vs mixed datasets

**Decision**: The extraction is additive. If no `owl:Class` triples exist, no ontology nodes are generated (zero overhead). If both `gb:Node` instances and `owl:Class` triples exist, both are included in the graph.

**Rationale**: This preserves backward compatibility (SC-004) and handles the mixed case (User Story 4) naturally.

## R6: Edge styling distinction

**Decision**: Three edge kinds via labels and potentially CSS classes:
- Subclass edges: label "subclass of" — rendered as standard directed edges
- Property edges: label from property name — rendered as standard directed edges
- Alignment edges: label "equivalent to" — could use dashed line style

**Rationale**: Edge labels provide sufficient distinction for v1. Dashed styling for alignment edges can be added via Cytoscape CSS if needed, but the label alone is informative.

## R7: SPARQL queries for ontology isolation

**Decision**: Add ontology-specific queries to `data/queries.json`. Queries select nodes by the `"ontology"` group (via `gb:group gbgroups:ontology`) and by edge labels for specific relationship types.

**Rationale**: The existing query system executes SPARQL against the Oxigraph store and filters the graph to matching `?node` results. Ontology nodes are exported to RDF with the same vocabulary as instance nodes (`gb:Node`, `gb:nodeId`, `gb:group`, etc.), so the same query patterns work. The `"ontology"` group assignment (D6) is the clean discriminator.

**Alternatives considered**:
- Client-side filtering by ID prefix (`owl-*`) — would bypass SPARQL, break the query catalog pattern
- Separate view toggle — more UI work, not needed when queries already provide isolation

## R8: Query-based tour stops for ontology

**Decision**: Use `queryId` references in tutorial stops instead of `node` + `depth`. This means the ontology tour works with any ontology (query selects dynamically) rather than hardcoding specific node IDs.

**Rationale**: The tutorial system already supports query-based stops (see `data-pipeline.json`). For a generic feature like ontology browsing, hardcoding node IDs would break for every different dataset. Query-based stops are dataset-agnostic.

**Alternatives considered**:
- Node-based stops with `depth: 99` — requires knowing specific node IDs, breaks generality
- Auto-generating tours at runtime — too complex for v1; a static tour with query-based stops is sufficient
