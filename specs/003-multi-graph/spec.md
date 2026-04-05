# Feature Specification: Views — Named Subgraph Lenses

**Feature Branch**: `003-multi-graph`  
**Created**: 2026-04-05  
**Status**: Draft  
**Input**: User description: "Named subgraph views over a shared node/edge catalog"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Author defines views over a single knowledge base (Priority: P1)

A researcher maintains one repository with all their knowledge — nodes and edges across governance, treasury, LLM tooling, etc. They define views that filter the full graph down to a specific topic. Each view contains a list of `(source, target, label)` triples selecting edges from the catalog, plus its own guided tours. Nodes are computed from the selected edges.

**Why this priority**: This is the core value — one repo, one set of nodes, multiple lenses with topic-specific tours.

**Independent Test**: Create a repo with a full `graph.json` and two view files, each with tours. Verify each view shows only its subset of edges, the computed nodes, and its own tours.

**Acceptance Scenarios**:

1. **Given** a repo with `graph.json` (50 nodes, 80 edges) and `views/governance.json` listing 30 edge triples and 2 tours, **When** a user selects the governance view, **Then** only those 30 edges, their referenced nodes, and the 2 governance tours are available.
2. **Given** the same repo, **When** no view is selected, **Then** the full graph is displayed with no tours (tours are per-view only).
3. **Given** a view with a tour stop referencing a node not reachable from the view's edges, **When** CI runs, **Then** validation reports the invalid stop.

---

### User Story 2 - Existing repos without views keep working (Priority: P1)

A maintainer of an existing data repo with `data/config.json`, `data/graph.json`, and `data/tutorials/` has no view files. The updated viewer and actions work exactly as before — the entire graph is shown with the existing tutorials.

**Why this priority**: Backward compatibility is non-negotiable.

**Independent Test**: Run updated actions against an existing repo with `data/` layout and `tutorials/`. Verify identical behavior.

**Acceptance Scenarios**:

1. **Given** a repo with `data/graph.json`, `data/tutorials/`, and no `views/` directory, **When** the viewer loads, **Then** the full graph is displayed with the existing tutorials.
2. **Given** the same repo, **When** the validate-action runs, **Then** it passes without requiring view files.

---

### User Story 3 - Viewer deep-links to a specific view (Priority: P2)

A user shares a link like `?repo=owner/repo&view=governance`. The viewer loads the repo and applies the governance view, showing only that subset with its tours.

**Why this priority**: Sharing specific perspectives is essential for collaboration, but depends on the core view infrastructure.

**Independent Test**: Load the viewer with a `?view=` parameter pointing to a valid view. Verify the filtered graph and its tours load correctly.

**Acceptance Scenarios**:

1. **Given** a multi-view repo, **When** the URL includes `?view=governance`, **Then** the governance view loads with its tours.
2. **Given** the same repo without a `?view=` parameter, **When** the viewer loads, **Then** a view picker shows all available views plus an "All" option (All shows full graph, no tours).
3. **Given** `?view=nonexistent`, **When** the viewer loads, **Then** it shows an error listing the available views.

---

### Edge Cases

- What happens when a view selects zero edges? The viewer shows an empty graph with a message.
- What happens when a repo has only one view? It should show the view directly with no picker, but offer an "All" toggle to see the full graph.
- What happens when edges are added to the catalog but not to any view? They appear only in the full graph ("All") view.
- What happens when a node has no edges in the selected view? It is not shown — nodes are computed from edges.
- What happens when a repo has both `views/` and `tutorials/`? The `tutorials/` directory is used for the full graph (legacy/backward compat). Each view's tours are in the view file.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST support an optional `views/` directory containing view files.
- **FR-002**: Each view file MUST contain a name, description, a list of edge references as `(source, target, label)` triples, and an optional list of tours.
- **FR-003**: Tours within a view MUST only reference nodes reachable from the view's selected edges.
- **FR-004**: The viewer MUST compute the visible node set from the edges selected by a view — a node is visible if and only if it appears as source or target of a selected edge.
- **FR-005**: When no views are defined, the viewer MUST display the full graph with tutorials from `data/tutorials/` if present.
- **FR-006**: When views are defined, the viewer MUST offer a way to select between views and the full graph.
- **FR-007**: The viewer MUST support a `?view=` URL parameter for deep-linking to a specific view.
- **FR-008**: The validate-action MUST check that every edge triple in a view file matches an existing edge in `graph.json`, and that every tour stop references a node reachable from the view's edges.
- **FR-009**: The build-action MUST include view files in the assembled site.
- **FR-010**: Repos with no views and existing `data/tutorials/` MUST continue working identically to current behavior.

### Key Entities

- **Node Catalog**: The complete set of nodes in `graph.json`. Shared across all views.
- **Edge Catalog**: The complete set of edges in `graph.json`. Each edge is identified by `(source, target, label)`.
- **View**: A named subset of the edge catalog plus its own tours. Defined by a list of edge triples and an optional tours array. Nodes are derived, not listed.
- **Tour**: A guided walkthrough with stops referencing nodes. Scoped to a view — can only reference nodes reachable from that view's edges.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A single repo can serve multiple topic-specific subgraphs with per-topic tours without duplicating any node definitions.
- **SC-002**: Existing repos without views continue to work with zero changes, including their tutorials.
- **SC-003**: Users can switch between views within 1 click from the viewer.
- **SC-004**: Deep-links to a specific view load the correct subgraph and its tours on first visit.

## Assumptions

- View file names (without extension) serve as the view identifier (used in `?view=` parameter).
- Edge triples are matched exactly — `(source, target, label)` must match the edge catalog verbatim.
- The view picker UI is minimal — a dropdown or similar control.
- Cross-repo views (referencing edges from another repository) are out of scope.
- The full graph view ("All") shows all nodes and edges but no tours — tours are always per-view or per-legacy-tutorials.
