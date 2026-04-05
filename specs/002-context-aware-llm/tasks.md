# Tasks: Context-Aware LLM Prompt Builder

**Branch**: `002-context-aware-llm` | **Plan**: [plan.md](plan.md)

## Phase 1: Clipboard FFI

### Task 1.1: Create FFI/Clipboard module
**Files**: `src/FFI/Clipboard.js`, `src/FFI/Clipboard.purs`
**Depends on**: nothing

- Create `Clipboard.js` with `writeClipboard` wrapping `navigator.clipboard.writeText`
- Create `Clipboard.purs` with `copyToClipboard :: String -> Aff Unit`
- Follow the FFI.Crypto pattern (Effect → Promise → Aff)
- Verify it compiles: `spago build`

## Phase 2: Prompt assembly

### Task 2.1: Create PromptBuilder module
**Files**: `src/PromptBuilder.purs`
**Depends on**: nothing (pure functions)

- `buildNodePrompt :: Config -> Graph -> Node -> String -> String`
- `buildEdgePrompt :: Config -> Graph -> Edge -> Node -> Node -> String -> String`
- Assemble markdown-formatted prompt with sections: context header, schema URLs, current element JSON, related elements JSON, file paths, user text, PR instructions
- Schema URLs: hardcode graph-browser's GitHub Pages base (`https://lambdasistemi.github.io/graph-browser/schema/`)
- Handle missing `sourceUrl` by omitting repo/PR sections
- Handle empty user text by omitting the question section
- Use `Data.Argonaut.Core.stringify` + `Data.Argonaut.Encode.Class.encodeJson` for JSON serialization

## Phase 3: UI integration

### Task 3.1: Add state and actions to Viewer
**Files**: `src/Viewer.purs`
**Depends on**: 1.1, 2.1

- Add `promptInput :: String` and `promptCopied :: Boolean` to State, initialize both
- Add `SetPromptInput String` and `CopyPrompt` to Action ADT
- Add handlers:
  - `SetPromptInput` updates state
  - `CopyPrompt` builds prompt (node or edge depending on current panel), calls `copyToClipboard`, sets `promptCopied = true`
- Reset `promptInput`/`promptCopied` on node/edge navigation (in existing `NodeTapped`, `EdgeHovered`, `SelectSearchResult` handlers)

### Task 3.2: Add prompt builder UI to node detail panel
**Files**: `src/Viewer.purs`
**Depends on**: 3.1

- After the connections section in `renderNodeDetail`, add:
  - Divider
  - Section title "Ask an LLM about this node"
  - Textarea bound to `promptInput` via `SetPromptInput`
  - "Copy prompt" button firing `CopyPrompt`
  - Conditional "Copied!" text when `promptCopied` is true
- Do not render during active tutorial

### Task 3.3: Add prompt builder UI to edge detail panel
**Files**: `src/Viewer.purs`
**Depends on**: 3.1

- Same UI as 3.2 but in `renderEdgeDetail`
- Title: "Ask an LLM about this edge"
- Store raw Edge in state when `EdgeHovered` fires (lookup from graph.edges) so `buildEdgePrompt` has the data it needs

### Task 3.4: Add CSS styles
**Files**: `dist/index.html`
**Depends on**: nothing

- `.prompt-builder` — section with `border-top: 1px solid #30363d`, `margin-top: 20px`, `padding-top: 16px`
- `.prompt-textarea` — styled like `.search-input` but multi-line, `min-height: 60px`, `resize: vertical`
- `.prompt-copy-btn` — styled like `.control-btn`
- `.prompt-copied` — `color: #3fb950`, `font-size: 12px`

## Phase 4: Verify

### Task 4.1: Build and test
**Depends on**: 3.2, 3.3, 3.4

- `nix develop -c just bundle-lib` — verify lib builds
- `nix develop -c just bundle-app` — verify app builds
- Manual test: serve locally, click a node, type text, copy prompt, verify clipboard content
- Manual test: hover an edge, repeat
- Manual test: verify prompt builder does not appear during tutorial
- Manual test: verify textarea resets on navigation
