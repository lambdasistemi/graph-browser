# Tasks: Expand and Collapse Nodes

**Input**: Design documents from `/specs/012-expand-collapse/`
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Unit tests for the pure shaping module are included (the Constitution mandates Playwright for UI verification but allows `spago test` for pure logic — the anchor semantics are non-trivial and benefit from property-style tests). No UI-level "contract tests" beyond the Playwright scenario in Polish.

**Organization**: Tasks grouped by user story (US1 expand / US2 collapse / US3 affordance / US4 reset). The spec lists expand and collapse together at P1; they are split here into independently deliverable slices: US1 (expand-only) is the MVP increment, US2 layers collapse on top.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1 / US2 / US3 / US4)
- Paths are relative to the worktree root (`/code/graph-browser-expand-collapse/`)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: None beyond what's already in the repo. No new dependencies, no new tooling.

- [X] T001 Confirm `nix develop` shell launches cleanly and `just build` is green on the current HEAD before any changes; record baseline screenshot of Cardano Knowledge Maps default view for later comparison (save under `/tmp/` — not committed)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Pure model + FFI primitives that every user story depends on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T002 [P] Create `src/Graph/Shaping.purs` with the full module surface from `specs/012-expand-collapse/contracts/Graph.Shaping.md` — types (`Reason`, `Position`, `ShapingState`), constants (`largeExpandThreshold = 20`), and unimplemented stubs for every exported function (return the zero-state; mark with `-- TODO US1/US2/etc.`). Make it compile.
- [X] T003 [P] Add `test/Graph/ShapingSpec.purs` scaffolding (uses existing `spago test` setup if present, else create a minimal `test/Main.purs`) with one sanity test that imports `Graph.Shaping` and asserts `largeExpandThreshold == 20`. Wire into `spago.yaml`/`test` target so `spago test` runs it.
- [X] T004 Add FFI primitives `addElementsAt`, `removeElementsById`, `readPositions`, `setHasHidden` to `src/FFI/Cytoscape.purs` (foreign import signatures) and `src/FFI/Cytoscape.js` (JS implementations per `contracts/FFI.Cytoscape.md`). Do NOT call `cy.layout()` or `cy.fit()` inside any of them. Add a CSS rule for `.has-hidden` in the same file's `baseStyle` that renders a small `+` decoration.
- [X] T005 Extend `src/Viewer/Types.purs`: add `shaping :: ShapingState` to `State`; add actions `ExpandNode NodeId`, `CollapseNode NodeId`, `ResetShaping`, `ConfirmLargeExpand NodeId (Set NodeId)`, `DismissLargeExpand`, `ExpandCancelled`. Update the `Action` sum. No handler logic yet — leave `handleAction` branches as `pure unit` placeholders to keep the build green.
- [X] T006 Update `src/Viewer.purs` initial state to construct `shaping = initFromSeed seed` using the same seed selection logic used for `selected` (most-connected node's closed 1-hop neighborhood — extract into a local helper). On scope change (query/view/tour select, reset, or initial load), also reset `shaping`.

**Checkpoint**: The repo builds, `spago test` runs, the viewer renders the default seed set exactly as before. No behavior change yet.

---

## Phase 3: User Story 1 — Grow the view by expanding a node (Priority: P1) 🎯 MVP

**Goal**: A user can right-click a visible node and choose *Expand* to reveal its hidden direct neighbors, with existing nodes' positions preserved and a confirmation dialog for very large expansions.

**Independent Test**: Load a graph, expand two or three nodes in sequence, verify (a) the new neighbors appear around each anchor, (b) previously-visible nodes do not move (diff positions before/after, ≤ 5 px), (c) expanding a hub with > 20 hidden neighbors opens a confirmation dialog. SC-001, SC-002 covered.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation.**

- [X] T007 [P] [US1] Add tests to `test/Graph/ShapingSpec.purs` for `expand`: reveal N neighbors, idempotence (expand twice ⇒ same state), no-op on fully-expanded node. Use a hand-built `Graph` fixture (3 nodes, 2 edges) and a 5-node fixture with a shared neighbor. These tests MUST fail against the T002 stubs.

### Implementation for User Story 1

- [X] T008 [US1] Implement `initFromSeed` and `isVisible` / `visibleNodes` in `src/Graph/Shaping.purs` so subsequent tasks have a working baseline.
- [X] T009 [US1] Implement `expand` in `src/Graph/Shaping.purs` per `data-model.md` (compute `newNeighbors`, union `ExpandedFrom n` into each, return `{ next, added }`). Make the T007 tests pass.
- [X] T010 [US1] Implement `recordPosition` and `dropPositions` in `src/Graph/Shaping.purs`.
- [X] T011 [US1] In `src/Viewer.purs`, implement the `ExpandNode nid` handler:
  1. Compute `newNeighbors` via `Graph.Operations.neighborhood 1 nid state.graph` minus `visibleNodes state.shaping`.
  2. If empty: fire a transient toast action (`NoOpToast "nothing to expand"`; define this action in T005 if not already there) and return.
  3. If `|newNeighbors| > largeExpandThreshold`: open confirm dialog by setting `state.pendingExpand = Just { anchor, neighbors }`; return.
  4. Otherwise: apply `expand nid state.graph state.shaping`, assign positions for the `added` nodes radially around the anchor (helper `placeRadial :: Position -> Int -> Array Position`), call `Cy.addElementsAt`, call `Cy.setHasHidden` for the anchor (and for each added node based on `hasHiddenNeighbors`), persist.
- [X] T012 [US1] Add the confirmation dialog in `src/Viewer.purs` + `src/Viewer/Controls.purs`: when `state.pendingExpand` is `Just`, render a modal overlay with the count and Continue / Cancel buttons dispatching `ConfirmLargeExpand` / `DismissLargeExpand`.
- [X] T013 [US1] Add a node context-menu (right-click) control. Simplest path: extend existing `onNodeTap` FFI with a new `onNodeContextMenu` that calls back on `cxttap`, and add a small Halogen-rendered menu next to the cursor with an *Expand* item. Implement in `src/FFI/Cytoscape.purs` / `.js` and `src/Viewer/Controls.purs` (new helper `renderNodeContextMenu`).
- [X] T014 [US1] Persist shaping state: extend `src/Persist.purs` record with the `shaping` field from `data-model.md`; save on every `ExpandNode` commit; restore in `Viewer.purs` `Initialize`, silently dropping dangling node references.
- [ ] T015 [US1] Manual verification: run `just build && just serve`, load Cardano Knowledge Maps, walk through steps 1–3 and 7 of `quickstart.md`. Capture a before/after screenshot pair showing positions preserved (save to `/tmp/`; not committed).

**Checkpoint**: US1 is fully functional. Users can expand; shapes persist across reload; hub confirmation works. This is the shippable MVP increment.

---

## Phase 4: User Story 2 — Shrink the view by collapsing a node (Priority: P1)

**Goal**: A user can collapse a previously-expanded anchor; neighbors exclusive to that anchor disappear; shared neighbors stay. Anchor node itself always stays.

**Independent Test**: Expand two anchors that share a neighbor, then collapse one — verify shared neighbor stays, exclusive ones disappear, anchor itself stays. SC-003 covered.

### Tests for User Story 2

- [X] T016 [P] [US2] Extend `test/Graph/ShapingSpec.purs` with collapse tests: (a) collapse removes anchor-exclusive neighbors, (b) collapse keeps shared neighbors, (c) collapse never removes the anchor itself, (d) idempotence (collapse twice ⇒ same state), (e) collapsing a seed node only removes its expanded neighbors. Tests MUST fail until T017 lands.

### Implementation for User Story 2

- [X] T017 [US2] Implement `collapse` in `src/Graph/Shaping.purs` per `data-model.md` (remove `ExpandedFrom n` from every reasons-set; drop keys whose reasons became empty; return `{ next, removed }`). Make T016 pass.
- [X] T018 [US2] In `src/Viewer.purs`, implement the `CollapseNode nid` handler: apply `collapse`, call `Cy.removeElementsById` for `removed`, refresh `Cy.setHasHidden` for the anchor and its surviving neighbors, persist.
- [X] T019 [US2] Extend the node context menu (T013) with a *Collapse* item; disable it (or hide) when the node has no `ExpandedFrom nid` entries anywhere in `state.shaping.reasons`.
- [ ] T020 [US2] Manual verification: walk through steps 3–6 of `quickstart.md`; confirm the shared-neighbor invariant against a hand-crafted seed in Cardano Knowledge Maps.

**Checkpoint**: US1 + US2 both functional. The P1 slice of the spec is delivered.

---

## Phase 5: User Story 3 — Know which nodes are expandable (Priority: P2)

**Goal**: Every visible node shows, at a glance, whether expanding it would reveal anything.

**Independent Test**: After any expand/collapse, scan visible nodes — the `+` marker is present exactly on nodes with hidden direct neighbors. SC-004 covered.

### Tests for User Story 3

- [X] T021 [P] [US3] Add a pure unit test for `hasHiddenNeighbors` in `test/Graph/ShapingSpec.purs`: true iff `neighborhood 1 n g \ visibleNodes ≠ ∅`.

### Implementation for User Story 3

- [X] T022 [US3] Implement `hasHiddenNeighbors` in `src/Graph/Shaping.purs`.
- [X] T023 [US3] In `src/Viewer.purs`, after every mutation of `shaping` (initial seed, expand, collapse, scope change, reset, persist-restore), walk `visibleNodes state.shaping` and call `Cy.setHasHidden id (hasHiddenNeighbors state.graph id state.shaping)` for each. Factor into a helper `refreshHasHidden :: H.HalogenM ...`.
- [ ] T024 [US3] Manual verification: step 6 of `quickstart.md` — confirm markers update correctly as you expand/collapse.

**Checkpoint**: Expandable affordance is live and kept consistent.

---

## Phase 6: User Story 4 — Reset the view to the default (Priority: P2)

**Goal**: A one-click way to discard shaping and return to the default seed.

**Independent Test**: Shape arbitrarily, click Reset Shaping, verify the view is identical to a fresh page load. SC-005 covered.

### Tests for User Story 4

- [X] T025 [P] [US4] Add a test for `reset` in `test/Graph/ShapingSpec.purs`: `reset seed` produces a state with `reasons = seed ↦ {InitialSeed}` and empty `positions`.

### Implementation for User Story 4

- [X] T026 [US4] Implement `reset` in `src/Graph/Shaping.purs` (delegate to `initFromSeed` with the given seed).
- [ ] T027 [US4] Add a *Reset Shaping* control to `src/Viewer/Controls.purs` (next to existing controls, not in a modal). On click dispatch `ResetShaping`.
- [ ] T028 [US4] In `src/Viewer.purs`, implement `ResetShaping`: compute the default seed for the current scope (reuse the helper extracted in T006), apply `reset`, call the existing `setFocusElements` path (fCoSE re-layout is explicitly allowed here by `research.md` §6), refresh `has-hidden` markers, persist.
- [ ] T029 [US4] Manual verification: step 8 of `quickstart.md` — confirm the post-reset view matches a fresh load pixel-for-pixel (up to fCoSE randomness acceptable at reset time).

**Checkpoint**: All four user stories independently functional.

---

## Phase 7: Polish & Cross-Cutting Concerns

- [ ] T030 [P] Playwright scenario `playwright/expand-collapse.spec.ts` covering quickstart steps 1–6 and 9 against a seed graph fixture checked into `test/fixtures/`. Assert: (a) position stability (SC-002, 5 px tolerance), (b) shared-neighbor survival across anchor collapse (SC-003), (c) `+` marker presence/absence matches hidden-neighbor state (SC-004).
- [ ] T031 [P] Run `just lint` (fourmolu / hlint equivalent for PureScript — `spago format` and `purs-tidy`), fix any warnings introduced in this feature's files only.
- [ ] T032 Run full local CI (`just ci`) and the existing Playwright suite; ensure no regressions in tutorial / query / view flows after the scope-change reset logic (T006, T028).
- [ ] T033 Update `README.md` (one short paragraph under the "Browsing" section) and the `docs/` page for the viewer to mention expand/collapse and the affordance marker; do not add a separate doc page unless missing features create confusion.
- [ ] T034 Walk through all 10 steps of `specs/012-expand-collapse/quickstart.md` end-to-end on Cardano Knowledge Maps; paste the resulting screenshots into PR #78 as a visual proof.

---

## Dependencies & Execution Order

### Phase dependencies

- **Phase 1 (Setup)** — no deps.
- **Phase 2 (Foundational)** — depends on Phase 1. BLOCKS Phases 3–6.
- **Phase 3 (US1 Expand)** — depends on Phase 2. Ships the MVP.
- **Phase 4 (US2 Collapse)** — depends on Phase 2. Can be implemented in parallel with Phase 3 by another developer; integration point is T019 (shared context menu).
- **Phase 5 (US3 Affordance)** — depends on Phase 3 (needs something to display a marker for) and/or Phase 4. Best done after both to avoid double work on `refreshHasHidden`.
- **Phase 6 (US4 Reset)** — depends on Phase 2 only. Independently deliverable.
- **Phase 7 (Polish)** — depends on whichever user stories are in scope for the shipping increment.

### Within each user story

- Tests precede implementation (`spago test` must fail first, pass after).
- Pure-PureScript function before its `Viewer.purs` handler.
- `Viewer.purs` handler before context-menu / controls wiring.
- Persistence wiring last within each story.

### Parallel opportunities

- **Phase 2**: T002 and T003 in parallel; T004 and T005 in parallel once T002 compiles.
- **Phase 3 vs Phase 4**: different handlers and test cases; can be parallelized after Phase 2, but serialize the context-menu touch (T013 vs T019) on the same file.
- **Phase 7**: T030 and T031 in parallel; T032/T033/T034 after the rest of the phase.

---

## Parallel Example: Phase 2

```bash
# Launch together (independent files):
Task: "Create src/Graph/Shaping.purs skeleton per contracts/Graph.Shaping.md"
Task: "Scaffold test/Graph/ShapingSpec.purs"

# Then:
Task: "Add FFI primitives in src/FFI/Cytoscape.purs + .js"
Task: "Extend src/Viewer/Types.purs with ShapingState + actions"
```

---

## Implementation Strategy

### MVP first (US1 only)

1. Phase 1 Setup.
2. Phase 2 Foundational — strict prerequisite.
3. Phase 3 US1 Expand.
4. **Stop and validate**: quickstart steps 1–3, 7. Deploy as a surge preview; confirm with the user before merging.

### Incremental delivery

1. Foundation → MVP (US1 only) → sanity preview.
2. Add US2 Collapse → rerun shared-neighbor check → preview.
3. Add US3 Affordance → rerun affordance check → preview.
4. Add US4 Reset → rerun reset check → preview.
5. Phase 7 Polish → merge PR #78.

### Parallel team strategy

If two developers: one takes US1 (Phase 3), the other takes US2 (Phase 4) after Phase 2 is done. Coordinate on T013 vs T019 (same file). US3 is a natural "integrator" slice once both are in.

---

## Notes

- `[P]` tasks touch different files or different test cases and have no unsatisfied dependencies.
- `[Story]` labels trace each task back to its user story for independent review.
- The feature ships against a single repo (`lambdasistemi/graph-browser`) on branch `012-expand-collapse` — no cross-repo work.
- Scope change (query/view/tour selection) must discard shaping — this is enforced in T006 and covered by regression tests in T032.
- Any deviation from `contracts/Graph.Shaping.md`'s seven behavioral properties is a bug to fix, not a contract revision — revise the contract via a separate PR if needed.
