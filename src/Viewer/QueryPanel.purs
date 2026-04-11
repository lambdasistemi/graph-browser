module Viewer.QueryPanel where

import Prelude

import Data.Array as Array
import Data.Map as Map
import Data.Maybe (Maybe(..), isNothing)
import Data.String as String
import Graph.Query as Query
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Viewer.Helpers (cls, renderPromptBuilder)
import Viewer.Tutorial (displayTourTitle)
import Viewer.Types (Action(..), PanelTab(..), PromptMode(..), State, TutorialEntry)

isQueriesTab :: PanelTab -> Boolean
isQueriesTab QueriesTab = true
isQueriesTab _ = false

isToursTab :: PanelTab -> Boolean
isToursTab ToursTab = true
isToursTab _ = false

filterByText
  :: String -> Array Query.NamedQuery -> Array Query.NamedQuery
filterByText "" qs = qs
filterByText filter qs =
  let
    f = String.toLower filter
  in
    Array.filter
      ( \q -> String.contains (String.Pattern f) (String.toLower q.name)
          || String.contains (String.Pattern f) (String.toLower q.description)
      )
      qs

filterToursByText
  :: String -> Array TutorialEntry -> Array TutorialEntry
filterToursByText "" ts = ts
filterToursByText filter ts =
  let
    f = String.toLower filter
  in
    Array.filter
      ( \t -> String.contains (String.Pattern f) (String.toLower t.title)
          || String.contains (String.Pattern f) (String.toLower t.description)
      )
      ts

renderQueryPanel
  :: forall m. State -> H.ComponentHTML Action () m
renderQueryPanel state =
  HH.div [ cls "query-panel" ]
    [ HH.div [ cls "panel-tabs" ]
        [ HH.button
            [ cls
                ( "panel-tab"
                    <>
                      if isQueriesTab state.panelTab then " active"
                      else ""
                )
            , HE.onClick \_ -> SetPanelTab QueriesTab
            ]
            [ HH.text "Queries" ]
        , HH.button
            [ cls
                ( "panel-tab"
                    <>
                      if isToursTab state.panelTab then " active"
                      else ""
                )
            , HE.onClick \_ -> SetPanelTab ToursTab
            ]
            [ HH.text "Tours" ]
        ]
    , HH.div [ cls "panel-search" ]
        [ HH.input
            [ cls "panel-search-input"
            , HP.type_ HP.InputText
            , HP.placeholder "Filter..."
            , HP.value state.catalogFilter
            , HE.onValueInput SetCatalogFilter
            ]
        ]
    , case state.panelTab of
        QueriesTab -> renderQueriesList state
        ToursTab -> renderToursList state
    ]

renderQueriesList
  :: forall m. State -> H.ComponentHTML Action () m
renderQueriesList state =
  HH.div_
    [ HH.div [ cls "query-panel-list" ]
        ( [ HH.div
              [ cls
                  ( "query-item"
                      <>
                        if isNothing state.activeQuery then " active"
                        else ""
                  )
              , HE.onClick \_ -> ClearQuery
              ]
              [ HH.div [ cls "query-item-name" ]
                  [ HH.text "All" ]
              ]
          ]
            <> Array.concatMap mkQueryEntry
              (filterByText state.catalogFilter state.queryCatalog)
        )
    , renderPromptBuilder state PromptQuery "New query"
    ]
  where
  isActive q = case state.activeQuery of
    Just aq -> aq.id == q.id
    Nothing -> false

  mkQueryEntry q =
    [ HH.div
        [ cls
            ( "query-item"
                <> if isActive q then " active" else ""
            )
        , HE.onClick \_ -> SelectQuery q
        ]
        [ HH.div [ cls "query-item-name" ]
            [ HH.text q.name ]
        , HH.div [ cls "query-item-desc" ]
            [ HH.text q.description ]
        ]
    ] <>
      if isActive q then renderParamForm state
      else []

renderToursList
  :: forall m. State -> H.ComponentHTML Action () m
renderToursList state =
  HH.div_
    [ HH.div [ cls "query-panel-list" ]
        ( map mkTourEntry
            ( filterToursByText state.catalogFilter
                state.tutorialIndex
            )
        )
    , renderPromptBuilder state PromptTour "New tour"
    ]
  where
  mkTourEntry entry =
    HH.div
      [ cls "query-item"
      , HE.onClick \_ -> StartTutorial entry.file
      ]
      [ HH.div [ cls "query-item-name" ]
          [ HH.text (displayTourTitle entry.title) ]
      , HH.div [ cls "query-item-desc" ]
          [ HH.text entry.description ]
      ]

renderParamForm
  :: forall m. State -> Array (H.ComponentHTML Action () m)
renderParamForm state = case state.activeQuery of
  Nothing -> []
  Just q ->
    if Array.null q.parameters then []
    else map (renderParam state) q.parameters

renderParam
  :: forall m
   . State
  -> Query.Parameter
  -> H.ComponentHTML Action () m
renderParam state param =
  HH.div [ cls "param-field" ]
    [ HH.label [ cls "param-label" ]
        [ HH.text param.label ]
    , HH.select
        [ cls "param-select"
        , HE.onValueChange (SetParamValue param.name)
        ]
        ( [ HH.option
              [ HP.value ""
              , HP.selected (not hasValue)
              , HP.disabled true
              ]
              [ HH.text ("Select " <> param.label <> "...") ]
          ]
            <> map mkOption options
        )
    ]
  where
  hasValue = Map.member param.name state.paramValues
  options = case Map.lookup param.name state.paramOptions of
    Just opts -> opts
    Nothing -> []
  mkOption v =
    HH.option
      [ HP.value v
      , HP.selected
          (Map.lookup param.name state.paramValues == Just v)
      ]
      [ HH.text v ]
