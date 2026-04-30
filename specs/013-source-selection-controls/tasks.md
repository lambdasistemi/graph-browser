# Tasks: Source Selection Controls

**Branch**: `fix/improve-source-selection-controls-and-state-clarit`  
**Plan**: `plan.md`  
**Spec**: `spec.md`

## Phase 1: State And Actions

- [x] Add source bulk actions to `Viewer.Types.Action`.
- [x] Implement select-all and clear-all handling in `Viewer.purs`.
- [x] Ensure bulk actions reset stale selected/hovered detail state and rerender the graph.

## Phase 2: Source Panel UI

- [x] Show `visible/total` source state in the sources panel header.
- [x] Add "Select all" and "Clear all" buttons in the expanded panel.
- [x] Replace ambiguous mode wording with "Combined sources" and "Isolate one source".
- [x] Make active source mode visually distinct.
- [x] Keep individual source checkbox rows unchanged in behavior.
- [x] Key source rows by source-selection mode so radio checked state is reliable after mode switches.

## Phase 3: Verification

- [x] Run `just lint`.
- [x] Run `just build`.
- [x] Run `just test`.
- [x] Build and serve the bundled app.
- [x] Verify with Playwright that clear all, select all, source counts, and active mode state work.
