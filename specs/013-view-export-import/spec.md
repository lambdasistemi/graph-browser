# Feature Specification: Export, Import and Sequence Graph Views

**Feature Branch**: `013-view-export-import`
**Created**: 2026-04-23
**Status**: Draft
**Input**: User description: "Once a user has shaped a graph into the subset and arrangement they care about, they want to export that view to a shareable artifact (file or URL), import it again later or on another machine, and compose multiple such views into an ordered narrative tour — slides through the graph."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Export the current view as a shareable artifact (Priority: P1)

A user has a graph on screen that they have shaped into the exact subset and arrangement they want to talk about. They want to hand that exact view to someone else — "open this and you'll see what I want to show you" — without requiring the recipient to reproduce the steps, the layout, or have any server-side state.

**Why this priority**: Export is what turns the browser from an exploration tool into a communication tool. Without it, shaped views are ephemeral and cannot be referenced in discussions, documents, or messages.

**Independent Test**: Shape a graph (arrange nodes, hide or reveal some), export it, close the browser, open the exported artifact against the same underlying graph, and verify the visible node set, edges, and node positions match what was exported.

**Acceptance Scenarios**:

1. **Given** a shaped graph on screen, **When** the user exports the view, **Then** the system produces a self-contained artifact that captures which nodes are visible, which edges are visible, and the on-screen position of each visible node.
2. **Given** an exported view artifact, **When** the artifact is opened alongside the same underlying graph data, **Then** the browser reconstructs the exact same visible subset and layout.
3. **Given** a shaped graph, **When** the user exports, **Then** the artifact is available both as a downloadable file and as a shareable link/URL.
4. **Given** an exported view, **When** a technical user opens the artifact in a plain text editor, **Then** they can read it and understand which nodes, edges, and positions it describes.
5. **Given** a shaped graph, **When** the user exports, **Then** the artifact contains only references to graph content plus layout and selection state — no session secrets, auth tokens, or private runtime data.

---

### User Story 2 - Import an exported view (Priority: P1)

A user receives an exported view (a file attached to a message, or a URL pasted into chat) and wants to open it to see exactly what the sender was looking at.

**Why this priority**: Export is only useful if import is straightforward. Import is the other half of the communication loop and completes the MVP: shape → export → share → import.

**Independent Test**: Take an exported view artifact produced on one machine/browser session, import it in a different session (via file open and via URL), and verify the graph is shown exactly as the sender left it.

**Acceptance Scenarios**:

1. **Given** an exported view artifact, **When** the user imports it, **Then** the graph is rendered with exactly the nodes, edges, and positions captured in the export.
2. **Given** an imported view, **When** the user interacts with the graph, **Then** the view behaves identically to a view shaped from scratch — the import is a starting point, not a read-only snapshot.
3. **Given** a URL-form exported view, **When** the user opens the URL, **Then** the same view is rendered as from a file import.
4. **Given** an imported view, **When** the user re-exports from it, **Then** a new artifact is produced reflecting any further interaction.

---

### User Story 3 - Graceful import when the underlying graph has diverged (Priority: P1)

A user imports a view that was exported some time ago, and the underlying graph data has changed in the meantime — some nodes have been removed, renamed, or added. The user should see as much of the original view as still makes sense, with a clear report of what could not be resolved.

**Why this priority**: Without graceful degradation, any change in the underlying data invalidates every previously-shared view. That would make exported views effectively disposable and undermine their purpose. Must ship with the P1 MVP.

**Independent Test**: Export a view, remove one referenced node from the underlying graph data, import the view, and verify that the remaining content renders correctly and that the missing reference is reported to the user without aborting the import.

**Acceptance Scenarios**:

1. **Given** an exported view whose references all still resolve, **When** imported, **Then** it renders exactly as exported.
2. **Given** an exported view where some references no longer resolve against the current graph data, **When** imported, **Then** the resolvable subset renders, and the user sees a clear, specific report of which referenced items could not be found.
3. **Given** an exported view where all references fail to resolve, **When** imported, **Then** the user sees a clear message explaining the mismatch rather than an empty canvas with no context.
4. **Given** an imported view against a newer version of the same graph where extra nodes/edges now exist, **When** rendered, **Then** the view stays faithful to what was exported — extra content does not appear unless the user explicitly expands into it.

---

### User Story 4 - Compose a sequence of views as a narrative tour (Priority: P2)

A user wants to combine several exported views into an ordered sequence — slides in a deck, steps in a tour — to walk an audience through a story in the graph one view at a time.

**Why this priority**: This builds directly on export/import and is the real goal ("narrative or tour"), but it is only valuable once single-view export/import works reliably. It is an additive layer on top of the P1 MVP.

**Independent Test**: Create three exported views, group them into a named sequence, step forward and backward through the sequence, and verify each step shows the intended view.

**Acceptance Scenarios**:

1. **Given** two or more exported views, **When** the user groups them into a sequence and assigns an order, **Then** the sequence is itself a shareable artifact that captures the order and the views.
2. **Given** a sequence artifact, **When** the user opens it, **Then** they can step forward and backward between views and see each one rendered as if imported individually.
3. **Given** a sequence, **When** the user pauses at any step, **Then** they can interact freely with that view (including further shaping) without breaking the sequence.
4. **Given** a sequence, **When** any step's underlying references partially fail to resolve, **Then** that step reports the missing items (as with a single-view import) but the rest of the sequence still works.

---

### User Story 5 - Edit a sequence (Priority: P3)

A user wants to refine a sequence they are authoring: reorder steps, insert a new step, or remove a step, without rebuilding the whole sequence from scratch.

**Why this priority**: Authoring ergonomics. Users can work around its absence by re-exporting a new sequence, but good editing makes tours viable as a real presentation format.

