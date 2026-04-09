# Tasks: Make RDF the Only Graph Source of Truth

**Input**: Design documents from `/specs/010-rdf-only-source-truth/`
**Prerequisites**: plan.md, spec.md, research.md

## Phase 1: RDF-first export and validation

- [ ] T001 Update `src/Rdf/Export/Main.purs` to load graph data from `config.graphSources` / `config.graphSource` before falling back to `data/graph.json`.
- [ ] T002 Update `validate-action/action.yml` to validate ordered `graphSources` and stop requiring `graph.json` when RDF sources are configured.

## Phase 2: Self-repo migration

- [ ] T003 Delete [`data/graph.json`](/code/graph-browser-issue-56/data/graph.json) from the repo.
- [ ] T004 Update self-repo docs and prompts in [`README.md`](/code/graph-browser-issue-56/README.md), [`src/PromptBuilder.purs`](/code/graph-browser-issue-56/src/PromptBuilder.purs), and any obviously stale tutorial text to stop describing `graph.json` as canonical.

## Phase 3: Verification

- [ ] T005 Run `nix develop -c just test`
- [ ] T006 Run `nix build .#app`
- [ ] T007 Verify the repo still loads its self-graph via RDF only
