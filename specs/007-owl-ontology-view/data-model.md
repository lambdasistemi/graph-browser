# Data Model: Auto-Generate Ontology View from OWL/RDFS Triples

## Entities

### OntologyClass

Derived from `owl:Class` or `rdfs:Class` triples in the RDF quads.

| Field | Source | Rule |
|-------|--------|------|
| id | IRI local name | kebab-cased, prefixed with `owl-` |
| label | `rdfs:label` literal | Falls back to IRI local name |
| kind | computed | `owl-class-{depth}` where depth is BFS distance from root |
| group | fixed | `"ontology"` |
| description | `rdfs:comment` literal | Falls back to empty string |
| links | none | Empty array |

### OntologyEdge (subclass)

Derived from `rdfs:subClassOf` triples.

| Field | Source | Rule |
|-------|--------|------|
| source | subject IRI | Mapped to `owl-{localname}` node ID |
| target | object IRI | Mapped to `owl-{localname}` node ID |
| label | fixed | `"subclass of"` |
| description | fixed | Empty string |

### OntologyEdge (property)

Derived from `owl:ObjectProperty` with `rdfs:domain` and `rdfs:range`.

| Field | Source | Rule |
|-------|--------|------|
| source | `rdfs:domain` IRI | Mapped to `owl-{localname}` node ID |
| target | `rdfs:range` IRI | Mapped to `owl-{localname}` node ID |
| label | `rdfs:label` or local name | Property's human-readable name |
| description | `rdfs:comment` literal | Falls back to empty string |

### OntologyEdge (alignment)

Derived from `owl:equivalentClass` or `owl:equivalentProperty` triples.

| Field | Source | Rule |
|-------|--------|------|
| source | subject IRI | Mapped to node ID |
| target | object IRI | Mapped to node ID |
| label | fixed | `"equivalent to"` or `"equivalent property"` |
| description | fixed | Empty string |

### OntologyKindDef

Runtime-generated kind definitions for Cytoscape styling.

| Field | Rule |
|-------|------|
| kindId | `owl-class-{depth}` |
| label | `"Ontology Class (depth {depth})"` |
| color | Base `#9b59b6`, lightened 15% per depth level |
| shape | `"diamond"` |

## Relationships

```
OntologyClass --[subclass of]--> OntologyClass     (rdfs:subClassOf)
OntologyClass --[property]--> OntologyClass         (owl:ObjectProperty domain→range)
OntologyClass --[equivalent to]--> OntologyClass    (owl:equivalentClass)
```

## Integration with existing model

The ontology entities map directly to existing `Node` and `Edge` types in `Graph.Types`. No type changes required. The `owl-` prefix on IDs and `"ontology"` group provide namespace separation from `gb:Node` instances.

The `importGraph` return type changes from `Either String Graph` to `Either String { graph :: Graph, ontologyKinds :: Map KindId KindDef }`. The Viewer merges `ontologyKinds` into `config.kinds` before initializing Cytoscape.
