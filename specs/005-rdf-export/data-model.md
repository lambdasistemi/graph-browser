# Data Model: RDF Export

## Entities

### Source Dataset

The authored graph-browser dataset:

```json
{
  "config": "data/config.json",
  "graph": "data/graph.json"
}
```

### Export Manifest

Describes generated RDF artifacts and the vocabulary version used:

```json
{
  "datasetIri": "https://example.org/graph-browser/self",
  "vocabularyVersion": "v1",
  "artifacts": [
    { "format": "text/turtle", "path": "data/rdf/graph.ttl" },
    { "format": "application/ld+json", "path": "data/rdf/graph.jsonld" }
  ]
}
```

### Node Resource

One exported node:

```text
<datasetIri>/node/viewer
  a gb:component ;
  rdfs:label "Viewer" ;
  gb:group gbgroup:ui ;
  gb:description "The central Halogen component..." .
```

### Relationship Assertion

One exported edge:

```text
<datasetIri>/node/main gb:uses <datasetIri>/node/viewer> .
```

Companion metadata must preserve the original label and edge description in a recoverable way.

### Vocabulary Terms

Shared reusable terms:

- node kind classes, e.g. `gb:component`
- edge predicates, e.g. `gb:uses`
- group terms, e.g. `gbgroup:ui`
- dataset metadata predicates, e.g. `gb:sourceRepository`

## Relationships

- **Source Dataset -> Export Manifest**: one source dataset produces one export manifest per export run
- **Source Dataset -> Node Resource**: every JSON node becomes exactly one RDF node resource
- **Source Dataset -> Relationship Assertion**: every JSON edge becomes at least one RDF relationship assertion plus preserved metadata
- **Vocabulary Term -> Node Resource**: node kinds classify node resources
- **Vocabulary Term -> Relationship Assertion**: normalized edge-label terms become executable predicates between nodes

## Invariants

- Dataset-scoped node URIs are unique within and across repositories
- The same kind ID always maps to the same vocabulary class IRI across all exports
- The same edge label normalization rule always maps to the same predicate IRI across all exports
- Every required JSON field has a documented RDF representation
- Generated RDF ordering is deterministic so repeated exports are stable in git

## Backward Compatibility

| Repo layout | Behavior |
|-------------|----------|
| JSON-only authoring repo | Exporter generates RDF from existing `data/` files |
| Repo with committed RDF artifacts | Validator checks committed RDF matches regenerated output |
| Repo without RDF consumers | Existing viewer behavior is unchanged; RDF is an additional artifact only |
