# Research: User-Selectable Graph Layouts

## Current Rendering Path

- `src/bootstrap.js` imports `cytoscape` and registers only `cytoscape-fcose`
- `src/FFI/Cytoscape.js` hardcodes `name: "fcose"` inside `runLayout`
- `src/FFI/Cytoscape.purs` exposes graph replacement and fit helpers, but no layout-selection or relayout API
- `src/Viewer.purs` always renders through `renderGraph`, which calls `Cy.setFocusElements` and then re-marks the selected root node

### Consequences

- The viewer has no representation of “current layout” today
- Any new layout choice must be carried through the Cytoscape FFI, not just added as a UI label
- Layout switching can be implemented either by:
  - adding a dedicated relayout API that operates on existing elements, or
  - making every render path pass the active layout into Cytoscape

## Current Selection Behavior

- `renderGraph` re-applies the selected node highlight with `Cy.markRoot`
- `renderGraph` does not re-apply selected-edge highlighting after replacing elements
- `selectedEdge` already exists in `Viewer.Types.State`, but render-time replay is incomplete

### Consequences

- A layout switch that replaces graph elements must explicitly restore edge selection styling
- A relayout-only path is safer for preserving visual state, but the code still needs a single source of truth for the active layout

## Current State and Persistence

- `Viewer.Types.State` currently stores graph, view, query, tutorial, and source-filter state, but no layout state
- `Persist.PersistedState` stores:
  - `selectedNodeId`
  - `depth`
  - `tutorialId`
  - `tutorialStep`
- `Persist.save` / `Persist.restore` use `graph-browser:<title>` as the storage key
- Repo lists and tokens are already stored separately under repo-specific keys
- In app mode, `RepoDiscovery` gives the viewer a `baseUrl` rooted at the repo+branch raw GitHub path
- In lib mode, `Lib.purs` passes `baseUrl: ""`

### Consequences

- Re-keying all viewer persistence from title to repo identity would be broader than this feature and risks regressing existing restore behavior
- A dedicated layout-preference key is the lowest-risk design
- Layout identity can be derived in the viewer from:
  - parsed `owner/repo` when `dataUrls.baseUrl` is a raw GitHub repo URL
  - otherwise `dataUrls.baseUrl` when present
  - otherwise `config.sourceUrl` when present
  - otherwise `config.title`

## Current View and Query Metadata

- Query-backed views are represented as `NamedQuery` entries tagged with `"view"` in `data/queries.json`
- `Graph.Query.NamedQuery` currently has:
  - `id`
  - `name`
  - `description`
  - `sparql`
  - `parameters`
  - `tags`
- `schema/query-catalog.schema.json` mirrors that shape and has no layout field
- Legacy view files decode through `Graph.Views.View`, which currently has:
  - `name`
  - `description`
  - `edges`
  - `tours`
- `schema/view.schema.json` also has no layout field

### Consequences

- Authored layout defaults must be added in both places:
  - query-catalog entries that act as views
  - legacy view JSON files
- The feature should not treat every query as a layout-bearing artifact; the authored default only matters for view-like queries

## Bundle and Dependency Surface

- `package.json` / `package-lock.json` currently include:
  - `cytoscape`
  - `cytoscape-fcose`
  - `oxigraph`
- `src/bootstrap.js` is bundled for both `bundle-app` and `bundle-lib`
- `flake.nix` uses `importNpmLock.buildNodeModules`, so adding Cytoscape layout extensions is a normal npm lockfile change, not a custom Nix packaging task

### Consequences

- ELK, Cola, and Dagre support belong in npm dependencies plus `src/bootstrap.js` registration
- `Concentric` is a built-in Cytoscape layout and does not require a separate plugin

## URL and Embed Relationship

- `src/FFI/Url.js` already exposes `getViewParam` / `setViewParam`
- No PureScript caller uses those functions today
- Open issue `#68` tracks wiring `?view=<id>` into the actual viewer flow

### Consequences

- This feature should react correctly whenever a view becomes active
- Deep-linking to a specific view remains a separate activation concern
- Once issue `#68` lands, the same authored-layout path can be reused on initial load

## Recommended Precedence Model

1. Saved explicit repo layout
2. Authored default for the currently active view, but only when no saved explicit layout exists
3. Global fallback `fcose`

### Why this model fits the request

- It preserves user intent once they actively choose a layout
- It still lets first-time visitors benefit from curated defaults
- It avoids persisting authored defaults as if they were user choices

## Recommended Scope Boundaries

- Include:
  - runtime layout switching
  - per-repo saved layout preference
  - authored default layout on query-backed and legacy views
  - both app and lib bundles
- Exclude:
  - `?view=` activation itself
  - changing the rest of viewer persistence away from title-based restore
  - layout-specific tuning for every dataset beyond a stable first pass
