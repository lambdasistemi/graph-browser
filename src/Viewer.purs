module Viewer where

import Prelude

import Data.Array as Array
import Data.Either (Either(..))
import Data.Foldable (foldl, for_)
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Set as Set
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
import FFI.Theme as Theme
import FFI.Url as Url
import Graph.Cytoscape as GCy
import Graph.Operations (filterBySources, neighborhood, subgraph)
import Foreign (Foreign, unsafeToForeign)
import Foreign.Object as FO
import Graph.Search (SearchResult(..), search)
import Layout
  ( LayoutId
  , LayoutSource(..)
  , defaultLayout
  , layoutIdToString
  )
import Persist as Persist
import Graph.Types
  ( Config
  , Graph
  , KindDef
  , KindId
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
import Viewer.Types
  ( DataUrls
  , PromptMode(..)
  , State
  , Action(..)
  , PanelTab(..)
  )
import Viewer.Helpers
  ( cls
  , kindLabel
  , kindColor
  , shouldRenderOntologyReference
  )
import Viewer.Tooltip (renderHoverTooltip)
import Viewer.Controls (renderControls, renderLegend, renderGraphContext)
import Viewer.Tutorial (currentStop)
import Viewer.QueryPanel (renderQueryPanel)
import Viewer.Sidebar (renderSidebar)
import Viewer.SourcesPanel (renderSourcesPanel)
import Viewer.Loader
  ( loadConfig
  , loadGraphData
  , loadSparqlStore
  , loadQueryCatalog
  , loadTutorialIndex
  , loadTutorialFile
  , loadViewIndex
  , loadViewFile
  , discoverParamOptions
  , bindParameters
  , resolveUrl
  , graphSourceLocations
  , isRdfConfig
  )

-- | The viewer component, parameterized by data URLs.
viewer
  :: forall q o. H.Component q DataUrls o Aff
viewer = H.mkComponent
  { initialState: \urls ->
      { config: emptyConfig
      , graph: emptyGraph
      , fullGraph: emptyGraph
      , dataUrls: urls
      , theme: "dark"
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
      , activeLayout: defaultLayout
      , layoutSource: Fallback
      , hiddenSources: Set.empty
      , showSourcesPanel: false
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
        else
          [ HH.div [ cls "left-column" ]
              [ renderSourcesPanel state
              , renderQueryPanel state
              ]
          ]
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

handleAction
  :: forall o
   . Action
  -> H.HalogenM State Action () o Aff Unit
handleAction = case _ of
  Initialize -> do
    urlTheme <- liftEffect Url.getThemeParam
    storedTheme <- liftEffect Persist.loadThemePreference
    systemTheme <- liftEffect Theme.getSystemTheme
    let
      requestedTheme =
        resolveThemePreference urlTheme storedTheme
      currentTheme =
        resolveTheme requestedTheme systemTheme
    liftEffect $ Theme.applyTheme currentTheme
    H.modify_ _ { theme = currentTheme }
    state0 <- H.get
    let urls = state0.dataUrls
    cfgResult <- liftAff (loadConfig urls.configUrl)
    case cfgResult of
      Left _ -> pure unit
      Right cfg -> do
        H.modify_ _ { config = cfg }
        liftEffect $ setDocTitle cfg.title
    stateWithConfig <- H.get
    savedLayout <- liftEffect $ Persist.loadLayoutPreference
      (viewerIdentity stateWithConfig)
    case savedLayout of
      Just layout ->
        H.modify_ _
          { activeLayout = layout
          , layoutSource = SavedExplicit
          }
      Nothing -> pure unit
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

  ToggleTheme -> do
    currentTheme <- H.gets _.theme
    let nextTheme = toggleTheme currentTheme
    liftEffect $ Theme.applyTheme nextTheme
    liftEffect $ Persist.saveThemePreference nextTheme
    liftEffect $ Url.setThemeParam nextTheme
    H.modify_ _ { theme = nextTheme }

  SetLayout layout -> do
    state <- H.get
    H.modify_ _
      { activeLayout = layout
      , layoutSource = SavedExplicit
      }
    liftEffect $ Persist.saveLayoutPreference
      (viewerIdentity state)
      layout
    liftEffect $ Cy.setLayout
      (layoutIdToString layout)

  ToggleTutorialMenu ->
    H.modify_ \s -> s
      { showTutorialMenu = not s.showTutorialMenu }

  StartTutorial file -> do
    state <- H.get
    let
      nextLayoutState = case state.activeView of
        Just view ->
          derivedLayoutState state view.layout
        Nothing ->
          derivedLayoutState state Nothing
    -- Restore full graph when exiting a query to start a tour
    H.modify_ _
      { graph = state.fullGraph
      , activeQuery = Nothing
      , activeLayout =
          nextLayoutState.activeLayout
      , layoutSource =
          nextLayoutState.layoutSource
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
                , sources: []
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
                    , sources: []
                    }
                    { id: edge.targetId
                    , label: edge.targetLabel
                    , kind: ""
                    , group: ""
                    , description: ""
                    , links: []
                    , ontologyRef: Nothing
                    , sources: []
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
          nextLayoutState = derivedLayoutState
            state
            view.layout
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
          , activeLayout =
              nextLayoutState.activeLayout
          , layoutSource =
              nextLayoutState.layoutSource
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
      nextLayoutState = derivedLayoutState
        state
        Nothing
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
      , activeLayout =
          nextLayoutState.activeLayout
      , layoutSource =
          nextLayoutState.layoutSource
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

  ToggleSource iri -> do
    state <- H.get
    let
      nextHidden =
        if Set.member iri state.hiddenSources then
          Set.delete iri state.hiddenSources
        else
          Set.insert iri state.hiddenSources
    H.modify_ _ { hiddenSources = nextHidden }
    renderGraph

  ToggleSourcesPanel ->
    H.modify_ \s -> s { showSourcesPanel = not s.showSourcesPanel }

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
              nextLayoutState =
                if Array.elem "view" query.tags then
                  derivedLayoutState state query.layout
                else
                  { activeLayout: state.activeLayout
                  , layoutSource: state.layoutSource
                  }
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
              , activeLayout =
                  nextLayoutState.activeLayout
              , layoutSource =
                  nextLayoutState.layoutSource
              }
            renderGraph

  ClearQuery -> do
    state <- H.get
    let
      start = mostConnectedNode state.fullGraph
      nextLayoutState = derivedLayoutState
        state
        Nothing
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
      , activeLayout =
          nextLayoutState.activeLayout
      , layoutSource =
          nextLayoutState.layoutSource
      }
    renderGraph

renderGraph
  :: forall o
   . H.HalogenM State Action () o Aff Unit
renderGraph = do
  state <- H.get
  let
    base = case state.selected of
      Just node ->
        let
          hood = neighborhood state.depth
            node.id
            state.graph
        in
          subgraph hood state.graph
      Nothing -> state.graph
    visible = filterBySources state.hiddenSources base

  liftEffect $ Cy.setFocusElements
    (layoutIdToString state.activeLayout)
    (GCy.toElements visible)
  liftEffect $ replaySelectionState state
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
                      nextLayoutState =
                        if Array.elem "view" query.tags then
                          derivedLayoutState state query.layout
                        else
                          { activeLayout: state.activeLayout
                          , layoutSource: state.layoutSource
                          }
                    H.modify_ _
                      { graph = filtered
                      , activeQuery = Just query
                      , selected = start
                      , hoveredEdge = Nothing
                      , activeLayout =
                          nextLayoutState.activeLayout
                      , layoutSource =
                          nextLayoutState.layoutSource
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

normalizeTheme :: String -> String
normalizeTheme theme =
  if theme == "light" then "light"
  else "dark"

normalizeThemePreference :: String -> Maybe String
normalizeThemePreference theme
  | theme == "light" = Just "light"
  | theme == "dark" = Just "dark"
  | theme == "auto" = Just "auto"
  | otherwise = Nothing

resolveThemePreference :: String -> Maybe String -> String
resolveThemePreference urlTheme storedTheme =
  case normalizeThemePreference urlTheme of
    Just theme -> theme
    Nothing -> case storedTheme >>= normalizeThemePreference of
      Just theme -> theme
      Nothing -> "auto"

resolveTheme :: String -> String -> String
resolveTheme requested systemTheme =
  case requested of
    "light" -> "light"
    "dark" -> "dark"
    _ -> normalizeTheme systemTheme

toggleTheme :: String -> String
toggleTheme theme =
  if normalizeTheme theme == "light" then "dark"
  else "light"

replaySelectionState :: State -> Effect Unit
replaySelectionState state = do
  for_ state.selected \node ->
    Cy.markRoot node.id
  for_ state.selectedEdge \edge ->
    Cy.markEdge edge.sourceId edge.targetId

derivedLayoutState
  :: State
  -> Maybe LayoutId
  -> { activeLayout :: LayoutId, layoutSource :: LayoutSource }
derivedLayoutState state mLayout
  | state.layoutSource == SavedExplicit =
      { activeLayout: state.activeLayout
      , layoutSource: SavedExplicit
      }
  | otherwise = case mLayout of
      Just layout ->
        { activeLayout: layout
        , layoutSource: ViewDefault
        }
      Nothing ->
        { activeLayout: defaultLayout
        , layoutSource: Fallback
        }

viewerIdentity :: State -> String
viewerIdentity state =
  case repoIdentityFromBaseUrl state.dataUrls.baseUrl of
    Just repoId -> repoId
    Nothing | state.config.sourceUrl /= "" ->
      state.config.sourceUrl
    Nothing ->
      state.config.title

repoIdentityFromBaseUrl :: String -> Maybe String
repoIdentityFromBaseUrl url = do
  let prefix = "https://raw.githubusercontent.com/"
  if String.take (String.length prefix) url /= prefix then
    Nothing
  else do
    let
      parts = Array.filter (_ /= "")
        ( String.split (String.Pattern "/")
            (String.drop (String.length prefix) url)
        )
    owner <- Array.index parts 0
    repo <- Array.index parts 1
    pure (owner <> "/" <> repo)
