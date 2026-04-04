# Graph Browser Constitution

## Core Principles

### I. Data-Driven, Zero Hardcoding
Every visual element (node kinds, colors, shapes, titles) comes from JSON data files. The PureScript/JS code contains no domain-specific knowledge. A new knowledge graph on any topic should work by providing config.json + graph.json without touching code.

### II. PureScript for Logic, JS FFI for Rendering
All application logic (state management, graph operations, search, tutorial navigation, persistence) is in PureScript via Halogen. JavaScript is limited to thin FFI wrappers around Cytoscape.js. No business logic in JS.

### III. Nix-First Builds
`nix build` produces the complete distributable. mkSpagoDerivation for PureScript deps, importNpmLock for JS deps. Dev shell via `nix develop`. No build steps that require network access in the sandbox.

### IV. Library/App Split
The codebase produces two outputs: a **lib** (reusable viewer component, no chrome) and an **app** (hosted viewer with repo management). Shared code lives in common modules. Consumers pull the lib via flake input.

### V. Schema-Validated Data
All data formats (config, graph, tutorials) have JSON Schemas in `schema/`. LLM-generated content must validate against these schemas. The GENERATE.md prompt templates reference the schemas.

### VI. Accessibility of Information
The graph browser exists to make complex knowledge accessible. Tutorials build understanding progressively. Search covers all text content. Hover reveals context. Every design decision should reduce friction for someone trying to learn.

## Technical Constraints

- **PureScript** + **Halogen** for UI
- **Cytoscape.js** + **fCoSE** for graph rendering
- **Nix flake** for build reproducibility
- **Spago** for PureScript package management
- **esbuild** for JS bundling (two-phase: deps then app)
- **GitHub Pages** for deployment
- **localStorage** for persistence (namespaced by title)
- **AES-256-GCM** for token encryption (Web Crypto API)

## Quality Gates

- `nix build` must succeed in sandbox
- `just ci` (lint + build + bundle) must pass
- No console errors (warnings suppressed for known Cytoscape issues)
- Playwright verification before merging UI changes
- JSON schemas must be kept in sync with data format changes

## Workflow

- **Always load `/workflow` skill** at the start of every coding session. It contains the full workflow rules (worktrees, branches, PRs, commit discipline).
- **Always use `/stgit`** for commit management. Small focused commits, each addressing a single concern. Use StGit to place fixups retroactively.
- **Never merge without testing**. Playwright verification for UI changes. `nix build` for build integrity. Console must be clean.
- **Never push directly to main**. Always use PRs, even for small fixes.

## Governance

Constitution supersedes implementation convenience. Amendments require updating this document and the README.

**Version**: 1.1.0 | **Ratified**: 2026-04-04
