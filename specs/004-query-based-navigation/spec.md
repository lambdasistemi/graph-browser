# Feature Specification: Query-Based Navigation

**Feature Branch**: `004-query-based-navigation`
**Created**: 2026-04-05
**Status**: Draft
**Input**: GitHub issue #41 — Replace search with curated SPARQL query catalog

## User Scenarios & Testing

### User Story 1 - Browse and run curated queries (Priority: P1)

A user opens the graph browser and instead of a free-text search box, sees a catalog of named queries. They browse entries like "All UI Components", "Modules connected to Viewer", "Build tool dependencies". They pick one, and the graph highlights the matching subgraph — only those nodes and their edges are shown.

**Why this priority**: This is the core value proposition. Without a working query catalog, nothing else matters.

**Independent Test**: Load a graph with its Turtle data and query catalog. Pick a query from the catalog. The graph filters to show only matching nodes and edges.

**Acceptance Scenarios**:

1. **Given** a graph loaded from `.ttl` files with a query catalog, **When** the user opens the query panel, **Then** they see a list of named queries with descriptions
2. **Given** the query panel is open, **When** the user selects a query, **Then** Oxigraph executes it and the graph filters to show only the result nodes and their interconnecting edges
3. **Given** a query is active, **When** the user clears the selection, **Then** the full graph is restored

---

### User Story 2 - Search within the query catalog (Priority: P1)

The user types "build" in the search box. The query catalog filters to show only queries whose name or description matches. This replaces the current substring search over nodes — users search for queries, not nodes.

**Why this priority**: Without searchable queries, a large catalog becomes unusable.

**Independent Test**: Load a catalog with 20+ queries. Type a keyword. Only matching queries appear.

**Acceptance Scenarios**:

1. **Given** a catalog with multiple queries, **When** the user types a keyword, **Then** the catalog filters to queries matching the keyword in name or description
2. **Given** a filtered catalog, **When** the user clears the search, **Then** all queries are shown again

---

### User Story 3 - Parameterized queries (Priority: P2)

Some queries have parameters — e.g. "All nodes of kind $kind" or "Neighbors of $node". When the user selects such a query, input fields appear for the parameters. The user fills them in and the query runs with the bound values.

**Why this priority**: Parameters make a small catalog cover many use cases. But a fixed catalog without parameters still delivers value.

**Independent Test**: Select a parameterized query. Fill in parameters. Verify the SPARQL is bound correctly and returns expected results.

**Acceptance Scenarios**:

1. **Given** a query with parameters, **When** the user selects it, **Then** input fields appear for each parameter
2. **Given** parameters are filled in, **When** the user submits, **Then** the query runs with the bound values and the graph filters accordingly
3. **Given** a parameterized query, **When** a required parameter is empty, **Then** the query does not execute

---

### User Story 4 - Share a query by URL (Priority: P2)

The URL encodes the active query (and parameter values if any). Sharing the URL lets another user see the same subgraph selection.

**Why this priority**: Sharing is the key distribution mechanism for curated queries. But viewing queries locally already delivers value.

**Independent Test**: Activate a query. Copy the URL. Open it in a new tab. The same query is active with the same results.

**Acceptance Scenarios**:

1. **Given** a query is active, **When** the user copies the URL, **Then** the URL contains the query identifier and parameter values
2. **Given** a URL with a query reference, **When** another user opens it, **Then** the query runs automatically and the graph shows the results

---

### User Story 5 - Tours as query sequences (Priority: P3)

A tour is a sequence of named queries. Each stop runs a query, highlights the result subgraph, and shows the stop description. This replaces the current node-pinned tour model.

**Why this priority**: Tours are an existing feature. Migrating them to queries completes the model, but existing tours still work without this.

**Independent Test**: Load a query-based tour. Step through it. Each stop shows a different subgraph selection.

**Acceptance Scenarios**:

1. **Given** a tour defined as a sequence of queries, **When** the user starts the tour, **Then** the first query runs and its result subgraph is highlighted
2. **Given** a tour is active, **When** the user advances to the next stop, **Then** the next query runs and the graph updates

---

### Edge Cases

- What happens when a query returns zero results? Display an empty state message, don't show a blank graph.
- What happens when a query has a SPARQL syntax error? Show the error inline, don't crash.
- What happens when the Turtle data fails to load into Oxigraph? Fall back to showing an error, not a blank page.
- What happens with very large result sets (query returns all nodes)? Same as showing the full graph — no special handling needed.

## Requirements

### Functional Requirements

- **FR-001**: System MUST load graph data from Turtle (`.ttl`) files into an in-browser RDF store (Oxigraph WASM)
- **FR-002**: System MUST load a query catalog (named SPARQL queries with descriptions) from a data file shipped alongside the Turtle data
- **FR-003**: System MUST display the query catalog in a browsable panel replacing the current search form
- **FR-004**: System MUST execute a selected SPARQL query and filter the graph to show only matching nodes and their interconnecting edges
- **FR-005**: System MUST support substring search within the query catalog (filtering by query name and description)
- **FR-006**: System MUST support parameterized queries with user-fillable inputs
- **FR-007**: System MUST encode the active query (and parameters) in the URL for sharing
- **FR-008**: System MUST support tours defined as sequences of query references
- **FR-009**: Views MUST be expressed as named queries — a view is a SPARQL query that selects a subgraph, replacing the current model of hardcoded node ID lists with depth settings
- **FR-010**: Views, tours, and catalog entries MUST be the same artifact type (named queries) — there is no distinction between a "view", a "tour stop", and a "catalog entry"
- **FR-011**: Data repos MUST ship `.ttl` files as the graph data format (Turtle, not JSON-LD — validated by LLM format testing)
- **FR-012**: Data repos MUST ship a query catalog file alongside the Turtle data
- **FR-013**: System MUST validate Turtle data and query catalog at load time and surface errors to the user

### Key Entities

- **Triple Store**: In-browser Oxigraph WASM instance holding the graph as RDF triples
- **Query Catalog**: A collection of named queries shipped as a data asset. This is the single source of truth for all subgraph selections — views, tour stops, and browsable catalog entries are all the same thing
- **Named Query**: A SPARQL query with a human-readable name, description, optional parameters, and optional tags (e.g. "view", "tour:setup-guide"). The only artifact type for subgraph selection
- **Parameter**: A typed placeholder in a SPARQL query that the user fills in at runtime
- **Tour**: An ordered sequence of named query references with stop descriptions. Not a separate entity — just metadata grouping existing queries

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users can find and execute a relevant query from a 20+ entry catalog in under 10 seconds
- **SC-002**: All existing graph-browser data repos can be converted to Turtle + query catalog format
- **SC-003**: A shared query URL reproduces the exact same subgraph view for any user
- **SC-004**: Existing tours can be re-expressed as query sequences with no loss of information

## Assumptions

- Oxigraph WASM runs efficiently in modern browsers for graphs up to ~1000 nodes / ~5000 edges
- The ontology (#33) and RDF data model (#30) are completed before this feature is implemented
- Data repos will migrate from `graph.json` to `.ttl` files — a migration path or dual-format support may be needed during transition
- Query catalog authoring is primarily done by LLMs (validated: Turtle + SPARQL works well even on weak models like Mistral 7B)
- The `lib` variant consumers will need to ship Turtle + query catalog instead of JSON files
