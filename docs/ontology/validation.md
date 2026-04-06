# RDF Validation Contract

Graph-browser uses SHACL for validation.

OWL remains useful for modeling and inference, but SHACL is the mechanism used here for closed-world checks in CI.

## Shared Validation

[`/rdf/shapes.ttl`](https://lambdasistemi.github.io/graph-browser/rdf/shapes.ttl) validates exported instance data in [`/rdf/graph.ttl`](https://lambdasistemi.github.io/graph-browser/rdf/graph.ttl).

This currently checks:

- dataset structure
- node structure
- group structure
- external link structure
- edge assertion structure

Examples:

- a `gb:Node` must have exactly one `gb:nodeId`
- a `gb:Node` must have exactly one `gb:group`
- an `gb:EdgeAssertion` must have exactly one `gb:from`, `gb:to`, and `gb:predicate`

## Application Validation

[`/rdf/application-shapes.ttl`](https://lambdasistemi.github.io/graph-browser/rdf/application-shapes.ttl) validates the generated application ontology in [`/rdf/application-ontology.ttl`](https://lambdasistemi.github.io/graph-browser/rdf/application-ontology.ttl).

This checks the extension contract:

- the application ontology imports the core ontology
- application kinds are `owl:Class` and `rdfs:subClassOf gb:Node`
- application groups are typed as `gb:Group`
- application edge predicates are `owl:ObjectProperty` and `rdfs:subPropertyOf gb:EdgeRelation`

## CI

The repo exposes:

```bash
nix develop -c just export-rdf
nix develop -c just validate-rdf
```

The reusable validator also runs these SHACL checks when RDF artifacts are present in `data/rdf/`.

## What Downstream Repositories Should Add

If a downstream repository defines its own ontology, it should publish:

- `data/rdf/application-ontology.ttl`
- `data/rdf/application-shapes.ttl`

That allows graph-browser to validate compatibility with the shared model while the application retains control over its own domain semantics.
