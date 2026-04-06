import * as oxigraph from "oxigraph";

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
