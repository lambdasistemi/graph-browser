# Tasks: RDF Input Support For Downstream Graph Providers

**Branch**: `006-rdf-input-support` | **Plan**: [plan.md](plan.md) | **Spec**: [spec.md](spec.md)

## Phase 1: Config And Runtime Source Selection

- [ ] **T1.1**: Extend `schema/config.schema.json` with optional `graphSource`
- [ ] **T1.2**: Add graph source types to `src/Graph/Types.purs`
- [ ] **T1.3**: Decode `graphSource` in `src/Graph/Decode.purs`
- [ ] **T1.4**: Update `src/Viewer.purs` to load JSON by default and RDF when configured

## Phase 2: PureScript RDF Import

- [ ] **T2.1**: Add thin Oxigraph parse FFI in `src/FFI/Oxigraph.*`
- [ ] **T2.2**: Add `src/Rdf/Import.purs` to reconstruct graph-browser nodes and edges from RDF quads
- [ ] **T2.3**: Keep JavaScript limited to parsing and plain data conversion

## Phase 3: Validation And Docs

- [ ] **T3.1**: Update `validate-action/action.yml` to accept RDF-backed repos without `graph.json`
- [ ] **T3.2**: Update `README.md` with the config-driven RDF graph source example
- [ ] **T3.3**: Verify JSON-backed and RDF-backed paths still work
