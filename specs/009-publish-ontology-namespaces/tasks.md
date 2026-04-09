# Tasks: Publish Dereferenceable Ontology Namespaces

**Input**: Design documents from `/specs/009-publish-ontology-namespaces/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel
- **[Story]**: Which user story this task belongs to

---

## Phase 1: Foundational

- [ ] T001 Define the Turtle inputs and namespace mapping used to publish `/vocab/terms`, `/vocab/kinds`, `/vocab/groups`, and `/vocab/edges`.
- [ ] T002 Implement a namespace-page generation step that reads Turtle-derived triples and emits namespace pages into a target output directory.
- [ ] T003 Wire the namespace-page generation step into the build/deploy path so Pages artifacts contain `/vocab/...`.
- [ ] T004 Document the reuse boundary so downstream graph-browser repos can publish their own ontology namespace pages from Turtle.

## Phase 2: User Story 1 - Follow ontology terms from the viewer (P1)

- [ ] T005 [US1] Ensure the viewer shows compact prefixed names and term/namespace links for ontology-backed nodes.
- [ ] T006 [US1] Verify that nodes without ontology provenance do not show empty ontology identity UI.
- [ ] T007 [US1] Verify locally that clicking graph-browser ontology term links resolves to generated namespace pages rather than 404s.

## Phase 3: User Story 2 - Publish namespace pages automatically from Turtle (P1)

- [ ] T008 [US2] Extract ontology term entries from Turtle using standard RDF/OWL predicates such as `rdf:type`, `rdfs:label`, and `dcterms:description`.
- [ ] T009 [US2] Generate namespace pages for `terms`, `kinds`, `groups`, and `edges` with anchors matching the current ontology fragment identifiers.
- [ ] T010 [US2] Include links from each namespace page to the underlying ontology artifacts under `dist/rdf`.
- [ ] T011 [US2] Verify that the publication step does not require a hand-maintained per-project term inventory in source code.

## Phase 4: User Story 3 - Reuse the publication path in the build/deploy workflow (P2)

- [ ] T012 [US3] Update the Pages-style build flow to publish generated namespace pages automatically.
- [ ] T013 [US3] Confirm the same generation path can be invoked by downstream repos that provide ontology Turtle files.
- [ ] T014 [US3] Update [`README.md`](/code/graph-browser-issue-53/README.md) to document namespace publication policy, fragment behavior, and the Turtle-driven automation model.

## Phase 5: Validation

- [ ] T015 Run `nix develop -c just test`
- [ ] T016 Run `nix build .#app`
- [ ] T017 Run a local Pages-style build and verify `/vocab/terms`, `/vocab/kinds`, `/vocab/groups`, and `/vocab/edges` resolve correctly
- [ ] T018 Confirm generated namespace pages come from Turtle-derived data rather than a hardcoded term list
- [ ] T019 Update the PR description to explain the Turtle-driven namespace publication behavior once implementation is ready
