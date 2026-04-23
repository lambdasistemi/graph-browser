# validate-action

Validate a graph-browser data repository against a pinned release of the graph-browser schemas.

## Usage

```yaml
- uses: lambdasistemi/graph-browser/validate-action@v0.4.1
  with:
    version: v0.4.1   # required unless schema-dir is set
    data-dir: data    # default: data
    rdf-dir: data/rdf # default: data/rdf
```

For hermetic builds, point at a local schemas directory instead:

```yaml
- uses: lambdasistemi/graph-browser/validate-action@v0.4.1
  with:
    schema-dir: schema
```

| Input | Required | Description |
|---|---|---|
| `version` | yes (unless `schema-dir`) | Release tag whose `schemas.tar.gz` to download. |
| `schema-dir` | yes (unless `version`) | Local path to schemas; skips download. |
| `data-dir` | no, default `data` | Path to the data directory in your repository. |
| `rdf-dir` | no, default `data/rdf` | Path to the RDF directory for SHACL validation. |

## What it does

1. Resolves schemas — either from the pinned release (`schemas.tar.gz`) or a local directory.
2. JSON-Schema-validates `data/config.json`, `data/graph.json` (if present), `data/tutorials/*.json`, and `data/views/*.json` with `ajv`.
3. Checks referential integrity: every edge endpoint exists, every kind is declared, no duplicate node IDs, every tutorial stop references a valid node.
4. If RDF files are present, runs Apache Jena SHACL against the bundled shapes.

## Why pin

Pinning the schema version means your data conforms to a known revision. New schema rules upstream don't fail your CI until you opt in by bumping the pin.

## Migration from `schema-ref: main`

If you previously used:

```yaml
- uses: lambdasistemi/graph-browser/validate-action@main
  with:
    schema-ref: main
```

…replace it with the pinned form above. The deprecated `schema-ref` input has been removed.
