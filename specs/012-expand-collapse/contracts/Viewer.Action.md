# Contract — `Viewer` action additions

Three new actions on the existing `Action` sum, handled in `Viewer.purs`.

```purescript
data Action
  = ...                           -- existing
  | ExpandNode NodeId
  | CollapseNode NodeId
  | ResetShaping
  | ConfirmLargeExpand NodeId (Set NodeId)  -- internal, fired by the confirm dialog
```

### Semantics

- `ExpandNode nid` —
  1. Compute `newNeighbors = neighborhood 1 nid state.graph \ visibleNodes state.shaping`.
  2. If `|newNeighbors| == 0`: show a transient "nothing to expand" toast; no state change.
  3. If `|newNeighbors| > largeExpandThreshold`: open a confirmation dialog; on user confirm, dispatch `ConfirmLargeExpand nid newNeighbors`; on cancel, no change.
  4. Otherwise apply `expand nid state.graph state.shaping`.
  5. Commit: updated state + Cytoscape `addElementsAt` delta for `added`.
  6. Persist.

- `CollapseNode nid` —
  1. Apply `collapse nid state.shaping`.
  2. Commit: updated state + Cytoscape `removeElementsById` for `removed`.
  3. Persist.

- `ResetShaping` —
  1. Compute the default seed for the currently-active scope (`state.graph`).
  2. Apply `initFromSeed seed`.
  3. Use the existing `setFocusElements` path (fCoSE re-layout is acceptable here).
  4. Persist.

- `ConfirmLargeExpand nid newNeighbors` — same as `ExpandNode` step 4 onward, bypassing the dialog.

### Invariants after each action

- `Map.keys state.shaping.reasons == nodes currently rendered by Cytoscape`.
- The Cytoscape viewport is not re-fitted on `ExpandNode` / `CollapseNode` (fit only on `ResetShaping` and on initial load).
- The "has hidden neighbors" class is re-applied to every visible node after any of these actions.

### Queries, views, tours

When the user selects a query, view, or tour step, the handler calls `initFromSeed` with the query/view/tour's seed and uses the existing fCoSE path — exactly as today. Shaping state for the previous scope is discarded on scope change.
