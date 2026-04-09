# Tasks: Standard RDF Predicates As Primary Data Source

**Input**: Design documents from `/specs/008-standard-rdf-predicates/`
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/rdf-import-surface.md](./contracts/rdf-import-surface.md)

**Tests**: Validation tasks are included because the plan explicitly requires RDF import fixture checks and `just ci` coverage.

**Organization**: Tasks are grouped by user story so each story can be implemented and verified independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (`[US1]`, `[US2]`, `[US3]`)
- Every task includes the exact file path to change

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the fixture and documentation scaffolding used by all stories.

- [ ] T001 Create RDF import fixture coverage entry points in `test/Test/Main.purs`
- [ ] T002 [P] Add standard-predicate and reification fixture data under `test/Test/Fixtures/` and/or `data/` as needed for RDF import tests
- [ ] T003 [P] Add task references and implementation notes to `specs/008-standard-rdf-predicates/quickstart.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Add shared importer helpers and precedence utilities required by every user story.

**⚠️ CRITICAL**: No user story work should start until this phase is complete.

- [ ] T004 Refactor shared predicate lookup helpers in `src/Rdf/Import.purs` for ordered literal and named-node fallback resolution
- [ ] T005 [P] Introduce deterministic precedence helpers for node metadata and edge metadata in `src/Rdf/Import.purs`
- [ ] T006 [P] Add focused importer test harness coverage in `test/Test/Main.purs` and a new RDF import test module under `test/Test/`

**Checkpoint**: Importer foundation ready for story-specific mapping work.

---

## Phase 3: User Story 1 - Read standard node metadata directly from RDF (Priority: P1) 🎯 MVP

**Goal**: Let RDF-backed datasets use `dcterms:description`, `foaf:page`, and `rdfs:seeAlso` without duplicating those fields into `gb:` predicates.

**Independent Test**: Import RDF that omits `gb:description` and `gb:externalLink` but includes the supported standard predicates, then verify the resulting node descriptions and links match expectations.

- [ ] T007 [P] [US1] Add RDF import fixtures for `dcterms:description`, `foaf:page`, `rdfs:seeAlso`, and mixed-precedence cases under `test/Test/Fixtures/`
- [ ] T008 [US1] Add importer verification cases for standard node metadata in `test/Test/RdfImport.purs`
- [ ] T009 [US1] Extend node description fallback handling in `src/Rdf/Import.purs`
- [ ] T010 [US1] Extend external-link fallback handling and deterministic link synthesis in `src/Rdf/Import.purs`
- [ ] T011 [US1] Document supported node metadata precedence in `README.md`

**Checkpoint**: RDF datasets with standard node metadata import successfully without gb-specific duplication.

---

## Phase 4: User Story 2 - Attach edge hover text without gb:EdgeAssertion boilerplate (Priority: P1)

**Goal**: Accept a standard reified RDF statement as the source of edge hover text when no `gb:EdgeAssertion` description exists.

**Independent Test**: Import RDF containing edge descriptions via standard reification and verify the matching graph edge gets the expected hover text.

- [ ] T012 [P] [US2] Add reified-edge-description fixtures under `test/Test/Fixtures/`
- [ ] T013 [US2] Add edge-description fallback cases in `test/Test/RdfImport.purs`
- [ ] T014 [US2] Implement reified statement matching for edge descriptions in `src/Rdf/Import.purs`
- [ ] T015 [US2] Preserve `gb:EdgeAssertion` precedence over reified descriptions in `src/Rdf/Import.purs`
- [ ] T016 [US2] Document the supported reification pattern in `README.md` and `specs/008-standard-rdf-predicates/contracts/rdf-import-surface.md`

**Checkpoint**: Edge hover text works for both existing gb assertions and supported standard reification.

---

## Phase 5: User Story 3 - Keep gb: vocabulary focused on presentation hints (Priority: P2)

**Goal**: Make the RDF input contract explicit so downstream datasets can rely on standard vocabularies for semantics and `gb:` for rendering-specific metadata.

**Independent Test**: Use a mixed RDF fixture where semantics come from standard predicates and rendering hints come from `gb:` terms, then verify import succeeds with the documented precedence rules.

- [ ] T017 [P] [US3] Add mixed semantic-layer fixture coverage in `test/Test/Fixtures/`
- [ ] T018 [US3] Add regression cases for mixed gb and standard metadata in `test/Test/RdfImport.purs`
- [ ] T019 [US3] Tighten importer error messages for ambiguous or unusable fallback metadata in `src/Rdf/Import.purs`
- [ ] T020 [US3] Align the external contract wording in `README.md`, `specs/008-standard-rdf-predicates/contracts/rdf-import-surface.md`, and `specs/008-standard-rdf-predicates/quickstart.md`
- [ ] T021 [US3] Verify downstream validation expectations in `validate-action/action.yml`

**Checkpoint**: The supported standard-predicate contract is explicit, tested, and consistent across runtime and CI guidance.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and cleanup across all stories.

- [ ] T022 [P] Run the RDF import test suite via `test/Test/Main.purs` and related test modules
- [ ] T023 Run `just ci` from the repository root in `/code/graph-browser-spec-49`
- [ ] T024 [P] Review docs and examples in `README.md` and `specs/008-standard-rdf-predicates/quickstart.md` for consistency with the implemented precedence rules
- [ ] T025 Prepare PR summary and issue linkage for the implementation branch in `/code/graph-browser-issue-49`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1: Setup**: No dependencies
- **Phase 2: Foundational**: Depends on Phase 1 and blocks all story work
- **Phase 3: US1**: Depends on Phase 2
- **Phase 4: US2**: Depends on Phase 2 and can proceed independently of US1 once shared helpers exist
- **Phase 5: US3**: Depends on Phases 3 and 4 because it validates the combined contract
- **Phase 6: Polish**: Depends on all selected story phases

### User Story Dependencies

- **US1**: Independent MVP after foundational work
- **US2**: Independent once shared importer helpers exist
- **US3**: Depends on the completed fallback behavior from US1 and US2

### Parallel Opportunities

- T002 and T003 can run in parallel during setup
- T005 and T006 can run in parallel once T004 defines the shared importer shape
- T007 can run in parallel with T008 preparation work
- T012 can run in parallel with T013 preparation work
- T017 can run in parallel with T018 preparation work
- T022 and T024 can run in parallel during polish

## Implementation Strategy

### MVP First

1. Complete Setup and Foundational phases
2. Complete User Story 1
3. Validate RDF import fallback for node descriptions and links
4. Ship that as the first usable increment

### Incremental Delivery

1. Add standard node metadata fallback
2. Add standard edge-description fallback
3. Tighten the mixed gb/standard contract and CI/docs

### Parallel Team Strategy

1. One worker handles fixture/test authoring under `test/Test/`
2. One worker handles importer logic in `src/Rdf/Import.purs`
3. One worker handles docs/validation alignment in `README.md` and `validate-action/action.yml`
