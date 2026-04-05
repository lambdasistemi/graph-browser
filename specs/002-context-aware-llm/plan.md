# Implementation Plan: Context-Aware LLM Prompt Builder

**Branch**: `002-context-aware-llm` | **Date**: 2026-04-05 | **Spec**: [spec.md](spec.md)

## Summary

Add a text input + "Copy prompt" button to node and edge detail panels. The user types their intent; the tool assembles a complete prompt with the element's JSON, connected elements, JSON schema URLs, source repo URL, and PR instructions. Pure prompt assembly logic + clipboard FFI.

## Technical Context

**Language/Version**: PureScript 0.15.x + Halogen 7
**Primary Dependencies**: Cytoscape.js (graph), Argonaut (JSON encoding), aff-promise (FFI)
**Storage**: N/A (clipboard only, no persistence)
**Testing**: Manual Playwright verification
**Target Platform**: Browser (HTTPS or localhost for clipboard API)
**Project Type**: Library + App (feature goes in shared Viewer component)

## Constitution Check

| Gate | Status |
|------|--------|
| Data-driven, zero hardcoding | PASS — prompt template uses config.sourceUrl and schema $id URLs, no domain-specific content |
| PureScript for logic, JS FFI for rendering | PASS — prompt assembly is pure PureScript, clipboard is thin JS FFI |
| Nix-first builds | PASS — no new build dependencies |
| Library/App split | PASS — feature lives in Viewer.purs (shared), available in both lib and app |
| Schema-validated data | N/A — no new data formats |
| Accessibility of information | PASS — reduces friction for contributing updates to the graph |

## Project Structure

### Documentation

```text
specs/002-context-aware-llm/
├── spec.md
├── plan.md
└── tasks.md
```

### Source Code (new/modified files)

```text
src/
├── FFI/
│   ├── Clipboard.js        # NEW — navigator.clipboard.writeText wrapper
│   └── Clipboard.purs      # NEW — copyToClipboard :: String -> Aff Unit
├── PromptBuilder.purs       # NEW — pure prompt assembly functions
└── Viewer.purs              # MODIFIED — state, actions, render, handlers

dist/
└── index.html               # MODIFIED — CSS for prompt builder UI
```

## Design

### Module: PromptBuilder.purs

Pure functions, no effects.

```
buildNodePrompt :: Config -> Graph -> Node -> String -> String
buildEdgePrompt :: Config -> Graph -> EdgeWithEndpoints -> String -> String
```

Each function assembles a markdown-formatted prompt:

1. **Context header** — "You are working with a knowledge graph defined at: {sourceUrl}"
2. **Schema references** — links to `graph.schema.json`, `config.schema.json`, `tutorial.schema.json`, `tutorial-index.schema.json` at graph-browser's GitHub Pages URL (derived from schema `$id` fields, not from `sourceUrl`)
3. **Current element JSON** — the node or edge, pretty-printed
4. **Related elements JSON** — connected edges (for nodes) or endpoint nodes (for edges)
5. **File paths** — `data/graph.json`, `data/config.json`, `data/tutorials/`
6. **User's text** — verbatim, as the task/question section
7. **PR instructions** — fork {sourceUrl}, edit JSON files, validate against schemas, submit PR

When `config.sourceUrl` is empty/missing, sections 1 and 7 are omitted.

### Module: FFI/Clipboard

Follows the FFI.Crypto pattern:

```javascript
// Clipboard.js
export const writeClipboard = (text) => () => navigator.clipboard.writeText(text);
```

```purescript
-- Clipboard.purs
foreign import writeClipboard :: String -> Effect (Promise Unit)
copyToClipboard :: String -> Aff Unit
copyToClipboard = toAffE <<< writeClipboard
```

### Viewer.purs changes

**State additions:**
- `promptInput :: String` — textarea content
- `promptCopied :: Boolean` — "Copied!" feedback flag

**Action additions:**
- `SetPromptInput String`
- `CopyPrompt` — builds prompt for whichever element (node or edge) is currently shown, copies to clipboard

**Render additions:**
- After the connections section in `renderNodeDetail`: divider + textarea + button
- After the description in `renderEdgeDetail`: same
- Not shown during active tutorial (tutorial panels don't show the prompt builder)

**Handler logic:**
- `CopyPrompt`: read state, call `buildNodePrompt` or `buildEdgePrompt` depending on which panel is active, call `copyToClipboard`, set `promptCopied = true`
- `SetPromptInput`: update state
- Clear `promptInput` and `promptCopied` on node/edge navigation

### CSS additions

Minimal, matching existing dark theme:
- `.prompt-builder` — section container with border-top
- `.prompt-textarea` — textarea styled like `.search-input`
- `.prompt-copy-btn` — styled like `.control-btn`
- `.prompt-copied` — green text feedback

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Clipboard API requires secure context | localhost works for dev; production is HTTPS via GitHub Pages/surge |
| Edge detail panel lacks raw Edge JSON | Store raw edge in state when EdgeHovered fires (lookup from graph.edges) |
| encodeJson for type aliases | PureScript argonaut handles record type aliases; fallback to manual encoding if needed |
