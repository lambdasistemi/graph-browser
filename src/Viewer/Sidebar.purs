module Viewer.Sidebar where

import Prelude

import Data.Maybe (Maybe(..))
import Halogen as H
import Halogen.HTML as HH
import Viewer.Detail (renderEdgeDetail, renderNodeDetail)
import Viewer.Helpers (cls)
import Viewer.Tutorial (currentStop, renderEmptyState, renderTutorialContent)
import Viewer.Types (Action, State)

renderSidebar
  :: forall m. State -> H.ComponentHTML Action () m
renderSidebar state =
  HH.div [ cls "sidebar" ]
    [ HH.div [ cls "sidebar-header" ]
        [ HH.h2_ [ HH.text sidebarTitle ]
        ]
    , HH.div [ cls "sidebar-content" ]
        ( if state.tutorialActive then
            [ renderTutorialContent state ]
              <> pinnedContent
          else
            pinnedContent
        )
    ]
  where
  sidebarTitle =
    if state.tutorialActive then
      case currentStop state of
        Just stop -> stop.title
        Nothing -> "Tutorial"
    else case state.selected of
      Just n -> n.label
      Nothing -> case state.selectedEdge of
        Just edge -> edge.label
        Nothing -> state.config.title

  -- Pinned content: the clicked/selected item
  pinnedContent :: Array (H.ComponentHTML Action () m)
  pinnedContent =
    case state.selectedEdge of
      Just edge -> [ renderEdgeDetail state edge ]
      Nothing -> case state.selected of
        Just node -> [ renderNodeDetail state node ]
        Nothing -> [ renderEmptyState state.config ]
