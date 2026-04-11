# Feature Specification: Break Viewer.purs into Focused Modules

**Feature Branch**: `refactor/viewer-modules`
**Created**: 2026-04-11
**Status**: Draft
**Input**: GitHub issue #66

## User Scenarios & Testing

### User Story 1 - Developer modifies sidebar rendering without fear (Priority: P1)

A developer needs to change how the sidebar renders node or edge details. Currently they must navigate a 2250-line file, understand the full component lifecycle, and risk breaking unrelated features (tutorials, queries, persistence). After the refactor, sidebar rendering lives in its own module with explicit imports — changes are scoped and reviewable.

**Why this priority**: The sidebar was modified in every recent PR (#64, #65). It's the highest-churn area.

**Independent Test**: The application renders identically before and after the refactor. All existing tests pass. `spago build` succeeds with no new warnings.

**Acceptance Scenarios**:

1. **Given** the refactored codebase, **When** `spago build` runs, **Then** it compiles with zero errors
2. **Given** the refactored codebase, **When** the app loads with cardano-knowledge-maps data, **Then** all queries, tours, click, hover, and tooltip behavior works identically to before
3. **Given** a developer opens `Viewer/Sidebar.purs`, **When** they read it, **Then** it contains only sidebar rendering logic and its explicit dependencies are visible in imports

---

### User Story 2 - Developer adds a new detail panel section without touching unrelated code (Priority: P2)

A developer wants to add a new section to node or edge detail panels (e.g. ontology predicate links per #39). Currently `renderNodeDetail` and `renderEdgeDetail` are in the same file as the component, event handlers, and persistence. After the refactor, detail rendering is in its own module and follows a shared pattern (badge + content + optional prompt builder).

**Why this priority**: Detail panels will be extended for #39 and future features.

**Independent Test**: Node and edge detail panels render with the same content. Preview variants (tooltip) render without prompt builder.

**Acceptance Scenarios**:

1. **Given** `Viewer/Detail.purs` exists, **When** it exports `renderNodeDetail`, `renderEdgeDetail`, `renderNodePreview`, `renderEdgePreview`, **Then** each uses `nodeDetailContent` / `edgeDetailContent` as shared content with optional prompt builder appended
2. **Given** the shared content pattern, **When** a developer adds a new section, **Then** it appears in both full detail and preview automatically

---

### User Story 3 - Developer understands the tutorial system without reading the whole Viewer (Priority: P3)

Tutorial rendering, navigation, and state are interleaved with the main component. After the refactor, tutorial logic lives in `Viewer/Tutorial.purs` with clear interfaces to the main component.

**Why this priority**: Tutorial code changes less frequently but is hard to understand in context.

**Independent Test**: Tours work identically — navigation, step rendering, hover tooltip (no sidebar leakage), persistence.

**Acceptance Scenarios**:

1. **Given** `Viewer/Tutorial.purs` exists, **When** a developer reads it, **Then** they find all tutorial rendering and can trace tutorial actions without reading the main component
2. **Given** the refactored code, **When** a tour is started, navigated, and exited, **Then** behavior is identical to before

---

### Edge Cases

- Circular module dependencies: PureScript requires acyclic module graphs. Types must be in a leaf module imported by all others.
- State access: All render functions need `State`, which must be importable without pulling in the component.
- Action handling: Actions are defined in Types but handled in the main Viewer. Render functions reference `Action` for event handlers — this is fine as long as Types exports Action.

## Requirements

### Functional Requirements

- **FR-001**: Application MUST behave identically before and after the refactor — zero user-visible changes
- **FR-002**: `Viewer.purs` MUST be under 700 lines after the split
- **FR-003**: Each new module MUST have a single responsibility visible from its name
- **FR-004**: No circular module dependencies
- **FR-005**: `nodeDetailContent` and `edgeDetailContent` MUST be the single source of truth for detail panel content, used by both full and preview variants
- **FR-006**: All existing tests MUST pass without modification
- **FR-007**: `spago build` MUST produce zero new warnings

### Key Entities

- **State**: The component state record — must be in Types so all modules can reference it
- **Action**: The action ADT — must be in Types so render functions can reference event handlers
- **EdgeInfo**: Edge detail record — currently inline in Viewer, move to Types

## Success Criteria

### Measurable Outcomes

- **SC-001**: `Viewer.purs` line count drops from 2250 to under 700
- **SC-002**: No module exceeds 300 lines
- **SC-003**: `spago build` succeeds with zero errors and no new warnings
- **SC-004**: All existing tests pass
- **SC-005**: Surge preview is visually identical to current production

## Assumptions

- The refactor is purely structural — no behavior changes, no new features
- PureScript's module system supports the proposed split without issues
- Halogen render functions can live in separate modules and be composed in the main component
