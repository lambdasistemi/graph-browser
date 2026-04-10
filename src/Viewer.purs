module Viewer where

import Prelude

import Data.Argonaut.Parser (jsonParser)
import Data.Array as Array
import Data.Either (Either(..))
import Data.Foldable (foldl, for_)
import Data.Map as Map
import Data.Maybe (Maybe(..), isJust, isNothing)
import Data.Set as Set
import Data.String as String
import Data.String.Common (joinWith, split)
import Data.String.Pattern (Pattern(..))
import Data.Traversable (traverse)
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Web.HTML as Web.HTML
import Web.HTML.Window as Web.HTML.Window
import Web.HTML.HTMLDocument as Web.HTML.HTMLDocument
import Effect.Aff (Aff, try)
import Effect.Aff.Class (liftAff)
import Effect.Class (liftEffect)
import FFI.Cytoscape as Cy
import Fetch (Method(..), fetch)
import Graph.Cytoscape as GCy
import Graph.Operations (neighborhood, subgraph)
import Data.Argonaut.Decode.Class (decodeJson)
import Data.Argonaut.Decode.Error (printJsonDecodeError)
import Data.Argonaut.Parser as AP
import Foreign (Foreign, unsafeToForeign)
import Foreign.Object as FO
import Graph.Search (SearchResult(..), search)
import Persist as Persist
import Rdf.Import as Rdf.Import
import Tutorial (Tutorial, TutorialStop, decodeTutorial)
import Graph.Decode (decodeConfig, decodeGraph)
import Graph.Types
  ( Config
  , Edge
  , Graph
  , KindDef
  , KindId
  , Link
  , Node
  , OntologyReference
  , emptyConfig
  , emptyGraph
  )
import Graph.Views as Views
import Graph.Query as Query
import FFI.Clipboard as Clipboard
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Halogen.Subscription as HS
import PromptBuilder as PB
import FFI.Oxigraph as Oxigraph
import FFI.Uri (absoluteUrl)

-- | Data URLs that the viewer fetches on init.
type DataUrls =
  { configUrl :: String
  , graphUrl :: String
  , tutorialIndexUrl :: String
  , baseUrl :: String
  }

-- | Edge detail shown on hover.
type EdgeInfo =
  { sourceId :: String
  , targetId :: String
  , sourceLabel :: String
  , targetLabel :: String
  , label :: String
  , description :: String
  , predicateRef :: Maybe OntologyReference
  }

-- | Entry in the tutorial index.
type TutorialEntry =
  { id :: String
  , title :: String
  , description :: String
  , file :: String
  }

-- | Application state.
-- | What kind of prompt the builder is assembling.
data PromptMode
  = PromptNode
  | PromptEdge
  | PromptQuery
  | PromptTour

type State =
  { config :: Config
  , graph :: Graph
  , fullGraph :: Graph
  , dataUrls :: DataUrls
  , selected :: Maybe Node
  , hoveredNode :: Maybe Node
  , hoveredEdge :: Maybe EdgeInfo
  , selectedEdge :: Maybe EdgeInfo
  , hoverPos :: { x :: Number, y :: Number }
  , depth :: Int
  , searchQuery :: String
  , searchResults :: Array SearchResult
  , tutorialIndex :: Array TutorialEntry
  , tutorial :: Maybe Tutorial
  , tutorialStep :: Int
  , tutorialActive :: Boolean
  , showTutorialMenu :: Boolean
  , error :: Maybe String
  , promptInput :: String
  , promptCopied :: Boolean
  , promptMode :: PromptMode
  , viewIndex :: Array Views.ViewIndexEntry
  , activeView :: Maybe Views.View
  , showViewPicker :: Boolean
  , oxigraphStore :: Maybe Oxigraph.OxigraphStore
  , queryCatalog :: Array Query.NamedQuery
  , activeQuery :: Maybe Query.NamedQuery
  , catalogFilter :: String
  , showQueryCatalog :: Boolean
  , paramValues :: Map.Map String String
  , paramOptions :: Map.Map String (Array String)
  , loadedTutorials :: Array Tutorial
  , panelTab :: PanelTab
  }

-- | Actions the component can handle.
data Action
  = Initialize
  | NodeTapped String
  | NodeHovered String Number Number
  | EdgeHovered String String String String String Number Number
  | EdgeTapped String String String String String
  | NodeHoverOut
  | EdgeHoverOut
  | SetDepth Int
  | SetSearch String
  | SelectSearchResult SearchResult
  | FitAll
  | NavigateTo String
  | ToggleTutorialMenu
  | StartTutorial String
  | TutorialNext
  | TutorialPrev
  | TutorialRecenter
  | ExitTutorial
  | SetPromptInput String
  | CopyPrompt
  | SelectView String
  | SelectAllView
  | ToggleViewPicker
  | SetCatalogFilter String
  | SelectQuery Query.NamedQuery
  | ExecuteQuery Query.NamedQuery
  | ClearQuery
  | ToggleQueryCatalog
  | SetParamValue String String
  | SetPanelTab PanelTab

data PanelTab = QueriesTab | ToursTab

-- | The viewer component, parameterized by data URLs.
viewer
  :: forall q o. H.Component q DataUrls o Aff
viewer = H.mkComponent
  { initialState: \urls ->
      { config: emptyConfig
      , graph: emptyGraph
      , fullGraph: emptyGraph
      , dataUrls: urls
      , selected: Nothing
      , hoveredNode: Nothing
      , hoveredEdge: Nothing
      , selectedEdge: Nothing
      , hoverPos: { x: 0.0, y: 0.0 }
      , depth: 99
      , searchQuery: ""
      , searchResults: []
      , tutorialIndex: []
      , tutorial: Nothing
      , tutorialStep: 0
      , tutorialActive: false
      , showTutorialMenu: false
      , error: Nothing
      , promptInput: ""
      , promptCopied: false
      , promptMode: PromptNode
      , viewIndex: []
      , activeView: Nothing
      , showViewPicker: false
      , oxigraphStore: Nothing
      , queryCatalog: []
      , activeQuery: Nothing
      , catalogFilter: ""
      , showQueryCatalog: false
      , paramValues: Map.empty
      , paramOptions: Map.empty
      , loadedTutorials: []
      , panelTab: QueriesTab
      }
  , render
  , eval: H.mkEval H.defaultEval
      { handleAction = handleAction
      , initialize = Just Initialize
      }
  }

