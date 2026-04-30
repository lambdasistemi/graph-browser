module Viewer.SourcesPanel where

import Prelude

import Data.Array as Array
import Data.Maybe (Maybe(..), fromMaybe)
import Data.Set as Set
import Data.String as String
import Data.Tuple (Tuple(..))
import Graph.Types (Config, GraphSource)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Elements.Keyed as HHK
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Viewer.Helpers (cls)
import Viewer.Types (Action(..), SourceSelectionMode(..), State)

-- | URN prefix used for per-source named graphs (mirror of
-- | `Viewer.Loader.sourceIriPrefix`). Kept as a local constant so this
-- | module does not depend on Loader.
sourceIriPrefix :: String
sourceIriPrefix = "urn:gb:source:"

-- | Build the source IRI for a configured graphSource path.
sourceIriForPath :: String -> String
sourceIriForPath "" = ""
sourceIriForPath path = sourceIriPrefix <> path

-- | Render a collapsible "Sources" panel listing every configured
-- | graphSource with a checkbox (Multi mode) or radio (Solo mode).
-- | The Solo-mode segmented control switches between modes; in Solo
-- | mode picking a source hides every other source in a single click.
renderSourcesPanel
  :: forall m. State -> H.ComponentHTML Action () m
renderSourcesPanel state =
  let
    sources = configuredSources state.config
    selectableSources = foregroundSources state.config
    visibleCount = visibleSourceCount state selectableSources
    selectableCount = Array.length selectableSources
    backgroundCount = Array.length sources - selectableCount
  in
    if Array.null sources then HH.text ""
    else
      HH.div [ cls "sources-panel" ]
        [ HH.div
            [ cls "sources-header"
            , HE.onClick \_ -> ToggleSourcesPanel
            ]
            [ HH.span [ cls "sources-title" ]
                [ HH.text "Sources" ]
            , HH.span [ cls "sources-count" ]
                [ HH.text (sourceCountText visibleCount selectableCount) ]
            , HH.span [ cls "sources-state" ]
                [ HH.text
                    ( sourceStateText
                        state.sourceSelectionMode
                        visibleCount
                        selectableCount
                        backgroundCount
                    )
                ]
            , HH.span [ cls "sources-chevron" ]
                [ HH.text
                    if state.showSourcesPanel then "▾" else "▸"
                ]
            ]
        , if state.showSourcesPanel then
            HHK.div [ cls "sources-list" ]
              ( [ Tuple "source-mode" (renderModeToggle state.sourceSelectionMode)
                , Tuple "source-bulk-actions"
                    (renderBulkActions visibleCount selectableCount)
                ]
                  <> map (renderKeyedRow state) sources
              )
          else HH.text ""
        ]

-- | Two-button segmented control selecting the source-selection mode.
renderModeToggle
  :: forall m
   . SourceSelectionMode
  -> H.ComponentHTML Action () m
renderModeToggle mode =
  HH.div
    [ cls "sources-mode-toggle"
    , HP.attr (HH.AttrName "aria-label") "Source selection mode"
    ]
    [ renderModeButton
        mode
        Multi
        "Combined sources"
        "Combine any number of source graphs"
    , renderModeButton
        mode
        Solo
        "Isolate one source"
        "Show one selected source graph at a time"
    ]

renderModeButton
  :: forall m
   . SourceSelectionMode
  -> SourceSelectionMode
  -> String
  -> String
  -> H.ComponentHTML Action () m
renderModeButton activeMode targetMode label title =
  let
    active = activeMode == targetMode
  in
    HH.button
      [ cls
          ( if active then "sources-mode-button active"
            else "sources-mode-button"
          )
      , HP.title title
      , HP.attr (HH.AttrName "aria-pressed")
          (if active then "true" else "false")
      , HE.onClick \_ -> SetSourceSelectionMode targetMode
      ]
      [ HH.text label ]

renderBulkActions
  :: forall m
   . Int
  -> Int
  -> H.ComponentHTML Action () m
renderBulkActions visibleCount selectableCount =
  HH.div [ cls "sources-actions" ]
    [ HH.button
        [ cls "sources-action-button"
        , HP.disabled (visibleCount == selectableCount)
        , HP.title "Show every selectable source graph"
        , HE.onClick \_ -> SelectAllSources
        ]
        [ HH.text "Select all" ]
    , HH.button
        [ cls "sources-action-button"
        , HP.disabled (visibleCount == 0)
        , HP.title "Hide every selectable source graph"
        , HE.onClick \_ -> ClearAllSources
        ]
        [ HH.text "Clear all" ]
    ]

