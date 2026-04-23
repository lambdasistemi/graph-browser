# Data Model: User-Selectable Graph Layouts

## LayoutId

The canonical viewer layout identifier.

```text
LayoutId =
  "fcose"
  | "elk"
  | "cola"
  | "dagre"
  | "concentric"
```

## LayoutSource

Tracks why the current layout is active.

```text
LayoutSource =
  "saved-explicit"
  | "view-default"
  | "fallback"
```

This distinction matters because authored defaults should apply only until the user makes an explicit choice for that repo.

## ViewerLayoutState

Runtime layout state held in `Viewer.Types.State`.

```text
ViewerLayoutState:
  activeLayout: LayoutId
  layoutSource: LayoutSource
```

### Semantics

- `activeLayout` is the layout currently rendered in Cytoscape
- `layoutSource` distinguishes user intent from derived defaults
- `layoutSource = "saved-explicit"` tells view-selection logic not to override the user with authored defaults

## RepoLayoutPreference

Stored separately from the existing `PersistedState`.

```text
RepoLayoutPreference:
  identity: String
  layout: LayoutId
```

### Identity derivation

```text
identity =
  if dataUrls.baseUrl is a raw GitHub repo URL then "<owner>/<repo>"
  else if dataUrls.baseUrl != "" then dataUrls.baseUrl
  else if config.sourceUrl != "" then config.sourceUrl
  else config.title
```

This keeps app-mode preferences repo-scoped across branch previews without forcing a wider migration of existing title-keyed state.

## ViewLayoutDefault

Optional authored layout attached to a view-like artifact.

```text
ViewLayoutDefault:
  layout: Maybe LayoutId
```

Applies to:

- a query-catalog entry tagged as a view
- a legacy view JSON file loaded through `Graph.Views`

## Query-Backed View Shape

Existing view-like queries gain an optional `layout` field.

```json
{
  "id": "module-flow",
  "name": "Module Flow",
  "description": "Directed flow through the major modules",
  "sparql": "SELECT ?node WHERE { ... }",
  "tags": ["view"],
  "layout": "dagre"
}
```

## Legacy View Shape

Legacy view JSON files also gain an optional `layout` field.

```json
{
  "name": "Architecture Rings",
  "description": "Grouped by concern",
  "layout": "concentric",
  "edges": [
    ["viewer", "query-panel", "contains"]
  ],
  "tours": []
}
```

## Precedence Rules

```text
effectiveLayout(view) =
  saved explicit layout for repo
  else authored layout on active view
  else "fcose"
```

### Trigger rules

- On initial viewer load:
  - restore saved layout if present
  - otherwise use `fcose`
- On activating a view:
  - if a saved explicit repo layout exists, keep it
  - otherwise apply the view's authored layout if present
  - otherwise keep fallback `fcose`
- On explicit user layout change:
  - update `activeLayout`
  - set `layoutSource = "saved-explicit"`
  - persist the layout under the repo identity key

## Persistence Shape

Recommended localStorage entry:

```json
{
  "layout": "elk"
}
```

Stored under a dedicated key:

```text
graph-browser:layout:<identity>
```

This avoids changing the existing persisted viewer-state schema for node/depth/tutorial restore.
