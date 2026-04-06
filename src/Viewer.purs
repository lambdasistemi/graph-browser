module Viewer where

import Prelude

import Data.Argonaut.Parser (jsonParser)
import Data.Array as Array
import Data.Either (Either(..))
import Data.Foldable (foldl, for_)
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.String as String
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
  , emptyConfig
  , emptyGraph
  )
import Graph.Views as Views
import FFI.Clipboard as Clipboard
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Halogen.Subscription as HS
import PromptBuilder as PB
import FFI.Oxigraph as Oxigraph

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
  }

-- | Entry in the tutorial index.
type TutorialEntry =
  { id :: String
  , title :: String
  , description :: String
  , file :: String
  }

-- | Application state.
type State =
  { config :: Config
  , graph :: Graph
  , fullGraph :: Graph
  , dataUrls :: DataUrls
  , selected :: Maybe Node
  , hoveredNode :: Maybe Node
  , hoveredEdge :: Maybe EdgeInfo
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
  , viewIndex :: Array Views.ViewIndexEntry
  , activeView :: Maybe Views.View
  , showViewPicker :: Boolean
  }

-- | Actions the component can handle.
data Action
  = Initialize
  | NodeTapped String
  | NodeHovered String
  | EdgeHovered String String String String
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
      , viewIndex: []
      , activeView: Nothing
      , showViewPicker: false
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
    [ HH.div [ cls "graph-container" ]
        [ HH.div [ HP.id "cy" ] []
        , renderControls state
        , renderSearchBox state
        , renderLegend state.config
        ]
    , renderSidebar state
    ]

renderControls
  :: forall m. State -> H.ComponentHTML Action () m
renderControls state =
  HH.div [ cls "controls" ]
    [ HH.div [ cls "tour-menu-wrapper" ]
        [ HH.button
            [ cls
                ( "control-btn"
                    <> if state.tutorialActive
                      then " active"
                      else ""
                )
            , HE.onClick \_ ->
                if state.tutorialActive then
                  ExitTutorial
                else ToggleTutorialMenu
            ]
            [ HH.text
                ( if state.tutorialActive then
                    "Exit Tour"
                  else "Guided Tours"
                )
            ]
        , if state.showTutorialMenu then
            renderTutorialMenu state.tutorialIndex
          else HH.text ""
        ]
    , if Array.null state.viewIndex then HH.text ""
      else
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
              renderViewPicker state
            else HH.text ""
          ]
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
                    <> if state.depth >= 99
                      then " active"
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
    ( map mkEntry entries )
  where
  mkEntry entry =
    HH.div
      [ cls "tour-menu-item"
      , HE.onClick \_ -> StartTutorial entry.file
      ]
      [ HH.div [ cls "tour-menu-title" ]
          [ HH.text entry.title ]
      , HH.div [ cls "tour-menu-desc" ]
          [ HH.text entry.description ]
      ]

renderViewPicker
  :: forall m. State -> H.ComponentHTML Action () m
