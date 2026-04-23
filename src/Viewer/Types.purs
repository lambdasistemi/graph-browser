module Viewer.Types where

import Data.Map as Map
import Data.Maybe (Maybe)
import Data.Set (Set)
import Graph.Types (Config, Node, Graph)
import Graph.Query as Query
import Graph.Views as Views
import FFI.Oxigraph as Oxigraph
import Graph.Search (SearchResult)
import Layout (LayoutId, LayoutSource)
import Tutorial (Tutorial)

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
  , predicateRef :: Maybe { label :: String, iri :: String }
  }

-- | Entry in the tutorial index.
type TutorialEntry =
  { id :: String
  , title :: String
  , description :: String
  , file :: String
  }

-- | What kind of prompt the builder is assembling.
data PromptMode
  = PromptNode
  | PromptEdge
  | PromptQuery
  | PromptTour

-- | Application state.
type State =
  { config :: Config
  , graph :: Graph
  , fullGraph :: Graph
  , dataUrls :: DataUrls
  , theme :: String
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
  , activeLayout :: LayoutId
  , layoutSource :: LayoutSource
  -- | IRIs of source graphs the user has hidden. Nodes/edges whose
  -- | sources is a non-empty subset of this set are filtered from the
  -- | view. Nodes/edges with empty sources are always visible.
  , hiddenSources :: Set String
  , showSourcesPanel :: Boolean
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
  | ToggleTheme
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
  | SetLayout LayoutId
  | SetPanelTab PanelTab
  | ToggleSource String
  | ToggleSourcesPanel

data PanelTab = QueriesTab | ToursTab

-- | Ontology identity for a node.
type OntologyIdentity =
  { iri :: String
  , compact :: String
  , namespace :: String
  , namespaceLabel :: String
  }
