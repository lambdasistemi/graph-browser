# Tasks: RDF Export for Graph Data Interoperability

**Branch**: `005-rdf-export` | **Plan**: [plan.md](plan.md) | **Spec**: [spec.md](spec.md)

## Phase 1: Foundations

### Shared groundwork

- [ ] **T1.1**: Extend `/code/graph-browser-issue-30/schema/manifest.schema.json` to describe RDF artifact metadata and any export manifest file used by downstream repos
- [ ] **T1.2**: Add `/code/graph-browser-issue-30/specs/005-rdf-export/data-model.md` examples to the README or feature docs once the final RDF shape is confirmed
- [ ] **T1.3**: Choose and document the canonical dataset base IRI fallback rule and edge-label normalization rule in `/code/graph-browser-issue-30/specs/005-rdf-export/research.md`

**Checkpoint**: URI strategy and vocabulary rules are fixed. Export implementation can proceed without rewriting artifact semantics later.

---

## Phase 2: User Story 1 - Export an existing graph dataset as RDF (Priority: P1) 🎯 MVP

**Goal**: A valid graph-browser JSON dataset can be exported deterministically into RDF artifacts.

**Independent Test**: Run the exporter against `/code/graph-browser-issue-30/data/` and verify that every node and edge from the source graph is represented in generated RDF.

### Implementation for User Story 1

- [ ] **T2.1**: Create `/code/graph-browser-issue-30/scripts/export-rdf.mjs` to load `data/config.json` and `data/graph.json`
- [ ] **T2.2**: Implement dataset metadata and node-resource export in `/code/graph-browser-issue-30/scripts/export-rdf.mjs`
- [ ] **T2.3**: Implement normalized edge-predicate export plus preserved edge metadata in `/code/graph-browser-issue-30/scripts/export-rdf.mjs`
- [ ] **T2.4**: Emit Turtle plus one machine-oriented RDF serialization and an export manifest from `/code/graph-browser-issue-30/scripts/export-rdf.mjs`
- [ ] **T2.5**: Dogfood the exporter on `/code/graph-browser-issue-30/data/` and write generated artifacts under `/code/graph-browser-issue-30/data/rdf/` or a documented build-only path

**Checkpoint**: JSON-to-RDF export works end to end on the repository’s own dataset.

---

## Phase 3: User Story 2 - Publish and validate RDF artifacts in the pipeline (Priority: P1)

**Goal**: RDF export becomes part of the repository’s normal validation and build workflow.

**Independent Test**: Run the validate/build actions and confirm that RDF files are generated, checked, and copied into the site output.

### Implementation for User Story 2

- [ ] **T3.1**: Update `/code/graph-browser-issue-30/validate-action/action.yml` to run the RDF exporter and fail on export inconsistencies
- [ ] **T3.2**: Add `/code/graph-browser-issue-30/scripts/validate-rdf.mjs` or equivalent validation logic for RDF syntax and coverage checks
- [ ] **T3.3**: Update `/code/graph-browser-issue-30/build-action/action.yml` to publish generated RDF artifacts in the assembled site output
- [ ] **T3.4**: Add CI-visible logging that lists generated RDF artifacts and reports stale checked-in exports clearly
- [ ] **T3.5**: Verify the updated pipeline against the self-graph dataset and document the pass/fail expectations

**Checkpoint**: Maintainers can rely on CI rather than manual inspection to keep RDF exports correct and current.

---

## Phase 4: User Story 3 - Merge multiple graph exports through a shared vocabulary (Priority: P2)

**Goal**: Independently exported datasets share vocabulary terms and do not collide on resource identity.

**Independent Test**: Export two datasets and confirm that same-kind and same-label concepts resolve to shared vocabulary IRIs while node URIs remain dataset-scoped.

### Implementation for User Story 3

- [ ] **T4.1**: Centralize vocabulary term generation for kinds, groups, and edge labels in `/code/graph-browser-issue-30/scripts/export-rdf.mjs`
- [ ] **T4.2**: Add fixture coverage or documented examples proving collision-free node URIs across datasets
- [ ] **T4.3**: Add an interoperability example query and expected result to `/code/graph-browser-issue-30/specs/005-rdf-export/research.md` or project docs

**Checkpoint**: The export is no longer only syntactically valid; it is meaningfully mergeable across repositories.

---

## Phase 5: User Story 4 - Prepare for future RDF import and SPARQL navigation (Priority: P3)

**Goal**: Export preserves the information needed by later import and query work.

**Independent Test**: Inspect one exported dataset and verify that node identity, labels, kinds, groups, edge labels, and edge descriptions can be reconstructed without hidden assumptions.

### Implementation for User Story 4

- [ ] **T5.1**: Add explicit round-trip notes to `/code/graph-browser-issue-30/specs/005-rdf-export/data-model.md` for reconstructing nodes and edges from RDF
- [ ] **T5.2**: Verify that exported edge metadata preserves both normalized predicate IRIs and original human-readable labels/descriptions
- [ ] **T5.3**: Cross-check the export shape against the assumptions in issue `#41` and align terminology in the feature docs

**Checkpoint**: Follow-on RDF import and SPARQL features have a stable contract to build against.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] **T6.1**: Document the RDF export workflow for downstream repos in `/code/graph-browser-issue-30/README.md`
- [ ] **T6.2**: Run repository validation (`just ci` and any RDF export command) and capture any environment/tooling adjustments required
- [ ] **T6.3**: Review whether issue `#33` should be marked as a blocker or follow-up once the first vocabulary draft is implemented
