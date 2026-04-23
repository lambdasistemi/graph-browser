# Feature Specification: Expand and Collapse Nodes

**Feature Branch**: `012-expand-collapse`
**Created**: 2026-04-23
**Status**: Draft
**Input**: User description: "When browsing a large graph (e.g. Cardano Knowledge Maps), users want to shape the graph by clicking a node to expand its neighborhood or collapse it, so they can progressively grow a focused subset instead of being shown everything at once."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Grow the view by expanding a node (Priority: P1)

A user is looking at a focused subset of a large graph and wants to see what is connected to a specific visible node. They act on that node with the intent to expand, and its hidden direct neighbors become visible, along with the edges that connect them to the current view.

**Why this priority**: Without expansion, users have no way to progressively explore a large graph — they must either see everything (overwhelming) or nothing beyond the initial seed. Expansion is the primary exploration primitive.

**Independent Test**: Load a graph, start from a single visible node, perform expand actions on a few nodes in sequence, and verify that each action adds only the direct neighbors of the acted-on node without moving nodes that were already visible.

**Acceptance Scenarios**:

1. **Given** a visible node with N hidden direct neighbors, **When** the user triggers expand on that node, **Then** those N neighbors become visible with the edges connecting them to the visible set.
2. **Given** a visible node whose neighbors are all already visible, **When** the user triggers expand, **Then** the graph is unchanged and the user sees a non-disruptive indication that there is nothing to expand.
3. **Given** a shaped graph, **When** the user expands any node, **Then** the positions of nodes that were already on screen are preserved (no global re-layout).
4. **Given** a node whose expansion would reveal an unusually large number of new neighbors, **When** the user triggers expand, **Then** the user is warned and must explicitly confirm before the expansion commits.

---

### User Story 2 - Shrink the view by collapsing a node (Priority: P1)

A user has pulled too many neighbors into the view or wants to clean up around a specific node. They act on that node with the intent to collapse, and neighbors whose presence in the view is solely due to having been expanded through this node are hidden again; neighbors held in place by other reasons stay.

**Why this priority**: Expansion without a matching collapse is a ratchet — the view only grows. Collapse is the essential inverse, required to let users undo specific expansions locally without resetting the whole view.

**Independent Test**: Shape a graph by expanding two separate anchor nodes such that they share some neighbors, then collapse one of those anchors and verify that shared neighbors remain while anchor-exclusive neighbors disappear.

**Acceptance Scenarios**:

1. **Given** a node whose neighbors were brought in only through this node, **When** the user triggers collapse on that node, **Then** those neighbor nodes are hidden while the collapsed node itself remains visible.
2. **Given** a neighbor that is visible for multiple reasons (expanded from several anchors, or part of the initial seed), **When** one of its anchors is collapsed, **Then** the neighbor remains visible because other reasons still hold.
3. **Given** a shaped graph, **When** the user collapses any node, **Then** the positions of the remaining visible nodes are preserved (no global re-layout).
4. **Given** a seed/initial node, **When** the user triggers collapse on it, **Then** the node itself remains visible; only neighbors brought in through its own expansion are affected.

---

### User Story 3 - Know which nodes are expandable (Priority: P2)

Before clicking, a user wants to see at a glance which visible nodes still have hidden neighbors and which are fully expanded. This turns expand/collapse from guesswork into directed exploration.

**Why this priority**: Affordance for expand is useful once the core expand/collapse works. Without it, users click blindly; with it, they can navigate purposefully. Valuable but additive.

**Independent Test**: In a shaped graph, verify that each visible node displays a clear indicator of whether expanding it would reveal anything new, and that the indicator updates correctly as neighbors are expanded or collapsed elsewhere.

**Acceptance Scenarios**:

1. **Given** a shaped graph, **When** the view is rendered, **Then** each visible node shows whether it currently has hidden direct neighbors.
2. **Given** an expand or collapse action somewhere in the graph, **When** the action completes, **Then** all affected nodes' expandable indicators update to reflect the new state.

---

### User Story 4 - Reset the view to the default (Priority: P2)

