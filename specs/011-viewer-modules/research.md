# Research: Viewer.purs Module Split

## Current Structure (2249 lines)

### Type Definitions (lines 63-166)
- `DataUrls`, `EdgeInfo`, `TutorialEntry`, `PromptMode`, `State`, `Action`, `PanelTab`
- These are referenced by ALL render functions and action handlers

### Component Wiring (lines 169-228)
- `viewer` component, `initialState`, `render`
- Imports and composes all render functions

### Render Functions — Graph Area (lines 232-308)
- `renderGraphContext` (~30 lines)
- `renderHoverTooltip` (~45 lines)
- `renderControls` (~45 lines)

### Render Functions — Left Panel (lines 351-440)
- `renderTutorialMenu` (~20 lines)
- `renderQueryPanel` (~40 lines)
- `filterByText`, `filterToursByText`, `isQueriesTab`, `isToursTab` (~30 lines)

### Render Functions — Tutorial (lines 716-825)
- `renderTutorialContent` (~110 lines)
- `currentStop` (~5 lines)

### Render Functions — Sidebar (lines 648-710)
- `renderSidebar` (~60 lines)
- `renderEmptyState` (~20 lines)

### Render Functions — Detail Panels (lines 921-1040)
- `renderEdgeDetail`, `renderEdgePreview`, `edgeDetailContent` (~60 lines)
- `renderNodeDetail`, `renderNodePreview`, `nodeDetailContent` (~120 lines)
- `renderConnections`, `renderLinks`, `renderOntologyIdentity` (~100 lines)
- `renderOntologyReference` (~15 lines)

### Render Functions — Shared (lines 1077-1210)
- `renderPromptBuilder` (~40 lines)
- `renderLegend` (~20 lines)
- `OntologyIdentity` type + helpers (~70 lines)
- `knownPrefixes` (~15 lines)

### Action Handlers (lines 1209-1830)
- `handleAction` — 620 lines, single case expression
- Initialize (~100 lines), NodeTapped/EdgeTapped (~50 lines), hover handlers (~30 lines)
- SetDepth/SetSearch/SelectSearchResult (~40 lines)
- Tutorial actions (~80 lines), View/Query actions (~100 lines)
- NavigateTo/SetPromptInput/CopyPrompt (~50 lines)
- FitAll/SetCatalogFilter/SetPanelTab (~20 lines)

### Graph/Data Loading (lines 1831-2030)
- `renderGraph` (~25 lines)
- `mostConnectedNode` (~30 lines)
- `applyTutorialStop` (~50 lines)
- `loadTutorialIndex/File`, `loadViewIndex/File`, `loadConfig` (~60 lines)
- `loadGraphData`, `fetchAndParseRdf`, `loadSparqlStore` (~50 lines)
- `loadQueryCatalog`, `discoverParamOptions`, `bindParameters` (~60 lines)

### Persistence (lines 2113-2135)
- `persistState` (~20 lines)
- `setDocTitle` (~5 lines)

### Utilities (lines 2137-2249)
- `depthBtn`, `lmapShow`, `resolveUrl` (~20 lines)
- `graphSourceLocations`, `isRdfConfig`, `isJsonGraphFormat` (~30 lines)
- `cls`, `lookupKind`, `kindColor`, `kindLabel` (~15 lines)
- `shouldRenderOntologyReference`, `kindsToForeign`, `mergeKinds` (~25 lines)

## Dependency Graph

```
Types ← everything (State, Action, EdgeInfo)
Graph.Types ← Types, Detail, Sidebar
Config helpers (lookupKind, kindLabel, cls) ← Detail, Controls, Legend, Sidebar
renderPromptBuilder ← Detail (full), Sidebar, QueryPanel
renderOntologyReference ← Detail, Tooltip
ontologyIdentity ← Detail (node)
knownPrefixes ← ontologyIdentity
```

## PureScript Module Constraints

- No circular imports — must be a DAG
- Halogen HTML types are polymorphic (`H.ComponentHTML Action () m`) — Action must be importable
- `handleAction` must stay in the main module (it accesses `H.modify_`, `H.get`, `liftEffect`, etc.)
- Render functions can live anywhere as long as they return `H.ComponentHTML Action () m`