renderKeyedRow
  :: forall m
   . State
  -> GraphSource
  -> Tuple String (H.ComponentHTML Action () m)
renderKeyedRow state source =
  Tuple
    (sourceSelectionModeId state.sourceSelectionMode <> ":" <> source.path)
    (renderRow state source)

renderRow
  :: forall m
   . State
  -> GraphSource
  -> H.ComponentHTML Action () m
renderRow state source =
  let
    iri = sourceIriForPath source.path
    hidden = Set.member iri state.hiddenSources
    display =
      if source.label /= "" then source.label
      else sourceDisplayName source.path
  in
    if source.background then
      -- Background sources are always loaded. Render them as a locked
      -- row with no checkbox/radio so the user can see what's on but
      -- cannot toggle them.
      HH.div [ cls "sources-row sources-row-background" ]
        [ HH.span [ cls "sources-row-lock" ]
            [ HH.text "🔒" ]
        , HH.span [ cls "sources-row-label sources-row-label-locked" ]
            [ HH.text display ]
        , HH.span [ cls "sources-row-tag" ]
            [ HH.text "always loaded" ]
        ]
    else
      let
        inputType = case state.sourceSelectionMode of
          Multi -> HP.InputCheckbox
          Solo -> HP.InputRadio
        onChangeAction _ = case state.sourceSelectionMode of
          Multi -> ToggleSource iri
          Solo -> SoloSource iri
      in
        HH.label [ cls "sources-row" ]
          [ HH.input
              [ HP.type_ inputType
              , HP.name "gb-source"
              , HP.value iri
              , HP.checked (not hidden)
              , HE.onChange onChangeAction
              ]
          , HH.span [ cls "sources-row-label" ]
              [ HH.text display ]
          ]

-- | Foreground sources only — those that participate in user toggling.
-- | Used by the reducer to compute Solo's hide set and to find the
-- | first visible source when entering Solo mode.
foregroundSources :: Config -> Array GraphSource
foregroundSources cfg =
  Array.filter (\s -> s.path /= "" && not s.background)
    ( cfg.graphSources
        <> case cfg.graphSource of
          Nothing -> []
          Just s -> [ s ]
    )

-- | All configured sources (foreground + background) the panel renders.
-- | Entries with an empty path are skipped so the panel never lists the
-- | default-graph placeholder.
configuredSources :: Config -> Array GraphSource
configuredSources cfg =
  Array.filter (\s -> s.path /= "")
    ( cfg.graphSources
        <> case cfg.graphSource of
          Nothing -> []
          Just s -> [ s ]
    )

-- | Last path segment, with common RDF suffixes dropped. Fallback
-- | display when no 'label' is configured on the source.
sourceDisplayName :: String -> String
sourceDisplayName path =
  let
    segs = String.split (String.Pattern "/") path
    last = fromMaybe path (Array.last segs)
  in
    dropExt last suffixes

dropExt :: String -> Array String -> String
dropExt s extensions =
  case Array.head (Array.mapMaybe (\ext -> String.stripSuffix (String.Pattern ext) s) extensions) of
    Just stripped -> stripped
    Nothing -> s

visibleSourceCount :: State -> Array GraphSource -> Int
visibleSourceCount state sources =
  Array.length
    ( Array.filter
        (\source -> not (Set.member (sourceIriForPath source.path) state.hiddenSources))
        sources
    )

sourceCountText :: Int -> Int -> String
sourceCountText visibleCount selectableCount =
  show visibleCount <> "/" <> show selectableCount <> " visible"

sourceStateText :: SourceSelectionMode -> Int -> Int -> Int -> String
sourceStateText mode visibleCount selectableCount backgroundCount =
  let
    base =
      if selectableCount == 0 then "No selectable sources"
      else if visibleCount == selectableCount then "All selectable sources visible"
      else if visibleCount == 0 then "No selectable sources visible"
      else if mode == Solo && visibleCount == 1 then "Isolating one source"
      else "Custom source mix"

    locked =
      if backgroundCount > 0 then
        " - " <> show backgroundCount <> " always on"
      else
        ""
  in
    base <> locked

sourceSelectionModeId :: SourceSelectionMode -> String
sourceSelectionModeId = case _ of
  Multi -> "multi"
  Solo -> "solo"

suffixes :: Array String
suffixes = [ ".ttl", ".nq", ".nt", ".trig", ".rdf", ".jsonld" ]
