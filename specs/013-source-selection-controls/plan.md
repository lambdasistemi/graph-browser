# Implementation Plan: Source Selection Controls

**Branch**: `fix/improve-source-selection-controls-and-state-clarit`  
**Spec**: `specs/013-source-selection-controls/spec.md`  
**Issue**: https://github.com/lambdasistemi/graph-browser/issues/87

## Status

**Completed**: Issue created and added to Planning. Source panel scope identified.  
**Current**: Add explicit source-selection state and bulk controls in the existing PureScript/Halogen sources panel.  
**Blockers**: None.

## Technical Context

- UI is PureScript/Halogen.
- Source panel rendering lives in `src/Viewer/SourcesPanel.purs`.
- Source-selection state lives in `State.hiddenSources`.
- Existing actions:
  - `ToggleSource String`
  - `ToggleSourcesPanel`
  - `SoloSource String`
  - `SetSourceSelectionMode`
- Filtering is already implemented by `Graph.Operations.filterBySources`.

## Approach

1. Extend `Viewer.Types.Action` with bulk source actions.
2. Render visible/total source count and a plain-language state summary in the sources header.
3. Add bulk action buttons inside the expanded sources panel.
4. Improve source mode controls with clearer labels and active state.
5. Handle the new actions in `Viewer.purs` by updating `hiddenSources`, selection mode, selection, and graph render state consistently with existing source toggles.
6. Verify with `just lint`, `just build`, `just test`, and browser checks against the example graph.

## UX Decisions

- Use "Combined sources" for multi-source checkbox mode.
- Use "Isolate one source" for single-source mode.
- Use "Select all" and "Clear all" as explicit bulk commands.
- Keep row checkboxes because they are the most direct representation of source visibility.
- Show source state in the collapsed header as `N/M visible`.

## Risks

- Elements without source metadata remain visible when all configured sources are hidden. This is existing graph filtering behavior and should not be changed in this issue.
- The repository has both app and library bundles; verification must include the bundled viewer path, not only PureScript compilation.
