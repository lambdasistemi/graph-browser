# Implementation Plan: User-Selectable Graph Layouts

**Branch**: `012-layout-picker` | **Date**: 2026-04-23 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/012-layout-picker/spec.md`

## Summary

Add a real layout model to the viewer so users can switch among multiple Cytoscape layouts at runtime, persist their explicit choice per repo, and let curated views declare an optional default layout for first-time visitors. The implementation should keep layout state inside the shared viewer, register additional Cytoscape layout engines in the bundle, and use a dedicated layout-preference store instead of changing the existing node/depth/tutorial persistence contract.

## Technical Context

**Language/Version**: PureScript (Spago) with JavaScript FFI and npm Cytoscape plugins  
**Primary Dependencies**: Halogen, Cytoscape.js, `cytoscape-fcose`, additional Cytoscape layout extensions  
**Storage**: Browser `localStorage` for repo layout preferences  
**Testing**: `just test`, `just bundle-app`, `just bundle-lib`, manual browser verification on self graph and a downstream repo  
**Target Platform**: Browser, GitHub Pages hosted app, embeddable lib bundle  
**Project Type**: Frontend viewer plus static bundles  
**Performance Goals**: Layout switching should reflow the current graph in-session without requiring data reload  
**Constraints**: Preserve active browsing context; keep app/lib behavior aligned; avoid regressing existing persisted viewer-state restore  
**Scale/Scope**: Viewer controls, Cytoscape FFI, query/view metadata, bundle dependencies, and layout-specific persistence only

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Data-Driven, Zero Hardcoding | PASS | Available layouts are product-level viewer behavior; authored defaults still live in data files |
| II. PureScript for Logic, JS FFI for Rendering | PASS | Layout selection logic stays in PureScript; JS remains a thin Cytoscape bridge |
| III. Nix-First Builds | PASS | New layout engines enter through npm lockfile and existing Nix bundle flow |
| IV. Library/App Split | PASS | Layout behavior belongs in shared viewer code and must work in both `Main` and `Lib` |
| V. Schema-Validated Data | PASS | Query-catalog and view schemas gain explicit optional `layout` fields |
| VI. Accessibility of Information | PASS | Different graph shapes become easier to read without forcing one layout on every dataset |

## Project Structure

```text
src/
├── Viewer.purs                  # MODIFY: restore/apply effective layout during init and view/query changes
├── Viewer/Types.purs            # MODIFY: add layout state and actions
├── Viewer/Controls.purs         # MODIFY: render the layout selector in the control bar
├── Persist.purs                 # MODIFY: add dedicated layout preference save/load helpers
├── FFI/Cytoscape.purs           # MODIFY: expose layout-aware render/relayout functions
├── FFI/Cytoscape.js             # MODIFY: register, select, and run multiple layouts
├── Graph/Query.purs             # MODIFY: decode optional layout on query-backed views
├── Graph/Views.purs             # MODIFY: decode optional layout on legacy view files
└── bootstrap.js                 # MODIFY: register additional Cytoscape layout engines

schema/
├── query-catalog.schema.json    # MODIFY: optional layout field for view-like queries
└── view.schema.json             # MODIFY: optional layout field for legacy views

package.json                     # MODIFY: add Cytoscape layout extension deps
package-lock.json                # MODIFY: lock layout extension deps
README.md                        # REVIEW/MODIFY: document supported layout ids if user-facing docs need parity
```

## Design Decisions

### D1: Keep layout persistence separate from existing viewer restore state

Do not repurpose `PersistedState` for this feature. Add dedicated layout preference helpers keyed by a repo/viewer identity derived from parsed `owner/repo` when `baseUrl` is a raw GitHub repo URL, then `baseUrl`, then `sourceUrl`, then `title`.

### D2: Treat layout as shared viewer state, not a Cytoscape-only detail

Add `activeLayout` and `layoutSource` to `Viewer.Types.State` so layout precedence is explicit and testable in PureScript.

### D3: Authored defaults belong on views, not on arbitrary queries

Add optional `layout` support to:

- query-catalog entries tagged as `"view"`
- legacy view JSON files

Non-view queries keep working without layout metadata.

### D4: Support both rerender and in-place relayout paths

The Cytoscape FFI should have one active layout concept that is reused by graph renders, plus a direct relayout path for explicit user switching. This avoids duplicating layout logic and makes it easier to preserve selection state.

### D5: Explicit user choice outranks authored defaults

The effective layout order is:

1. saved explicit repo layout
2. authored default of the currently active view when no saved explicit layout exists
3. `fcose` fallback

Authored defaults are derived behavior and should not be persisted as if the user chose them.

## Implementation Phases

### Phase 1: Layout State, Persistence, and Data Shapes

- Add layout state and actions to `Viewer/Types.purs`
- Add dedicated layout preference save/load helpers to `Persist.purs`
- Extend `Graph.Query.NamedQuery` and `Graph.Views.View` with optional layout metadata
- Extend `schema/query-catalog.schema.json` and `schema/view.schema.json` with the same optional field

### Phase 2: Cytoscape Layout Engine Support

- Add the required Cytoscape layout extension dependencies to `package.json` / `package-lock.json`
- Register those engines in `src/bootstrap.js`
- Refactor `FFI/Cytoscape.js` so layout execution is selected by `LayoutId` instead of hardcoded to `fcose`
- Expose the necessary PureScript FFI hooks for applying and rerunning the active layout

### Phase 3: Viewer Behavior and Controls

- Add a layout selector to `Viewer/Controls.purs`
- Restore the saved explicit layout during initialization when present
- Apply authored defaults when selecting a view and no saved explicit layout exists
- Preserve node and edge selection styling when layout changes
- Ensure query execution, view selection, tutorial movement, and source filtering continue to render through the active layout

### Phase 4: Verification and Documentation

- Run `just test`
- Bundle both app and lib outputs
- Manually verify on graph-browser’s self graph and at least one downstream repo
- Update user-facing docs if the supported layout ids or authoring shape need to be documented

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Layout switching via full rerender drops edge highlight | User-visible regression | Replay selected-edge styling after rerender or prefer a direct relayout path |
| Saved layout keyed too broadly or too narrowly | Wrong repo restores wrong layout | Use a dedicated identity derived from canonical `owner/repo` when possible, with explicit fallbacks |
| Layout engines differ in option shapes and animation behavior | Uneven UX across engines | Centralize layout option mapping in `FFI/Cytoscape.js` and start with conservative defaults |
| Query-backed and legacy views drift in supported metadata | Inconsistent authoring story | Add the same optional `layout` field to both decoding paths and both schemas |

## Dependencies

- Issue `#68` is related but not blocking: this feature only needs to react when a view becomes active; wiring `?view=` to activate a view is a separate concern
