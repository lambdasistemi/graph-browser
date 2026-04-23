import cytoscape from "cytoscape";
import cola from "cytoscape-cola";
import dagre from "cytoscape-dagre";
import elk from "cytoscape-elk";
import fcose from "cytoscape-fcose";
import * as oxigraph from "oxigraph/web.js";
import wasmBytes from "oxigraph/web_bg.wasm";

cytoscape.use(cola);
cytoscape.use(dagre);
cytoscape.use(elk);
cytoscape.use(fcose);
window.cytoscape = cytoscape;

// Initialize Oxigraph WASM synchronously from the inlined binary,
// then expose the initialized module on globalThis for the PureScript FFI.
oxigraph.initSync({ module: new WebAssembly.Module(wasmBytes) });
globalThis.oxigraph = oxigraph;
