# Ontology

Graph-browser exports RDF in layers.

## Shared Layer

The shared ontology lives at [`/rdf/core-ontology.ttl`](https://lambdasistemi.github.io/graph-browser/rdf/core-ontology.ttl). It defines the graph-browser substrate:

A generated Mermaid view of the same structure is published at [`/rdf/core-ontology.mmd`](https://lambdasistemi.github.io/graph-browser/rdf/core-ontology.mmd).

- `gb:Dataset`
- `gb:Node`
- `gb:Group`
- `gb:EdgeAssertion`
- `gb:Tutorial`
- `gb:TutorialStop`
- `gb:View`
- `gb:QueryCatalog`
- `gb:NamedQuery`
- `gb:QueryParameter`

It also defines the shared relationships and datatype properties used by exported RDF.

## Application Layer

The application ontology lives at [`/rdf/application-ontology.ttl`](https://lambdasistemi.github.io/graph-browser/rdf/application-ontology.ttl). It is generated from repository data and contains:

A generated Mermaid view of the repository-specific vocabulary is published at [`/rdf/application-ontology.mmd`](https://lambdasistemi.github.io/graph-browser/rdf/application-ontology.mmd).

- local node kinds
- local groups
- local edge predicates

Examples in this repository include `gbkind:ffi`, `gbgroup:ui`, and the generated `gbedge:*` predicates.

This separation is intentional. The core ontology should remain portable across graph-browser installations, while application ontologies are free to specialize their own domains.
