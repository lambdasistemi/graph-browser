# Implementation Plan: Expand and Collapse Nodes

**Branch**: `012-expand-collapse` | **Date**: 2026-04-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/012-expand-collapse/spec.md`

## Summary

Turn the current display of the graph — which always re-flows with fCoSE whenever the visible subset changes — into an incrementally shapeable view. Clicking a node with intent to expand adds its hidden direct neighbors to the visible subset without disturbing the positions of nodes already on screen; clicking with intent to collapse removes neighbors whose only reason to be visible is an expansion anchored at this node. A neighbor that has multiple anchors (or is part of the initial seed) stays visible when one of its anchors is collapsed.

Technically: extend the Halogen viewer state with a **Visible Set** and an **Expansion Anchor** multimap. Add Cytoscape FFI primitives for *incremental* add/remove of nodes and edges (no global `layout().run()` call) and position new neighbors near their anchor. Wire expand/collapse actions through the existing `handleAction` dispatcher. Reuse `Graph.Operations.neighborhood` (1-hop). Keep the default tutorial/query/view flows on the existing full re-layout path — they are semantically different entry points.

## Technical Context

**Language/Version**: PureScript 0.15.x (Spago 2), JavaScript ES2020 for FFI
**Primary Dependencies**: Halogen 7, Cytoscape.js + fCoSE, Oxigraph (WASM in-browser), esbuild
**Storage**: In-memory state; per-title `localStorage` via `Persist.purs` (we will extend the persistence record with the new shaping state so a page reload does not lose it)
**Testing**: Playwright for end-to-end UI verification (per constitution); unit-test pure modules with `spago test` where already present
**Target Platform**: Browsers (current viewer hosted via GitHub Pages; also embedded as `lib` in downstream data repos)
**Project Type**: PureScript + JS single-project web app with a library output (`lib`) and a hosted viewer (`app`) — existing structure, unchanged by this feature
**Performance Goals**: Expand/collapse responds in < 100 ms for graphs up to 500 nodes; no visible jump of already-placed nodes (spec SC-002: within 5 px)
**Constraints**: No global re-layout on expand/collapse (constitution II — PureScript logic, thin JS FFI; we must keep the logic in PureScript and only expose the minimum FFI for Cytoscape position manipulation)
**Scale/Scope**: Cardano Knowledge Maps today is O(100) nodes and growing; target is graphs of several hundred nodes explored incrementally, rather than ever re-rendered in full

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Data-Driven, Zero Hardcoding** — PASS. No new domain-specific knowledge is added to code. Expand/collapse semantics are generic graph operations.
- **II. PureScript for Logic, JS FFI for Rendering** — PASS with scope. New FFI primitives (`addElementsAt`, `removeElementsById`, `hasHiddenNeighbors` is *not* FFI — it's pure PureScript over `Graph`) are **thin wrappers around Cytoscape calls**, no business logic. Anchor semantics live entirely in PureScript.
- **III. Nix-First Builds** — PASS. No new dependencies; feature uses Cytoscape primitives already in use.
- **IV. Library/App Split** — PASS. The expand/collapse behavior is part of the viewer component (lib) and thereby available to app consumers for free.
- **V. Schema-Validated Data** — NOT APPLICABLE. This feature does not introduce a new on-disk data format; the shaping state is in-memory + localStorage only (portability is out of scope — see spec 013).
- **VI. Accessibility of Information** — PASS. Expanding progressively reduces cognitive load on large graphs, which is the motivating use case.

**Quality Gates**:
- `nix build` stays green (same toolchain)
- `just ci` (lint + build + bundle) stays green
- Playwright verification required on a seed graph with two overlapping anchors (SC-003)
- No console errors introduced

**Complexity Tracking**: No constitutional violations; no justifications needed.

## Project Structure

### Documentation (this feature)

```text
specs/012-expand-collapse/
├── plan.md                # this file
├── research.md            # Phase 0: anchor model, layout preservation, large-expand threshold
├── data-model.md          # Phase 1: Visible Set + Expansion Anchor types and transitions
├── quickstart.md          # Phase 1: how to verify the feature manually
├── contracts/             # Phase 1: PureScript module contracts + Cytoscape FFI deltas
│   ├── Graph.Shaping.md
│   ├── Viewer.Action.md
│   └── FFI.Cytoscape.md
└── tasks.md               # Phase 2 output — created by /speckit.tasks, NOT by /speckit.plan
```

### Source Code (repository root)

The repository is a single PureScript + JS project. Files touched or added by this feature live under `src/`:

```text
src/
├── Graph/
│   ├── Types.purs                 # existing; unchanged
│   ├── Operations.purs            # existing; reuse neighborhood (1-hop)
│   └── Shaping.purs               # NEW: pure anchor model + expand/collapse transitions
├── Viewer/
│   ├── Types.purs                 # MODIFIED: add VisibleSet, ExpansionAnchors, actions
│   ├── Controls.purs              # MODIFIED: add expandable-affordance + reset control
│   └── (existing modules)
├── Viewer.purs                    # MODIFIED: wire ExpandNode / CollapseNode / ResetView actions
├── FFI/
│   └── Cytoscape.purs / .js       # MODIFIED: addElementsAt, removeElementsById (no layout)
└── Persist.purs                   # MODIFIED: persist anchors + visible-set across reloads
```

**Structure Decision**: Reuse the existing single-project layout. Introduce one new pure PureScript module (`Graph.Shaping`) so the anchor semantics are testable in isolation, but otherwise modify-in-place. No new top-level directories.

## Complexity Tracking

> No constitutional violations.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *(none)*  | *(none)*   | *(none)*                             |
