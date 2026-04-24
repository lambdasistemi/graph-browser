-- | Thin FFI to Cytoscape.js. All graph logic lives
-- | in PureScript; this module only handles rendering.
module FFI.Cytoscape
  ( initCytoscape
  , setElements
  , setFocusElements
  , onNodeTap
  , onNodeHover
  , onEdgeHover
  , onEdgeTap
  , onNodeHoverOut
  , onEdgeHoverOut
  , markEdge
  , clearEdge
  , markRoot
  , clearRoot
  , fitAll
  , resize
  , addElementsAt
  , removeElementsById
  , readPositions
  , readPosition
  , setHasHidden
  , onNodeContextMenu
  , relayoutAround
  ) where

import Prelude

import Effect (Effect)
import Foreign (Foreign)

-- | Create a Cytoscape.js instance with kind styles.
-- | First arg: container element ID.
-- | Second arg: kind definitions as Foreign
-- |   (object of { color, shape } keyed by kind ID).
foreign import initCytoscape
  :: String -> Foreign -> Effect Unit

-- | Replace all elements and re-run layout.
foreign import setElements
  :: Foreign -> Effect Unit

-- | Replace elements for focus mode.
-- | All edge labels visible.
foreign import setFocusElements
  :: Foreign -> Effect Unit

-- | Register a tap callback on nodes.
foreign import onNodeTap
  :: (String -> Effect Unit) -> Effect Unit

-- | Register a hover (mouseover) callback on nodes.
-- | Passes: nodeId, renderX, renderY
foreign import onNodeHover
  :: (String -> Number -> Number -> Effect Unit) -> Effect Unit

-- | Register a hover callback on edges.
-- | Passes: source, target, label, description, predicateIri, renderX, renderY
foreign import onEdgeHover
  :: (String -> String -> String -> String -> String -> Number -> Number -> Effect Unit)
  -> Effect Unit

-- | Register a tap (click) callback on edges.
foreign import onEdgeTap
  :: (String -> String -> String -> String -> String -> Effect Unit)
  -> Effect Unit

-- | Register a mouseout callback on nodes.
foreign import onNodeHoverOut
  :: Effect Unit -> Effect Unit

-- | Register a mouseout callback on edges.
foreign import onEdgeHoverOut
  :: Effect Unit -> Effect Unit

-- | Highlight a selected edge.
foreign import markEdge :: String -> String -> Effect Unit

-- | Clear edge highlight.
foreign import clearEdge :: Effect Unit

-- | Mark a node as the focus root (white border).
foreign import markRoot :: String -> Effect Unit

-- | Clear root marking from all nodes.
foreign import clearRoot :: Effect Unit

-- | Fit the viewport to all elements.
foreign import fitAll :: Effect Unit

-- | Recalculate dimensions after layout changes.
foreign import resize :: Effect Unit

-- | Add elements at caller-supplied positions. MUST NOT trigger layout or fit.
-- | Nodes must include { group: "nodes", data: { id, label, kind, ... }, position: { x, y } }.
foreign import addElementsAt
  :: Foreign -> Effect Unit

-- | Remove nodes and all their incident edges by id. No layout, no fit.
foreign import removeElementsById
  :: Array String -> Effect Unit

-- | Read current positions of every visible node back from Cytoscape.
foreign import readPositions
  :: Effect (Array { id :: String, x :: Number, y :: Number })

-- | Read the current rendered position of a single node. Returns
-- | { x: 0, y: 0 } if the node is absent.
foreign import readPosition
  :: String -> Effect { x :: Number, y :: Number }

-- | Toggle the "has-hidden" marker class on a node.
foreign import setHasHidden
  :: String -> Boolean -> Effect Unit

-- | Register a context-menu (right-click, long-press) callback on nodes.
-- | Passes: nodeId, renderX, renderY
foreign import onNodeContextMenu
  :: (String -> Number -> Number -> Effect Unit) -> Effect Unit

-- | Run fCoSE on all currently visible elements, pinning the given node
-- | at its current position so existing layout does not drift and the new
-- | neighbors arrange themselves around it. Then pan the viewport to
-- | centre the anchor on screen.
foreign import relayoutAround
  :: String -> Effect Unit
