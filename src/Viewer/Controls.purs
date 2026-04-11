module Viewer.Controls where

import Prelude

import Data.Array as Array
import Data.Maybe (Maybe(..))
import Graph.Types (Config)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Viewer.Helpers (cls, depthBtn)
import Viewer.Types (Action(..), State)

renderGraphContext
  :: forall m. State -> H.ComponentHTML Action () m
renderGraphContext state = case graphContext state of
  Nothing -> HH.text ""
  Just context ->
    HH.div [ cls "graph-context-card" ]
      [ HH.h1 [ cls "graph-context-title" ]
          [ HH.text context.title ]
      , if context.description == "" then
          HH.text ""
        else
          HH.p [ cls "graph-context-description" ]
            [ HH.text context.description ]
      ]

graphContext :: State -> Maybe { title :: String, description :: String }
graphContext st = case st.activeQuery of
  Just q ->
    Just
      { title: q.name
      , description: q.description
      }
  Nothing | Array.null st.queryCatalog ->
    Nothing
  Nothing ->
    Just
      { title: "All"
      , description: "Entire graph without query filtering."
      }

renderControls
  :: forall m. State -> H.ComponentHTML Action () m
renderControls state =
  HH.div [ cls "controls" ]
    [ if not (Array.null state.viewIndex) then
        HH.div [ cls "tour-menu-wrapper" ]
          [ HH.button
              [ cls "control-btn"
              , HE.onClick \_ -> ToggleViewPicker
              ]
              [ HH.text
                  ( case state.activeView of
                      Just v -> v.name
                      Nothing -> "Views"
                  )
              ]
          , if state.showViewPicker then
              renderLegacyViewPicker state
            else HH.text ""
          ]
      else HH.text ""
    , HH.button
        [ cls "control-btn"
        , HE.onClick \_ -> FitAll
        ]
        [ HH.text "Fit View" ]
    , HH.div [ cls "depth-control" ]
        [ HH.span [ cls "depth-label" ]
            [ HH.text "Depth:" ]
        , depthBtn 1 state.depth
        , depthBtn 2 state.depth
        , depthBtn 3 state.depth
        , HH.button
            [ cls
                ( "depth-btn"
                    <>
                      if state.depth >= 99 then " active"
                      else ""
                )
            , HE.onClick \_ -> SetDepth 99
            ]
            [ HH.text "All" ]
        ]
    ]

renderLegend
  :: forall m. Config -> H.ComponentHTML Action () m
renderLegend cfg =
  HH.div [ cls "legend" ]
    [ HH.text
        "Hover to inspect. Click to \
        \re-center. "
    , if cfg.sourceUrl == "" then HH.text ""
      else
        HH.a
          [ HP.href cfg.sourceUrl
          , HP.target "_blank"
          , HP.rel "noopener"
          , cls "legend-link"
          ]
          [ HH.text "Source" ]
    ]

renderLegacyViewPicker
  :: forall m. State -> H.ComponentHTML Action () m
renderLegacyViewPicker state =
  HH.div [ cls "tour-menu" ]
    ( [ HH.div
          [ cls "tour-menu-item"
          , HE.onClick \_ -> SelectAllView
          ]
          [ HH.div [ cls "tour-menu-title" ]
              [ HH.text "All" ]
          , HH.div [ cls "tour-menu-desc" ]
              [ HH.text "Full graph" ]
          ]
      ]
        <> map mkEntry state.viewIndex
    )
  where
  mkEntry entry =
    HH.div
      [ cls "tour-menu-item"
      , HE.onClick \_ -> SelectView entry.file
      ]
      [ HH.div [ cls "tour-menu-title" ]
          [ HH.text entry.name ]
      , HH.div [ cls "tour-menu-desc" ]
          [ HH.text entry.description ]
      ]
