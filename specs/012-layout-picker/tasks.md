# Tasks: User-Selectable Graph Layouts

**Input**: Design documents from `/specs/012-layout-picker/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel with other `[P]` tasks in the same phase
- **[Story]**: `US1`, `US2`, `US3`

---

## Phase 1: Foundation

- [ ] T001 [P] Update `package.json`, `package-lock.json`, and `src/bootstrap.js` to add and register the additional Cytoscape layout engines needed for `ELK`, `Cola`, and `Dagre`. Keep `Concentric` on the built-in Cytoscape path.

- [ ] T002 Update `src/FFI/Cytoscape.purs` and `src/FFI/Cytoscape.js` to replace the hardcoded `fcose` execution path with layout-aware render/relayout helpers that accept a canonical layout id and preserve the current graph instance.

- [ ] T003 [P] Extend `src/Graph/Query.purs`, `src/Graph/Views.purs`, `schema/query-catalog.schema.json`, and `schema/view.schema.json` with an optional `layout` field for view-like artifacts.

- [ ] T004 Add dedicated layout preference persistence to `src/Persist.purs` using a separate `graph-browser:layout:<identity>` key derived from viewer identity without changing the existing title-keyed node/depth/tutorial restore contract.

- [ ] T005 Add layout state and actions to `src/Viewer/Types.purs`, including the active layout, layout source, and the action used when the user explicitly changes layout.

**Checkpoint**: Layout ids, FFI support, authored metadata, and persistence primitives exist. Story work can now proceed.

---

## Phase 2: User Story 1 - Switch layout to match the graph shape (Priority: P1) 🎯 MVP

**Goal**: Users can switch layouts from the viewer controls and relayout the current graph without losing their place.

**Independent Test**: Load a graph, switch among `fCoSE`, `ELK`, `Cola`, `Dagre`, and `Concentric`, and verify that the current visible graph reflows in place while node/edge/query/tutorial context remains active.

- [ ] T006 [US1] Update `src/Viewer/Controls.purs` to render a visible layout selector in the existing graph control area and show the currently active layout.

- [ ] T007 [US1] Update `src/Viewer.purs` to handle explicit layout-change actions by rerunning the active Cytoscape graph through the selected layout without refetching data.

- [ ] T008 [US1] Update `src/Viewer.purs` and, if necessary, `src/FFI/Cytoscape.js` so layout changes preserve node highlight, edge highlight, active query/view state, tutorial step, depth, and source filters.

- [ ] T009 [US1] Run manual verification for the MVP path on the graph-browser self graph: switch layouts with a selected node, selected edge, active query, and active tutorial step.

**Checkpoint**: Runtime layout switching works and is independently demoable.

---

## Phase 3: User Story 2 - Curated views open with an authored layout default (Priority: P2)

**Goal**: Query-backed and legacy views can declare a preferred default layout for first-time visitors.

**Independent Test**: Configure one query-backed view and one legacy view with different layout defaults, then verify that each view opens in its declared layout when no saved explicit repo preference exists.

- [ ] T010 [US2] Update `src/Viewer.purs` so selecting a legacy view applies that view’s authored default layout when no saved explicit repo preference exists, and falls back to `fcose` on invalid ids.

- [ ] T011 [US2] Update `src/Viewer.purs` so selecting a query-backed view applies the query entry’s authored default layout when the query is tagged as a view and no saved explicit repo preference exists.

- [ ] T012 [US2] Verify that authored defaults are derived behavior only: they affect first-time or unsaved sessions, but do not overwrite an explicit user choice once one exists for the repo.

**Checkpoint**: Curated view defaults work for both authoring models without breaking non-view queries.

---

## Phase 4: User Story 3 - Each repo remembers the user's preferred layout (Priority: P3)

**Goal**: The viewer restores the last explicit layout choice separately for each repo.

**Independent Test**: Choose different layouts in two repos, reload or switch between them, and verify that each repo restores its own explicit layout.

- [ ] T013 [US3] Update `src/Viewer.purs` initialization to restore the saved explicit layout preference from `src/Persist.purs` before applying any authored default layout.

- [ ] T014 [US3] Persist explicit layout changes from `src/Viewer.purs` using the repo/viewer identity derived from parsed `owner/repo` when `dataUrls.baseUrl` is a raw GitHub repo URL, then `dataUrls.baseUrl`, then `config.sourceUrl`, then `config.title`.

- [ ] T015 [US3] Verify repo-scoped behavior in the hosted app flow by loading at least two repos and confirming that saved explicit layouts do not leak across repo identities.

**Checkpoint**: Explicit layout preferences are restored per repo and take precedence over authored defaults.

---

## Phase 5: Polish & Verification

- [ ] T016 [P] Review `README.md` for any user-facing layout authoring or supported-layout documentation that now needs updating.

- [ ] T017 Run `nix develop -c just test`.

- [ ] T018 Run `nix develop -c just bundle-app`.

- [ ] T019 Run `nix develop -c just bundle-lib`.

- [ ] T020 Run the full manual verification flow from `specs/012-layout-picker/quickstart.md`, including invalid-layout fallback cases.
