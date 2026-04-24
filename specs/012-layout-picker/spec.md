# Feature Specification: User-Selectable Graph Layouts

**Feature Branch**: `012-layout-picker`  
**Created**: 2026-04-23  
**Status**: Draft  
**Input**: GitHub issue #39

## User Scenarios & Testing

### User Story 1 - Switch layout to match the graph shape (Priority: P1)

A user exploring a graph needs to change how the graph is arranged depending on what they are trying to understand. A force-directed layout may be best for general exploration, while a layered or concentric layout may make flows, hierarchies, or groupings clearer. The user can switch layouts from the viewer controls without reloading the graph or losing their place.

**Why this priority**: This is the core feature request. Without in-session layout switching, the browser forces one presentation style onto every graph shape.

**Independent Test**: Load a repo, switch between multiple layouts from the viewer controls, and verify that the visible graph reflows in place while the current repo, selection, and navigation context remain active.

**Acceptance Scenarios**:

1. **Given** a loaded graph, **When** the user chooses a different layout from the viewer controls, **Then** the currently visible graph is rearranged without refetching data or reloading the page
2. **Given** an active node, edge, query result, or tutorial step, **When** the user switches layouts, **Then** that context remains active after the graph reflows
3. **Given** a repo with no saved or authored layout preference, **When** the viewer loads, **Then** it starts with the default force-directed layout

---

### User Story 2 - Curated views open with an authored layout default (Priority: P2)

A knowledge-map author curates named views to explain a graph from different angles. Some views read best as flows, some as hierarchies, and some as grouped rings. The author can declare a preferred default layout for a view so first-time users see that view in the most meaningful arrangement immediately.

**Why this priority**: Curated views are part of how graph-browser makes complex information accessible. Layout is part of that presentation, not just a user preference.

**Independent Test**: Configure one query-backed view and one legacy view with authored layout defaults, open them as a first-time visitor, and verify that each view starts in its declared layout.

**Acceptance Scenarios**:

1. **Given** a query-backed view or legacy view with an authored default layout and no saved user preference for that repo, **When** the user opens that view, **Then** the declared layout becomes active automatically
2. **Given** a deep link or embedded instance that opens a specific view, **When** the view loads for a first-time visitor, **Then** the view appears using its authored default layout without extra clicks
3. **Given** a view declares an invalid or unsupported layout identifier, **When** the view loads, **Then** the viewer falls back to the default layout and remains usable

---

### User Story 3 - Each repo remembers the user's preferred layout (Priority: P3)

A user browses multiple repos with different graph structures. They want each repo to remember the last layout they explicitly chose, so returning to a familiar graph does not require reconfiguring the presentation every time.

**Why this priority**: Persistence removes repeated setup friction and makes layout choice feel like part of the browsing context, not a temporary tweak.

**Independent Test**: Visit two repos, choose different layouts in each, reload the page or switch away and back, and verify that each repo restores its own last explicit layout choice.

**Acceptance Scenarios**:

1. **Given** repo A was last viewed with one layout and repo B with another, **When** the user switches between those repos, **Then** each repo restores its own saved layout choice
2. **Given** a user previously chose a layout for a repo, **When** they return to that repo later, **Then** the viewer restores that explicit choice automatically
3. **Given** a repo already has a saved user layout and a view declares a different authored default, **When** the user reopens that repo, **Then** the saved user choice takes precedence

---

### Edge Cases

- A saved layout identifier is no longer supported by the viewer
- A view or query definition declares a layout identifier the viewer does not recognize
- The user switches layouts while a tutorial, query result, or node/edge selection is active
- The currently visible graph is very small, so two layouts appear visually similar even though the active layout changed

## Requirements

### Functional Requirements

- **FR-001**: The viewer MUST expose a layout selector in its graph controls once a graph is loaded
- **FR-002**: The viewer MUST offer at least these layout choices: `fCoSE`, `ELK`, `Cola`, `Dagre`, and `Concentric`
- **FR-003**: Changing the active layout MUST rearrange the currently visible graph without reloading the page or refetching repo data
- **FR-004**: Layout changes MUST preserve the user’s current browsing context, including active repo, selected node or edge, active query or view, tutorial step, depth, and source filters
- **FR-005**: The system MUST use `fCoSE` as the fallback default layout whenever no other valid layout choice applies
- **FR-006**: The system MUST persist the user’s last explicit layout choice separately for each repo
- **FR-007**: The system MUST restore a repo’s saved layout choice when that repo is reopened
- **FR-008**: Authored view definitions MUST be allowed to declare an optional default layout
- **FR-009**: “View definitions” MUST include both query-catalog entries used as views and legacy view files
- **FR-010**: An authored default layout MUST apply for users who do not yet have a saved layout preference for that repo
- **FR-011**: After a user has made an explicit layout choice for a repo, that saved choice MUST override authored defaults for later visits to that repo
- **FR-012**: Invalid or unsupported saved or authored layout identifiers MUST fall back to `fCoSE` without blocking graph browsing
- **FR-013**: The currently active layout MUST be clearly visible in the viewer controls
- **FR-014**: Layout selection and authored default behavior MUST work in both the hosted app and the embeddable lib viewer

### Key Entities

- **Layout Option**: A user-selectable graph arrangement mode such as `fCoSE`, `ELK`, `Cola`, `Dagre`, or `Concentric`
- **Repo Layout Preference**: The last layout a user explicitly chose for a specific repo
- **View Layout Default**: An optional authored layout preference attached to a named view so first-time visitors see that view in its intended presentation

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users can switch among at least five layout options from the viewer controls in a single browsing session
- **SC-002**: In manual verification on graph-browser’s self graph and at least one downstream repo, switching layouts preserves the active browsing context in 100% of tested flows
- **SC-003**: Returning to a previously visited repo restores the user’s last explicit layout choice in 100% of tested cases
- **SC-004**: A view with an authored default layout opens in that layout for first-time visitors in 100% of tested cases
- **SC-005**: Invalid or unsupported saved/authored layout identifiers never prevent the graph from rendering; the viewer falls back to `fCoSE` in 100% of tested cases

## Assumptions

- Layout changes apply to whatever graph the user is currently viewing, whether that is the full graph, a query result, or a legacy view
- Layout preferences are stored per repo, not separately per view
- Query-backed views and legacy view files both remain supported during this feature
- The hosted app and lib viewer continue to expose the same graph-level controls unless a host intentionally hides outer chrome outside the scope of this feature
