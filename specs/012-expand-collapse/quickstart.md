# Quickstart — Verify Expand/Collapse Manually

**Feature**: 012-expand-collapse
**Audience**: reviewer / tester checking that the feature behaves to spec

## Prerequisites

- Worktree: `/code/graph-browser-expand-collapse/`, branch `012-expand-collapse`.
- Dev shell: `nix develop` (PureScript, Spago, esbuild, Node).
- A data repo to point at — recommended: `cardano-knowledge-maps` (≥ 50 nodes, has overlapping neighborhoods).

## Build

```bash
just build      # PureScript compile + JS bundle
just serve      # http://localhost:PORT — open the viewer against the chosen data repo
```

## Golden-path walkthrough

1. **Initial paint**
   - Open a graph (e.g. Cardano Knowledge Maps).
   - Observe the default seed subset and that node positions are stable.
   - ✅ No console errors.

2. **Expand**
   - Hover a seed node that displays the `+` affordance (has hidden neighbors).
   - Right-click → **Expand**.
   - ✅ New neighbors appear around the anchor; previously-visible nodes do not jump.

3. **Expand into a shared neighbor**
   - Pick a second seed node that shares a neighbor with the first expansion. Expand it.
   - ✅ The shared neighbor is already visible; only its other hidden neighbors are newly added.

4. **Collapse (anchor-exclusive neighbors)**
   - Collapse the first anchor.
   - ✅ Only the neighbors that were *exclusive* to it disappear. The shared neighbor stays.
   - ✅ The anchor node itself stays visible.

5. **Collapse a seed**
   - Collapse one of the original seed nodes.
   - ✅ The seed itself stays visible. Only neighbors it had expanded are re-hidden.

6. **Affordance updates**
   - After each action, re-check the `+` markers — they should reflect the new state.

7. **Large-expand warning**
   - Find (or construct) a hub node whose expansion would reveal > 20 new nodes.
   - Expand it.
   - ✅ Confirmation dialog appears with an accurate count. Cancel → no change. Confirm → commits.

8. **Reset**
   - Click the Reset Shaping control.
   - ✅ The view returns to the default seed and runs a normal fCoSE layout.

9. **Persistence**
   - Shape the view; drag a few nodes; reload the page.
   - ✅ Visible set, anchors, and positions are restored.

10. **Scope change**
    - Open a query / view / tour step.
    - ✅ Shaping state is discarded; the query/view/tour owns the visibility.
    - Close the query → default seed restored, positions recomputed.

## Edge cases

- Expand on a fully-expanded node → "nothing to expand" toast; no change.
- Rapid repeated expand/collapse on the same node → idempotent, no flicker.
- Reload against a data file where a formerly-visible node no longer exists → it is silently dropped from the restored state; no error.

## Automated checks

- Unit tests for `Graph.Shaping` (see `contracts/Graph.Shaping.md` behavioral contract).
- Playwright scenario covering steps 1–6 above plus step 9.
