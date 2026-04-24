// cytoscape and fcose are loaded via the bootstrap
// script (dist/bootstrap.js) before this module runs.
// They register themselves as globals.
var _cy = null;

function hexToRgba(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
}

function colorToRgba(color, alpha) {
  if (typeof color !== "string") return color;
  if (color[0] === "#" && color.length >= 7) {
    return hexToRgba(color, alpha);
  }
  var rgb = color.match(
    /^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i,
  );
  if (rgb) {
    return (
      "rgba(" + rgb[1] + "," + rgb[2] + "," + rgb[3] + "," + alpha + ")"
    );
  }
  return color;
}

function cssVar(name, fallback) {
  try {
    var v = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    return v || fallback;
  } catch (e) {
    return fallback;
  }
}

function kindStyles(kinds) {
  var styles = [];
  for (var kind in kinds) {
    var def = kinds[kind];
    styles.push({
      selector: "node." + kind,
      style: {
        "background-color": colorToRgba(def.color, 0.13),
        "border-color": def.color,
        shape: def.shape || "ellipse",
      },
    });
  }
  return styles;
}

function baseStyle(kinds) {
  var textPrimary = cssVar("--text-primary", "#f0f6fc");
  var textSecondary = cssVar("--text-secondary", "#c9d1d9");
  var textMuted = cssVar("--text-muted", "#8b949e");
  var border = cssVar("--border", "#30363d");
  var bgBase = cssVar("--bg-base", "#0d1117");
  return [
    {
      selector: "node",
      style: {
        label: "data(label)",
        "text-wrap": "wrap",
        "text-max-width": "160px",
        "font-size": "11px",
        "font-family":
          "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
        color: textPrimary,
        "text-valign": "center",
        "text-halign": "center",
        width: "label",
        height: "label",
        "padding": "12px",
        "border-width": 2,
        "text-outline-color": bgBase,
        "text-outline-width": 2,
      },
    },
    ...kindStyles(kinds),
    {
      selector: "edge",
      style: {
        width: 1.5,
        "line-color": border,
        "target-arrow-color": border,
        "target-arrow-shape": "triangle",
        "arrow-scale": 0.8,
        "curve-style": "bezier",
        label: "data(label)",
        "font-size": "11px",
        "font-family":
          "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
        color: textSecondary,
        "text-rotation": "autorotate",
        "text-outline-color": bgBase,
        "text-outline-width": 2,
        "text-opacity": 0,
        opacity: 0.6,
      },
    },
    {
      selector: "node.root",
      style: {
        "border-width": 4,
        "border-color": textPrimary,
        "z-index": 10,
      },
    },
    {
      selector: "edge.selected-edge",
      style: {
        "text-opacity": 1,
        "line-color": textPrimary,
        "target-arrow-color": textPrimary,
        width: 3,
        opacity: 1,
        "z-index": 10,
      },
    },
    {
      selector: "edge.neighbor",
      style: {
        "text-opacity": 1,
        "line-color": textMuted,
        "target-arrow-color": textMuted,
        width: 2,
        opacity: 1,
      },
    },
    {
      // Marker for "this visible node still has hidden direct neighbors"
      selector: "node.has-hidden",
      style: {
        "border-style": "dashed",
        "border-width": 3,
      },
    },
  ];
}

function runLayout(callback) {
  if (!_cy) return;
  // Suppress edge warnings during layout by temporarily muting console.warn
  var origWarn = console.warn;
  console.warn = function (msg) {
    if (typeof msg === "string" && msg.indexOf("invalid endpoints") !== -1)
      return;
    if (
      typeof msg === "string" &&
      msg.indexOf("custom wheel sensitivity") !== -1
    )
      return;
    origWarn.apply(console, arguments);
  };
  var n = _cy.nodes().length;
  var edgeLen = n <= 8 ? 400 : n <= 20 ? 300 : n <= 40 ? 220 : 160;
  var repulsion = n <= 8 ? 80000 : n <= 20 ? 40000 : n <= 40 ? 15000 : 8000;
  var sep = n <= 8 ? 300 : n <= 20 ? 220 : n <= 40 ? 150 : 100;
  var grav = n <= 20 ? 0.04 : n <= 40 ? 0.06 : 0.1;
  _cy
    .layout({
      name: "fcose",
      quality: "proof",
      randomize: true,
      animate: true,
      animationDuration: 500,
      fit: true,
      padding: 60,
      nodeSeparation: sep,
      idealEdgeLength: edgeLen,
      edgeElasticity: 0.02,
      nodeRepulsion: repulsion,
      gravity: grav,
      gravityRange: 1.5,
      numIter: 20000,
      nodeDimensionsIncludeLabels: true,
      stop: function () {
        // Restore console.warn
        console.warn = origWarn;
        if (callback) callback();
      },
    })
    .run();
}

var _kinds = {};

function applyTheme() {
  if (!_cy) return;
  _cy.style().fromJson(baseStyle(_kinds)).update();
}