render :: forall m. State -> H.ComponentHTML Action () m
render state =
  HH.div [ cls "app" ]
    ( ( if Array.null state.queryCatalog then []
        else [ renderQueryPanel state ]
      )
        <>
          [ HH.div [ cls "graph-container" ]
              [ renderGraphContext state
              , HH.div [ HP.id "cy" ] []
              , renderHoverTooltip state
              , renderControls state
              , renderLegend state.config
              ]
          , renderSidebar state
          ]
    )

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
  where
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
                  <> "top:" <> show state.hoverPos.y <> "px;"
              )
          ]
          [ HH.span [ cls c.badgeCls ] [ HH.text c.badge ]
          , HH.strong_ [ HH.text (" " <> c.title) ]
          , if c.desc == "" then HH.text ""
            else HH.p [ cls "tooltip-desc" ] [ HH.text c.desc ]
          ]

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

renderSearchBox
  :: forall m. State -> H.ComponentHTML Action () m
renderSearchBox state =
  HH.div [ cls "search-container" ]
    [ HH.input
        [ cls "search-input"
        , HP.type_ HP.InputText
        , HP.placeholder "Search nodes, edges, descriptions..."
        , HP.value state.searchQuery
        , HE.onValueInput SetSearch
        ]
    , if Array.null state.searchResults then
        HH.text ""
      else
        HH.div [ cls "search-results" ]
          ( Array.take 12 state.searchResults
              <#> renderSearchResult state.config
          )
    ]

renderSearchResult
  :: forall m
   . Config
  -> SearchResult
  -> H.ComponentHTML Action () m
renderSearchResult cfg result = case result of
  NodeResult node ->
    HH.div
      [ cls "search-result-item"
      , HE.onClick \_ -> SelectSearchResult result
      ]
      [ HH.span
          [ cls "search-dot"
          , HP.attr (HH.AttrName "style")
              ("background:" <> kindColor cfg node.kind)
          ]
          []
      , HH.span [ cls "search-result-label" ]
          [ HH.text node.label ]
      , HH.span [ cls "search-result-kind" ]
          [ HH.text (kindLabel cfg node.kind) ]
      ]
  EdgeResult { edge, sourceLabel, targetLabel } ->
    HH.div
      [ cls "search-result-item"
      , HE.onClick \_ -> SelectSearchResult result
      ]
      [ HH.span
          [ cls "search-dot"
          , HP.attr (HH.AttrName "style")
              "background:#8b949e"
          ]
          []
      , HH.span [ cls "search-result-label" ]
          [ HH.text
              (sourceLabel <> " → " <> targetLabel)
          ]
      , HH.span [ cls "search-result-kind" ]
          [ HH.text edge.label ]
      ]

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

currentStop :: State -> Maybe TutorialStop
currentStop state = do
  t <- state.tutorial
  Array.index t.stops state.tutorialStep

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

data LinkTarget = NodeTarget String | ExternalTarget String

type ParsedLink =
  { text :: String
  , target :: LinkTarget
  , consumed :: Int
  }

parseLink :: String -> Maybe ParsedLink
parseLink str = do
  closeBracket <- String.indexOf
    (String.Pattern "]")
    str
  let
    linkText = String.take (closeBracket - 1)
      (String.drop 1 str)
  let afterClose = String.drop (closeBracket + 1) str
  openParen <-
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

renderEdgeDetail
  :: forall m. State -> EdgeInfo -> H.ComponentHTML Action () m
renderEdgeDetail state edge =
  HH.div_ (edgeDetailContent edge <> [ renderPromptBuilder state PromptEdge "Generate prompt" ])

renderEdgePreview
  :: forall m. EdgeInfo -> H.ComponentHTML Action () m
renderEdgePreview edge =
  HH.div_ (edgeDetailContent edge)

edgeDetailContent
  :: forall m. EdgeInfo -> Array (H.ComponentHTML Action () m)
edgeDetailContent edge =
    [ HH.span [ cls "badge badge-mechanism" ]
        [ HH.text "relationship" ]
    , HH.div [ cls "edge-detail" ]
        [ HH.div [ cls "edge-endpoint" ]
            [ HH.span [ cls "edge-role" ]
                [ HH.text "From" ]
            , HH.span [ cls "edge-name" ]
                [ HH.text edge.sourceLabel ]
            ]
        , HH.div [ cls "edge-label" ]
            [ HH.text edge.label ]
        , HH.div [ cls "edge-endpoint" ]
            [ HH.span [ cls "edge-role" ]
                [ HH.text "To" ]
            , HH.span [ cls "edge-name" ]
                [ HH.text edge.targetLabel ]
            ]
        ]
    , renderOntologyReference "Predicate ontology" edge.predicateRef
    , HH.p [ cls "description" ]
        [ HH.text edge.description ]
    ]

renderNodeDetail
  :: forall m
   . State
  -> Node
  -> H.ComponentHTML Action () m
renderNodeDetail state node =
  HH.div_ (nodeDetailContent state node <> [ renderPromptBuilder state PromptNode "Generate prompt" ])

renderNodePreview
  :: forall m
   . State
  -> Node
  -> H.ComponentHTML Action () m
renderNodePreview state node =
  HH.div_ (nodeDetailContent state node)

nodeDetailContent
  :: forall m
   . State
  -> Node
  -> Array (H.ComponentHTML Action () m)
