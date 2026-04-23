# Phase 1 Data Model — Expand and Collapse Nodes

**Feature**: 012-expand-collapse
**Date**: 2026-04-23

All new state is in-memory PureScript in the Halogen viewer. The underlying `Graph.Types` stays untouched — shaping is a view over the immutable underlying graph.

---

## Entities

### `Reason`

Why a node is currently visible. Sum type.

```purescript
data Reason
  = InitialSeed          -- part of the starting visible set
  | ExpandedFrom NodeId  -- revealed by expanding this anchor
```

**Invariants**:
- `ExpandedFrom n` is only present in a node's reason-set if `n` itself is visible. If `n` is removed from the visible set for any reason, every `ExpandedFrom n` must also be removed (in practice, this follows from only ever collapsing *visible* nodes).

---

### `ShapingState`

The shaping-specific sub-state of the viewer.

```purescript
type ShapingState =
  { reasons :: Map NodeId (Set Reason)   -- visible set = keys of reasons
  , positions :: Map NodeId Position     -- id -> { x, y } snapshot
  }

type Position = { x :: Number, y :: Number }
```

**Derived**:
- `visibleNodes = Map.keys reasons`
- `isVisible n = Map.member n reasons`
- `hasHiddenNeighbors g n = any (not <<< isVisible) (Graph.Operations.neighborhood 1 n g)`

**Invariants**:
- Every key has a non-empty reason-set. An empty reason-set means the node must be removed from the map.
- Every key in `positions` is in `visibleNodes` (we drop positions when a node becomes hidden).

---

## State transitions

All transitions are pure functions over `ShapingState` + the underlying `Graph`. They are defined in the new module `Graph.Shaping`.

### `initFromSeed`

```purescript
initFromSeed :: Set NodeId -> Graph -> ShapingState
```

- For each `n` in the seed set, `reasons[n] = {InitialSeed}`.
- `positions` starts empty; it is filled in by the renderer after the first fCoSE pass.

### `expand`

```purescript
expand :: NodeId -> Graph -> ShapingState -> { next :: ShapingState, added :: Set NodeId }
```

Preconditions: `isVisible n`.

Effect:
- Let `newNeighbors = neighborhood 1 n g \\ visibleNodes s` (the anchor's direct neighbors that are not already visible).
- For each `m` in `newNeighbors`, set `reasons[m] := reasons[m] ∪ {ExpandedFrom n}` (creating the entry if absent).
- `positions[m]` left unset; the renderer assigns a placement near `n`'s current position.
- Return `added = newNeighbors`.

If `newNeighbors` is empty: no change; `added = ∅`.

**Idempotence**: repeated `expand(n)` against the same graph yields the same state (set semantics).

### `expandWithConfirm`

Orchestration-level; belongs in `Viewer.purs` rather than the pure module:
- If `|newNeighbors| > LARGE_EXPAND_THRESHOLD` (20), request user confirmation before committing the transition. Otherwise commit directly.

### `collapse`

```purescript
collapse :: NodeId -> ShapingState -> { next :: ShapingState, removed :: Set NodeId }
```

Preconditions: `isVisible n`.

Effect:
- For each node `m` with `ExpandedFrom n ∈ reasons[m]`: set `reasons[m] := reasons[m] \ {ExpandedFrom n}`. If the resulting set is empty, remove `m` from `reasons` (and from `positions`).
- `n` itself is never removed by collapsing itself. If `n`'s own reasons include `ExpandedFrom k` for some `k` still visible, `n` stays; collapsing `n` does not affect `n`'s reasons.
- Return `removed = the set of nodes whose reasons became empty`.

**Idempotence**: repeated `collapse(n)` against the same graph/state yields the same state (second call finds no `ExpandedFrom n` entries to drop).

### `reset`

```purescript
reset :: Set NodeId -> ShapingState
reset seed = initFromSeed seed ... -- positions cleared; caller triggers fCoSE relayout
```

### `recordPosition` / `dropPositions`

Glue between Cytoscape events and the shaping state.

```purescript
recordPosition :: NodeId -> Position -> ShapingState -> ShapingState
dropPositions  :: Set NodeId -> ShapingState -> ShapingState
```

---

## Viewer state integration

`Viewer.Types.State` gains a single field:

```purescript
type State =
  { ...                           -- existing fields
  , shaping :: ShapingState
  }
```

The existing `graph` / `fullGraph` fields stay but take on a stricter meaning:
- `fullGraph` — the whole underlying graph (unchanged semantics).
- `graph` — the subgraph *scope* set by the active query / view / tour (unchanged semantics). Shaping operates over this scope.

The visible set shown in Cytoscape becomes `subgraph (Map.keys shaping.reasons) state.graph`.

---

## Persistence additions

`Persist.PersistedState` gains:

```purescript
, shaping :: Maybe
    { visibleNodeIds :: Array NodeId
    , anchors :: Array { node :: NodeId, reasons :: Array String } -- encoded Reason
    , positions :: Array { id :: NodeId, x :: Number, y :: Number }
    }
```

On restore:
- Drop any `visibleNodeIds` that no longer exist in the current graph.
- Drop any `anchors` whose `node` is no longer visible.
- Reconstruct `ShapingState`; if it would end up empty, fall back to `initFromSeed` with the default seed.

---

## Lifecycle of a node's visibility

```text
 (hidden) ──expand(anchor)──▶ (visible, reasons ⊇ {ExpandedFrom anchor})
                              │
           further expands ◀──┼──▶ (visible, reasons has multiple entries)
                              │
 collapse last anchor ────────┴──▶ (hidden)  // reasons became empty
```

An `InitialSeed` reason is only acquired via `initFromSeed`/`reset`; there is no user action that promotes an expanded node to a seed node.

---

## Test scenarios mapped to acceptance criteria

| Acceptance criterion | Test |
|---|---|
| US1 #1 (expand reveals N neighbors) | `expand n` on a state where `neighborhood 1 n g \ visible` has N members adds exactly those N to the keys of `reasons` |
| US1 #2 (no-op expand) | `expand n` when `neighborhood 1 n g ⊆ visible` returns `added = ∅` |
| US1 #3 (collapse removes anchor-exclusive neighbors) | After `expand a; expand b; collapse a` where `a` and `b` have disjoint neighborhoods: `a`'s exclusive neighbors are removed, `b`'s remain |
| US1 #4 (shared neighbors stay) | After `expand a; expand b; collapse a` where `a` and `b` share a neighbor `m`: `m` stays, with `reasons[m] = {ExpandedFrom b}` |
| US1 #5 (position preserved) | Invariant on positions: `collapse` and `expand` do not modify positions for nodes whose visibility did not change |
| US4 (reset) | `reset seed` clears positions and restores `reasons = seed ↦ {InitialSeed}` |