// kinds is a plain JS object: { "actor": { color, shape }, ... }
export const initCytoscape = (containerId) => (kinds) => () => {
  var container = document.getElementById(containerId);
  if (!container) return;
  if (_cy) {
    _cy.destroy();
    _cy = null;
  }
  _kinds = kinds;
  _cy = cytoscape({
    container: container,
    elements: [],
    style: baseStyle(kinds),
    layout: { name: "preset" },
    minZoom: 0.15,
    maxZoom: 3,
  });
  if (!initCytoscape._themeBound) {
    initCytoscape._themeBound = true;
    var media = window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: light)")
      : null;
    var observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    if (media) {
      var listener = function () { applyTheme(); };
      if (media.addEventListener) media.addEventListener("change", listener);
      else if (media.addListener) media.addListener(listener);
    }
  }
};

export const setElements = (elements) => () => {
  if (!_cy) return;
  _cy.elements().remove();
  _cy.add(elements);
  runLayout();
};

export const setFocusElements = (elements) => () => {
  if (!_cy) return;
  _cy.elements().remove();
  _cy.add(elements);
  runLayout();
  _cy.edges().style("text-opacity", 1);
  _cy.edges().style("opacity", 1);
};

export const onNodeTap = (callback) => () => {
  if (!_cy) return;
  _cy.on("tap", "node", function (evt) {
    callback(evt.target.id())();
  });
};

export const onNodeHover = (callback) => () => {
  if (!_cy) return;
  _cy.on("mouseover", "node", function (evt) {
    var pos = evt.renderedPosition || evt.position;
    callback(evt.target.id())(pos.x)(pos.y)();
  });
};

export const onEdgeHover = (callback) => () => {
  if (!_cy) return;
  _cy.on("mouseover", "edge", function (evt) {
    var d = evt.target.data();
    var pos = evt.renderedPosition || evt.position;
    callback(d.source)(d.target)(d.label || "")(d.description || "")(
      d.predicateIri || "",
    )(pos.x)(pos.y)();
  });
};

export const onNodeHoverOut = (callback) => () => {
  if (!_cy) return;
  _cy.on("mouseout", "node", function () {
    callback();
  });
};

export const onEdgeHoverOut = (callback) => () => {
  if (!_cy) return;
  _cy.on("mouseout", "edge", function () {
    callback();
  });
};

export const onEdgeTap = (callback) => () => {
  if (!_cy) return;
  _cy.on("tap", "edge", function (evt) {
    var d = evt.target.data();
    callback(d.source)(d.target)(d.label || "")(d.description || "")(
      d.predicateIri || "",
    )();
  });
};

export const markEdge = (sourceId) => (targetId) => () => {
  if (!_cy) return;
  _cy.edges().removeClass("selected-edge");
  _cy.edges().forEach(function (edge) {
    var d = edge.data();
    if (d.source === sourceId && d.target === targetId) {
      edge.addClass("selected-edge");
    }
  });
};

export const clearEdge = () => {
  if (!_cy) return;
  _cy.edges().removeClass("selected-edge");
};

export const markRoot = (nodeId) => () => {
  if (!_cy) return;
  _cy.nodes().removeClass("root");
  _cy.edges().removeClass("neighbor");
  var node = _cy.getElementById(nodeId);
  if (node.nonempty()) {
    node.addClass("root");
    node.connectedEdges().addClass("neighbor");
  }
};

export const clearRoot = () => {
  if (!_cy) return;
  _cy.nodes().removeClass("root");
  _cy.edges().removeClass("neighbor");
};

export const fitAll = () => {
  if (!_cy) return;
  _cy.animate({ fit: { padding: 60 }, duration: 300 });
};

export const resize = () => {
  if (!_cy) return;
  _cy.resize();
  _cy.fit(undefined, 60);
};

// Incremental add: positions are honored from the payload. No layout, no fit.
export const addElementsAt = (elements) => () => {
  if (!_cy) return;
  _cy.add(elements);
};

export const removeElementsById = (ids) => () => {
  if (!_cy) return;
  ids.forEach(function (id) {
    var el = _cy.getElementById(id);
    if (el.nonempty()) el.remove();
  });
};

export const readPositions = () => {
  if (!_cy) return [];
  var out = [];
  _cy.nodes().forEach(function (n) {
    var p = n.position();
    out.push({ id: n.id(), x: p.x, y: p.y });
  });
  return out;
};

export const readPosition = (id) => () => {
  if (!_cy) return { x: 0, y: 0 };
  var el = _cy.getElementById(id);
  if (!el.nonempty()) return { x: 0, y: 0 };
  var p = el.position();
  return { x: p.x, y: p.y };
};

export const setHasHidden = (id) => (flag) => () => {
  if (!_cy) return;
  var el = _cy.getElementById(id);
  if (!el.nonempty()) return;
  if (flag) el.addClass("has-hidden");
  else el.removeClass("has-hidden");
};

export const onNodeContextMenu = (callback) => () => {
  if (!_cy) return;
  _cy.on("cxttap", "node", function (evt) {
    var pos = evt.renderedPosition || evt.position;
    callback(evt.target.id())(pos.x)(pos.y)();
  });
};
