# Data Model: Standard RDF Predicate Import

## Entities

### Imported Node Metadata

The node-level metadata graph-browser reconstructs from RDF into the existing in-memory `Node` shape:

```text
NodeMetadata
- nodeIri
- nodeId
- label
- kind
- group
- description
- links[]
```

Relevant sources:

- `gb:description`
- `dcterms:description`
- `gb:externalLink` -> `gb:url`
- `foaf:page`
- `rdfs:seeAlso`

### External Link Candidate

A possible link extracted during RDF import before precedence and normalization are applied:

```text
LinkCandidate
- sourcePredicate
- targetIriOrLiteral
- derivedLabel
- derivedUrl
- precedenceRank
```

Invariants:

- Every emitted link must have a non-empty URL.
- When multiple candidates exist, the chosen order must be deterministic.

### Imported Edge Metadata

The edge-level metadata graph-browser reconstructs into the existing `Edge` shape:

```text
EdgeMetadata
- sourceNodeId
- targetNodeId
- label
- description
```

Description sources:

- `gb:EdgeAssertion` with `gb:description`
- reified statement with `rdf:subject`, `rdf:predicate`, `rdf:object`, and `dcterms:description`

The imported edge model for this feature also needs to preserve the original predicate IRI when the displayed edge label comes from a standard ontology term.

### Reified Edge Annotation

A standard RDF resource that describes one displayed edge without requiring the gb-specific assertion structure:

```text
ReifiedEdgeAnnotation
- statementResource
- rdf:subject
- rdf:predicate
- rdf:object
- dcterms:description
```

Invariants:

- The reified statement must resolve to exactly one imported edge triple.
- If both `gb:EdgeAssertion` and a reified annotation describe the same edge, the gb-specific description wins.

### Predicate Precedence Rule

The ordered rule set used during import:

```text
Description precedence:
  gb:description
  dcterms:description

Link precedence:
  gb:externalLink
  foaf:page
  rdfs:seeAlso

Edge description precedence:
  gb:EdgeAssertion
  reified statement + dcterms:description
```

### Ontology Reference

The preserved ontology identity behind a rendered node or edge label:

```text
OntologyReference
- iri
- label
- sourceRole
```

Typical roles:

- node kind/type reference
- edge predicate reference

Invariants:

- The UI receives the original IRI when a rendered label was derived from a standard ontology term.
- The UI never fabricates an ontology reference when no stable IRI exists.

## Relationships

- **Imported Node Metadata -> Predicate Precedence Rule**: node descriptions and links are selected according to deterministic fallback order.
- **Imported Edge Metadata -> Predicate Precedence Rule**: edge hover text is selected according to deterministic fallback order.
- **Reified Edge Annotation -> Imported Edge Metadata**: one valid reified annotation may contribute description text to one imported edge.
- **External Link Candidate -> Imported Node Metadata**: zero or more candidates may collapse into the final `links` array on a node.
- **Ontology Reference -> Imported Node Metadata / Imported Edge Metadata**: preserved ontology IRIs travel with rendered metadata so the right pane can link to authoritative term documentation.

## Invariants

- Existing RDF repos using only gb-specific predicates continue to import identically.
- A node description is never invented; it must come from a supported predicate.
- A fallback standard predicate is used only when the higher-precedence gb-specific source is absent.
- Reified edge annotations never override a gb-specific edge description.
- Unsupported or ambiguous annotation resources do not attach hover text to the wrong edge.
- A rendered ontology label never causes the underlying standard IRI to be discarded when the UI needs it for documentation links.

## Backward Compatibility

| RDF authoring style | Import behavior |
|---------------------|-----------------|
| gb-only RDF | Existing behavior unchanged |
| Standard predicates only for metadata | Graph imports successfully when required rendering metadata still exists |
| Mixed gb + standard predicates | gb-specific values win, standard values act as fallback only |
| Reified edge descriptions without `gb:EdgeAssertion` | Edge hover text is populated when the reified statement maps unambiguously |
