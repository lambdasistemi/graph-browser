# Phase 0 Research — Expand and Collapse Nodes

**Feature**: 012-expand-collapse
**Date**: 2026-04-23

This document records the design choices made for each non-trivial area before implementation. Each section states the **decision**, the **rationale**, and the **alternatives considered**.

---

## 1. Anchor model (what does "collapse" remove?)

**Decision**: Every visible node carries a set of **reasons to be visible**. A reason is either `InitialSeed` (the node was part of the initial visible set when the graph was first opened or after a reset) or `ExpandedFrom nid` (the node was added because `nid` was expanded). Collapsing node `X` removes the reason `ExpandedFrom X` from every node's reason-set. A node is kept visible as long as its reason-set is non-empty. The node `X` itself is **not** removed by its own collapse — collapse only operates on its direct expansion-anchor edges.

**Rationale**:
- Matches spec acceptance criteria 2.2 (shared neighbors stay when one anchor is collapsed) and 2.4 (seed nodes are unaffected by their own collapse).
- Keeps the model symmetric and monotone: expand adds reasons, collapse removes reasons; the visible set is the domain of the reason-map.
- Multiset of reasons is not needed — an expansion either anchors a neighbor or not; repeating `expand(X)` on an already-fully-expanded `X` is idempotent.

**Alternatives considered**:
- **Stack-based history (undo)**: would couple collapse to the temporal order of expansions. Rejected because it gives wrong semantics for shared neighbors — the user's intent is "un-anchor *through this node*", not "undo the last action".
- **Single-reason per node**: would lose shared-anchor semantics; collapse would wrongly hide shared neighbors. Rejected.

---

## 2. Preserving positions across expand/collapse

**Decision**: Add two FFI primitives that do **not** run a global layout:
- `addElementsAt :: Array ElementWithPos -> Effect Unit` — adds nodes at caller-supplied positions plus their edges to already-present nodes. New nodes are placed around their anchor on a small arc, with a bounded perturbation to avoid overlap.
- `removeElementsById :: Array NodeId -> Effect Unit` — removes nodes and their incident edges by id; does not move or re-fit.

For initial render (first paint, reset, or explicit Fit) the existing `setFocusElements` path still runs fCoSE. Expand/collapse only touch the delta.

**Rationale**:
- Spec FR-003 and SC-002 require no reflow of already-visible nodes.
- Cytoscape supports `cy.add()` and `ele.remove()` without triggering any layout; positions are honored if supplied on add.
- Keeps the cost per action O(delta), not O(visible).

**Alternatives considered**:
- **Re-run fCoSE with `randomize: false`**: fCoSE still perturbs positions slightly. Rejected.
- **Pin existing nodes (`locked: true`) and layout only new**: adds complexity and fCoSE still moves locked nodes in some versions. Rejected.
- **Manual placement for new neighbors without any layout help**: acceptable; we pick radial placement around the anchor with a configurable radius.

---

## 3. Placement of newly revealed neighbors

**Decision**: New neighbors are placed on a circle of radius `r` centred on the anchor's current position, evenly spaced on the arc that is least occupied by already-visible neighbors. `r` scales with the average edge length used by the current layout (read back from Cytoscape on first render). If many new neighbors would overlap existing nodes, we accept mild overlap — the user can drag to refine — rather than reflowing.

**Rationale**:
- Simple, deterministic, and respects the "no reflow" constraint.
- Users already expect to drag to fine-tune in this viewer (consistent with how they arrange nodes before exporting in spec 013).

**Alternatives considered**:
- **Run fCoSE constrained to the new subset only**: would require running a layout and risk moving shared-anchor neighbors. Rejected.
- **Random placement**: produces crossings and feels chaotic. Rejected.

---

## 4. Large-expand warning threshold

**Decision**: If an expand would reveal **more than 20** new nodes in one action, show a confirmation dialog: "Expanding this node will add N nodes. Continue?" with Continue / Cancel. The threshold is a constant in PureScript; not user-configurable in v1.

