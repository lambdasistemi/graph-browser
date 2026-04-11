module Viewer.Tooltip where

import Prelude

import Data.Maybe (Maybe(..))
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Properties as HP
import Viewer.Helpers (cls, kindLabel)
import Viewer.Types (Action, State)

renderHoverTooltip
  :: forall m. State -> H.ComponentHTML Action () m
renderHoverTooltip state =
  let
    content = case state.hoveredEdge of
      Just edge
        | not (isSameEdge state.selectedEdge edge) ->
            Just
              { title: edge.label
              , badge: "relationship"
              , badgeCls: "badge badge-mechanism"
              , desc: edge.description
              }
      _ -> case state.hoveredNode of
        Just node
          | state.selected /= Just node ->
              Just
                { title: node.label
                , badge: kindLabel state.config node.kind
                , badgeCls: "badge badge-" <> node.kind
                , desc: node.description
                }
        _ -> Nothing
    isSameEdge Nothing _ = false
    isSameEdge (Just a) b =
      a.sourceId == b.sourceId
        && a.targetId == b.targetId
        && a.label == b.label
  in
    case content of
      Nothing -> HH.text ""
      Just c ->
        HH.div
          [ cls "hover-tooltip"
          , HP.style
              ( "left:" <> show state.hoverPos.x <> "px;"
                  <> "top:"
                  <> show state.hoverPos.y
                  <> "px;"
              )
          ]
          [ HH.span [ cls c.badgeCls ] [ HH.text c.badge ]
          , HH.strong_ [ HH.text (" " <> c.title) ]
          , if c.desc == "" then HH.text ""
            else HH.p [ cls "tooltip-desc" ] [ HH.text c.desc ]
          ]
