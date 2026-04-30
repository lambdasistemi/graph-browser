# Feature Specification: Source Selection Controls

**Feature Branch**: `fix/improve-source-selection-controls-and-state-clarit`  
**Created**: 2026-04-30  
**Status**: Draft  
**Issue**: https://github.com/lambdasistemi/graph-browser/issues/87  
**Input**: User description: "it starts with everything selected and I don't have a button to deselect everything and also the interface is not that clear like what I'm seeing all or single just buttons and there is no state of the interface"

## User Scenarios & Testing

### User Story 1 - Clear or restore source selection quickly (Priority: P1)

A graph reviewer opens a repository with many RDF sources. They need to clear all sources or select all sources with one action instead of toggling every source checkbox manually.

**Independent Test**: Open a multi-source graph, expand the sources panel, click "Clear all", verify every listed source is unchecked and the rendered graph updates. Click "Select all", verify every source is checked and the graph restores.

### User Story 2 - Understand current source-selection state (Priority: P1)

A graph reviewer needs to know whether they are seeing every source, no selected source, or only part of the source set.

**Independent Test**: Toggle sources and verify the header displays the visible/total source count and an understandable state label.

### User Story 3 - Understand multi-source vs single-source behavior (Priority: P2)

A graph reviewer needs labels that explain whether source checkboxes can be combined or whether one source is being isolated.

**Independent Test**: Switch between combined and isolated source modes and verify the active state is visible and the labels describe the behavior.

## Requirements

### Functional Requirements

- **FR-001**: The sources panel MUST display the number of visible configured sources out of the total configured sources.
- **FR-002**: The sources panel MUST provide a one-click action to select all configured sources.
- **FR-003**: The sources panel MUST provide a one-click action to clear all configured sources.
- **FR-004**: Bulk actions MUST update the graph using the same filtering semantics as individual source checkboxes.
- **FR-005**: The UI MUST keep existing individual source checkboxes.
- **FR-006**: The UI MUST keep existing single-source isolation behavior.
- **FR-007**: Source-selection mode controls MUST use labels that explain the behavior rather than relying on bare "All" or "Single" wording.
- **FR-008**: The active source-selection mode MUST be visually indicated.
- **FR-009**: The source state summary MUST remain visible when the sources list is collapsed.
- **FR-010**: The controls MUST remain usable on narrow screens.

## Edge Cases

- A graph with no configured sources continues to hide the sources panel.
- Clearing all configured sources may still leave nodes or edges with no source metadata visible; the UI state still refers only to configured sources.
- If a single source is isolated, clearing all returns to no configured source selected.
- If every source is manually checked, the state summary reads as all configured sources visible.

## Success Criteria

- **SC-001**: A user can hide every configured source in one click.
- **SC-002**: A user can restore every configured source in one click.
- **SC-003**: A user can read the panel header and know how many configured sources are visible.
- **SC-004**: A user can identify whether the source panel is in combined-source mode or isolated-source mode.
