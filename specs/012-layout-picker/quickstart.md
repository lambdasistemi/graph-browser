# Quickstart: Verify User-Selectable Graph Layouts

## 1. Install and build

```bash
npm ci
just test
just bundle-app
just bundle-lib
```

## 2. Verify layout switching on the self graph

Open the bundled app or a local dev session on the graph-browser self graph.

Check that:

- the controls expose `fCoSE`, `ELK`, `Cola`, `Dagre`, and `Concentric`
- switching layouts reflows the current visible graph without refetching data
- node selection, edge selection, active query/view, and tutorial step remain active after the relayout

## 3. Verify repo-scoped persistence

Use two repos in the hosted app flow.

Example:

- repo A: `lambdasistemi/graph-browser`
- repo B: `lambdasistemi/zk-lab`

Check that:

- choosing `Dagre` in repo A does not force repo B to use `Dagre`
- choosing `Concentric` in repo B does not overwrite repo A
- reloading the app restores each repo’s last explicit layout

## 4. Verify authored defaults

Create one query-backed view and one legacy view with explicit layout defaults.

Example query-backed view entry:

```json
{
  "id": "chapter-flow",
  "name": "Chapter Flow",
  "description": "A directed walkthrough",
  "sparql": "SELECT ?node WHERE { ... }",
  "tags": ["view"],
  "layout": "dagre"
}
```

Example legacy view file:

```json
{
  "name": "Schema Rings",
  "description": "Grouped by ontology concern",
  "layout": "concentric",
  "edges": [
    ["class-a", "class-b", "subClassOf"]
  ],
  "tours": []
}
```

For a first-time visitor with no saved layout preference, verify that:

- selecting the query-backed view activates `Dagre`
- selecting the legacy view activates `Concentric`

After explicitly choosing another layout, verify that reopening those views keeps the saved explicit layout instead of reapplying the authored defaults.

## 5. Verify fallback behavior

Check that invalid authored or saved layout identifiers never block rendering.

Expected behavior:

- the graph still renders
- the viewer falls back to `fCoSE`
- the controls show the fallback layout as active
