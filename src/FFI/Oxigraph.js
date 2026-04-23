const oxigraph = globalThis.oxigraph;

const namedNode = (value) => oxigraph.namedNode(value);

const literal = (object) =>
  object.datatype === ""
    ? oxigraph.literal(object.value)
    : oxigraph.literal(object.value, oxigraph.namedNode(object.datatype));

const toObject = (object) =>
  object.termType === "NamedNode" ? namedNode(object.value) : literal(object);

export const serializeQuads = (quads) => () => {
  const store = new oxigraph.Store();

  for (const quad of quads) {
    store.add(
      oxigraph.quad(
        namedNode(quad.subject),
        namedNode(quad.predicate),
        toObject(quad.object),
        oxigraph.defaultGraph(),
      ),
    );
  }

  return {
    turtle: store.dump({
      format: "text/turtle",
      from_graph_name: oxigraph.defaultGraph(),
    }),
    nquads: store.dump({ format: "application/n-quads" }),
  };
};

export const parseQuads = (format) => (baseIri) => (input) => () =>
  oxigraph.parse(input, { format, base_iri: baseIri }).map((quad) => ({
    subject: quad.subject.value,
    predicate: quad.predicate.value,
    object: {
      termType: quad.object.termType,
      value: quad.object.value,
      datatype:
        quad.object.termType === "Literal" && quad.object.datatype
          ? quad.object.datatype.value
          : "",
      language:
        quad.object.termType === "Literal" && quad.object.language
          ? quad.object.language
          : "",
    },
    graph: quad.graph && quad.graph.termType === "NamedNode" ? quad.graph.value : "",
  }));

// --- SPARQL Store API ---

export const createStore = () => new oxigraph.Store();

export const loadRdf = (store) => (format) => (baseIri) => (toGraphName) => (content) => () => {
  const options = {
    format,
    base_iri: baseIri,
  };
  if (toGraphName) {
    options.to_graph_name = namedNode(toGraphName);
  }
  store.load(content, options);
};

const bindingToRecord = (bindings) => {
  const result = {};
  for (const [key, term] of bindings) {
    result[key.value] = term.value;
  }
  return result;
};

export const querySparql = (store) => (sparql) => () => {
  const results = store.query(sparql);
  if (typeof results === "boolean") {
    return [];
  }
  const rows = [];
  for (const binding of results) {
    rows.push(bindingToRecord(binding));
  }
  return rows;
};

export const querySparqlStrings = (store) => (sparql) => () => {
  const results = store.query(sparql);
  if (typeof results === "boolean") {
    return [];
  }
  const values = [];
  for (const binding of results) {
    for (const [, term] of binding) {
      values.push(term.value);
      break;
    }
  }
  return values;
};

export const querySparqlNodeIds = (store) => (sparql) => () => {
  const results = store.query(sparql);
  if (typeof results === "boolean") {
    return [];
  }
  const ids = [];
  for (const binding of results) {
    for (const [, term] of binding) {
      const v = term.value;
      const hash = v.lastIndexOf("#");
      const slash = v.lastIndexOf("/");
      const sep = Math.max(hash, slash);
      ids.push(sep >= 0 ? v.substring(sep + 1) : v);
      break; // take first variable only
    }
  }
  return ids;
};