**Independent Test**: Create a sequence of 3 steps, reorder them, insert a 4th between steps 1 and 2, remove the original step 2, export and re-open, verifying the final order.

**Acceptance Scenarios**:

1. **Given** an authored sequence, **When** the user reorders steps, **Then** the new order is reflected when the sequence artifact is re-opened.
2. **Given** an authored sequence, **When** the user inserts or removes a step, **Then** the modified sequence is correctly captured in the exported sequence artifact.

---

### Edge Cases

- **Exporting an empty view**: allowed; re-imports cleanly as an empty shaped graph.
- **URL-form export grows too large for a single URL**: the system either switches to a file form or uses a URL that points to a downloadable artifact, without silently truncating the view.
- **Importing an artifact created by a newer version of the browser**: the browser either imports successfully or reports a clear version mismatch, but never shows a partially-built view as if it were complete.
- **Importing an artifact for a different underlying graph than the currently loaded one**: the user is informed before the import replaces their current view, and can cancel.
- **Import from a URL with referenced graph data unavailable**: the user sees a specific, actionable message identifying which data source is missing, not a generic error.
- **Re-exporting an imported-then-modified view**: produces an artifact that reflects the current state, not the state at import time.
- **Sequence step whose view artifact fails to parse**: the rest of the sequence still opens; the broken step is clearly flagged.
- **Sharing to someone without access to the underlying graph data**: out of scope; users are expected to share within a group that has access to the same configured data sources.

## Requirements *(mandatory)*

### Functional Requirements

#### Exporting a view

- **FR-001**: Users MUST be able to export the currently shown view, producing a self-contained artifact that captures: the visible nodes, the visible edges, and each visible node's on-screen position.
- **FR-002**: The export artifact MUST identify the underlying graph data it was shaped from, so that an importer can tell whether it is loading the view against the intended data.
- **FR-003**: The system MUST offer the export in both a downloadable file form and a shareable link/URL form.
- **FR-004**: The export artifact MUST be human-readable in a plain text editor; a technical user MUST be able to understand what view it describes without running the browser.
- **FR-005**: The export MUST NOT include session secrets, authentication tokens, or any data that is not reproducible by replaying the export against the referenced graph data.

#### Importing a view

- **FR-006**: Users MUST be able to import a previously exported view artifact from a file.
- **FR-007**: Users MUST be able to open a URL-form exported view and see it rendered as from a file import.
- **FR-008**: After an import, users MUST be able to continue to interact with the view (further shaping, re-export) — the import is a starting point, not a read-only snapshot.
- **FR-009**: The system MUST handle imports where the underlying graph data has diverged: references that still resolve MUST be rendered, references that do not resolve MUST be reported to the user in a specific, identifiable way, and the import MUST NOT abort as a whole unless every reference fails.
- **FR-010**: When every reference in an imported view fails to resolve, the system MUST present a clear explanatory message rather than an empty canvas.
- **FR-011**: When an import would replace the user's current view against a different underlying graph than the one currently loaded, the system MUST confirm with the user before switching.

#### Sequencing views (tour/slides)

- **FR-012**: Users MUST be able to combine two or more exported views into an ordered sequence and export the sequence itself as a shareable artifact (file and URL forms).
- **FR-013**: The system MUST provide a way to open a sequence and step forward and backward through its views, rendering each step as if imported individually.
- **FR-014**: Users MUST be able to pause a sequence at any step and interact freely with that view without breaking the sequence.
- **FR-015**: Users MUST be able to reorder, insert, and remove steps in a sequence they are authoring and export the result as a new sequence artifact.
- **FR-016**: A step whose view artifact fails to parse MUST NOT prevent the rest of the sequence from opening; the failing step MUST be clearly flagged.

### Key Entities

- **View Artifact**: A self-contained, shareable description of one shaped view — the visible nodes, the visible edges, the node positions, and a reference to the underlying graph data. Exchangeable as file and URL.
- **Sequence Artifact**: An ordered collection of View Artifacts, itself shareable as file and URL, representing a narrative tour or slide deck through the graph.
- **Underlying Graph Reference**: The identifier embedded in a View Artifact that names the data source(s) the view was shaped against, used at import to check resolvability.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A view exported on one machine and imported on a different machine reproduces the same visible node set, edge set, and node positions pixel-accurately (within rendering tolerance) in 100% of cases when the underlying graph data is identical.
- **SC-002**: A view imported against a graph where some referenced nodes no longer exist still renders the resolvable subset and reports the missing references in 100% of cases, rather than failing to open.
- **SC-003**: A user who has never used the feature can shape a view, export it, send it to a colleague, and have the colleague see the intended view in under 5 minutes end to end.
- **SC-004**: A narrative sequence of at least 5 views can be authored, exported, and replayed step-by-step with every step matching its authored view in 100% of cases.
- **SC-005**: A sequence where one step's underlying references partially fail still opens the rest of the sequence in 100% of cases, with the broken step clearly flagged.
- **SC-006**: Exported artifacts are inspectable in a plain text editor — a technical user can identify which nodes and positions are referenced without running the browser — verified by sampling.

## Assumptions

- A sibling specification covers in-session graph shaping (expand/collapse). This spec assumes that such a shaped view exists and focuses only on portability of that view.
- Users exchanging views have access to the same underlying graph data; authentication, access control, and cross-deployment sharing are out of scope.
- The underlying graph data is addressed by stable identifiers referenced from an exported view; views reference graph content rather than embed it.
- View and sequence artifacts are client-produced and client-consumed; no server-side storage of user views is required by this feature.
- Short-URL services, private-view authentication, and embedding exported views in third-party sites are out of scope for v1.
- Mobile/touch interaction is out of scope for v1.
