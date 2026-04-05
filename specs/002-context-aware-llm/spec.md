# Feature Specification: Context-Aware LLM Prompt Builder

**Feature Branch**: `002-context-aware-llm`
**Created**: 2026-04-05
**Status**: Draft
**Input**: Issue #14 — Context-aware LLM prompt builder for node and edge detail panels

## User Scenarios & Testing

### User Story 1 - Copy prompt for a node (Priority: P1)

A user is browsing a knowledge graph and clicks on a node. They see the node's details in the sidebar. Below the details, there is a text area where they can type what they want an LLM to do about this node (e.g. "Update to reflect v0.15 changes" or "Add missing edges to related tools"). They click "Copy prompt" and the clipboard receives a self-contained prompt that includes their text, the node's JSON, connected edges, schema references, file paths, and instructions for submitting a PR.

**Why this priority**: This is the core feature. Nodes are the primary interaction target in the graph browser. Without this, nothing else matters.

**Independent Test**: Click any node, type text, click "Copy prompt", paste into a text editor and verify the prompt contains the user's text, the node JSON, connected edges, schema URLs, repo URL, and PR instructions.

**Acceptance Scenarios**:

1. **Given** a node is selected in the sidebar, **When** the user types "fix the description" and clicks "Copy prompt", **Then** the clipboard contains a prompt with the user's text, the node's full JSON, all edges where this node is source or target, links to the graph and config JSON schemas, the source repo URL, file paths, and PR submission instructions.
2. **Given** a node is selected but the text area is empty, **When** the user clicks "Copy prompt", **Then** the prompt is still assembled (without a user question section) — the context is useful on its own.
3. **Given** a prompt was just copied, **When** the user navigates to a different node, **Then** the text area resets to empty.

---

### User Story 2 - Copy prompt for an edge (Priority: P2)

A user hovers or clicks on an edge between two nodes. The sidebar shows the edge details. Below the details, the same text area + "Copy prompt" button appears. The assembled prompt contains the edge JSON, both endpoint nodes' JSON, schema references, and PR instructions.

**Why this priority**: Edges are the secondary interaction target. Same mechanism as nodes, different context assembly.

**Independent Test**: Hover/click an edge, type text, click "Copy prompt", verify the prompt contains edge JSON, both endpoint node JSONs, schema URLs, and PR instructions.

**Acceptance Scenarios**:

1. **Given** an edge is shown in the sidebar, **When** the user types "this relationship is outdated" and clicks "Copy prompt", **Then** the clipboard contains the edge JSON, both source and target node JSONs, schema URLs, repo URL, and PR instructions.

---

### User Story 3 - Visual feedback on copy (Priority: P3)

After clicking "Copy prompt", the button briefly shows "Copied!" feedback so the user knows the action succeeded.

**Why this priority**: Polish. The feature works without it, but users need confirmation that clipboard write succeeded.

**Independent Test**: Click "Copy prompt" and observe the button text changes briefly.

**Acceptance Scenarios**:

1. **Given** the user clicks "Copy prompt", **When** the clipboard write succeeds, **Then** the button text changes to "Copied!" for ~2 seconds then reverts.
2. **Given** the clipboard API is unavailable (insecure context), **When** the user clicks "Copy prompt", **Then** a fallback behavior occurs (e.g. select-all in a read-only textarea).

---

### Edge Cases

- Node with no connected edges: prompt should still work, with an empty edges section
- `config.sourceUrl` is missing or empty: prompt should omit the repo URL and PR instructions section rather than producing a broken URL
- Very long node descriptions or many edges: prompt should not be truncated — the user decides what to do with the length
- Schema URLs: must point to graph-browser's schema repo, not the consumer repo (since consumer repos don't have schemas)

## Requirements

### Functional Requirements

- **FR-001**: Every node detail panel MUST display a text input area and a "Copy prompt" button below the existing content
- **FR-002**: Every edge detail panel MUST display the same text input area and "Copy prompt" button
- **FR-003**: The assembled prompt MUST include: the user's free text, the current element's JSON, related elements' JSON (connected edges for nodes; endpoint nodes for edges), links to JSON schemas, source repo URL and file paths, and instructions for submitting changes as a PR
- **FR-004**: Schema URLs MUST point to graph-browser's published schemas (derived from the schema `$id` fields), not to the consumer repo
- **FR-005**: The text area MUST reset when the user navigates to a different node or edge
- **FR-006**: The prompt builder MUST work for any graph-browser dataset, with no hardcoded references to specific graphs
- **FR-007**: When `config.sourceUrl` is absent, the prompt MUST omit repo-specific sections (PR instructions, repo URL) rather than producing broken content

### Key Entities

- **Prompt**: The assembled text containing user intent + context + schema references + process instructions. Not persisted — exists only in clipboard.
- **Prompt context**: The JSON data for the selected element plus its neighbors, extracted from the in-memory graph.

## Success Criteria

### Measurable Outcomes

- **SC-001**: User can go from "I want to update this node" to having a complete, paste-ready LLM prompt in under 10 seconds (type + click)
- **SC-002**: The assembled prompt contains sufficient context that an LLM with web access can produce a valid PR without needing to ask clarifying questions about format or process
- **SC-003**: The feature works on any graph-browser deployment (not just local-llm-graph)

## Assumptions

- Users have a modern browser with clipboard API support (HTTPS or localhost)
- Users will paste the prompt into an LLM chat (Claude, ChatGPT, etc.) — the prompt format optimizes for that use case
- The graph-browser JSON schemas are published at stable URLs via GitHub Pages
- Tutorial mode does not need the prompt builder (it would clutter the tutorial narrative)
