# Generating Graph Data with an LLM

This document is a prompt template for generating `config.json`, `graph.json`, and tutorials for graph-browser. Copy the relevant section, fill in `{{placeholders}}`, and feed it to an AI assistant with web access.

## Step 1: Generate config.json

```
Create a config.json for a graph-browser knowledge graph about {{TOPIC}}.

Define node kinds that make sense for this domain. Each kind needs:
- id: kebab-case (e.g. "concept", "entity", "process")
- label: human-readable
- color: hex color, choose distinct colors for visual clarity
- shape: one of: ellipse, round-rectangle, diamond, round-hexagon, rectangle, round-octagon, barrel, round-pentagon, triangle, star

Output valid JSON matching this schema:
{
  "title": "{{TITLE}}",
  "description": "{{DESCRIPTION}}",
  "sourceUrl": "{{REPO_URL}}",
  "kinds": {
    "kind-id": { "label": "Kind Label", "color": "#hex", "shape": "shape" },
    ...
  }
}

Aim for 4-8 kinds that cover the major categories in {{TOPIC}}.
```

## Step 2: Generate graph.json

```
Create a knowledge graph about {{TOPIC}} for an interactive browser.

The graph must use these node kinds (from config.json):
{{PASTE YOUR KINDS HERE}}

Rules:
- Node IDs: kebab-case, unique
- Node descriptions: 3-6 sentences explaining what it IS and WHY it matters
- Edge labels: 2-5 words describing the relationship
- Edge descriptions: 2-4 sentences explaining WHY the relationship exists
- Include links to authoritative sources for each node (verify URLs work)
- Every edge must reference existing node IDs
- Aim for 20-60 nodes and 40-100 edges for a useful graph

Sources to research (in order of authority):
{{LIST YOUR AUTHORITATIVE SOURCES}}

Output valid JSON:
{
  "nodes": [
    {
      "id": "kebab-case-id",
      "label": "Display Name",
      "kind": "kind-from-config",
      "group": "logical-grouping",
      "description": "3-6 sentences...",
      "links": [
        { "label": "Link text", "url": "https://verified-url" }
      ]
    }
  ],
  "edges": [
    {
      "source": "source-node-id",
      "target": "target-node-id",
      "label": "short label",
      "description": "2-4 sentences explaining why..."
    }
  ]
}

After generating, validate:
- Every edge.source and edge.target exists as a node ID
- No duplicate node IDs
- All URLs return 200
- Every node has at least one edge
```

## Step 3: Generate tutorials

```
Create a guided tutorial for the {{TOPIC}} knowledge graph.

Available nodes (from graph.json):
{{PASTE NODE IDS AND LABELS}}

The tutorial should:
- Tell a coherent story that builds understanding progressively
- Each stop focuses on one node at a specific depth
- Depth should show 5-10 visible nodes (check neighborhood sizes)
- Use inline links: [text](node:node-id) for graph nodes, [text](https://url) for external
- Link key concepts on first mention per stop (don't self-link the stop's own node)
- Separate paragraphs with \n\n

Output valid JSON:
{
  "id": "tutorial-id",
  "title": "Tutorial Title",
  "description": "Short description for the menu.",
  "stops": [
    {
      "node": "node-id-to-focus-on",
      "depth": 2,
      "title": "Stop Title",
      "narrative": "Paragraph one.\n\nParagraph two with [linked concept](node:other-id)."
    }
  ]
}

Create {{N}} tutorials covering different aspects:
1. {{TUTORIAL 1 TOPIC}} — overview for beginners
2. {{TUTORIAL 2 TOPIC}} — deep dive on specific area
...

Also create data/tutorials/index.json listing all tutorials:
[
  { "id": "tutorial-id", "title": "Title", "description": "Description", "file": "data/tutorials/tutorial-id.json" }
]
```

## Validation

After generating all files, verify:

```bash
# Validate graph data
node -e "
  const d=require('./data/graph.json');
  const c=require('./data/config.json');
  const ids=new Set(d.nodes.map(n=>n.id));
  const kinds=Object.keys(c.kinds);
  let ok=true;
  d.nodes.forEach(n=>{
    if(!kinds.includes(n.kind)){console.error('Unknown kind: '+n.kind+' on node '+n.id);ok=false}
  });
  d.edges.forEach((e,i)=>{
    if(!ids.has(e.source)){console.error('Bad source e'+i+': '+e.source);ok=false}
    if(!ids.has(e.target)){console.error('Bad target e'+i+': '+e.target);ok=false}
  });
  if(ok) console.log(d.nodes.length+' nodes, '+d.edges.length+' edges, '+kinds.length+' kinds — OK');
  else process.exit(1);
"
```
