# Feature Specification: Views — Named Subgraph Lenses

**Feature Branch**: `003-multi-graph`  
**Created**: 2026-04-05  
**Status**: Draft  
**Input**: User description: "Named subgraph views over a shared node/edge catalog"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Author defines views over a single knowledge base (Priority: P1)

A researcher maintains one repository with all their knowledge — nodes and edges across governance, treasury, LLM tooling, etc. They define views that filter the full graph down to a specific topic. Each view is a list of `(source, target, label)` triples; the nodes are computed from the selected edges.

**Why this priority**: This is the core value — one repo, one set of nodes, multiple lenses. No more duplicating nodes across repos.

**Independent Test**: Create a repo with a full `graph.json` and two view files. Verify each view shows only its subset of edges and the nodes they reference.

**Acceptance Scenarios**:

1. **Given** a repo with `graph.json` (50 nodes, 80 edges) and `views/governance.json` listing 30 edge triples, **When** a user selects the governance view, **Then** only those 30 edges and their referenced nodes are displayed.
2. **Given** the same repo, **When** no view is selected, **Then** the full graph (all 50 nodes, 80 edges) is displayed.
3. **Given** a view referencing an edge triple not in the catalog, **When** CI runs, **Then** validation reports the invalid reference.

---

### User Story 2 - Existing repos without views keep working (Priority: P1)

A maintainer of an existing data repo has no view files. The updated viewer and actions work exactly as before — the entire graph is shown.

**Why this priority**: Backward compatibility is non-negotiable.

**Independent Test**: Run updated actions against an existing repo with no `views/` directory. Verify identical behavior.

**Acceptance Scenarios**:

1. **Given** a repo with `data/graph.json` and no `views/` directory, **When** the viewer loads, **Then** the full graph is displayed with no view picker.
2. **Given** the same repo, **When** the validate-action runs, **Then** it passes without requiring view files.

---

### User Story 3 - Viewer deep-links to a specific view (Priority: P2)

A user shares a link like `?repo=owner/repo&view=governance`. The viewer loads the repo and applies the governance view, showing only that subset.

**Why this priority**: Sharing specific perspectives is essential for collaboration, but depends on the core view infrastructure.

**Independent Test**: Load the viewer with a `?view=` parameter pointing to a valid view. Verify the filtered graph loads directly.

**Acceptance Scenarios**:

1. **Given** a multi-view repo, **When** the URL includes `?view=governance`, **Then** the governance view loads directly.
2. **Given** the same repo without a `?view=` parameter, **When** the viewer loads, **Then** a view picker shows all available views plus an "All" option.
3. **Given** `?view=nonexistent`, **When** the viewer loads, **Then** it shows an error listing the available views.

---

### Edge Cases

- What happens when a view selects zero edges? The viewer shows an empty graph with a message.
- What happens when a repo has only one view? It should show the view directly with no picker, but offer an "All" toggle to see the full graph.
- What happens when edges are added to the catalog but not to any view? They appear only in the full graph view, not in any named view. This is expected — views are curated subsets.
- What happens when a node has no edges in the selected view? It is not shown — nodes are computed from edges.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST support an optional `views/` directory containing view files.
- **FR-002**: Each view file MUST contain a name, description, and a list of edge references as `(source, target, label)` triples.
- **FR-003**: The viewer MUST compute the visible node set from the edges selected by a view — a node is visible if and only if it appears as source or target of a selected edge.
- **FR-004**: When no views are defined, the viewer MUST display the full graph (all nodes and edges).
- **FR-005**: When views are defined, the viewer MUST offer a way to select between views and the full graph.
- **FR-006**: The viewer MUST support a `?view=` URL parameter for deep-linking to a specific view.
- **FR-007**: The validate-action MUST check that every edge triple in a view file matches an existing edge in `graph.json`.
- **FR-008**: The build-action MUST include view files in the assembled site.
- **FR-009**: Tutorials MUST work within views — if a tutorial stop references a node not in the current view, it should be skipped or flagged.

### Key Entities

- **Node Catalog**: The complete set of nodes in `graph.json`. Shared across all views.
- **Edge Catalog**: The complete set of edges in `graph.json`. Each edge is identified by `(source, target, label)`.
- **View**: A named subset of the edge catalog. Defined by a list of edge triples. Nodes are derived, not listed.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A single repo can serve multiple topic-specific subgraphs without duplicating any node definitions.
- **SC-002**: Existing repos without views continue to work with zero changes.
- **SC-003**: Users can switch between views within 1 click from the viewer.
- **SC-004**: Deep-links to a specific view load the correct subgraph on first visit.

## Assumptions

- View file names (without extension) serve as the view identifier (used in `?view=` parameter).
- Edge triples are matched exactly — `(source, target, label)` must match the edge catalog verbatim.
- The view picker UI is minimal — a dropdown or similar control, not a visual dashboard.
- Cross-repo views (referencing edges from another repository) are out of scope. Views only filter the local edge catalog.
- A view file is a standalone JSON file, one per view, in the `views/` directory.