nodeDetailContent state node =
    [ HH.span
        [ cls ("badge badge-" <> node.kind) ]
        [ HH.text (kindLabel cfg node.kind) ]
    , renderOntologyIdentity node
    , HH.p [ cls "description" ]
        [ HH.text node.description ]
    , renderLinks node.links
    , renderConnections "Connects to" outEdges
    , renderConnections "Connected from" inEdges
    ]
  where
  cfg = state.config
  graph = state.graph
  outEdges = Array.filter
    (\e -> e.source == node.id)
    graph.edges
  inEdges = Array.filter
    (\e -> e.target == node.id)
    graph.edges

  renderLinks
    :: Array Link -> H.ComponentHTML Action () m
  renderLinks [] = HH.text ""
  renderLinks links =
    HH.ul [ cls "links" ]
      ( map
          ( \l -> HH.li_
              [ HH.a
                  [ HP.href l.url
                  , HP.target "_blank"
                  , HP.rel "noopener"
                  ]
                  [ HH.text l.label ]
              ]
          )
          links
      )

  renderOntologyIdentity :: Node -> H.ComponentHTML Action () m
  renderOntologyIdentity currentNode =
    case ontologyIdentity currentNode of
      Nothing -> HH.text ""
      Just ident ->
        HH.div [ cls "ontology-identity" ]
          [ HH.div [ cls "connection-item" ]
              [ HH.span [ cls "conn-label" ]
                  [ HH.text "Ontology term" ]
              , HH.a
                  [ HP.href ident.iri
                  , HP.target "_blank"
                  , HP.rel "noopener"
                  , cls "conn-node"
                  ]
                  [ HH.text ident.compact ]
              ]
          , HH.div [ cls "connection-item" ]
              [ HH.span [ cls "conn-label" ]
                  [ HH.text "Namespace" ]
              , HH.a
                  [ HP.href ident.namespace
                  , HP.target "_blank"
                  , HP.rel "noopener"
                  , cls "conn-node"
                  ]
                  [ HH.text ident.namespaceLabel ]
              ]
          ]

  renderConnections
    :: String
    -> Array Edge
    -> H.ComponentHTML Action () m
  renderConnections _ [] = HH.text ""
  renderConnections title edges =
    HH.div [ cls "connections" ]
      [ HH.h3_ [ HH.text title ]
      , HH.div_ (map mkConn edges)
      ]

  mkConn :: Edge -> H.ComponentHTML Action () m
  mkConn edge =
    let
      targetId =
        if edge.source == node.id then edge.target
        else edge.source
      targetNode = Map.lookup targetId graph.nodes
      targetLabel = case targetNode of
        Just n -> n.label
        Nothing -> targetId
    in
      HH.div
        [ cls "connection-item"
        , HE.onClick \_ -> NavigateTo targetId
        ]
        [ HH.span [ cls "conn-label" ]
            [ HH.text edge.label ]
        , HH.span [ cls "conn-node" ]
            [ HH.text targetLabel ]
        ]

renderOntologyReference
  :: forall m
   . String
  -> Maybe OntologyReference
  -> H.ComponentHTML Action () m
renderOntologyReference _ Nothing = HH.text ""
renderOntologyReference title (Just ref) =
  if shouldRenderOntologyReference ref.iri then
    HH.div [ cls "connections" ]
      [ HH.h3_ [ HH.text title ]
      , HH.a
          [ HP.href ref.iri
          , HP.target "_blank"
          , HP.rel "noopener"
          ]
          [ HH.text ref.label ]
      ]
  else
    HH.text ""

renderPromptBuilder
  :: forall m
   . State
  -> PromptMode
  -> String
  -> H.ComponentHTML Action () m
renderPromptBuilder state mode title =
  HH.div [ cls "prompt-builder" ]
    [ HH.h3_ [ HH.text title ]
    , HH.textarea
        [ cls "prompt-textarea"
        , HP.value state.promptInput
        , HP.placeholder (promptPlaceholder mode)
        , HP.rows 3
        , HE.onValueInput SetPromptInput
        ]
    , HH.div [ cls "prompt-actions" ]
        [ HH.button
            [ cls
                ( "prompt-copy-btn"
                    <>
                      if state.promptCopied then " copied"
                      else ""
                )
            , HE.onClick \_ -> CopyPrompt
            ]
            [ HH.text
                ( if state.promptCopied then "Copied!"
                  else "Copy prompt"
                )
            ]
        ]
    ]

promptPlaceholder :: PromptMode -> String
promptPlaceholder PromptNode =
  "e.g. Add missing connections, update description..."
promptPlaceholder PromptEdge =
  "e.g. Refine this relationship, add details..."
promptPlaceholder PromptQuery =
  "e.g. Find all actors that can vote on treasury actions..."
promptPlaceholder PromptTour =
  "e.g. A tour explaining how DRep delegation works..."

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

type OntologyIdentity =
  { iri :: String
  , compact :: String
  , namespace :: String
  , namespaceLabel :: String
  }

ontologyIdentity :: Node -> Maybe OntologyIdentity
ontologyIdentity node = do
  iri <- ontologyIri node
  let
    compact = compactIri iri
    namespace = namespaceIri iri
    namespaceLabel = namespaceName namespace
  pure { iri, compact, namespace, namespaceLabel }

ontologyIri :: Node -> Maybe String
ontologyIri node = map _.iri node.ontologyRef

compactIri :: String -> String
compactIri iri =
  case Array.find matchPrefix knownPrefixes of
    Just (Tuple prefix namespace) ->
      prefix <> ":" <> String.drop (String.length namespace) iri
    Nothing -> iri
  where
  matchPrefix (Tuple _ namespace) =
    String.take (String.length namespace) iri == namespace

namespaceIri :: String -> String
namespaceIri iri =
  case Array.find matchPrefix knownPrefixes of
    Just (Tuple _ namespace) -> namespace
    Nothing ->
      case String.lastIndexOf (Pattern "#") iri of
        Just idx -> String.take (idx + 1) iri
        Nothing ->
          case split (Pattern "/") iri of
            [] -> iri
            parts ->
              case Array.unsnoc parts of
                Just { init } -> joinWith "/" init <> "/"
                Nothing -> iri
  where
  matchPrefix (Tuple _ namespace) =
    String.take (String.length namespace) iri == namespace

namespaceName :: String -> String
namespaceName namespace =
  case Array.find (\(Tuple _ known) -> known == namespace) knownPrefixes of
    Just (Tuple prefix _) -> prefix
    Nothing -> namespace

knownPrefixes :: Array (Tuple String String)
knownPrefixes =
  [ Tuple "owl" "http://www.w3.org/2002/07/owl#"
  , Tuple "rdf" "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  , Tuple "rdfs" "http://www.w3.org/2000/01/rdf-schema#"
  , Tuple "xsd" "http://www.w3.org/2001/XMLSchema#"
  , Tuple "dcterms" "http://purl.org/dc/terms/"
  , Tuple "gb" "https://lambdasistemi.github.io/graph-browser/vocab/terms#"
  , Tuple "gbkind" "https://lambdasistemi.github.io/graph-browser/vocab/kinds#"
  , Tuple "gbgroup" "https://lambdasistemi.github.io/graph-browser/vocab/groups#"
  , Tuple "gbedge" "https://lambdasistemi.github.io/graph-browser/vocab/edges#"
  ]

