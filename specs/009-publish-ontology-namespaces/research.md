# Research: Publish Dereferenceable Ontology Namespaces

## Decision: Namespace pages must be generated from Turtle, not from hardcoded term metadata

- **Why**: The ontology is authored in Turtle. Encoding the same vocabulary again in repo-specific code would recreate the multiple-sources-of-truth problem that issue 56 just removed on the graph side.
- **Alternatives considered**:
  - Hand-maintained term lists in PureScript: rejected because every downstream project would need custom code and the page content would drift from the ontology.
  - Pure prose markdown pages: rejected because they do not scale to generated vocabularies such as kinds, groups, and edges.

## Decision: The automation boundary is the build/deploy workflow

- **Why**: The desired behavior is a deployed property of the site. If the Pages artifact does not contain `/vocab/...`, the links shown in the UI will still fail.
- **Alternatives considered**:
  - Generate pages only in local development: rejected because it does not solve deployment.
  - Keep generation inside graph-browser-only source code without workflow integration: rejected because downstream reuse becomes awkward and manual.

## Decision: Graph-browser should prove the pattern, but the abstraction must be reusable

- **Why**: Graph-browser is the first consumer, but the user requirement is broader: any project using graph-browser and authoring an ontology in Turtle should be able to publish dereferenceable namespace pages.
- **Alternatives considered**:
  - Solve only for `gb:` namespaces with graph-browser-specific hardcoded catalogs: rejected because it does not generalize.
  - Defer downstream reuse entirely: rejected because the issue is about establishing the right publication model.

## Decision: Viewer ontology provenance stays in scope

- **Why**: A correct deployed namespace page is still invisible to users unless the viewer shows compact prefixes and links them.
- **Alternatives considered**:
  - Publish docs only and defer UI changes: rejected because the user-facing symptom remains unresolved.

## Decision: First iteration remains static HTML, not content negotiation

- **Why**: GitHub Pages is static and the immediate requirement is dereferenceable, human-browsable namespace documents.
- **Alternatives considered**:
  - Full RDF/HTML content negotiation: rejected for now as unnecessary complexity.
