# Contract — `FFI.Cytoscape` additions

Three new FFI primitives. They MUST NOT trigger `cy.layout()` or `cy.fit()`. Business logic stays in PureScript; JS here is a thin wrapper over Cytoscape calls.

```purescript
-- Add elements at caller-supplied positions. Nodes MUST include { id, x, y, label, kind, ... }.
-- Edges whose endpoints are not already present are silently skipped (caller's problem).
foreign import addElementsAt
  :: Array Foreign -> Effect Unit

-- Remove nodes and all their incident edges by id. Silent if the id is absent.
foreign import removeElementsById
  :: Array NodeId -> Effect Unit

-- Read current positions of visible nodes back from Cytoscape into PureScript
-- (used on persist and on scope change).
foreign import readPositions
  :: Effect (Array { id :: NodeId, x :: Number, y :: Number })

-- Apply or clear the "has hidden neighbors" marker class on a node.
foreign import setHasHidden
  :: NodeId -> Boolean -> Effect Unit
```

### JS implementation (sketch)

```js
export const addElementsAt = (elements) => () => {
  if (!_cy) return;
  _cy.add(elements);   // no layout call — positions are honored from the payload
};

export const removeElementsById = (ids) => () => {
  if (!_cy) return;
  ids.forEach((id) => _cy.getElementById(id).remove());
};

export const readPositions = () => {
  if (!_cy) return [];
  return _cy.nodes().map((n) => ({ id: n.id(), x: n.position("x"), y: n.position("y") }));
};

export const setHasHidden = (id) => (flag) => () => {
  if (!_cy) return;
  const n = _cy.getElementById(id);
  if (!n.nonempty()) return;
  if (flag) n.addClass("has-hidden");
  else n.removeClass("has-hidden");
};
```

### Styling

Add a style rule in `baseStyle` for `.has-hidden` that renders a small `+` decoration at the node boundary (e.g. `background-image` + positioning). Visually distinct from the `.root` class.

### Non-goals

- No new FFI for layout, animation, or fitting — use the existing `fitAll`/`setFocusElements` as-is for non-shaping flows.
- No FFI for the confirmation dialog — use Halogen `HH.div` with a modal overlay, same pattern as existing menus.
