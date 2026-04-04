# Tasks: Universal Viewer App

**Branch**: `001-universal-viewer` | **Date**: 2026-04-04
**Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)

## Phase 1: Extract Viewer component (US5 — lib unchanged)

### Task 1.1: Rename Main.purs to Viewer.purs
- Rename `src/Main.purs` → `src/Viewer.purs`
- Change module name to `Viewer`
- Export the Halogen component as `viewer` (not `main`)
- The component takes a record of data URLs as input: `{ configUrl, graphUrl, tutorialIndexUrl }`
- Move `main :: Effect Unit` and `runUI` out — those belong in entry points
- **Blocked by**: nothing
- **Validates**: module compiles

### Task 1.2: Create Lib.purs entry point
- New `src/Lib.purs` with `module Lib` and `main :: Effect Unit`
- Imports `Viewer.viewer` and runs it with relative URLs: `{ configUrl: "data/config.json", graphUrl: "data/graph.json", tutorialIndexUrl: "data/tutorials/index.json" }`
- **Blocked by**: 1.1
- **Validates**: `spago bundle --module Lib` produces working output identical to current behavior

### Task 1.3: Create Main.purs app entry point (stub)
- New `src/Main.purs` with `module Main` and `main :: Effect Unit`
- For now, just delegates to Viewer with the same relative URLs (same as Lib)
- Will be expanded in Phase 3
- **Blocked by**: 1.1
- **Validates**: `spago bundle --module Main` works

### Task 1.4: Update justfile and flake for dual output
- justfile: `bundle-lib` and `bundle-app` recipes
- flake.nix: `packages.lib` and `packages.app` (default = app)
- `bundle-lib` bundles module Lib, `bundle-app` bundles module Main
- Both go through the two-phase esbuild (deps + app)
- **Blocked by**: 1.2, 1.3
- **Validates**: `nix build .#lib` and `nix build .#app` both produce working output

### Task 1.5: Verify downstream unchanged
- Build cardano-governance-graph with `--override-input graph-browser path:./` pointing to the lib output
- Verify the site works identically
- **Blocked by**: 1.4
- **Validates**: Playwright test — governance graph loads, tutorials work, persistence works

---

## Phase 2: Repo discovery and data loading (US1)

### Task 2.1: Create RepoDiscovery module
- New `src/RepoDiscovery.purs`
- `normalizeInput :: String -> RepoSource` — parses `owner/repo`, `https://github.com/owner/repo`, `https://owner.github.io/repo/`, direct manifest URL
- `RepoSource` type: `{ owner :: String, repo :: String, manifestUrl :: String, pagesBaseUrl :: String }`
- Pure function, no IO
- **Blocked by**: nothing
- **Validates**: unit tests for each input format

### Task 2.2: Implement manifest fetch and fallback
- `discoverDataUrls :: RepoSource -> Aff DataUrls` — tries manifest first, falls back to convention
- Fetch `https://raw.githubusercontent.com/{owner}/{repo}/main/.graph-browser.json`
- If 404, try `https://raw.githubusercontent.com/{owner}/{repo}/master/.graph-browser.json`
- If still 404, fall back to `https://{owner}.github.io/{repo}/data/` convention
- `DataUrls` type: `{ configUrl :: String, graphUrl :: String, tutorialIndexUrl :: String }`
- **Blocked by**: 2.1
- **Validates**: returns correct URLs for cardano-governance-graph (no manifest, convention fallback)

### Task 2.3: Add manifest schema
- New `schema/manifest.schema.json`
- Add manifest decoder to `Graph/Decode.purs`
- **Blocked by**: nothing
- **Validates**: schema validates example manifest

### Task 2.4: Parameterize Viewer data URLs
- Change Viewer component input from hardcoded relative paths to accept `DataUrls`
- Lib.purs passes relative URLs, Main.purs will pass discovered URLs
- **Blocked by**: 1.1, 2.2
- **Validates**: Viewer works with both relative and absolute URLs

### Task 2.5: Wire discovery into Main.purs
- Main.purs: on repo selection, run `normalizeInput` → `discoverDataUrls` → pass to Viewer
- Error handling: show message in sidebar if discovery or fetch fails
- **Blocked by**: 2.2, 2.4
- **Validates**: Enter `lambdasistemi/cardano-governance-graph` in browser console trigger, graph loads

---

## Phase 3: Repo manager panel (US3)

### Task 3.1: Add Resize FFI
- Copy and adapt `FFI/Resize.js` and `FFI/Resize.purs` from call-graph-explorer
- Horizontal resize for left panel
- **Blocked by**: nothing
- **Validates**: drag handle resizes a panel

