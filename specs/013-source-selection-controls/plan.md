# Implementation Plan: Source Selection Controls

**Branch**: `fix/improve-source-selection-controls-and-state-clarit`  
**Spec**: `specs/013-source-selection-controls/spec.md`  
**Issue**: https://github.com/lambdasistemi/graph-browser/issues/87

## Status

**Completed**: Issue created and added to Planning. Source panel scope identified. Source-selection state, bulk controls, clearer mode labels, strict partial-source filtering, and browser verification are complete.
**Current**: Ready for PR review.
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
- Filtering is implemented by `Graph.Operations.filterBySources` for the full-source view and `Graph.Operations.filterToSources` for partial or isolated source views.

## Approach

1. Extend `Viewer.Types.Action` with bulk source actions.
2. Render visible/total source count and a plain-language state summary in the sources header.
3. Add bulk action buttons inside the expanded sources panel.
4. Improve source mode controls with clearer labels and active state.
5. Handle the new actions in `Viewer.purs` by updating `hiddenSources`, selection mode, selection, and graph render state consistently with existing source toggles.
6. Render partial source selections through an allow-list filter so selected proposal sources provide the visible graph structure and background sources only provide support data needed by selected-source edges.
7. Verify with `just lint`, `just build`, `just test`, and browser checks against the example graph and the Cardano Budget 2026 graph.

## UX Decisions

- Use "Combined sources" for multi-source checkbox mode.
- Use "Isolate one source" for single-source mode.
- Use "Select all" and "Clear all" as explicit bulk commands.
- Keep row checkboxes because they are the most direct representation of source visibility.
- Show source state in the collapsed header as `N/M visible`.
- Count and bulk-control only selectable foreground sources. Background sources remain locked support data, not forced-visible graph structure during partial selection.
- Key source rows by source-selection mode so switching from checkboxes to radios remounts inputs with the correct checked state.

## Risks

- The full-source view still uses the previous hide-list filtering behavior so existing non-source-aware graphs remain compatible.
- Partial source views use stricter allow-list filtering; missing source provenance on selected-source edges would hide those edges.
- The repository has both app and library bundles; verification must include the bundled viewer path, not only PureScript compilation.
