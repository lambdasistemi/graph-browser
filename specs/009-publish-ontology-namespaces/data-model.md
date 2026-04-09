# Data Model: Publish Dereferenceable Ontology Namespaces

## Ontology Triple Source

- **Purpose**: The Turtle-derived triples used as the source of truth for namespace publication.
- **Required attributes**:
  - `sourcePath`: path to a Turtle ontology input or derived Turtle artifact
  - `format`: RDF syntax, expected to be Turtle for this issue
  - `namespace`: namespace detected or assigned for publication
- **Notes**:
  - A namespace page may be assembled from one or more Turtle files contributing triples to the same namespace.

## Ontology Term Entry

- **Purpose**: Represents one generated identifier inside a namespace document.
- **Required attributes**:
  - `iri`: full ontology term IRI
  - `namespace`: namespace document URL without fragment
  - `fragment`: fragment identifier appended after `#`
  - `compactName`: compact prefixed form such as `gb:Node`
  - `label`: human-facing label, when present
  - `description`: human-facing description, when present
  - `termType`: broad type such as class, object property, datatype property, annotation property, or repository-derived vocabulary item
- **Notes**:
  - The entry is extracted from Turtle triples, not from a manually curated inventory.
  - Missing `rdfs:label` or `dcterms:description` must not prevent publication.

## Namespace Document

- **Purpose**: A published page representing a vocabulary namespace such as `terms`, `kinds`, `groups`, or `edges`.
- **Required attributes**:
  - `namespaceUrl`: canonical namespace URL without fragment
  - `title`: human-facing page title
  - `description`: short explanation of the vocabulary scope
  - `sourceArtifacts`: links to the underlying ontology Turtle or related generated artifacts
  - `terms`: ordered collection of generated ontology term entries
- **Notes**:
  - The document is emitted automatically into the Pages artifact.

## Ontology Identity

- **Purpose**: The UI-facing identity block shown for a selected ontology-backed node.
- **Required attributes**:
  - `iri`: full ontology term IRI
  - `compact`: compact prefixed representation when known
  - `namespace`: namespace URL
  - `namespaceLabel`: short human-facing namespace name or fallback URL

## Namespace Publication Step

- **Purpose**: The automated build/deploy step that reads Turtle inputs and emits namespace documents to the final site artifact.
- **Required attributes**:
  - `inputs`: ontology Turtle files or exported ontology artifacts
  - `outputDir`: site output directory receiving `/vocab/...`
  - `publishedNamespaces`: collection of namespace documents generated during the build
- **Notes**:
  - This is the reuse boundary that downstream repos should be able to adopt.