### Task 3.2: Create RepoManager component
- New `src/RepoManager.purs` — Halogen component
- Left panel with: repo input form at top, repo list below, active repo highlighted
- Outputs: `RepoSelected RepoEntry`, `RepoAdded String`, `RepoDeleted RepoEntry`
- Input form accepts all formats (FR-002)
- **Blocked by**: 3.1
- **Validates**: renders panel with form and empty list

### Task 3.3: Update Persist for per-repo state
- Persist module: repo list stored at `graph-browser:repos`
- Per-repo viewer state at `graph-browser:{owner}/{repo}`
- Functions: `saveRepoList`, `loadRepoList`, `saveRepoState`, `loadRepoState`, `deleteRepo`
- **Blocked by**: nothing
- **Validates**: save/load round-trips correctly

### Task 3.4: Wire RepoManager into Main
- Main.purs: parent component with RepoManager (left) + Viewer (right)
- On RepoSelected: save current state, load new repo data, restore new repo state, pass to Viewer
- On RepoAdded: discover data, add to list, select it
- On RepoDeleted: remove from list, clear state, select next or show empty
- **Blocked by**: 3.2, 3.3, 2.5
- **Validates**: full flow — add repo, see graph, switch, state preserved

### Task 3.5: App CSS for left panel
- Update `dist/index.html` with panel layout CSS
- Separate `dist/app.html` (with panel) from `dist/index.html` (lib, no panel)
- **Blocked by**: 3.2
- **Validates**: visual layout matches call-graph-explorer pattern

---

## Phase 4: URL deep-linking (US2)

### Task 4.1: Read ?repo= on init
- Main.purs: on Initialize, check `window.location.search` for `repo` param
- If present, auto-add and select that repo
- **Blocked by**: 3.4
- **Validates**: `?repo=lambdasistemi/cardano-governance-graph` auto-loads

### Task 4.2: Update URL on repo switch
- When the active repo changes, update the URL bar with `?repo=owner/repo` using `history.replaceState`
- **Blocked by**: 4.1
- **Validates**: switching repos updates the URL without page reload

---

## Phase 5: Token management (US4)

### Task 5.1: Add Crypto FFI
- Copy and adapt `FFI/Crypto.js` and `FFI/Crypto.purs` from call-graph-explorer
- AES-256-GCM encrypt/decrypt, key generation and storage
- **Blocked by**: nothing
- **Validates**: encrypt → decrypt round-trip

### Task 5.2: Token UI in RepoManager
- Per-repo token input field (show/hide toggle)
- Token stored encrypted on save
- Token indicator (lock icon) in repo list for repos with tokens
- **Blocked by**: 5.1, 3.2
- **Validates**: enter token, see lock icon, reload, token still there

### Task 5.3: Authenticated fetch in RepoDiscovery
- When repo has a stored token, pass it as `Authorization: token {token}` header
- Applies to manifest fetch and all data fetches
- **Blocked by**: 5.1, 2.2
- **Validates**: private repo graph loads with token

---

## Phase 6: Docs and schema update (FR-015)

### Task 6.1: Manifest schema
- `schema/manifest.schema.json` — already created in 2.3
- **Blocked by**: 2.3

### Task 6.2: Update README
- Document lib vs app outputs
- Document `.graph-browser.json` manifest
- Document URL deep-linking
- Update "Usage" section for both consumers and hosted app users
- **Blocked by**: all implementation phases

### Task 6.3: Update GENERATE.md
- Add manifest generation to the LLM prompt templates
- **Blocked by**: 6.1

### Task 6.4: Update cardano-governance-graph
- Add `.graph-browser.json` manifest to the repo
- Update flake to use `graph-browser.packages.lib` (explicit)
- **Blocked by**: 1.4, 6.1

---

## Dependency Graph

```
1.1 → 1.2 → 1.4 → 1.5
1.1 → 1.3 → 1.4
1.1 → 2.4

2.1 → 2.2 → 2.5
2.4 + 2.5 → 3.4

3.1 → 3.2 → 3.4
3.3 → 3.4
3.2 → 3.5

3.4 → 4.1 → 4.2

5.1 → 5.2
5.1 → 5.3

All → 6.2
2.3 → 6.1 → 6.3
1.4 + 6.1 → 6.4
```

## Implementation Order (suggested)

1. Tasks 1.1, 1.2, 1.3, 1.4, 1.5 (extract viewer — must pass before anything else)
2. Tasks 2.1, 2.3 (repo discovery + manifest schema — independent)
3. Tasks 2.2, 2.4, 2.5 (wire discovery to viewer)
4. Tasks 3.1, 3.3 (resize FFI + persist — independent)
5. Tasks 3.2, 3.5, 3.4 (repo manager panel)
6. Tasks 4.1, 4.2 (deep-linking)
7. Tasks 5.1, 5.2, 5.3 (token management)
8. Tasks 6.1, 6.2, 6.3, 6.4 (docs)
