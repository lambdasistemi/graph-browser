module Viewer.SourcesPanel where

import Prelude

import Data.Array as Array
import Data.Maybe (Maybe(..), fromMaybe)
import Data.Set as Set
import Data.String as String
import Graph.Types (Config, GraphSource)
import Halogen as H
import Halogen.HTML as HH
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
                [ HH.text (show (Array.length sources)) ]
            , HH.span [ cls "sources-chevron" ]
                [ HH.text
                    if state.showSourcesPanel then "▾" else "▸"
                ]
            ]
        , if state.showSourcesPanel then
            HH.div [ cls "sources-list" ]
              ( [ renderModeToggle state.sourceSelectionMode ]
                  <> map (renderRow state) sources
              )
          else HH.text ""
        ]

-- | Two-button segmented control selecting the source-selection mode.
renderModeToggle
  :: forall m
   . SourceSelectionMode
  -> H.ComponentHTML Action () m
renderModeToggle mode =
  HH.div [ cls "sources-mode-toggle" ]
    [ HH.button
        [ cls
            ( if mode == Multi then "sources-mode-button active"
              else "sources-mode-button"
            )
        , HP.title "Multi-select: each source has an independent checkbox"
        , HE.onClick \_ -> SetSourceSelectionMode Multi
        ]
        [ HH.text "All" ]
    , HH.button
        [ cls
            ( if mode == Solo then "sources-mode-button active"
              else "sources-mode-button"
            )
        , HP.title "Single-select: clicking a source hides every other source"
        , HE.onClick \_ -> SetSourceSelectionMode Solo
        ]
        [ HH.text "Single" ]
    ]

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
          , HP.checked (not hidden)
          , HE.onChange onChangeAction
          ]
      , HH.span [ cls "sources-row-label" ]
          [ HH.text display ]
      ]

-- | Configured sources across both 'graphSources' and the legacy
-- | 'graphSource' singleton. Entries with an empty path are skipped so
-- | the panel never lists the default-graph placeholder.
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
dropExt s suffixes =
  case Array.head (Array.mapMaybe (\ext -> String.stripSuffix (String.Pattern ext) s) suffixes) of
    Just stripped -> stripped
    Nothing -> s

suffixes :: Array String
suffixes = [ ".ttl", ".nq", ".nt", ".trig", ".rdf", ".jsonld" ]