renderViewPicker state =
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
          (Array.take 12 state.searchResults
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
        [ if state.tutorialActive then
            HH.div_
              ( [ renderTutorialContent state ]
                  <> case state.hoveredEdge of
                    Just edge ->
                      [ renderEdgeDetail state edge ]
                    Nothing -> case state.hoveredNode of
                      Just node ->
                        [ renderNodeDetail state node ]
                      Nothing -> []
              )
          else case state.hoveredEdge of
            Just edge -> renderEdgeDetail state edge
            Nothing -> case state.selected of
              Nothing -> renderEmptyState state.config
              Just node -> renderNodeDetail state node
        ]
    ]
  where
  sidebarTitle =
    if state.tutorialActive then
      case currentStop state of
        Just stop -> stop.title
        Nothing -> "Tutorial"
    else case state.hoveredEdge of
      Just edge -> edge.label
      Nothing -> case state.selected of
        Nothing -> state.config.title
        Just n -> n.label

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
            Just sel -> sel.id /= stop.node
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
          , case state.hoveredNode of
              Nothing -> HH.text ""
              Just node ->
                HH.div [ cls "tutorial-hovered-node" ]
                  [ HH.div [ cls "tutorial-hovered-divider" ]
                      []
                  , HH.span
                      [ cls
                          ( "badge badge-"
                              <> node.kind
                          )
                      ]
                      [ HH.text
                          (kindLabel state.config node.kind)
                      ]
                  , HH.h3 [ cls "tutorial-hovered-label" ]
                      [ HH.text node.label ]
                  , HH.p [ cls "tutorial-hovered-desc" ]
                      [ HH.text node.description ]
                  , if Array.null node.links then
                      HH.text ""
                    else
                      HH.ul [ cls "links" ]
                        ( map
                            ( \l -> HH.li_
                                [ HH.a
                                    [ HP.href l.url
                                    , HP.target "_blank"
                                    , HP.rel "noopener"
                                    ]
                                    [ HH.text l.label
                                    ]
                                ]
                            )
                            node.links
                        )
                  ]
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
    (String.Pattern "]") str
  let linkText = String.take (closeBracket - 1)
        (String.drop 1 str)
  let afterClose = String.drop (closeBracket + 1) str
  openParen <- case String.indexOf
    (String.Pattern "(") afterClose of
    Just 0 -> Just 0
    _ -> Nothing
  let afterParen = String.drop 1 afterClose
  closeParen <- String.indexOf
    (String.Pattern ")") afterParen
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
  HH.div_
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
    , HH.p [ cls "description" ]
        [ HH.text edge.description ]
    , renderPromptBuilder state "Generate prompt to improve this edge"
    ]

renderNodeDetail
  :: forall m
   . State
  -> Node
  -> H.ComponentHTML Action () m