**Rationale**:
- 20 is a sweet spot: most realistic expansions are under this; runaway hubs (e.g. a root class in an ontology) are above it and are exactly what the spec (FR-006) wants to guard against.
- A hard constant is simpler than exposing a setting — any deployment-specific tuning can be a follow-up.

**Alternatives considered**:
- **Always ask**: too noisy for typical use. Rejected.
- **Never ask, always expand**: fails spec FR-006. Rejected.
- **Auto-chunk (reveal first 20 and offer "show more")**: more engineering for marginal gain; revisit if users report it. Deferred.

---

## 5. Affordance: "does this node have hidden neighbors?"

**Decision**: Compute for each visible node `n` the boolean `hasHidden n = |neighbors(n) \ visibleSet| > 0`. Render an indicator (a small "+" decoration) on the Cytoscape node when `hasHidden` is true; remove it when it becomes false. Update on every expand/collapse.

**Rationale**:
- Matches spec FR-004 and US3.
- Cytoscape supports per-node CSS classes; the indicator is a CSS pseudo-decoration applied via class. No new layout.

**Alternatives considered**:
- **Tooltip only**: requires hover; fails "at a glance" (SC-004). Rejected.
- **Recompute only on demand**: would be stale after expand/collapse. Rejected.

---

## 6. Reset semantics

**Decision**: Reset discards all expansion anchors, returns the visible set to the initial seed (as computed at page load or when a view/query changes the focus), and triggers the normal fCoSE layout on that seed set. Reset does **not** touch query/view/tour state — those are orthogonal.

**Rationale**:
- Matches FR-005 and SC-005.
- Re-layout is acceptable here because the user explicitly requested a reset.

**Alternatives considered**:
- **Reset also clears query/view**: conflates concerns; rejected.
- **Animate back to original positions**: gratuitous complexity. Rejected.

---

## 7. Persistence of shaping across page reloads

**Decision**: Extend `Persist.purs` to save and restore:
- `visibleNodeIds :: Array NodeId`
- `expansionAnchors :: Array { anchor :: NodeId, neighbors :: Array NodeId }`
- `nodePositions :: Array { id :: NodeId, x :: Number, y :: Number }`

On restore, if any of these reference nodes no longer present in the current graph data, they are silently dropped (future-proofs against graph data updates). Persistence is namespaced per `config.title`, like existing state.

**Rationale**:
- Users who reload should not lose a carefully shaped view.
- Dropping dangling references is consistent with the existing pattern of `Map.lookup` on restore (see `Viewer.purs` around the persisted `selectedNodeId`).

**Alternatives considered**:
- **Do not persist**: users lose their shaping on reload; poor UX. Rejected.
- **Error on any missing reference**: spec does not call for this here (divergence handling is scoped to the export/import spec 013). Rejected.

---

## 8. Interaction with existing `depth` / `neighborhood` flow

**Decision**: The existing `SetDepth`/`renderGraph` path (which re-layouts with fCoSE) is retained for tutorial/query/view/search flows. When the user expands or collapses manually, the viewer switches to the incremental path; the `depth` slider no longer drives the visible set in that mode. Selecting a query, view, or tour step resets shaping and returns to the depth-based neighborhood.

**Rationale**:
- The two modes have different ergonomics; mixing them would be confusing.
- Each entry point to the view (shape vs. query/tour) clearly owns its visibility policy.

**Alternatives considered**:
- **Merge into one model**: tried in a thought experiment — produces surprising jumps when the user shapes inside an active query. Rejected.

---

## 9. Keyboard / mouse gestures

**Decision**: v1 uses **two explicit actions from the node's context menu** (right-click or a small control on the hovered node): *Expand* and *Collapse*. The plain left-click remains the existing "select as root" action. We will not overload double-click or shift-click in v1.

**Rationale**:
- Preserves existing behavior.
- Context menu makes the two affordances discoverable and distinct.

**Alternatives considered**:
- **Double-click to expand, shift-click to collapse**: fewer clicks but invisible until learned. Deferred as follow-up if users request it.

---

## Summary of resolved clarifications

No `NEEDS CLARIFICATION` markers remain. All decisions above are confirmed with reasonable defaults; revisit only if users exercise the feature and report friction.