After extensive shaping, a user wants to discard their modifications and return to the graph's default initial presentation without reloading the page.

**Why this priority**: Needed for recovery and for restarting exploration, but only after the shaping primitives themselves work.

**Independent Test**: Shape a graph arbitrarily, trigger reset, verify the view is identical to a fresh load.

**Acceptance Scenarios**:

1. **Given** a shaped graph, **When** the user triggers reset, **Then** the view returns to the graph's default initial state (same visible set and layout as a fresh load).

---

### Edge Cases

- **Expand on a node with no hidden neighbors**: no change, non-disruptive feedback.
- **Expand would add an unusually large number of neighbors**: user is warned and can confirm or cancel before the expansion commits.
- **Collapse of a node that is itself visible only because of another expansion**: the collapse hides its anchor-exclusive neighbors; the node itself follows the standard anchor rules (visible as long as any reason still holds).
- **Collapse of a seed/initial node**: its own visibility is unaffected by collapsing itself; only its direct neighbors brought in by its own expansion are re-hidden.
- **Circular expansion paths (A expanded B, B expanded A)**: a node is visible if at least one anchor still holds it; collapsing one anchor does not remove nodes kept alive by another.
- **Repeated expand on the same node after the underlying data has changed**: the expand uses the currently-available neighbors, not a frozen set from an earlier expansion.
- **Expand/collapse while an automatic initial layout is still settling**: user actions are queued or handled without producing inconsistent visible state.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Users MUST be able to trigger an expand action on any visible node, which reveals that node's direct neighbors that are not currently visible and the edges connecting them to the visible set.
- **FR-002**: Users MUST be able to trigger a collapse action on any visible node, which hides neighbors whose presence in the view is solely due to having been expanded through this node.
- **FR-003**: The system MUST preserve the on-screen positions of nodes that were already visible when an expand or collapse action occurs; no global re-layout of unaffected nodes.
- **FR-004**: The system MUST show, for each visible node, whether it currently has hidden direct neighbors (whether expanding it would change anything).
- **FR-005**: The system MUST provide a way to reset the shaped view back to the graph's default initial state.
- **FR-006**: The system MUST warn the user before an expand action brings in an unusually large number of new nodes at once and require explicit confirmation to proceed.
- **FR-007**: The system MUST keep a visible node on screen as long as at least one reason to show it still holds (initial seed membership, or an expansion anchor that has not been collapsed).

### Key Entities

- **Visible Set**: The subset of the underlying graph currently shown — the nodes and the edges between them — derived from the initial default set plus the user's expand/collapse actions.
- **Expansion Anchor**: A record that a given visible node was pulled into the view because of an expand action on another node. Multiple anchors can reference the same neighbor. Used to decide what collapse should remove vs. keep.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Starting from the default view of a graph of ≥200 nodes, a user can reach a focused subset of interest using only expand/collapse clicks in under 2 minutes.
- **SC-002**: After any expand or collapse action, previously visible nodes remain within 5 pixels of their prior position in 100% of cases.
- **SC-003**: In a graph where two anchors share neighbors, collapsing one anchor leaves the shared neighbors visible in 100% of cases and removes only the anchor-exclusive neighbors.
- **SC-004**: Users can identify which visible nodes have hidden neighbors without clicking, in under 1 second of inspection, in 100% of cases.
- **SC-005**: The reset action returns the view to a state indistinguishable from a fresh page load in 100% of cases.

## Assumptions

- The browser already provides a visual graph renderer with draggable nodes and automatic initial layout; this feature adds shaping on top of that renderer.
- "Neighbors" for expand/collapse means direct (1-hop) neighbors in the underlying graph. Multi-hop expansion policies are out of scope.
- The initial visible set when a graph is first opened is determined by existing configuration (e.g. the graph's default view) and is not redefined by this feature.
- Portability of a shaped view (export, import, sharing, sequencing into tours) is a separate concern, covered by its own specification; this spec is only about in-session shaping.
- Mobile/touch interaction is out of scope for v1; interactions are specified for a pointer device.
