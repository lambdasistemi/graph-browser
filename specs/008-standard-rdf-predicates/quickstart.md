# Quickstart: Standard RDF Predicate Import

## Goal

Verify that graph-browser can import RDF datasets where semantic metadata comes from standard predicates and `gb:` remains only a presentation layer.

## Minimal Dataset Shape

1. Keep `data/config.json` with `graphSource` pointing to an RDF asset.
2. Keep graph-browser rendering metadata such as kind and group available where required by the current importer.
3. Express semantic metadata with standard predicates:

```turtle
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix gb: <https://lambdasistemi.github.io/graph-browser/vocab/terms#> .

<https://example.test/node/viewer>
  a gb:Node ;
  gb:nodeId "viewer" ;
  rdfs:label "Viewer" ;
  gb:group <https://lambdasistemi.github.io/graph-browser/vocab/groups#ui> ;
  dcterms:description "The main graph viewport" ;
  foaf:page <https://example.test/docs/viewer> .

[] a rdf:Statement ;
   rdf:subject <https://example.test/node/main> ;
   rdf:predicate <https://example.test/predicate/uses> ;
   rdf:object <https://example.test/node/viewer> ;
   dcterms:description "Main delegates rendering to Viewer" .
```

## Local Verification

1. Open the feature worktree: [graph-browser-spec-49](/code/graph-browser-spec-49)
2. Add or update an RDF fixture under `data/` or test fixtures for the importer.
3. Run the test/build path used by the repo:

```bash
cd /code/graph-browser-spec-49
just ci
```

4. Load the viewer against the RDF-backed dataset and confirm:
   - node descriptions use `dcterms:description` when `gb:description` is absent
   - node links use `foaf:page` or `rdfs:seeAlso` when no `gb:externalLink` exists
   - edge hover text appears from reified annotations when no `gb:EdgeAssertion` exists
   - gb-specific values still win when both sources are present

## CI/Validation Expectations

- Validation must continue accepting existing gb-specific RDF datasets unchanged.
- Validation and runtime import must both accept the documented fallback predicates.
- Documentation must state the supported precedence rules so downstream RDF authors can target them directly.