handleAction
  :: forall o
   . Action
  -> H.HalogenM State Action () o Aff Unit
handleAction = case _ of
  Initialize -> do
    state0 <- H.get
    let urls = state0.dataUrls
    cfgResult <- liftAff (loadConfig urls.configUrl)
    case cfgResult of
      Left _ -> pure unit
      Right cfg -> do
        H.modify_ _ { config = cfg }
        liftEffect $ setDocTitle cfg.title
    state <- H.get
    let
      graphLocations = graphSourceLocations urls state.config
    result <- liftAff
      (loadGraphData graphLocations)
    case result of
      Left err ->
        H.modify_ _ { error = Just err }
      Right loaded -> do
        let start = mostConnectedNode loaded.graph
        H.modify_ \s -> s
          { config = s.config
              { kinds = mergeKinds s.config.kinds loaded.ontologyKinds }
          , graph = loaded.graph
          , fullGraph = loaded.graph
          , selected = start
          }
    -- If RDF format, create SPARQL store and load turtle
    when (isRdfConfig state.config) do
      storeResult <- liftAff
        (loadSparqlStore graphLocations)
      case storeResult of
        Left _ -> pure unit
        Right store ->
          H.modify_ _ { oxigraphStore = Just store }
    -- Load query catalog
    catalogResult <- liftAff
      ( loadQueryCatalog
          (urls.baseUrl <> "data/queries.json")
      )
    case catalogResult of
      Left _ -> pure unit
      Right catalog ->
        H.modify_ _ { queryCatalog = catalog }
    -- Init Cytoscape AFTER catalog loads so the query panel
    -- is in the DOM and #cy has correct dimensions.
    stateForCy <- H.get
    liftEffect $ Cy.initCytoscape "cy"
      (kindsToForeign stateForCy.config)
    tapSub <- liftEffect HS.create
    liftEffect $ Cy.onNodeTap \nodeId ->
      HS.notify tapSub.listener
        (NodeTapped nodeId)
    void $ H.subscribe tapSub.emitter
    hoverSub <- liftEffect HS.create
    liftEffect $ Cy.onNodeHover \nodeId x y ->
      HS.notify hoverSub.listener
        (NodeHovered nodeId x y)
    void $ H.subscribe hoverSub.emitter
    edgeSub <- liftEffect HS.create
    liftEffect $ Cy.onEdgeHover
      \src tgt lbl desc predicateIri x y ->
        HS.notify edgeSub.listener
          (EdgeHovered src tgt lbl desc predicateIri x y)
    void $ H.subscribe edgeSub.emitter
    edgeTapSub <- liftEffect HS.create
    liftEffect $ Cy.onEdgeTap
      \src tgt lbl desc predicateIri ->
        HS.notify edgeTapSub.listener
          (EdgeTapped src tgt lbl desc predicateIri)
    void $ H.subscribe edgeTapSub.emitter
    nodeHoverOutSub <- liftEffect HS.create
    liftEffect $ Cy.onNodeHoverOut
      (HS.notify nodeHoverOutSub.listener NodeHoverOut)
    void $ H.subscribe nodeHoverOutSub.emitter
    edgeHoverOutSub <- liftEffect HS.create
    liftEffect $ Cy.onEdgeHoverOut
      (HS.notify edgeHoverOutSub.listener EdgeHoverOut)
    void $ H.subscribe edgeHoverOutSub.emitter
    -- Load legacy view index only when no query catalog views
    state1 <- H.get
    let
      hasQueryViews = Array.any
        (\q -> Array.elem "view" q.tags)
        state1.queryCatalog
    when (not hasQueryViews) do
      viewResult <- liftAff
        (loadViewIndex (urls.baseUrl <> "data/views/index.json"))
      case viewResult of
        Left _ -> pure unit
        Right vi ->
          H.modify_ _ { viewIndex = vi }
    idxResult <- liftAff
      (loadTutorialIndex urls.tutorialIndexUrl)
    case idxResult of
      Left _ -> pure unit
      Right idx ->
        H.modify_ _ { tutorialIndex = idx }
    state2 <- H.get
    mPersisted <- liftEffect $ Persist.restore
      state2.config.title
    case mPersisted of
      Nothing -> pure unit
      Just ps -> do
        let
          node = ps.selectedNodeId >>=
            \nid -> Map.lookup nid state2.graph.nodes
        H.modify_ _
          { selected = node
          , depth = ps.depth
          }
        case ps.tutorialId of
          Nothing -> pure unit
          Just tid -> do
            let
              mEntry = Array.find
                (\e -> e.id == tid)
                state2.tutorialIndex
            case mEntry of
              Nothing -> pure unit
              Just entry -> do
                let
                  tUrl = resolveUrl
                    urls.baseUrl
                    entry.file
                tutResult <- liftAff
                  (loadTutorialFile tUrl)
                case tutResult of
                  Left _ -> pure unit
                  Right tut -> do
                    let
                      step = case ps.tutorialStep of
                        Just s -> s
                        Nothing -> 0
                    H.modify_ _
                      { tutorial = Just tut
                      , tutorialStep = step
                      , tutorialActive = true
                      }
    renderGraph

  NodeTapped nodeId -> do
    state <- H.get
    let node = Map.lookup nodeId state.graph.nodes
    H.modify_ _ { selected = node, selectedEdge = Nothing }
    liftEffect $ Cy.clearEdge
    liftEffect $ Cy.markRoot nodeId
    when state.tutorialActive persistState

  NodeHovered nodeId x y -> do
    state <- H.get
    let node = Map.lookup nodeId state.graph.nodes
    H.modify_ _
      { hoveredNode = node
      , hoveredEdge = Nothing
      , hoverPos = { x, y }
      }

  EdgeHovered srcId tgtId lbl desc predicateIri x y -> do
    state <- H.get
    let
      srcNode = Map.lookup srcId state.graph.nodes
      tgtNode = Map.lookup tgtId state.graph.nodes
      srcLabel = case srcNode of
        Just n -> n.label
        Nothing -> srcId
      tgtLabel = case tgtNode of
        Just n -> n.label
        Nothing -> tgtId
      edgeInfo =
        { sourceId: srcId
        , targetId: tgtId
        , sourceLabel: srcLabel
        , targetLabel: tgtLabel
        , label: lbl
        , description: desc
        , predicateRef:
            if shouldRenderOntologyReference predicateIri then
              Just { label: lbl, iri: predicateIri }
            else
              Nothing
        }
    H.modify_ _
      { hoveredNode = Nothing
      , hoveredEdge = Just edgeInfo
      , hoverPos = { x, y }
      }

  EdgeTapped srcId tgtId lbl desc predicateIri -> do
    state <- H.get
    let
      srcNode = Map.lookup srcId state.graph.nodes
      tgtNode = Map.lookup tgtId state.graph.nodes
      srcLabel = case srcNode of
        Just n -> n.label
        Nothing -> srcId
      tgtLabel = case tgtNode of
        Just n -> n.label
        Nothing -> tgtId
      edgeInfo =
        { sourceId: srcId
        , targetId: tgtId
        , sourceLabel: srcLabel
        , targetLabel: tgtLabel
        , label: lbl
        , description: desc
        , predicateRef:
            if shouldRenderOntologyReference predicateIri then
              Just { label: lbl, iri: predicateIri }
            else
              Nothing
        }
    H.modify_ _
      { selectedEdge = Just edgeInfo
      , selected = Nothing
      , hoveredEdge = Nothing
      , hoveredNode = Nothing
      , promptInput = ""
      , promptCopied = false
      , promptMode = PromptEdge
      }
    liftEffect $ Cy.clearRoot
    liftEffect $ Cy.markEdge srcId tgtId

  NodeHoverOut ->
    H.modify_ _ { hoveredNode = Nothing }

  EdgeHoverOut ->
    H.modify_ _ { hoveredEdge = Nothing }

  SetDepth d -> do
    H.modify_ _ { depth = d }
    renderGraph

  SetSearch q -> do
    state <- H.get
    let results = search q state.graph
    H.modify_ _
      { searchQuery = q
      , searchResults = results
      }

  SelectSearchResult result -> do
    state <- H.get
    case result of
      NodeResult node -> do
        H.modify_ _
          { selected = Just node
          , searchQuery = ""
          , searchResults = []
          , hoveredEdge = Nothing
          }
        renderGraph
      EdgeResult { edge, sourceLabel, targetLabel } ->
        do
          let
            node = Map.lookup edge.source
              state.graph.nodes
          H.modify_ _
            { selected = node
            , hoveredEdge = Just
                { sourceId: edge.source
                , targetId: edge.target
                , sourceLabel
                , targetLabel
                , label: edge.label
                , description: edge.description
                , predicateRef: edge.predicateRef
                }
            , searchQuery = ""
            , searchResults = []
            }
          renderGraph

  FitAll ->
    liftEffect Cy.fitAll

  ToggleTutorialMenu ->
    H.modify_ \s -> s
      { showTutorialMenu = not s.showTutorialMenu }

  StartTutorial file -> do
    state <- H.get
    -- Restore full graph when exiting a query to start a tour
    H.modify_ _
      { graph = state.fullGraph
      , activeQuery = Nothing
      }
    case state.activeView of
      Just view -> do
        -- View-local tour: file is the tour ID
        let
          mTour = Array.find
            (\t -> t.id == file)
            view.tours
        case mTour of
          Nothing -> pure unit
          Just tut -> do
            H.modify_ _
              { tutorial = Just tut
              , tutorialStep = 0
              , tutorialActive = true
              , showTutorialMenu = false
              }
            applyTutorialStop
      Nothing -> do
        let url = resolveUrl state.dataUrls.baseUrl file
        result <- liftAff (loadTutorialFile url)
        case result of
          Left _ -> pure unit
          Right tut -> do
            state' <- H.get
            let
              alreadyLoaded = Array.any
                (\t -> t.id == tut.id)
                state'.loadedTutorials
            H.modify_ _
              { tutorial = Just tut
              , tutorialStep = 0
              , tutorialActive = true
              , showTutorialMenu = false
              , loadedTutorials =
                  if alreadyLoaded then
                    state'.loadedTutorials
                  else
                    Array.snoc state'.loadedTutorials tut
              }
            applyTutorialStop

  TutorialNext -> do
    state <- H.get
    case state.tutorial of
      Just t ->
        when
          ( state.tutorialStep
              < Array.length t.stops - 1
          )
          do
            H.modify_ \s -> s
              { tutorialStep = s.tutorialStep + 1
              }
            applyTutorialStop
      Nothing -> pure unit

  TutorialPrev -> do
    state <- H.get
    when (state.tutorialStep > 0) do
      H.modify_ \s -> s
        { tutorialStep = s.tutorialStep - 1 }
      applyTutorialStop

  TutorialRecenter ->
    applyTutorialStop

  ExitTutorial -> do
    H.modify_ _
      { tutorialActive = false
      , depth = 99
      , hoveredNode = Nothing
      }
    renderGraph

  NavigateTo nodeId -> do
    state <- H.get
    let node = Map.lookup nodeId state.graph.nodes
    H.modify_ _
      { selected = node
      , promptInput = ""
      , promptCopied = false
      , promptMode = PromptNode
      }
    renderGraph

  SetPromptInput text ->
    H.modify_ _ { promptInput = text, promptCopied = false }

  CopyPrompt -> do
    state <- H.get
    let
      prompt = case state.promptMode of
        PromptQuery ->
          PB.buildQueryPrompt state.config state.graph
            state.queryCatalog
            state.promptInput
        PromptTour ->
          PB.buildTourPrompt state.config state.graph
            state.loadedTutorials
            state.queryCatalog
            state.promptInput
        PromptEdge -> case state.hoveredEdge of
          Just edge ->
            let
              srcNode = Map.lookup edge.sourceId
                state.graph.nodes
              tgtNode = Map.lookup edge.targetId
                state.graph.nodes
              rawEdge =
                { source: edge.sourceId
                , target: edge.targetId
                , label: edge.label
                , description: edge.description
                , predicateRef: edge.predicateRef
                }
            in
              case srcNode, tgtNode of
                Just sn, Just tn ->
                  PB.buildEdgePrompt state.config
                    state.graph
                    rawEdge
                    sn
                    tn
                    state.promptInput
                _, _ ->
                  PB.buildEdgePrompt state.config
                    state.graph
                    rawEdge
                    { id: edge.sourceId
                    , label: edge.sourceLabel
                    , kind: ""
                    , group: ""
                    , description: ""
                    , links: []
                    , ontologyRef: Nothing
                    }
                    { id: edge.targetId
                    , label: edge.targetLabel
                    , kind: ""
                    , group: ""
                    , description: ""
                    , links: []
                    , ontologyRef: Nothing
                    }
                    state.promptInput
          Nothing -> ""
        PromptNode -> case state.selected of
          Just node ->
            PB.buildNodePrompt state.config state.graph
              node
              state.promptInput
          Nothing -> ""
    when (prompt /= "") do
      liftAff $ Clipboard.copyToClipboard prompt
      H.modify_ _ { promptCopied = true }

  SelectView file -> do
    state <- H.get
    let
      vUrl = resolveUrl
        state.dataUrls.baseUrl
        ("data/views/" <> file)
    viewResult <- liftAff (loadViewFile vUrl)
    case viewResult of
      Left _ -> pure unit
      Right view -> do
        let
          filtered = Views.filterByView view
            state.fullGraph
          start = mostConnectedNode filtered
          tours = map
            ( \t ->
                { id: t.id
                , title: t.title
                , description: t.description
                , file: t.id
                }
            )
            view.tours
        H.modify_ _
          { graph = filtered
          , activeView = Just view
          , selected = start
          , tutorialIndex = tours
          , tutorial = Nothing
          , tutorialActive = false
          , showTutorialMenu = false
          , showViewPicker = false
          , hoveredEdge = Nothing
          , hoveredNode = Nothing
          }
        renderGraph

  SelectAllView -> do
    state <- H.get
    let start = mostConnectedNode state.fullGraph
    -- Reload global tutorials
    idxResult <- liftAff
      ( loadTutorialIndex
          state.dataUrls.tutorialIndexUrl
      )
    let
      globalTours = case idxResult of
        Left _ -> []
        Right idx -> idx
    H.modify_ _
      { graph = state.fullGraph
      , activeView = Nothing
      , selected = start
      , tutorialIndex = globalTours
      , tutorial = Nothing
      , tutorialActive = false
      , showTutorialMenu = false
      , showViewPicker = false
      , hoveredEdge = Nothing
      , hoveredNode = Nothing
      }
    renderGraph

  ToggleViewPicker ->
    H.modify_ \s -> s
      { showViewPicker = not s.showViewPicker }

  ToggleQueryCatalog ->
    H.modify_ \s -> s
      { showQueryCatalog = not s.showQueryCatalog }

  SetCatalogFilter q ->
    H.modify_ _ { catalogFilter = q }

  SelectQuery query -> do
    H.modify_ _
      { tutorialActive = false
      , tutorial = Nothing
      , hoveredNode = Nothing
      }
    if Array.null query.parameters then
      handleAction (ExecuteQuery query)
    else do
      state <- H.get
      case state.oxigraphStore of
        Nothing -> pure unit
        Just store -> do
          -- Discover options for each parameter
          options <- liftEffect $ discoverParamOptions store
            query.parameters
          H.modify_ _
            { activeQuery = Just query
            , paramValues = Map.empty
            , paramOptions = options
            , showQueryCatalog = false
            }

  SetPanelTab tab ->
    H.modify_ _
      { panelTab = tab
      , promptMode = case tab of
          QueriesTab -> PromptQuery
          ToursTab -> PromptTour
      , promptInput = ""
      , promptCopied = false
      }

  SetParamValue name value -> do
    state <- H.get
    let values = Map.insert name value state.paramValues
    H.modify_ _ { paramValues = values }
    -- Auto-execute when all params are filled
    case state.activeQuery of
      Nothing -> pure unit
      Just query -> do
        let
          allFilled = Array.all
            (\p -> Map.member p.name values)
            query.parameters
        when allFilled do
          let bound = bindParameters query.sparql values
          handleAction $ ExecuteQuery
            query { sparql = bound }

  ExecuteQuery query -> do
    state <- H.get
    case state.oxigraphStore of
      Nothing -> pure unit
      Just store -> do
        result <- liftAff $ try $ liftEffect do
          ids <- Oxigraph.querySparqlNodeIds store
            query.sparql
          pure $ Set.fromFoldable ids
        case result of
          Left err ->
            H.modify_ _ { error = Just (show err) }
          Right nodeIds -> do
            let
              filtered = subgraph nodeIds state.fullGraph
              start = mostConnectedNode filtered
            -- Keep the original template in activeQuery
            -- (SelectQuery sets it); only set it for
            -- non-parameterized direct executions.
            let
              setActive = case state.activeQuery of
                Just aq | not (Array.null aq.parameters) ->
                  identity
                _ -> \s -> s { activeQuery = Just query }
            H.modify_ \s -> setActive s
              { graph = filtered
              , selected = start
              , showQueryCatalog = false
              , showViewPicker = false
              , hoveredEdge = Nothing
              , hoveredNode = Nothing
              }
            renderGraph

  ClearQuery -> do
    state <- H.get
    let start = mostConnectedNode state.fullGraph
    H.modify_ _
      { graph = state.fullGraph
      , activeQuery = Nothing
      , selected = start
      , catalogFilter = ""
      , showViewPicker = false
      , hoveredEdge = Nothing
      , hoveredNode = Nothing
      , tutorialActive = false
      , tutorial = Nothing
      }
    renderGraph

