import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import * as oxigraph from "oxigraph/web.js";
import wasmBytes from "oxigraph/web_bg.wasm";

cytoscape.use(fcose);
window.cytoscape = cytoscape;

// Initialize Oxigraph WASM synchronously from the inlined binary,
// then expose the initialized module on window for the PureScript FFI.
oxigraph.initSync({ module: new WebAssembly.Module(wasmBytes) });
window.oxigraph = oxigraph;
