# Graph Browser Documentation

This site documents the public model behind graph-browser's RDF export.

The important split is:

- the application itself, published on GitHub Pages
- the machine-readable RDF artifacts published on GitHub Pages:
  [`core-ontology.ttl`](https://lambdasistemi.github.io/graph-browser/rdf/core-ontology.ttl),
  [`application-ontology.ttl`](https://lambdasistemi.github.io/graph-browser/rdf/application-ontology.ttl),
  [`core-ontology.mmd`](https://lambdasistemi.github.io/graph-browser/rdf/core-ontology.mmd),
  [`application-ontology.mmd`](https://lambdasistemi.github.io/graph-browser/rdf/application-ontology.mmd),
  [`shapes.ttl`](https://lambdasistemi.github.io/graph-browser/rdf/shapes.ttl),
  [`application-shapes.ttl`](https://lambdasistemi.github.io/graph-browser/rdf/application-shapes.ttl),
  [`graph.ttl`](https://lambdasistemi.github.io/graph-browser/rdf/graph.ttl),
  [`graph.nq`](https://lambdasistemi.github.io/graph-browser/rdf/graph.nq)
- the human documentation explaining the ontology and validation contract

## RDF Model

Graph-browser now publishes:

- a shared core ontology for portable graph-browser concepts
- an application ontology for repository-specific kinds, groups, and predicates
- SHACL shapes for shared RDF instance validation
- SHACL shapes for application ontology compatibility validation

Start with the ontology section if you want the design rationale and the downstream contract.
