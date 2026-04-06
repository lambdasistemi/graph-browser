# Application Diagram

This page shows the repository-specific ontology extension rendered from the generated Mermaid source with a deterministic renderer.

The application ontology currently includes:

- kinds such as `gbkind:build`, `gbkind:component`, `gbkind:ffi`, `gbkind:module`, `gbkind:schema`, and `gbkind:type`
- groups such as `gbgroup:build`, `gbgroup:data-loading`, `gbgroup:ffi`, `gbgroup:graph-core`, and `gbgroup:ui`
- predicates such as `gbedge:uses`, `gbedge:loads tours`, `gbedge:filters by view`, `gbedge:documents`, and `gbedge:validates against`

The diagram focuses on the extension contract:

- application kinds subclass `gb:Node`
- application groups are instances of `gb:Group`
- application edge predicates are subproperties of `gb:EdgeRelation`

![Application ontology diagram](/rdf/application-ontology.svg)

Generated artifacts:

- [`application-ontology.mmd`](https://lambdasistemi.github.io/graph-browser/rdf/application-ontology.mmd)
- [`application-ontology.svg`](https://lambdasistemi.github.io/graph-browser/rdf/application-ontology.svg)
