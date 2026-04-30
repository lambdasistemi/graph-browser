# RDF Import Contract: Standard Predicate Fallback

## Purpose

This contract defines the RDF predicate surface that graph-browser accepts for imported node metadata and edge hover text in feature `008-standard-rdf-predicates`.

## Node Description Contract

Supported precedence:

1. `gb:description`
2. `dcterms:description`

Rules:

- If `gb:description` exists, graph-browser uses it.
- `dcterms:description` is only used when `gb:description` is absent.
- Unsupported description predicates are ignored for this feature.

## External Link Contract

Supported precedence:

1. `gb:externalLink` with linked resource carrying `gb:url`
2. `foaf:page`
3. `rdfs:seeAlso`

Rules:

- `gb:externalLink` remains the authoritative graph-browser-specific form.
- `foaf:page` and `rdfs:seeAlso` are fallback forms when no `gb:externalLink` exists.
- A fallback link target must resolve to a usable URL string.
- Fallback-derived link labels may be synthesized from the URL when no separate label source exists.

## Edge Description Contract

Supported precedence:

1. `gb:EdgeAssertion` with `gb:from`, `gb:to`, `rdfs:label`, and optional `gb:description`
2. Standard RDF reification with:
   - `rdf:subject`
   - `rdf:predicate`
   - `rdf:object`
   - `dcterms:description`

Rules:

- A reified statement contributes hover text only when it maps unambiguously to one imported displayed edge.
- If a matching `gb:EdgeAssertion` also exists, the gb-specific description wins.
- Reified statements do not replace the edge itself; they only contribute metadata.

## Ontology Reference Contract

Supported behavior:

- When a rendered node kind, node type, or edge predicate is backed by a standard ontology IRI, graph-browser preserves that IRI in the imported UI model.
- The right pane exposes that preserved IRI as a clickable documentation link.

Rules:

- The rendered label and the preserved ontology IRI are both part of the imported contract for standard terms.
- Graph-browser must not discard the ontology IRI merely because the UI also shows a shortened local label.
- Graph-browser must not invent documentation links for non-standard or unresolvable terms.

## Compatibility Guarantees

- Existing RDF datasets that rely only on gb-specific predicates remain valid.
- Datasets may mix gb-specific and standard predicates; gb-specific values always win when both are present.
- This contract does not require RDF-star support in the first iteration.
