# Feature Specification: Universal Viewer App

**Feature Branch**: `001-universal-viewer`
**Created**: 2026-04-04
**Status**: Draft
**Input**: Split graph-browser into lib (reusable viewer) and app (hosted universal viewer with repo form, encrypted token management, per-repo state persistence, URL deep-linking). Left panel for repo management, modeled after call-graph-explorer.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Browse a public knowledge graph by URL (Priority: P1)

A user visits the hosted graph-browser app and wants to explore a knowledge graph hosted on another repository's GitHub Pages. They enter the repository identifier in the left panel, the app loads the graph data, and they can browse nodes, edges, search, and follow tutorials.

**Why this priority**: Core value proposition — turns the hosted app into a universal viewer for any repo's knowledge graph.

**Independent Test**: Enter `lambdasistemi/cardano-governance-graph` in the repo form and verify the full governance graph loads with all features.

**Acceptance Scenarios**:

1. **Given** the app is open with no repo selected, **When** the user enters `owner/repo` and submits, **Then** the app loads config.json, graph.json, and tutorials from that repo's GitHub Pages and displays the graph.
2. **Given** a repo is loaded, **When** the user changes depth, clicks nodes, or starts a tutorial, **Then** the experience is identical to a standalone deployment.
3. **Given** an invalid repo or one without graph data, **When** the user submits, **Then** a clear error message explains what went wrong.

---

### User Story 2 — Share a direct link to a specific repo's graph (Priority: P1)

A user wants to share a link that opens the app pre-loaded with a specific repo's knowledge graph.

**Why this priority**: Sharing is essential for adoption. Without deep-linking, every user has to manually type the repo name.

**Independent Test**: Navigate to `?repo=lambdasistemi/cardano-governance-graph` and verify the graph loads automatically.

**Acceptance Scenarios**:

1. **Given** a URL with `?repo=owner/repo`, **When** the page loads, **Then** the app automatically adds the repo, loads its graph, and selects it.
2. **Given** a URL with an invalid `?repo` value, **When** the page loads, **Then** the app shows an error and falls back to the repo selection form.

---

### User Story 3 — Manage repos in left panel with per-repo state (Priority: P2)

A resizable left panel shows the list of added repos. The user can add new repos via a form at the top, select a repo to view its graph, and delete repos they no longer need. Each repo shows its graph title (from config.json). Selecting a repo loads its graph and restores the viewer state (selected node, depth, tutorial progress) exactly where the user left off. Switching to a different repo saves the current state and restores the other repo's state.

**Why this priority**: Returning users need fast switching between knowledge graphs. Per-repo state makes each graph feel like a bookmark.

**Independent Test**: Add two repos, navigate to different nodes in each, switch between them, verify each restores its own state independently.

**Acceptance Scenarios**:

1. **Given** the user has added repos A and B, **When** they open the app, **Then** the left panel shows both repos with their graph titles.
2. **Given** repo A is active with node X selected at depth 2, **When** the user switches to repo B, **Then** repo A's state is saved and repo B loads with its own previously saved state.
3. **Given** the user switches back to repo A, **Then** node X is selected at depth 2 — exactly where they left off.
4. **Given** the user deletes a repo, **Then** it disappears from the list and all its stored state is cleared.
5. **Given** the left panel, **When** the user drags the panel edge, **Then** it resizes.

---

### User Story 4 — Access private repo graphs with a token (Priority: P3)

A user wants to browse a knowledge graph hosted on a private repository's GitHub Pages. They provide a GitHub personal access token, which is stored securely.

**Why this priority**: Private repos are a real use case but less common. Token management adds complexity.

**Independent Test**: Enter a private repo with a valid token, verify the graph loads. Reload, verify the token is retrieved without re-entry. Verify the token is encrypted in localStorage.

**Acceptance Scenarios**:

1. **Given** a private repo, **When** the user provides a token and submits, **Then** the graph loads using the token.
2. **Given** a token was previously stored, **When** the user selects that repo, **Then** the token is retrieved automatically.
3. **Given** a stored token, **When** inspecting localStorage, **Then** the token is encrypted.
4. **Given** an invalid token, **When** loading, **Then** a clear error explains the authentication failure.

---

### User Story 5 — Lib consumers get a standalone viewer (Priority: P1)

A downstream project consumes graph-browser as a library via Nix flake. They get only the graph viewer — no repo selection UI, no token management. The viewer reads from `data/` relative to wherever it's served.

**Why this priority**: Existing consumers must not break.

