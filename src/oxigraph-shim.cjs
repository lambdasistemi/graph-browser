// Node.js shim: set globalThis.oxigraph before PureScript FFI loads.
// Used via NODE_OPTIONS="--require ./src/oxigraph-shim.cjs" for spago run.
globalThis.oxigraph = require("oxigraph");
