# Tasks: Source Selection Controls

**Branch**: `fix/improve-source-selection-controls-and-state-clarit`  
**Plan**: `plan.md`  
**Spec**: `spec.md`

## Phase 1: State And Actions

- [ ] Add source bulk actions to `Viewer.Types.Action`.
- [ ] Implement select-all and clear-all handling in `Viewer.purs`.
- [ ] Ensure bulk actions reset stale selected/hovered detail state and rerender the graph.

## Phase 2: Source Panel UI

- [ ] Show `visible/total` source state in the sources panel header.
- [ ] Add "Select all" and "Clear all" buttons in the expanded panel.
- [ ] Replace ambiguous mode wording with "Combined sources" and "Isolate one source".
- [ ] Make active source mode visually distinct.
- [ ] Keep individual source checkbox rows unchanged in behavior.

## Phase 3: Verification

- [ ] Run `just lint`.
- [ ] Run `just build`.
- [ ] Run `just test`.
- [ ] Build and serve the bundled app.
- [ ] Verify with Playwright that clear all, select all, source counts, and active mode state work.
