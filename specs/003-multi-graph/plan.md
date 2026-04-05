# Implementation Plan: Views — Named Subgraph Lenses

**Branch**: `003-multi-graph` | **Date**: 2026-04-05 | **Spec**: [spec.md](spec.md)

## Summary

Add view files that select subsets of edges from the graph catalog, with per-view tours. The viewer filters the graph based on the active view. The validate-action checks that view references match existing edges and that tour stops reference reachable nodes. The build-action includes view files in the assembled site. Existing repos without views continue working unchanged.

## Technical Context

**Language/Version**: PureScript (Halogen) for viewer, Bash/Node for GitHub Actions  
**Primary Dependencies**: Cytoscape.js, Halogen, ajv-cli  
**Storage**: JSON files in `data/views/`, localStorage for persistence  
**Testing**: CI validation via GitHub Actions, Playwright for viewer  
**Target Platform**: Browser (GitHub Pages), GitHub Actions runners  
**Project Type**: Library + App + GitHub Actions  
**Constraints**: Backward compatible — no changes required for existing repos

## Constitution Check

| Gate | Status | Notes |
|------|--------|-------|
| Data-Driven, Zero Hardcoding | Pass | Views are JSON data, no domain knowledge in code |
| PureScript for Logic, JS FFI for Rendering | Pass | View filtering is PureScript logic, Cytoscape renders |
| Schema-Validated Data | Pass | New `view.schema.json` for view files |
| Library/App Split | Pass | View support in Viewer (shared), picker in App only |

## Project Structure

### Source Code Changes

```text
schema/
  view.schema.json                 # NEW — view file schema

src/
  Graph/Types.purs                 # ADD View type, edge triple type
  Graph/Views.purs                 # NEW — filter graph by view (compute nodes from edges)
  Viewer.purs                      # ADD view selector, pass filtered graph to renderer
  Lib.purs                         # ADD view loading from data/views/
  Main.purs                        # ADD ?view= parameter handling
  FFI/Url.purs                     # ADD getViewParam/setViewParam

validate-action/action.yml         # ADD view validation step
build-action/action.yml            # ADD copy views/ to site

data/views/                        # NEW — self-documenting graph's own views (optional)
```

## Implementation Phases

### Phase 1: Schema + Validation (actions first)

**Goal**: Views can be authored and validated before the viewer supports them.

1. Create `schema/view.schema.json`:
   - `name`: string (required)
   - `description`: string (required)
   - `edges`: array of 3-element arrays `[source, target, label]` (required)
   - `tours`: array of tour objects (optional, same structure as existing tutorial files)

2. Update `validate-action/action.yml`:
   - Detect `data/views/` directory
   - For each view file: validate against `view.schema.json`
   - Referential integrity: each edge triple `[s, t, l]` must match an edge in `graph.json` where `source==s && target==t && label==l`
   - Tour stop integrity: each stop's `node` must be reachable from the view's edges (appears as source or target of a selected edge)
   - Report per-view results, don't fail the entire run on one broken view
   - Existing repos without `views/` — no change in behavior

3. Update `build-action/action.yml`:
   - If `data/views/` exists, copy it to `site/data/views/`
   - Generate `site/data/views/index.json` listing available views (name, description, filename)

### Phase 2: Viewer — View Filtering

**Goal**: The lib viewer can load and apply a view.

1. Add `Graph/Views.purs`:
   - `type EdgeTriple = { source :: String, target :: String, label :: String }`
   - `type View = { name :: String, description :: String, edges :: Array EdgeTriple, tours :: Array TutorialEntry }`
   - `filterByView :: View -> Graph -> Graph` — keeps only matching edges, computes node set from kept edges

2. Update `Graph/Types.purs`:
   - Add `View` and `EdgeTriple` types (or re-export from Views)

3. Update `Viewer.purs`:
   - Add `activeView :: Maybe View` to state
   - Add `viewIndex :: Array { name :: String, description :: String, file :: String }` to state
   - On Initialize: attempt to load `views/index.json`. If found, populate viewIndex.
   - When a view is active: apply `filterByView` before rendering, use view's tours instead of global tutorials
   - When no view is active (or "All" selected): show full graph with global tutorials

4. Add view selector UI in Viewer:
   - If viewIndex is non-empty, show a dropdown/button bar above the graph
   - Options: each view by name + "All"
   - Selecting a view loads the view file, filters the graph, replaces tours

### Phase 3: App Integration + Deep-linking

**Goal**: The universal viewer supports `?view=` parameter.

1. Update `FFI/Url.purs` + `FFI/Url.js`:
   - Add `getViewParam :: Effect String` and `setViewParam :: String -> Effect Unit`

2. Update `Main.purs`:
   - Read `?view=` parameter on init
   - Pass to Viewer as initial view selection
   - Update URL when view changes

3. Update `Lib.purs`:
   - Support view parameter for embedded usage

### Phase 4: Self-documenting (optional)

Create view files for graph-browser's own architecture graph to dogfood the feature.

## Validation Strategy

The validate-action is the critical gate. It must catch:

| Check | When | Error message |
|-------|------|---------------|
| View schema | Always | `views/X.json invalid: [ajv error]` |
| Edge exists | Per edge triple | `views/X.json: edge [s, t, l] not found in graph.json` |
| Tour stop reachable | Per tour stop | `views/X.json tour "T" stop N: node "id" not in view` |
| No views dir | Always | Silent pass (backward compat) |

The viewer is resilient — if an edge triple doesn't match at runtime, it's silently skipped. The action is strict — it flags every mismatch.
