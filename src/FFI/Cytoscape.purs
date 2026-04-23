-- | Thin FFI to Cytoscape.js. All graph logic lives
-- | in PureScript; this module only handles rendering.
module FFI.Cytoscape
  ( initCytoscape
  , setElements
  , setFocusElements
  , setLayout
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
  :: String -> Foreign -> Effect Unit

-- | Replace elements for focus mode.
-- | All edge labels visible.
foreign import setFocusElements
  :: String -> Foreign -> Effect Unit

-- | Re-run layout on the existing elements.
foreign import setLayout
  :: String -> Effect Unit

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
