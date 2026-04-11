# Tasks: Break Viewer.purs into Focused Modules

**Input**: plan.md, research.md, spec.md
**Prerequisites**: None — pure refactor, no dependencies

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel with other [P] tasks in the same phase
- Each task produces a compilable codebase (`spago build` passes)

---

## Phase 1: Foundation

- [ ] T001 Create `src/Viewer/Types.purs`. Move `DataUrls`, `EdgeInfo`, `TutorialEntry`, `PromptMode`, `State`, `Action`, `PanelTab`, `OntologyIdentity` from Viewer.purs. Update Viewer.purs to import from `Viewer.Types`. Verify `spago build`.

- [ ] T002 Create `src/Viewer/Helpers.purs`. Move `cls`, `lookupKind`, `kindLabel`, `kindColor`, `shouldRenderOntologyReference`, `ontologyIdentity`, `ontologyIri`, `compactIri`, `namespaceIri`, `namespaceName`, `knownPrefixes`, `depthBtn`, `renderOntologyReference`, `renderPromptBuilder`, `promptPlaceholder` from Viewer.purs. Update Viewer.purs imports. Verify `spago build`.

## Phase 2: Detail Panels

- [ ] T003 Create `src/Viewer/Detail.purs`. Move `renderNodeDetail`, `renderNodePreview`, `nodeDetailContent`, `renderEdgeDetail`, `renderEdgePreview`, `edgeDetailContent`, `renderConnections`, `renderLinks`, `renderOntologyIdentity` from Viewer.purs. Update Viewer.purs imports. Verify `spago build`.

## Phase 3: Graph Overlays

- [ ] T004 [P] Create `src/Viewer/Tooltip.purs`. Move `renderHoverTooltip` from Viewer.purs. Update Viewer.purs imports. Verify `spago build`.

- [ ] T005 [P] Create `src/Viewer/Controls.purs`. Move `renderControls`, `renderLegend`, `renderGraphContext`, `graphContext` from Viewer.purs. Update Viewer.purs imports. Verify `spago build`.

## Phase 4: Panels

- [ ] T006 [P] Create `src/Viewer/Tutorial.purs`. Move `renderTutorialContent`, `currentStop`, `renderTutorialMenu`, `displayTourTitle` from Viewer.purs. Update Viewer.purs imports. Verify `spago build`.

- [ ] T007 [P] Create `src/Viewer/QueryPanel.purs`. Move `renderQueryPanel`, `filterByText`, `filterToursByText`, `isQueriesTab`, `isToursTab` from Viewer.purs. Update Viewer.purs imports. Verify `spago build`.

- [ ] T008 Create `src/Viewer/Sidebar.purs`. Move `renderSidebar`, `renderEmptyState` from Viewer.purs. Update Viewer.purs imports. Verify `spago build`.

## Phase 5: Data Loading

- [ ] T009 Create `src/Viewer/Loader.purs`. Move `loadConfig`, `loadGraphData`, `fetchAndParseRdf`, `loadSparqlStore`, `loadQueryCatalog`, `loadTutorialIndex`, `loadTutorialFile`, `loadViewIndex`, `loadViewFile`, `discoverParamOptions`, `bindParameters`, `resolveUrl`, `graphSourceLocations`, `isRdfConfig`, `isJsonGraphFormat`, `lmapShow` from Viewer.purs. Update Viewer.purs imports. Verify `spago build`.

## Phase 6: Validation

- [ ] T010 Verify `spago build` produces zero errors and no new warnings.
- [ ] T011 Verify `spago test` — same pass/fail as before refactor.
- [ ] T012 Run `just bundle-lib` and deploy surge preview. Visual comparison with production.
- [ ] T013 Count lines: Viewer.purs must be under 700. No module over 300.
- [ ] T014 Verify no circular module dependencies (implicit from T001–T009 builds passing).
