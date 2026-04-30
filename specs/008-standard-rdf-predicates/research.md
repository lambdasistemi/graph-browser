# Research: Standard RDF Predicates As Primary Data Source

## Decision 1: Keep `gb:` predicates authoritative

### Decision

When both graph-browser-specific and standard RDF predicates are present for the same field, graph-browser keeps the existing `gb:` value authoritative.

### Rationale

- The current importer already treats `gb:` as the canonical graph-browser vocabulary.
- Existing RDF-backed repos must not regress.
- This makes the feature additive rather than a breaking semantic reinterpretation of existing data.

### Alternatives Considered

- Prefer standard predicates over `gb:`: rejected because it would silently change the rendering of existing datasets.
- Merge values from both sources: rejected because the graph model only has one description field and a flat link list, so merge semantics would be arbitrary.

## Decision 2: Use a deterministic node metadata fallback chain

### Decision

- Node description precedence: `gb:description` -> `dcterms:description`
- External link precedence: `gb:externalLink` -> `foaf:page` -> `rdfs:seeAlso`

### Rationale

- These are the exact predicates requested in issue `#49`.
- The current graph model already represents one description string plus an array of links, so these predicates map cleanly into the existing viewer surface.
- The fallback order remains simple, explicit, and documentable.

### Alternatives Considered

- Broader fallback sets such as `schema:description` or `dc:description`: rejected for the first iteration because the issue only requests a narrow standard set and a wider list would increase ambiguity.
- Treat `foaf:page` and `rdfs:seeAlso` as additive even when `gb:externalLink` exists: rejected because it weakens the precedence guarantee and complicates deterministic output.

## Decision 3: Support edge descriptions via standard RDF reification first

### Decision

Support reified statements using `rdf:subject`, `rdf:predicate`, `rdf:object`, and `dcterms:description` as the first non-`gb:EdgeAssertion` edge-description path.

### Rationale

- The current Oxigraph FFI returns simple quads with string subjects and simple object records; it does not expose quoted triples or a richer term union.
- Standard RDF reification can be represented with the current parsed quad shape.
- This meets the issue requirement to allow descriptions attached to the edge triple itself without forcing the full `gb:EdgeAssertion` structure.

### Alternatives Considered

- RDF-star first: rejected for this iteration because the current FFI surface does not expose quoted triples, so it would require widening the JS/PureScript term model before the importer can even inspect them.
- Keep `gb:EdgeAssertion` as the only supported edge metadata form: rejected because it fails the issue goal of reducing gb-specific semantic duplication.

## Decision 4: Keep import semantics in PureScript

### Decision

Add generic fallback lookup helpers and reification matching in `src/Rdf/Import.purs`, leaving `src/FFI/Oxigraph.js` and `src/FFI/Oxigraph.purs` as thin parse wrappers unless future RDF-star support requires richer term decoding.

### Rationale

- This aligns with the constitution requirement that application logic stays in PureScript.
- The current importer already performs vocabulary interpretation there.
- Predicate precedence and fallback semantics are business logic, not parser glue.

### Alternatives Considered

- Compute fallback and precedence in JavaScript before returning parsed quads: rejected because it moves graph semantics into FFI and makes testing harder.
- Add a SPARQL layer for import mapping: rejected as unnecessary for the current importer scope.

## Decision 5: Treat the supported RDF import surface as an external contract

### Decision

Document the accepted predicate precedence and reification pattern in a dedicated contract artifact and the README.

### Rationale

- RDF-backed repositories are external inputs to graph-browser.
- The user explicitly wants the semantic layer to be authorable without reading the importer source.
- A written contract reduces accidental drift between runtime behavior and repository guidance.

### Alternatives Considered

- Document behavior only in code comments: rejected because downstream data authors would still need to inspect source.
- Rely on README prose alone: rejected because the planning workflow expects explicit interface artifacts when the project consumes external formats.
