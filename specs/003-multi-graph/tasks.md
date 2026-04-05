# Tasks: Views — Named Subgraph Lenses

**Branch**: `003-multi-graph` | **Plan**: [plan.md](plan.md) | **Spec**: [spec.md](spec.md)

## Phase 1: Schema + Validation

### US1: Validate view files in CI

> **Goal**: Authors can create view files and CI catches broken references before the viewer supports views.

- [ ] **T1.1**: Create `schema/view.schema.json`
  - `name` (string, required), `description` (string, required)
  - `edges` (array of 3-element arrays `[string, string, string]`, required)
  - `tours` (array of tour objects, optional — same structure as `tutorial.schema.json` entries)
  - **Verify**: `npx ajv validate` accepts a valid view file and rejects invalid ones

- [ ] **T1.2**: Update `validate-action/action.yml` — schema validation
  - Detect `$DATA/views/` directory
  - If present, validate each `*.json` file against `view.schema.json`
  - Skip silently if no `views/` directory (backward compat)
  - **Verify**: CI passes for repos without views, fails for malformed view files

- [ ] **T1.3**: Update `validate-action/action.yml` — referential integrity
  - For each view file, check every edge triple `[s, t, l]` exists in `graph.json` (matching `source`, `target`, `label`)
  - For each tour stop, check the `node` appears as source or target in the view's matched edges
  - Report per-view, per-error (don't stop at first failure)
  - **Verify**: CI catches a view with a nonexistent edge triple and a tour stop referencing an unreachable node

- [ ] **T1.4**: Update `build-action/action.yml` — include views
  - If `$DATA/views/` exists, copy to `$OUT/data/views/`
  - Generate `$OUT/data/views/index.json` listing `{name, description, file}` for each view
  - **Verify**: Built site contains `data/views/index.json` with correct entries

- [ ] **T1.5**: Test actions on graph-browser's own CI
  - Add a sample view file under `data/views/` referencing existing edges
  - Verify CI passes with the view, fails if an edge is misreferenced
  - **Verify**: Green CI with valid view, red CI with broken view

---

## Phase 2: Viewer — View Filtering

### US1: Filter graph by view

- [ ] **T2.1**: Add `Graph/Views.purs` — types and filter function
  - `type EdgeTriple = { source :: String, target :: String, label :: String }`
  - `type View = { name :: String, description :: String, edges :: Array EdgeTriple, tours :: Array TutorialEntry }`
  - `filterByView :: View -> Graph -> Graph` — keep matching edges, compute node set
  - **Verify**: Unit test or manual: filtering a 50-node graph by a 10-edge view produces the correct subset

- [ ] **T2.2**: Add view decoding
  - JSON decoder for `View` type (parse view file)
  - JSON decoder for view index (parse `views/index.json`)
  - **Verify**: Decodes sample view files correctly

- [ ] **T2.3**: Update `Viewer.purs` — state and initialization
  - Add `activeView :: Maybe View` and `viewIndex :: Array ViewIndexEntry` to State
  - On Initialize: attempt to fetch `views/index.json` (relative to baseUrl). If found, populate viewIndex.
  - **Verify**: ViewIndex is loaded when views exist, empty when they don't

- [ ] **T2.4**: Update `Viewer.purs` — view selector UI
  - If viewIndex is non-empty, render a dropdown/button bar with view names + "All"
  - Selecting a view: fetch the view file, apply `filterByView`, re-render graph, load view's tours
  - Selecting "All": show full graph, load global tutorials
  - **Verify**: Dropdown appears with views, switching views re-renders the graph

- [ ] **T2.5**: Update `Viewer.purs` — tours integration
  - When a view is active: use `view.tours` as the tutorial index
  - When no view is active: use global `data/tutorials/` (existing behavior)
  - **Verify**: Tour menu shows per-view tours when a view is active, global tours when "All"

- [ ] **T2.6**: Deploy to surge and test manually
  - Build, deploy to surge
  - Test: view switching, per-view tours, "All" mode, backward compat with repos without views
  - **Verify**: User approval on surge preview

---

## Phase 3: App Integration + Deep-linking

### US3: Deep-link to views

- [ ] **T3.1**: Add `?view=` URL parameter support
  - `FFI/Url.purs` + `FFI/Url.js`: add `getViewParam`/`setViewParam`
  - `Main.purs`: read `?view=` on init, pass to Viewer as initial view
  - Update URL when view changes
  - **Verify**: `?view=governance` loads the governance view directly

- [ ] **T3.2**: Update `Lib.purs` for embedded view support
  - Accept view parameter for static deployments
  - **Verify**: Lib variant respects view parameter

---

## Phase 4: Dogfooding (optional)

- [ ] **T4.1**: Create view files for graph-browser's own architecture graph
  - At least two views over the existing architecture data
  - **Verify**: graph-browser can browse its own architecture through views
