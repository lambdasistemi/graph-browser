# Tasks: Auto-Generate Ontology View from OWL/RDFS Triples

**Input**: Design documents from `/specs/007-owl-ontology-view/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: No new project structure needed — this feature adds a module and modifies existing files.

- [x] T001 Create module directory `src/Ontology/` for ontology extraction logic

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core ontology extraction that all user stories depend on. The `Ontology.Extract` module and the `importGraph` return type change must be complete before any story can be tested.

- [x] T002 Define OWL/RDFS vocabulary constants (IRI strings for `owl:Class`, `rdfs:Class`, `rdfs:subClassOf`, `owl:ObjectProperty`, `rdfs:domain`, `rdfs:range`, `owl:equivalentClass`, `owl:equivalentProperty`, `rdfs:comment`) in `src/Ontology/Extract.purs`
- [x] T003 Implement `extractClasses :: Array ImportedRdfQuad -> Array { iri :: String, label :: String, comment :: String }` in `src/Ontology/Extract.purs` — find all `rdf:type owl:Class` and `rdf:type rdfs:Class` quads, extract `rdfs:label` (fallback to IRI local name) and `rdfs:comment` (fallback to empty string)
- [x] T004 Implement `computeDepths :: Array { iri :: String } -> Array { subIri :: String, superIri :: String } -> Map String Int` in `src/Ontology/Extract.purs` — BFS from root classes (no `rdfs:subClassOf` parent or parent is `owl:Thing`), handle cycles via visited set, return depth per class IRI
- [x] T005 Implement `classesToNodes :: Array { iri :: String, label :: String, comment :: String } -> Map String Int -> Array Node` in `src/Ontology/Extract.purs` — convert classes to `Node` records with `owl-` prefixed kebab-case IDs, group `"ontology"`, kind `owl-class-{depth}`
- [x] T006 Implement `generateOntologyKinds :: Map String Int -> Map KindId KindDef` in `src/Ontology/Extract.purs` — generate one `KindDef` per depth level with base color `#9b59b6` lightened 15% per depth, shape `"diamond"`, label `"Ontology Class (depth N)"`
- [x] T007 Change `importGraph` return type from `Either String Graph` to `Either String { graph :: Graph, ontologyKinds :: Map KindId KindDef }` in `src/Rdf/Import.purs` — call `Ontology.Extract` functions, merge ontology nodes/edges with `gb:Node`-based nodes/edges before calling `buildGraph`
- [x] T008 Update `Viewer.purs` to handle new `importGraph` return type — merge `ontologyKinds` into `config.kinds` before initializing Cytoscape (around line 1032-1040)
- [x] T009 Verify `nix build` compiles with the new module and return type changes

**Checkpoint**: Ontology extraction pipeline compiles. No ontology nodes visible yet until US1 wires subclass edges.

---

## Phase 3: User Story 1 - Browse Class Hierarchy (Priority: P1) 🎯 MVP

**Goal**: `owl:Class` nodes and `rdfs:subClassOf` edges render automatically from any OWL/RDFS ontology.

**Independent Test**: Load a Turtle file with `owl:Class` and `rdfs:subClassOf` triples. Verify classes appear as diamond-shaped nodes with subclass edges, styled by hierarchy depth.

### Implementation for User Story 1

- [x] T010 [US1] Implement `extractSubclassEdges :: Array ImportedRdfQuad -> Map String String -> Array Edge` in `src/Ontology/Extract.purs` — find all `rdfs:subClassOf` quads, map subject/object IRIs to `owl-` prefixed node IDs, label `"subclass of"`
- [x] T011 [US1] Wire `extractSubclassEdges` into the main extraction pipeline called from `importGraph` in `src/Rdf/Import.purs`
- [x] T012 [US1] Create a test Turtle file `test/data/ontology-only.ttl` with 5+ classes, 3+ depth levels, `rdfs:subClassOf` relationships, and `rdfs:label`/`rdfs:comment` annotations
- [x] T013 [US1] Verify with Playwright: load `ontology-only.ttl`, confirm class nodes appear as diamonds with depth-based purple shading and subclass edges render