**Independent Test**: `nix build .#lib` produces index.html + index.js that work identically to the current output. cardano-governance-graph continues to build.

**Acceptance Scenarios**:

1. **Given** a downstream project using `graph-browser.packages.${system}.lib`, **When** it builds, **Then** the output is a self-contained viewer with no repo management UI.
2. **Given** the lib output served with `data/`, **Then** the graph renders identically to current behavior.

---

### Edge Cases

- Repo exists but has neither `.graph-browser.json` nor `data/config.json`: clear error "No graph-browser data found. Add a .graph-browser.json manifest or host data at data/."
- GitHub Pages not enabled and no manifest: error with suggestion to enable Pages or add manifest.
- CORS blocks the request: error explaining data must be on GitHub Pages.
- User is offline: previously loaded repos display from cache if available.
- Switching repos: saves current state, restores target's state. Each repo namespaced as `graph-browser:{owner}/{repo}`.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The build system MUST produce two distinct outputs: `lib` (viewer only) and `app` (viewer + repo management).
- **FR-002**: The app MUST provide a form in the left panel that accepts multiple input formats: `owner/repo`, `https://github.com/owner/repo`, `https://owner.github.io/repo/`, or a direct URL to `.graph-browser.json`. The app normalizes all formats to derive the repo identity and data source.
- **FR-003**: The app MUST discover graph data locations by fetching `.graph-browser.json` from the repo root (via raw GitHub content). If the manifest is missing, fall back to the convention `data/` path on GitHub Pages.
- **FR-004**: The app MUST support `?repo=owner/repo` URL parameter for deep-linking.
- **FR-005**: The app MUST persist a list of added repos and each repo's viewer state independently across sessions.
- **FR-006**: The app MUST allow users to provide a GitHub token for private repo access.
- **FR-007**: Stored tokens MUST be encrypted at rest using browser-native cryptography.
- **FR-008**: The app MUST show a resizable left panel with the repo list, each entry displaying the graph title from config.json.
- **FR-009**: The app MUST allow removing repos from the list, clearing all associated stored data (viewer state, token, cached config).
- **FR-010**: The lib output MUST be functionally identical to the current graph-browser build.
- **FR-011**: The app MUST show clear, actionable error messages for: missing data, network failures, authentication failures, invalid data format.
- **FR-012**: Each repo's viewer state (selected node, depth, tutorial progress) MUST be persisted independently. Switching repos saves current state and restores target's state.
- **FR-013**: The left panel MUST be resizable via drag handle.
- **FR-014**: Repos MAY declare a `.graph-browser.json` manifest at the repo root specifying paths to config, graph, and tutorial index files. The manifest format MUST have a JSON schema in `schema/`.
- **FR-015**: README, GENERATE.md, and JSON schemas MUST be updated to document the manifest format, discovery mechanism, and how downstream repos opt-in.

### Key Entities

- **Repo Entry**: `owner/repo` identifier, graph title (from config.json), optional encrypted token, last accessed timestamp.
- **Encrypted Token**: GitHub token encrypted with browser-generated AES key in localStorage.
- **Per-Repo State**: Selected node ID, depth, tutorial ID, tutorial step — namespaced by `graph-browser:{owner}/{repo}`.
- **Manifest** (`.graph-browser.json`): Repo-root file declaring paths to config, graph, and tutorials. Fetched via `https://raw.githubusercontent.com/{owner}/{repo}/main/.graph-browser.json`. Optional — falls back to convention `data/` on GitHub Pages.
- **Data Base URL**: Derived from manifest paths or convention: `https://{owner}.github.io/{repo}/`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can load any public repo's knowledge graph within 5 seconds of entering the identifier.
- **SC-002**: Deep-link URLs load the correct graph on first visit without user interaction.
- **SC-003**: Returning users can switch to a previously loaded repo with one click, state restored.
- **SC-004**: The lib output is functionally identical to the pre-split graph-browser.
- **SC-005**: Tokens in localStorage cannot be read as plaintext.
- **SC-006**: Per-repo state persists independently — switching repos and reloading preserves each repo's position.

## Assumptions

- GitHub Pages serves data with CORS headers allowing cross-origin fetch.
- Repos follow graph-browser data format: `data/config.json`, `data/graph.json`, optionally `data/tutorials/index.json`.
- Private GitHub Pages sites serve content when authenticated via token.
- The call-graph-explorer crypto module (AES-256-GCM via Web Crypto API) is the reference for token encryption.
- The call-graph-explorer resize module is the reference for panel resizing.