renderGraph
  :: forall o
   . H.HalogenM State Action () o Aff Unit
renderGraph = do
  state <- H.get
  let
    visible = case state.selected of
      Just node ->
        let
          hood = neighborhood state.depth
            node.id
            state.graph
        in
          subgraph hood state.graph
      Nothing -> state.graph

  liftEffect $ Cy.setFocusElements
    (GCy.toElements visible)
  for_ state.selected \node ->
    liftEffect $ Cy.markRoot node.id
  persistState

mostConnectedNode :: Graph -> Maybe Node
mostConnectedNode graph =
  let
    edges = graph.edges
    counts = foldl countEdge Map.empty edges
    best = foldl
      ( \acc (Tuple nid count) ->
          case acc of
            Nothing -> Just (Tuple nid count)
            Just (Tuple _ best') ->
              if count > best' then Just (Tuple nid count)
              else acc
      )
      Nothing
      (Map.toUnfoldable counts :: Array _)
  in
    case best of
      Just (Tuple nid _) ->
        Map.lookup nid graph.nodes
      Nothing -> Nothing
  where
  countEdge m edge =
    let
      m1 = Map.alter (Just <<< add 1 <<< orZero) edge.source m
      m2 = Map.alter (Just <<< add 1 <<< orZero) edge.target m1
    in
      m2
  orZero Nothing = 0
  orZero (Just n) = n

applyTutorialStop
  :: forall o
   . H.HalogenM State Action () o Aff Unit
applyTutorialStop = do
  state <- H.get
  case currentStop state of
    Nothing -> pure unit
    Just stop -> case stop.queryId of
      Just qid -> do
        -- Query-based stop: find and execute the query
        let
          mQuery = Array.find (\q -> q.id == qid)
            state.queryCatalog
        case mQuery of
          Nothing -> pure unit
          Just query ->
            case state.oxigraphStore of
              Nothing -> pure unit
              Just store -> do
                result <- liftAff $ try $ liftEffect do
                  ids <- Oxigraph.querySparqlNodeIds store
                    query.sparql
                  pure $ Set.fromFoldable ids
                case result of
                  Left _ -> pure unit
                  Right nodeIds -> do
                    let
                      filtered = subgraph nodeIds
                        state.fullGraph
                      start = mostConnectedNode filtered
                    H.modify_ _
                      { graph = filtered
                      , activeQuery = Just query
                      , selected = start
                      , hoveredEdge = Nothing
                      }
                    renderGraph
      Nothing -> do
        -- Legacy stop: center on node with depth
        let node = Map.lookup stop.node state.graph.nodes
        H.modify_ _
          { selected = node
          , depth = stop.depth
          , hoveredEdge = Nothing
          }
        renderGraph

loadTutorialIndex
  :: String -> Aff (Either String (Array TutorialEntry))
loadTutorialIndex url = do
  resp <- fetch url { method: GET }
  body <- resp.text
  pure case AP.jsonParser body of
    Left err -> Left err
    Right json -> lmapShow $ decodeJson json

loadTutorialFile :: String -> Aff (Either String Tutorial)
loadTutorialFile file = do
  resp <- fetch file { method: GET }
  body <- resp.text
  pure case AP.jsonParser body of
    Left err -> Left err
    Right json -> decodeTutorial json

loadViewIndex
  :: String -> Aff (Either String (Array Views.ViewIndexEntry))
loadViewIndex url = do
  result <- try $ fetch url { method: GET }
  case result of
    Left _ -> pure (Left "no views")
    Right resp -> do
      body <- resp.text
      pure case AP.jsonParser body of
        Left err -> Left err
        Right json -> Views.decodeViewIndex json

loadViewFile :: String -> Aff (Either String Views.View)
loadViewFile url = do
  resp <- fetch url { method: GET }
  body <- resp.text
  pure case AP.jsonParser body of
    Left err -> Left err
    Right json -> Views.decodeView json

loadConfig :: String -> Aff (Either String Config)
loadConfig url = do
  resp <- fetch url { method: GET }
  body <- resp.text
  pure case AP.jsonParser body of
    Left err -> Left err
    Right json -> decodeConfig json

loadGraphData
  :: Array { format :: String, url :: String }
  -> Aff (Either String { graph :: Graph, ontologyKinds :: Map.Map KindId KindDef })
loadGraphData locations =
  case Array.uncons locations of
    Nothing -> pure (Left "no graph source configured")
    Just { head: location, tail: [] }
      | isJsonGraphFormat location.format location.url -> do
          resp <- fetch location.url { method: GET }
          body <- resp.text
          pure case jsonParser body of
            Left err -> Left err
            Right json ->
              map
                ( \graph ->
                    { graph
                    , ontologyKinds: Map.empty
                    }
                )
                (decodeGraph json)
    _ -> do
      parsed <- try do
        quadSets <- traverse fetchAndParseRdf locations
        pure
          ( Rdf.Import.importGraph
              (Array.concat quadSets)
          )
      pure case parsed of
        Left err -> Left (show err)
        Right result -> result

fetchAndParseRdf
  :: { format :: String, url :: String }
  -> Aff (Array Oxigraph.ImportedRdfQuad)
fetchAndParseRdf location = do
  resp <- fetch location.url { method: GET }
  body <- resp.text
  absUrl <- liftEffect (absoluteUrl location.url)
  liftEffect $ Oxigraph.parseQuads location.format absUrl body

loadSparqlStore
  :: Array { format :: String, url :: String }
  -> Aff (Either String Oxigraph.OxigraphStore)
loadSparqlStore locations = do
  parsed <- try do
    store <- liftEffect Oxigraph.createStore
    for_ locations \location -> do
      resp <- fetch location.url { method: GET }
      body <- resp.text
      absUrl <- liftEffect (absoluteUrl location.url)
      liftEffect $ Oxigraph.loadRdf store location.format absUrl body
    pure store
  pure case parsed of
    Left err -> Left (show err)
    Right store -> Right store

loadQueryCatalog
  :: String -> Aff (Either String Query.QueryCatalog)
loadQueryCatalog url = do
  result <- try $ fetch url { method: GET }
  case result of
    Left _ -> pure (Left "no query catalog")
    Right resp -> do
      body <- resp.text
      pure case AP.jsonParser body of
        Left err -> Left err
        Right json -> Query.decodeQueryCatalog json

discoverParamOptions
  :: Oxigraph.OxigraphStore
  -> Array Query.Parameter
  -> Effect (Map.Map String (Array String))
discoverParamOptions store params = do
  pairs <- traverse discoverOne params
  pure $ Map.fromFoldable pairs
  where
  discoverOne p = do
    values <- Oxigraph.querySparqlStrings store
      (discoveryQuery p)
    let
      labels = Array.sort $ Array.nub $
        map extractLocalName values
    pure (Tuple p.name labels)

  discoveryQuery p | p.paramType == "kind" =
    "PREFIX gbk: <https://lambdasistemi.github.io/graph-browser/vocab/kinds#>\n"
      <> "SELECT DISTINCT ?v WHERE { ?node a ?v . FILTER(STRSTARTS(STR(?v), STR(gbk:))) }"
  discoveryQuery p | p.paramType == "node" && p.name == "root" =
    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n"
      <> "SELECT DISTINCT ?v WHERE {\n"
      <> "  ?child rdfs:subClassOf ?ancestor .\n"
      <> "  FILTER(isIRI(?child) && isIRI(?ancestor) && ?child != ?ancestor)\n"
      <> "  BIND(CONCAT(\"owl-\", LCASE(REPLACE(REPLACE(STR(?ancestor), \"^.*(#|/)\", \"\"), \"[^A-Za-z0-9]+\", \"-\"))) AS ?v)\n"
      <> "}"
  discoveryQuery p | p.paramType == "node" =
    "PREFIX gb: <https://lambdasistemi.github.io/graph-browser/vocab/terms#>\n"
      <> "PREFIX owl: <http://www.w3.org/2002/07/owl#>\n"
      <> "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n"
      <> "SELECT DISTINCT ?v WHERE {\n"
      <> "  { ?node gb:nodeId ?v }\n"
      <> "  UNION {\n"
      <> "    { ?class a owl:Class }\n"
      <> "    UNION { ?class a rdfs:Class }\n"
      <> "    BIND(CONCAT(\"owl-\", LCASE(REPLACE(REPLACE(STR(?class), \"^.*(#|/)\", \"\"), \"[^A-Za-z0-9]+\", \"-\"))) AS ?v)\n"
      <> "  }\n"
      <> "}"
  discoveryQuery p | p.paramType == "group" =
    "PREFIX gb: <https://lambdasistemi.github.io/graph-browser/vocab/terms#>\n"
      <> "SELECT DISTINCT ?v WHERE { ?node gb:group ?v }"
  discoveryQuery _ =
    "SELECT DISTINCT ?v WHERE { ?s ?p ?v . FILTER(isLiteral(?v)) } LIMIT 100"

  extractLocalName v =
    let
      hash = String.lastIndexOf (String.Pattern "#") v
      slash = String.lastIndexOf (String.Pattern "/") v
      sep = case hash, slash of
        Just h, Just s -> Just (max h s)
        Just h, Nothing -> Just h
        Nothing, Just s -> Just s
        Nothing, Nothing -> Nothing
    in
      case sep of
        Just i -> String.drop (i + 1) v
        Nothing -> v

bindParameters :: String -> Map.Map String String -> String
bindParameters sparql values =
  foldl
    ( \acc (Tuple name value) ->
        String.replaceAll
          (String.Pattern ("$" <> name))
          (String.Replacement value)
          acc
    )
    sparql
    (Map.toUnfoldable values :: Array (Tuple String String))

persistState
  :: forall o
   . H.HalogenM State Action () o Aff Unit
persistState = do
  state <- H.get
  liftEffect $ Persist.save state.config.title
    { selectedNodeId: map _.id state.selected
    , depth: state.depth
    , tutorialId: case state.tutorial of
        Just t -> Just t.id
        Nothing -> Nothing
    , tutorialStep:
        if state.tutorialActive then Just state.tutorialStep
        else Nothing
    }

-- Helpers

setDocTitle :: String -> Effect Unit
setDocTitle title = do
  w <- Web.HTML.window
  doc <- Web.HTML.Window.document w
  Web.HTML.HTMLDocument.setTitle title doc

depthBtn
  :: forall m
   . Int
  -> Int
  -> H.ComponentHTML Action () m
depthBtn n current =
  HH.button
    [ cls
        ( "depth-btn"
            <>
              if n == current then " active"
              else ""
        )
    , HE.onClick \_ -> SetDepth n
    ]
    [ HH.text (show n) ]

lmapShow :: forall a. Either _ a -> Either String a
lmapShow (Left e) = Left (printJsonDecodeError e)
lmapShow (Right a) = Right a

-- | Resolve a possibly-relative path against a base URL.
-- | If the path starts with "http" it's returned as-is.
-- | Otherwise it's appended to the base URL.
resolveUrl :: String -> String -> String
resolveUrl base path =
  if String.take 4 path == "http" then path
  else base <> path

graphSourceLocations
  :: forall r
   . { baseUrl :: String, graphUrl :: String | r }
  -> Config
  -> Array { format :: String, url :: String }
graphSourceLocations urls cfg =
  case cfg.graphSources of
    sources | not (Array.null sources) ->
      map
        ( \source ->
            { format: source.format
            , url: resolveUrl urls.baseUrl source.path
            }
        )
        sources
    _ ->
      case cfg.graphSource of
        Just source ->
          [ { format: source.format
            , url: resolveUrl urls.baseUrl source.path
            }
          ]
        Nothing ->
          [ { format: "application/json"
            , url: urls.graphUrl
            }
          ]

isRdfConfig :: Config -> Boolean
isRdfConfig cfg = not (Array.null cfg.graphSources) || isJust cfg.graphSource

isJsonGraphFormat :: String -> String -> Boolean
isJsonGraphFormat format url =
  format == "application/json"
    || format == "json"
    || String.drop (String.length url - 5) url == ".json"

cls
  :: forall r i
   . String
  -> HH.IProp (class :: String | r) i
cls = HP.class_ <<< HH.ClassName

lookupKind :: Config -> KindId -> KindDef
lookupKind cfg kid = case Map.lookup kid cfg.kinds of
  Just def -> def
  Nothing ->
    { label: kid, color: "#8b949e", shape: "ellipse" }

kindColor :: Config -> KindId -> String
kindColor cfg kid = (lookupKind cfg kid).color

kindLabel :: Config -> KindId -> String
kindLabel cfg kid = (lookupKind cfg kid).label

shouldRenderOntologyReference :: String -> Boolean
shouldRenderOntologyReference iri =
  (String.take 7 iri == "http://" || String.take 8 iri == "https://")
    && not
      ( String.take 52 iri
          == "https://lambdasistemi.github.io/graph-browser/vocab/"
      )

kindsToForeign :: Config -> Foreign
kindsToForeign cfg =
  unsafeToForeign $ FO.fromFoldable
    ( map
        ( \(Tuple k v) -> Tuple k
            (unsafeToForeign v)
        )
        ( Map.toUnfoldable cfg.kinds
            :: Array (Tuple String KindDef)
        )
    )

mergeKinds
  :: Map.Map KindId KindDef
  -> Map.Map KindId KindDef
  -> Map.Map KindId KindDef
mergeKinds base extra =
  foldl
    (\acc (Tuple kindId kindDef) -> Map.insert kindId kindDef acc)
    base
    (Map.toUnfoldable extra :: Array (Tuple KindId KindDef))