**Checkpoint**: Pure ontology datasets render as browsable class hierarchies.

---

## Phase 4: User Story 5 - Browse Ontology in Isolation via Queries (Priority: P1) 🎯 MVP

**Goal**: SPARQL queries in the query catalog let the user isolate ontology nodes from a mixed graph.

**Independent Test**: Load a mixed dataset, execute "Ontology Classes" query, verify only ontology nodes are shown.

### Implementation for User Story 5

- [x] T014 [US5] Add "ontology-classes" query to `data/queries.json` — SPARQL selecting all nodes with `gb:group gbgroups:ontology`
- [x] T015 [US5] Add "class-hierarchy" query to `data/queries.json` — SPARQL selecting ontology nodes connected by edges labeled "subclass of"
- [x] T016 [US5] Add "ontology-subtree" parameterized query to `data/queries.json` — SPARQL selecting a root class node and all descendants via transitive subclass edges, with a `$root` parameter of type `node`
- [x] T017 [US5] Verify with Playwright: load mixed dataset, execute "ontology-classes" query, confirm only ontology nodes displayed

**Checkpoint**: Ontology can be viewed in isolation within 2 clicks.

---

## Phase 5: User Story 2 - View Property Relationships (Priority: P2)

**Goal**: `owl:ObjectProperty` definitions render as edges between their `rdfs:domain` and `rdfs:range` classes.

**Independent Test**: Load a Turtle file with `owl:ObjectProperty` declarations. Verify edges appear between domain and range class nodes.

### Implementation for User Story 2

- [x] T018 [US2] Implement `extractPropertyEdges :: Array ImportedRdfQuad -> Map String String -> Array Edge` in `src/Ontology/Extract.purs` — find all `rdf:type owl:ObjectProperty` quads, look up `rdfs:domain` and `rdfs:range`, create edge from domain to range class node with property label. Skip properties missing domain or range.
- [x] T019 [US2] Wire `extractPropertyEdges` into the extraction pipeline in `src/Rdf/Import.purs`
- [x] T020 [US2] Add `owl:ObjectProperty` declarations with `rdfs:domain`/`rdfs:range` to `test/data/ontology-only.ttl`
- [x] T021 [US2] Add "ontology-properties" query to `data/queries.json` — SPARQL selecting ontology nodes connected by property edges (edges whose label is not "subclass of" and not "equivalent to")
- [x] T022 [US2] Verify with Playwright: load updated test file, confirm property edges appear between domain/range classes

**Checkpoint**: Object properties visible as edges between classes.

---

## Phase 6: User Story 4 - Mixed Ontology and Instance Data (Priority: P2)

**Goal**: Datasets with both `gb:Node` instances and `owl:Class` ontology triples render both, visually distinguishable.

**Independent Test**: Load a dataset with both `owl:Class` definitions and `gb:Node` instances. Verify both appear with distinct styling.

### Implementation for User Story 4

- [x] T023 [US4] Create test Turtle file `test/data/mixed-ontology-instances.ttl` with both `gb:Node` instances and `owl:Class` triples, where some instances are typed as ontology classes
- [x] T024 [US4] Verify with Playwright: load mixed dataset, confirm both ontology (diamond) and instance (round/rectangle) nodes render, visually distinct
- [x] T025 [US4] Verify edge case: a `gb:Node` instance typed as an `owl:Class` that also appears in the ontology — confirm no duplicate node, instance node takes precedence (or both appear with distinct IDs per D5)

**Checkpoint**: Mixed datasets work correctly, no regressions on instance-only datasets.

---

## Phase 7: User Story 6 - Guided Ontology Tour (Priority: P2)

**Goal**: A tutorial walks through the ontology structure with query-based stops.

**Independent Test**: Start the "Ontology Walkthrough" tour. Verify each stop isolates a specific ontology region.

### Implementation for User Story 6

