module Viewer.Tutorial where

import Prelude

import Data.Array as Array
import Data.Maybe (Maybe(..))
import Data.String as String
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Graph.Types (Config)
import Tutorial (TutorialStop)
import Viewer.Helpers (cls)
import Viewer.Types (Action(..), State, TutorialEntry)

renderEmptyState
  :: forall m. Config -> H.ComponentHTML Action () m
renderEmptyState cfg =
  HH.div [ cls "empty-state" ]
    [ HH.h2_
        [ HH.text cfg.title ]
    , HH.p_
        [ HH.text
            "Hover a node to see details. \
            \Click to re-center."
        ]
    , HH.button
        [ cls "tutorial-start-btn"
        , HE.onClick \_ -> ToggleTutorialMenu
        ]
        [ HH.text "Take a guided tour" ]
    ]

displayTourTitle :: String -> String
displayTourTitle title =
  if endsWith " tour" lowerTitle then
    title
  else
    title <> " tour"
  where
  lowerTitle = String.toLower title
  endsWith suffix str =
    let
      suffixLen = String.length suffix
      strLen = String.length str
    in
      strLen >= suffixLen
        && String.drop (strLen - suffixLen) str == suffix

renderTutorialMenu
  :: forall m
   . Array TutorialEntry
  -> H.ComponentHTML Action () m
renderTutorialMenu entries =
  HH.div [ cls "tour-menu" ]
    (map mkEntry entries)
  where
  mkEntry entry =
    HH.div
      [ cls "tour-menu-item"
      , HE.onClick \_ -> StartTutorial entry.file
      ]
      [ HH.div [ cls "tour-menu-title" ]
          [ HH.text (displayTourTitle entry.title) ]
      , HH.div [ cls "tour-menu-desc" ]
          [ HH.text entry.description ]
      ]

currentStop :: State -> Maybe TutorialStop
currentStop state = do
  t <- state.tutorial
  Array.index t.stops state.tutorialStep

renderTutorialContent
  :: forall m. State -> H.ComponentHTML Action () m
renderTutorialContent state =
  case currentStop state of
    Nothing -> HH.text ""
    Just stop ->
      let
        total = case state.tutorial of
          Just t -> Array.length t.stops
          Nothing -> 0
        stepNum = state.tutorialStep + 1
      in
        let
          onDetour = case state.selected of
            Just sel -> case stop.queryId of
              Just _ -> false
              Nothing -> sel.id /= stop.node
            Nothing -> false
        in
          HH.div [ cls "tutorial-content" ]
            [ HH.div [ cls "tutorial-topbar" ]
                [ HH.div [ cls "tutorial-nav" ]
                    [ if state.tutorialStep > 0 then
                        HH.button
                          [ cls "tutorial-nav-btn"
                          , HE.onClick \_ -> TutorialPrev
                          ]
                          [ HH.text "Prev" ]
                      else HH.text ""
                    , HH.span [ cls "tutorial-progress" ]
                        [ HH.text
                            ( show stepNum <> " / "
                                <> show total
                            )
                        ]
                    , if onDetour then
                        HH.button
                          [ cls "tutorial-nav-btn recenter"
                          , HE.onClick \_ ->
                              TutorialRecenter
                          ]
                          [ HH.text "Refocus" ]
                      else HH.text ""
                    , if stepNum < total then
                        HH.button
                          [ cls
                              "tutorial-nav-btn active"
                          , HE.onClick \_ -> TutorialNext
                          ]
                          [ HH.text "Next" ]
                      else
                        HH.button
                          [ cls "tutorial-nav-btn"
                          , HE.onClick \_ -> ExitTutorial
                          ]
                          [ HH.text "Finish" ]
                    , HH.button
                        [ cls "tutorial-exit"
                        , HE.onClick \_ -> ExitTutorial
                        ]
                        [ HH.text "Exit" ]
                    ]
                ]
            , HH.div [ cls "tutorial-narrative" ]
                ( map
                    ( \para ->
                        HH.p [ cls "tutorial-para" ]
                          (parseNarrative para)
                    )
                    (splitParagraphs stop.narrative)
                )
            ]

data LinkTarget = NodeTarget String | ExternalTarget String

type ParsedLink =
  { text :: String
  , target :: LinkTarget
  , consumed :: Int
  }

parseNarrative
  :: forall m. String -> Array (H.ComponentHTML Action () m)
parseNarrative str = go str []
  where
  go "" acc = Array.reverse acc
  go remaining acc =
    case String.indexOf (String.Pattern "[") remaining of
      Nothing ->
        Array.reverse
          (Array.cons (HH.text remaining) acc)
      Just openBracket ->
        let
          before = String.take openBracket remaining
          rest = String.drop openBracket remaining
        in
          case parseLink rest of
            Nothing ->
              go
                (String.drop 1 rest)
                ( Array.cons
                    (HH.text (before <> "["))
                    acc
                )
            Just { text: linkText, target, consumed } ->
              let
                after = String.drop consumed rest
                beforeEl =
                  if before == "" then []
                  else [ HH.text before ]
                linkEl = case target of
                  NodeTarget nid ->
                    HH.span
                      [ cls "narrative-node-link"
                      , HE.onClick \_ ->
                          NavigateTo nid
                      ]
                      [ HH.text linkText ]
                  ExternalTarget url ->
                    HH.a
                      [ HP.href url
                      , HP.target "_blank"
                      , HP.rel "noopener"
                      , cls "narrative-ext-link"
                      ]
                      [ HH.text linkText ]
              in
                go after
                  ( Array.cons linkEl
                      (beforeEl <> acc)
                  )

parseLink :: String -> Maybe ParsedLink
parseLink str = do
  closeBracket <- String.indexOf
    (String.Pattern "]")
    str
  let
    linkText = String.take (closeBracket - 1)
      (String.drop 1 str)
  let afterClose = String.drop (closeBracket + 1) str
  _ <-
    case
      String.indexOf
        (String.Pattern "(")
        afterClose
      of
      Just 0 -> Just 0
      _ -> Nothing
  let afterParen = String.drop 1 afterClose
  closeParen <- String.indexOf
    (String.Pattern ")")
    afterParen
  let targetStr = String.take closeParen afterParen
  let consumed = closeBracket + 1 + 1 + closeParen + 1
  let
    target =
      if String.take 5 targetStr == "node:" then
        NodeTarget (String.drop 5 targetStr)
      else ExternalTarget targetStr
  Just { text: linkText, target, consumed }

splitParagraphs :: String -> Array String
splitParagraphs s =
  Array.filter (_ /= "")
    (splitOn "\n\n" s)

splitOn :: String -> String -> Array String
splitOn sep str = go str []
  where
  sepLen = String.length sep
  go "" acc = Array.reverse acc
  go remaining acc =
    case String.indexOf (String.Pattern sep) remaining of
      Nothing -> Array.reverse (Array.cons remaining acc)
      Just idx ->
        let
          before = String.take idx remaining
          after = String.drop (idx + sepLen) remaining
        in
          go after (Array.cons before acc)
