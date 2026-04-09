# Implementation Plan: Auto-Generate Ontology View from OWL/RDFS Triples

**Branch**: `007-owl-ontology-view` | **Date**: 2026-04-09 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/007-owl-ontology-view/spec.md`

## Summary

Extend the RDF import pipeline to detect OWL/RDFS ontology triples (`owl:Class`, `rdfs:subClassOf`, `owl:ObjectProperty`, `owl:equivalentClass`, `owl:equivalentProperty`) and auto-generate graph-browser nodes and edges from them. A new `Ontology.Extract` module scans the parsed quads for ontology constructs and produces `Node`/`Edge` arrays that merge with the existing `gb:Node`-based import. Ontology-derived kinds are injected into the config at runtime so class nodes receive distinct styling by hierarchy depth.

## Technical Context

**Language/Version**: PureScript (Spago)
**Primary Dependencies**: Halogen, Cytoscape.js, Oxigraph WASM (FFI)
**Storage**: N/A (client-side, no persistence changes)
**Testing**: Playwright for UI verification, PureScript unit tests
**Target Platform**: Browser (WASM via Oxigraph)
**Project Type**: Web application (library + app)
**Performance Goals**: Handle ontologies with 40+ classes, 30+ properties without noticeable delay
**Constraints**: No new JS dependencies; ontology logic in PureScript per constitution
**Scale/Scope**: Typical OWL ontologies: 10–100 classes, 10–50 properties

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Data-Driven, Zero Hardcoding | PASS | Ontology kinds are derived from RDF data at runtime, not hardcoded |
| II. PureScript for Logic, JS FFI for Rendering | PASS | New `Ontology.Extract` module is pure PureScript; no JS changes |
| III. Nix-First Builds | PASS | No new dependencies; existing build unchanged |
| IV. Library/App Split | PASS | Ontology extraction is in lib (reusable); no app-specific changes |
| V. Schema-Validated Data | PASS | No schema changes needed; ontology nodes use existing Node/Edge types |
| VI. Accessibility of Information | PASS | Core motivation: making invisible ontology structure accessible |

## Project Structure

### Documentation (this feature)

```text
specs/007-owl-ontology-view/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
└── tasks.md             # Phase 2 output (via /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── Ontology/
│   └── Extract.purs     # NEW: OWL/RDFS quad extraction → Node/Edge arrays
├── Rdf/
│   └── Import.purs      # MODIFY: call Ontology.Extract, merge results
├── Graph/
│   ├── Types.purs       # NO CHANGE: existing Node/Edge/Graph types suffice
│   ├── Build.purs       # NO CHANGE: buildGraph already handles any nodes/edges
│   └── Cytoscape.purs   # NO CHANGE: kind→class mapping already generic
├── Viewer.purs          # MODIFY: inject ontology kinds into config at load time
└── FFI/
    └── Cytoscape.js     # NO CHANGE: kindStyles already generic
```

### Data Files (repository root)

```text
data/
├── queries.json                          # MODIFY: add ontology-specific SPARQL queries
└── tutorials/
    ├── index.json                        # MODIFY: add ontology tour entry
    └── ontology-walkthrough.json         # NEW: guided tour through ontology structure
```

**Structure Decision**: Single new module `Ontology.Extract` added under `src/Ontology/`. Ontology queries added to existing `queries.json`. New tutorial file for the ontology walkthrough. No new directories beyond `src/Ontology/`.

## Design Decisions

### D1: Where to extract ontology — in `Rdf.Import.importGraph` or in `Viewer`

**Decision**: Extend `Rdf.Import.importGraph` to call `Ontology.Extract` internally.

**Rationale**: The import module already receives the full quad array. Extracting ontology triples there keeps all RDF→Graph logic in one place. The Viewer doesn't need to know whether nodes came from `gb:Node` or `owl:Class`.

**Alternative rejected**: Post-processing in Viewer. This would scatter RDF interpretation logic across modules and require passing raw quads through the state.

### D2: How to represent ontology kinds — static config or runtime-generated

**Decision**: Runtime-generated. The `importGraph` function returns both a `Graph` and a set of ontology kind definitions. The Viewer merges these into `config.kinds` before initializing Cytoscape.

**Rationale**: Different ontologies have different hierarchy depths. Hardcoding kinds in config.json would require per-dataset configuration, violating Constitution Principle I (Data-Driven).

**Alternative rejected**: Predefined static kinds (`ontology-class-depth-0`, `ontology-class-depth-1`, etc.). This caps the hierarchy depth and adds unused kinds.

### D3: How to style by hierarchy depth — one kind per depth or CSS classes

**Decision**: One kind per depth level, generated at import time. Kind IDs follow the pattern `owl-class-N` where N is the depth (0 = root). Each gets a progressively lighter/darker shade of a base color and the same shape.

**Rationale**: The existing kind→Cytoscape class pipeline handles this automatically. No Cytoscape.js changes needed.

### D4: How to label edges — by relationship type

**Decision**: Edge labels reflect the relationship type:
- `rdfs:subClassOf` → label: "subclass of"
- `owl:ObjectProperty` → label: the property's `rdfs:label` or local name
- `owl:equivalentClass` → label: "equivalent to"
- `owl:equivalentProperty` → label: "equivalent property"

### D5: Node ID generation for ontology classes

**Decision**: Use the IRI local name (fragment or last path segment), kebab-cased, prefixed with `owl-` to avoid collisions with `gb:Node` IDs. Example: `http://example.org/ontology#GovernanceAction` → `owl-governance-action`.

### D6: Group assignment for ontology nodes

**Decision**: All ontology-derived nodes get group `"ontology"`. This allows filtering/grouping them separately from instance nodes.

### D7: Return type change for importGraph

**Decision**: `importGraph` returns `Either String { graph :: Graph, ontologyKinds :: Map KindId KindDef }` instead of `Either String Graph`. The Viewer merges `ontologyKinds` into `config.kinds`.

**Rationale**: Keeps the import module self-contained while letting the Viewer control config assembly.

### D8: Ontology SPARQL queries for isolation

**Decision**: Add these queries to `data/queries.json`:
1. **"ontology-classes"** — Select all nodes in the `"ontology"` group: shows only ontology-derived class nodes
2. **"class-hierarchy"** — Select ontology nodes connected by "subclass of" edges: shows the taxonomy tree
3. **"ontology-properties"** — Select ontology nodes connected by object property edges: shows the relational model
4. **"ontology-subtree"** (parameterized) — Given a root class node, select it and all descendants via subclass edges
5. **"ontology-alignments"** — Select nodes connected by "equivalent to" edges: shows vocabulary mappings

**Rationale**: These queries use the `"ontology"` group and `owl-` ID prefix established in D5/D6 to cleanly isolate ontology nodes. They work against the merged RDF store via SPARQL, using the same node IRIs that `Ontology.Extract` produces.

### D9: Ontology tour structure

**Decision**: Create `data/tutorials/ontology-walkthrough.json` with query-based stops:
1. **Overview** — queryId: `ontology-classes` — shows all classes at once
2. **Class Hierarchy** — queryId: `class-hierarchy` — shows subclass structure
3. **Property Relationships** — queryId: `ontology-properties` — shows how classes connect
4. **Alignments** — queryId: `ontology-alignments` — shows vocabulary mappings (if present)

Each stop has narrative explaining what the user is seeing. Stops that have no results (e.g. no alignments) could be skipped or show an empty message.

**Rationale**: Query-based stops are already supported by the tutorial system. This avoids hardcoding node IDs in the tour (which would break for different ontologies). The tour follows a logical progression: what exists → how it's organized → how it connects → how it maps to other vocabularies.