- [x] T026 [US6] Create `data/tutorials/ontology-walkthrough.json` with query-based stops: overview (queryId: `ontology-classes`), class hierarchy (queryId: `class-hierarchy`), property relationships (queryId: `ontology-properties`), alignments (queryId: `ontology-alignments`)
- [x] T027 [US6] Add ontology walkthrough entry to `data/tutorials/index.json`
- [x] T028 [US6] Verify with Playwright: start ontology tour, advance through stops, confirm each stop filters to the correct ontology subset

**Checkpoint**: Guided tour navigable from tutorials panel.

---

## Phase 8: User Story 3 - View Alignment Edges (Priority: P3)

**Goal**: `owl:equivalentClass` and `owl:equivalentProperty` render as distinct alignment edges.

**Independent Test**: Load a Turtle file with `owl:equivalentClass` triples. Verify alignment edges appear with distinct styling.

### Implementation for User Story 3

- [x] T029 [US3] Implement `extractAlignmentEdges :: Array ImportedRdfQuad -> Map String String -> Array Edge` in `src/Ontology/Extract.purs` — find `owl:equivalentClass` and `owl:equivalentProperty` quads, create edges labeled "equivalent to" / "equivalent property"
- [x] T030 [US3] Wire `extractAlignmentEdges` into the extraction pipeline in `src/Rdf/Import.purs`
- [x] T031 [US3] Add `owl:equivalentClass` triples to `test/data/ontology-only.ttl` (e.g., mapping domain classes to `gb:` vocabulary classes)
- [x] T032 [US3] Add "ontology-alignments" query to `data/queries.json` — SPARQL selecting nodes connected by "equivalent to" edges
- [x] T033 [US3] Verify with Playwright: load updated test file, confirm alignment edges render between mapped classes

**Checkpoint**: All ontology relationship types visible.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup.

- [x] T034 Verify backward compatibility: load existing `data/rdf/graph.ttl` (no ontology triples), confirm identical rendering to current behavior
- [x] T035 Run `nix build` to verify clean build
- [ ] T036 Verify all queries and tour work end-to-end with a real ontology (e.g., `cardano.ttl` from cardano-knowledge-maps)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2
- **US5 (Phase 4)**: Depends on Phase 3 (needs ontology nodes in the graph to query)
- **US2 (Phase 5)**: Depends on Phase 2 (independent of US1)
- **US4 (Phase 6)**: Depends on Phase 2 (independent of US1/US2)
- **US6 (Phase 7)**: Depends on Phase 4 (needs queries to exist for tour stops)
- **US3 (Phase 8)**: Depends on Phase 2 (independent of other stories)
- **Polish (Phase 9)**: Depends on all stories complete

### Parallel Opportunities

After Phase 2 completes:
- US1 and US2 and US3 and US4 can proceed in parallel (different extraction functions, different test files)
- US5 must wait for US1 (needs nodes in graph)
- US6 must wait for US5 (needs queries)

### Within Each User Story

- Extraction function → pipeline wiring → test data → Playwright verification

---

## Implementation Strategy

### MVP First (US1 + US5)

1. Complete Phase 1 + Phase 2 → extraction pipeline compiles
2. Complete Phase 3 (US1) → class hierarchy renders
3. Complete Phase 4 (US5) → ontology browsable in isolation
4. **STOP and VALIDATE**: load a real ontology, browse via queries

### Incremental Delivery

1. MVP (US1+US5) → browsable ontology with query isolation
2. Add US2 → property edges visible
3. Add US4 → mixed datasets work
4. Add US6 → guided tour
5. Add US3 → alignment edges
6. Polish → backward compatibility verified

---

## Notes

- All PureScript changes go through `Ontology.Extract` (new) and `Rdf.Import` (modified)
- `Viewer.purs` change is minimal: unwrap the new return type and merge kinds
- No changes to `Graph.Types`, `Graph.Build`, `Graph.Cytoscape`, or `FFI/Cytoscape.js`
- SPARQL queries work against the Oxigraph store which already loads the full RDF — ontology nodes are exported with `gb:` vocabulary by the existing export pipeline, so queries can use `gb:group` to discriminate
