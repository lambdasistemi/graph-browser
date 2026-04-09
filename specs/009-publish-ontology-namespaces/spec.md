# Feature Specification: Publish Dereferenceable Ontology Namespaces

**Feature Branch**: `009-publish-ontology-namespaces`  
**Created**: 2026-04-09  
**Status**: Draft  
**Input**: User description: "Publish dereferenceable ontology namespace documents and ontology term links"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Follow ontology terms from the viewer (Priority: P1)

As a graph-browser user exploring ontology-backed content, I want ontology terms to show their prefixed identity and open to a real published namespace document so I can verify what a class or predicate means without encountering broken links.

**Why this priority**: The ontology view is not credible unless the links shown in the UI resolve to real published ontology material.

**Independent Test**: Open an ontology-backed node in the viewer, inspect its ontology identity, and click the term or namespace link. The destination must resolve to a published namespace page instead of a 404.

**Acceptance Scenarios**:

1. **Given** a node with an ontology IRI in the viewer, **When** the user opens its detail panel, **Then** the panel shows a compact prefixed identity and links to a published ontology term.
2. **Given** a term IRI such as `.../vocab/terms#Node`, **When** the user follows it in a browser, **Then** the namespace document for `.../vocab/terms` loads successfully and the requested term can be identified within that document.

---

### User Story 2 - Publish namespace pages automatically from Turtle (Priority: P1)

As a maintainer of graph-browser or a downstream graph-browser data repo, I want namespace pages to be generated from ontology Turtle files during the build so I do not have to hand-maintain project-specific code for each vocabulary.

**Why this priority**: Hardcoded namespace page logic does not scale across repositories. The ontology itself is already authored in Turtle and should remain the source of truth.

**Independent Test**: Provide ontology Turtle inputs to the build, run the publication step, and verify that namespace pages are generated automatically for the configured vocabularies without any hand-written term inventory.

**Acceptance Scenarios**:

1. **Given** ontology Turtle files containing classes and properties in a namespace, **When** the build runs, **Then** it generates a namespace page by extracting term information from those triples.
2. **Given** a downstream project with its own ontology Turtle files, **When** it uses the same generation path, **Then** it can publish dereferenceable namespace pages without adding repo-specific PureScript code that lists every term manually.

---

### User Story 3 - Reuse the publication path in the build/deploy workflow (Priority: P2)

As a maintainer shipping a GitHub Pages deployment, I want namespace publication to live in the reusable build/deploy path so ontology pages are produced consistently by automation rather than by local manual steps.

**Why this priority**: The desired behavior is operational, not just local. If the GitHub action does not generate the pages, the links will still break in deployed environments.

**Independent Test**: Run the Pages-style build locally or in CI and confirm that the deployed artifact contains `/vocab/terms`, `/vocab/kinds`, `/vocab/groups`, and `/vocab/edges` produced by the automated publication step.

**Acceptance Scenarios**:

1. **Given** the build or deploy workflow for graph-browser, **When** it assembles the final Pages artifact, **Then** the artifact includes generated namespace pages at the expected `/vocab/...` paths.
2. **Given** the same generation logic is exposed through the reusable build path, **When** downstream repos adopt it, **Then** they can publish ontology namespace pages through automation rather than handwritten custom code.

### Edge Cases

- What happens when a node has no ontology IRI at all? The viewer must avoid showing empty or misleading ontology identity controls.
- What happens when a term belongs to an unknown namespace? The viewer must still show the full IRI and link to the namespace document without inventing a prefix.
- What happens when an ontology term contains characters that require fragment encoding? The generated namespace page must still allow the user to identify the requested term.
- What happens when a namespace document is generated from Turtle but a term lacks `rdfs:label` or `dcterms:description`? The generator must still publish a usable entry, falling back to the fragment or IRI local name.
- What happens when multiple Turtle files contribute to the same namespace? The generator must merge those triples into one namespace page without duplicating the same term entry.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The published graph-browser site MUST expose dereferenceable namespace documents for the ontology namespaces used by the exported `gb:` vocabularies.
- **FR-002**: The published namespace documents MUST cover the vocabulary categories currently used by graph-browser term IRIs: terms, kinds, groups, and edges.
- **FR-003**: Namespace pages MUST be generated from ontology Turtle inputs or triples derived from those Turtle inputs, rather than from a manually maintained hardcoded term inventory.
- **FR-004**: The generation path MUST preserve existing ontology term IRIs already emitted by RDF export, rather than replacing them with a new namespace scheme.
- **FR-005**: Users MUST be able to follow ontology term and namespace links from the viewer to published namespace documents without encountering broken links.
- **FR-006**: The viewer MUST present ontology identity for ontology-backed nodes in a way that preserves namespace provenance for known vocabularies.
- **FR-007**: The build or deploy workflow MUST generate and publish namespace pages automatically as part of the Pages artifact assembly.
- **FR-008**: The documentation for graph-browser MUST explain the namespace publication policy, including the fact that hash-fragment ontology identifiers depend on publishing the namespace document without the fragment.
- **FR-009**: The publication path MUST be reusable by downstream graph-browser data repositories that author ontology Turtle files.

### Key Entities *(include if feature involves data)*

- **Ontology Namespace Document**: A published document representing a vocabulary namespace such as `gb:` terms, kinds, groups, or edges.
- **Ontology Term Entry**: A generated entry for one ontology identifier, derived from Turtle triples and shown inside a namespace document.
- **Ontology Identity**: The UI-facing identity block shown for a selected ontology-backed node, including compact prefix, full IRI, and namespace provenance.
- **Namespace Publication Step**: The automated build/deploy step that reads Turtle inputs and emits the namespace documents into the final Pages artifact.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can click ontology term links for graph-browser vocabulary terms from the viewer and reach a non-404 destination in one navigation step.
- **SC-002**: All published namespace URLs used by graph-browser ontology IRIs resolve successfully in the deployed site.
- **SC-003**: Namespace pages are generated automatically from Turtle during the build, without requiring a hand-maintained per-project term catalog in source code.
- **SC-004**: A downstream graph-browser repository can adopt the same publication path for its own ontology Turtle files without implementing custom code that enumerates every ontology term manually.
- **SC-005**: A user inspecting an ontology-backed node can distinguish graph-browser vocabulary terms from standard RDF/OWL terms without reading source code.

## Assumptions

- The existing graph-browser ontology IRIs under `https://lambdasistemi.github.io/graph-browser/vocab/...` remain the canonical public identifiers.
- GitHub Pages remains the publication target for the graph-browser site.
- The ontology source of truth is Turtle, not JSON.
- Machine-readable content negotiation is not required for the first iteration as long as namespace URLs resolve to stable published documentation derived from Turtle.
