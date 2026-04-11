# Plan: Break Viewer.purs into Focused Modules

## Architecture

The split follows the dependency DAG:

```
Viewer/Types.purs          (leaf — no project imports)
    ↑
Viewer/Helpers.purs        (imports Types)
    ↑
┌───┴───┬──────────┬──────────┬──────────┐
│       │          │          │          │
Detail  Tooltip    Tutorial   Controls   QueryPanel
│       │          │          │          │
└───┬───┴──────────┴──────────┴──────────┘
    ↑
Viewer/Sidebar.purs        (imports Detail)
    ↑
Viewer/Loader.purs         (data loading, no rendering)
    ↑
Viewer.purs                (component wiring + handleAction)
```

## Module Inventory

### `Viewer/Types.purs` (~100 lines)
Exports: `DataUrls`, `EdgeInfo`, `TutorialEntry`, `PromptMode`, `State`, `Action`, `PanelTab`, `OntologyIdentity`

### `Viewer/Helpers.purs` (~60 lines)
Shared utilities used by multiple render modules.
Exports: `cls`, `lookupKind`, `kindLabel`, `kindColor`, `shouldRenderOntologyReference`, `ontologyIdentity`, `ontologyIri`, `compactIri`, `namespaceIri`, `namespaceName`, `knownPrefixes`, `depthBtn`, `renderOntologyReference`, `renderPromptBuilder`, `promptPlaceholder`

### `Viewer/Detail.purs` (~200 lines)
Node and edge detail rendering — full and preview variants.
Exports: `renderNodeDetail`, `renderNodePreview`, `nodeDetailContent`, `renderEdgeDetail`, `renderEdgePreview`, `edgeDetailContent`
Contains: `renderConnections`, `renderLinks`, `renderOntologyIdentity` (private)

### `Viewer/Tooltip.purs` (~50 lines)
Hover tooltip bubble on the graph canvas.
Exports: `renderHoverTooltip`

### `Viewer/Tutorial.purs` (~120 lines)
Tutorial step rendering and navigation helpers.
Exports: `renderTutorialContent`, `currentStop`, `renderTutorialMenu`

### `Viewer/Controls.purs` (~80 lines)
Graph area controls and legend.
Exports: `renderControls`, `renderLegend`, `renderGraphContext`

### `Viewer/QueryPanel.purs` (~80 lines)
Left-panel query catalog and tour listing.
Exports: `renderQueryPanel`
Contains: `filterByText`, `filterToursByText`, `isQueriesTab`, `isToursTab` (private)

### `Viewer/Sidebar.purs` (~70 lines)
Right-panel sidebar composition.
Exports: `renderSidebar`
Contains: `renderEmptyState`, `pinnedContent`, `sidebarTitle` (private)

### `Viewer/Loader.purs` (~150 lines)
All data loading functions (no rendering).
Exports: `loadConfig`, `loadGraphData`, `fetchAndParseRdf`, `loadSparqlStore`, `loadQueryCatalog`, `loadTutorialIndex`, `loadTutorialFile`, `loadViewIndex`, `loadViewFile`, `discoverParamOptions`, `bindParameters`

### `Viewer.purs` (~500 lines)
Component definition, `render`, `handleAction`, `renderGraph`, `applyTutorialStop`, `persistState`, `mostConnectedNode`, initialization, graph source resolution, kind helpers for Cytoscape.

## Phase Strategy

Each phase produces a compilable, working codebase. Every commit compiles.

### Phase 1: Extract Types (bisect-safe)
Move type definitions to `Viewer/Types.purs`. Update imports in `Viewer.purs`. No behavior change.

### Phase 2: Extract Helpers (bisect-safe)
Move shared utilities to `Viewer/Helpers.purs`. Update imports.

### Phase 3: Extract Detail (bisect-safe)
Move node/edge detail rendering to `Viewer/Detail.purs`. This is the largest single extraction.

### Phase 4: Extract Tooltip (bisect-safe)
Move `renderHoverTooltip` to `Viewer/Tooltip.purs`.

### Phase 5: Extract Tutorial (bisect-safe)
Move tutorial rendering to `Viewer/Tutorial.purs`.

### Phase 6: Extract Controls (bisect-safe)
Move graph controls and legend to `Viewer/Controls.purs`.

### Phase 7: Extract QueryPanel (bisect-safe)
Move query panel to `Viewer/QueryPanel.purs`.

### Phase 8: Extract Sidebar (bisect-safe)
Move sidebar composition to `Viewer/Sidebar.purs`. Depends on Detail.

### Phase 9: Extract Loader (bisect-safe)
Move data loading functions to `Viewer/Loader.purs`.

### Phase 10: Verify
Run full build, tests, bundle-lib, surge preview. Compare with production.

## Risks

- **Halogen type signatures**: Render functions use `H.ComponentHTML Action () m` which requires `Action` from Types. This is standard and works across modules.
- **handleAction size**: Still ~620 lines in Viewer.purs. Could be split further but that's a separate concern — action handlers need direct access to `H.modify_` and `H.get`.
- **Import boilerplate**: Each new module needs its own imports. PureScript doesn't have re-exports, so callers import from the specific module.

## Non-Goals

- Splitting `handleAction` into sub-handlers (future work)
- Changing any behavior or UI
- Refactoring `PromptBuilder.purs` or other existing modules