renderNodeDetail state node =
  HH.div_
    [ HH.span
        [ cls ("badge badge-" <> node.kind) ]
        [ HH.text (kindLabel cfg node.kind) ]
    , HH.p [ cls "description" ]
        [ HH.text node.description ]
    , renderLinks node.links
    , renderConnections "Connects to" outEdges
    , renderConnections "Connected from" inEdges
    , renderPromptBuilder state "Generate prompt to improve this node"
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

renderPromptBuilder
  :: forall m. State -> String -> H.ComponentHTML Action () m
renderPromptBuilder state title =
  HH.div [ cls "prompt-builder" ]
    [ HH.h3_ [ HH.text title ]
    , HH.textarea
        [ cls "prompt-textarea"
        , HP.value state.promptInput
        , HP.placeholder "e.g. Add missing connections, update description..."
        , HP.rows 3
        , HE.onValueInput SetPromptInput
        ]
    , HH.div [ cls "prompt-actions" ]
        [ HH.button
            [ cls
                ( "prompt-copy-btn"
                    <> if state.promptCopied then " copied"
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
    liftEffect $ Cy.initCytoscape "cy"
      (kindsToForeign state.config)
    tapSub <- liftEffect HS.create
    liftEffect $ Cy.onNodeTap \nodeId ->
      HS.notify tapSub.listener
        (NodeTapped nodeId)
    void $ H.subscribe tapSub.emitter
    hoverSub <- liftEffect HS.create
    liftEffect $ Cy.onNodeHover \nodeId ->
      HS.notify hoverSub.listener
        (NodeHovered nodeId)
    void $ H.subscribe hoverSub.emitter
    edgeSub <- liftEffect HS.create
    liftEffect $ Cy.onEdgeHover
      \src tgt lbl desc ->
        HS.notify edgeSub.listener
          (EdgeHovered src tgt lbl desc)
    void $ H.subscribe edgeSub.emitter
    let
      graphLocation = graphSourceLocation urls state.config
    result <- liftAff
      (loadGraphData graphLocation.format graphLocation.url)
    case result of
      Left err ->
        H.modify_ _ { error = Just err }
      Right graph -> do
        let start = mostConnectedNode graph
        H.modify_ _
          { graph = graph
          , fullGraph = graph
          , selected = start
          }
    -- Load view index
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
                let tUrl = resolveUrl
                      urls.baseUrl entry.file
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
    H.modify_ _ { selected = node }
    if state.tutorialActive then do
      liftEffect $ Cy.markRoot nodeId
      persistState
    else
      renderGraph

  NodeHovered nodeId -> do
    state <- H.get
    let node = Map.lookup nodeId state.graph.nodes
    if state.tutorialActive then
      H.modify_ _
        { hoveredNode = node
        , hoveredEdge = Nothing
        , promptInput = ""
        , promptCopied = false
        }
    else
      H.modify_ _
        { selected = node
        , hoveredEdge = Nothing
        , promptInput = ""
        , promptCopied = false
        }
    liftEffect $ Cy.markRoot nodeId

  EdgeHovered srcId tgtId lbl desc -> do
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
        }
    state' <- H.get
    if state'.tutorialActive then
      H.modify_ _
        { hoveredNode = Nothing
        , hoveredEdge = Just edgeInfo
        , promptInput = ""
        , promptCopied = false
        }
    else
      H.modify_ _
        { hoveredNode = Nothing
        , hoveredEdge = Just edgeInfo
        , selected = Nothing
        , promptInput = ""
        , promptCopied = false
        }

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
    case state.activeView of
      Just view -> do
        -- View-local tour: file is the tour ID
        let mTour = Array.find
              (\t -> t.id == file) view.tours
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
            H.modify_ _
              { tutorial = Just tut
              , tutorialStep = 0
              , tutorialActive = true
              , showTutorialMenu = false
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
      }
    renderGraph

  SetPromptInput text ->
    H.modify_ _ { promptInput = text, promptCopied = false }

  CopyPrompt -> do
    state <- H.get
    let
      prompt = case state.hoveredEdge of
        Just edge ->
          let
            srcNode = Map.lookup edge.sourceId state.graph.nodes
            tgtNode = Map.lookup edge.targetId state.graph.nodes
            rawEdge =
              { source: edge.sourceId
              , target: edge.targetId
              , label: edge.label
              , description: edge.description
              }
          in
            case srcNode, tgtNode of
              Just sn, Just tn ->
                PB.buildEdgePrompt state.config state.graph
                  rawEdge sn tn state.promptInput
              _, _ ->
                PB.buildEdgePrompt state.config state.graph
                  rawEdge
                  { id: edge.sourceId, label: edge.sourceLabel
                  , kind: "", group: "", description: ""
                  , links: []
                  }
                  { id: edge.targetId, label: edge.targetLabel
                  , kind: "", group: "", description: ""
                  , links: []
                  }
                  state.promptInput
        Nothing -> case state.selected of
          Just node ->
            PB.buildNodePrompt state.config state.graph
              node state.promptInput
          Nothing -> ""
    when (prompt /= "") do
      liftAff $ Clipboard.copyToClipboard prompt
      H.modify_ _ { promptCopied = true }

  SelectView file -> do
    state <- H.get
    let vUrl = resolveUrl
          state.dataUrls.baseUrl
          ("data/views/" <> file)
    viewResult <- liftAff (loadViewFile vUrl)
    case viewResult of
      Left _ -> pure unit
      Right view -> do
        let filtered = Views.filterByView view
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
      (loadTutorialIndex
        state.dataUrls.tutorialIndexUrl)
    let globalTours = case idxResult of
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
              if count > best'
                then Just (Tuple nid count)
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
    Just stop -> do
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

loadGraphData :: String -> String -> Aff (Either String Graph)
loadGraphData format url = do
  resp <- fetch url { method: GET }
  body <- resp.text
  if isJsonGraphFormat format url then
    pure case jsonParser body of
      Left err -> Left err
      Right json -> decodeGraph json
  else do
    parsed <- try do
      quads <- liftEffect
        (Oxigraph.parseQuads format url body)
      pure (Rdf.Import.importGraph quads)
    pure case parsed of
      Left err -> Left (show err)
      Right result -> result

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
            <> if n == current then " active"
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

graphSourceLocation
  :: forall r
   . { baseUrl :: String, graphUrl :: String | r }
  -> Config
  -> { format :: String, url :: String }
graphSourceLocation urls cfg = case cfg.graphSource of
  Just source ->
    { format: source.format
    , url: resolveUrl urls.baseUrl source.path
    }
  Nothing ->
    { format: "application/json"
    , url: urls.graphUrl
    }

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
