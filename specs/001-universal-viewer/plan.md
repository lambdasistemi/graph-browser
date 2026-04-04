# Implementation Plan: Universal Viewer App

**Branch**: `001-universal-viewer` | **Date**: 2026-04-04 | **Spec**: [spec.md](spec.md)

## Summary

Split graph-browser into a **lib** output (the current viewer, unchanged) and an **app** output (hosted universal viewer with repo management panel, per-repo state, encrypted tokens, manifest discovery). The app wraps the existing Viewer component in a RepoManager shell that handles repo selection, data fetching, and state switching.

## Technical Context

**Language/Version**: PureScript 0.15.16, JavaScript ES2020
**Primary Dependencies**: Halogen (UI), Cytoscape.js (graph), Web Crypto API (token encryption)
**Storage**: localStorage (per-repo state, encrypted tokens, repo list)
**Testing**: Playwright (E2E), `nix build` (build integrity)
**Target Platform**: Browser (GitHub Pages hosted)
**Project Type**: Library + Web app (dual output)
**Constraints**: `nix build` must work sandboxed, no console errors, existing consumers unchanged

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Data-Driven | PASS | No domain-specific code added |
| II. PureScript for Logic | PASS | All new logic in PureScript, JS only for crypto FFI |
| III. Nix-First | PASS | Two flake outputs, both sandboxed |
| IV. Library/App Split | PASS | This is the implementation of that principle |
| V. Schema-Validated | PASS | New manifest schema added |
| VI. Accessibility | PASS | Repo panel improves access to multiple knowledge graphs |
| Workflow: /stgit | GATE | Must use StGit for commit management |
| Workflow: /workflow | GATE | Must use worktrees, PRs, never push to main |

## Project Structure

### Source Code

```text
src/
├── Main.purs              # App entry: RepoManager + Viewer
├── Lib.purs               # Lib entry: Viewer only (new)
├── Viewer.purs            # Extracted from current Main.purs (renamed)
├── RepoManager.purs       # Repo panel: add/select/delete repos (new)
├── RepoDiscovery.purs     # Manifest fetch + URL normalization (new)
├── Persist.purs           # Updated: per-repo namespacing
├── Tutorial.purs          # Unchanged
├── Graph/
│   ├── Types.purs         # Unchanged
│   ├── Build.purs         # Unchanged
│   ├── Cytoscape.purs     # Unchanged
│   ├── Decode.purs        # Updated: decode manifest
│   ├── Operations.purs    # Unchanged
│   └── Search.purs        # Unchanged
├── FFI/
│   ├── Cytoscape.js/purs  # Unchanged
│   ├── Crypto.js/purs     # New: AES-256-GCM token encryption (from call-graph-explorer)
│   └── Resize.js/purs     # New: panel drag resize (from call-graph-explorer)
├── bootstrap.js           # Unchanged
schema/
├── config.schema.json     # Unchanged
├── graph.schema.json      # Unchanged
├── tutorial.schema.json   # Unchanged
├── tutorial-index.schema.json  # Unchanged
└── manifest.schema.json   # New: .graph-browser.json schema
```

### Flake Outputs

```nix
packages = {
  default = app;    # Full app (repo manager + viewer)
  lib = lib;        # Viewer only (current behavior)
  app = app;        # Explicit alias
};
```

### Spago Bundle Targets

```yaml
# spago.yaml — app bundle (default)
bundle:
  module: Main
  outfile: dist/app.js

# justfile handles lib bundle separately
# spago bundle --module Lib --outfile dist/lib.js
```

## Implementation Phases

### Phase 1: Extract Viewer component (P1 — US5 prerequisite)

Extract the current Main.purs into Viewer.purs (a Halogen component that takes config + data URLs as input). Create Lib.purs as a thin wrapper that provides `data/` relative URLs. Verify `nix build .#lib` produces identical output to current `nix build`.

**Files**: Viewer.purs (rename from Main), Lib.purs (new), Main.purs (new shell)
**Risk**: Halogen component extraction may require adjusting how Cytoscape init works
**Validation**: cardano-governance-graph builds and works unchanged

### Phase 2: Repo discovery and data loading (P1 — US1)

Implement RepoDiscovery.purs: URL normalization (owner/repo, GitHub URLs, direct manifest URLs), manifest fetch from raw GitHub, convention fallback. Teach the Viewer to accept a base URL instead of always using relative `data/`.

**Files**: RepoDiscovery.purs (new), Viewer.purs (parameterize data URLs), Graph/Decode.purs (add manifest decoder)
**Risk**: CORS on raw.githubusercontent.com — should work for public repos
**Validation**: Load cardano-governance-graph by entering `lambdasistemi/cardano-governance-graph`

### Phase 3: Repo manager panel (P2 — US3)

Implement RepoManager.purs: left panel with repo form, repo list, active selection. Wire into Main.purs. Add Resize FFI from call-graph-explorer. Per-repo state via updated Persist.purs.

**Files**: RepoManager.purs (new), FFI/Resize.js/purs (new), Persist.purs (update), Main.purs (wire), dist/index.html (CSS for panel)
**Risk**: Halogen parent-child component wiring complexity
**Validation**: Add two repos, switch between them, verify independent state

### Phase 4: URL deep-linking (P1 — US2)

Read `?repo=` from URL on init, auto-add and select that repo. Update URL when switching repos.

**Files**: Main.purs (URL param handling)
**Risk**: Low — straightforward URL parsing
**Validation**: Navigate to `?repo=lambdasistemi/cardano-governance-graph`, verify auto-load

### Phase 5: Token management (P3 — US4)

Add Crypto FFI from call-graph-explorer. Token input field per repo in the panel. Encrypt before storage, decrypt on use. Pass token to fetch requests for private repo data.

**Files**: FFI/Crypto.js/purs (new), RepoManager.purs (token UI), RepoDiscovery.purs (authenticated fetch), Persist.purs (encrypted storage)
**Risk**: Private GitHub Pages auth mechanism — may need token in Authorization header
**Validation**: Load a private repo's graph with token, verify encrypted in localStorage

### Phase 6: Docs and schema update (P1 — FR-015)

Update README, GENERATE.md. Add manifest.schema.json. Update cardano-governance-graph to add `.graph-browser.json`.

**Files**: README.md, GENERATE.md, schema/manifest.schema.json
**Validation**: Downstream repo works with manifest

## Data Model

### .graph-browser.json manifest

```json
{
  "config": "data/config.json",
  "graph": "data/graph.json",
  "tutorials": "data/tutorials/index.json"
}
```

### Repo list in localStorage

Key: `graph-browser:repos`

```json
[
  {
    "id": "lambdasistemi/cardano-governance-graph",
    "title": "Cardano Governance",
    "lastAccessed": "2026-04-04T12:00:00Z",
    "hasToken": false
  }
]
```

### Per-repo state in localStorage

Key: `graph-browser:lambdasistemi/cardano-governance-graph`

```json
{
  "selectedNodeId": "governance-action",
  "depth": 2,
  "tutorialId": "governance-basics",
  "tutorialStep": 3
}
```

### Encrypted token in localStorage

Key: `graph-browser:token:lambdasistemi/private-repo`

Value: AES-256-GCM encrypted blob (same format as call-graph-explorer)

## Complexity Tracking

No constitution violations. The split is the simplest way to achieve dual output without duplicating code.
