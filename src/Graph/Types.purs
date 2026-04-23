-- | Core types for the knowledge graph browser.
module Graph.Types
  ( NodeId
  , KindId
  , OntologyReference
  , KindDef
  , Link
  , Node
  , Edge
  , Graph
  , GraphSource
  , Config
  , emptyGraph
  , emptyConfig
  ) where

import Prelude

import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Set (Set)

-- | Unique identifier for a node.
type NodeId = String

-- | Kind identifier (e.g. "actor", "process").
type KindId = String

-- | A preserved ontology term reference behind a rendered label.
type OntologyReference =
  { label :: String
  , iri :: String
  }

-- | Kind definition from config.
type KindDef =
  { label :: String
  , color :: String
  , shape :: String
  }

-- | An external link associated with a node.
type Link =
  { label :: String
  , url :: String
  }

-- | A node in the knowledge graph.
type Node =
  { id :: NodeId
  , label :: String
  , kind :: KindId
  , group :: String
  , description :: String
  , links :: Array Link
  , ontologyRef :: Maybe OntologyReference
  -- | IRIs of the source graphs that contributed at least one statement
  -- | about this node. Empty for nodes without provenance (e.g. loaded
  -- | from a legacy JSON graph).
  , sources :: Array String
  }

-- | A directed edge in the knowledge graph.
type Edge =
  { source :: NodeId
  , target :: NodeId
  , label :: String
  , description :: String
  , predicateRef :: Maybe OntologyReference
  -- | IRIs of the source graphs that contributed the triple underlying
  -- | this edge. Typically a singleton, but can be larger when the same
  -- | triple is defined in more than one source.
  , sources :: Array String
  }

-- | The full graph: nodes, edges, and adjacency.
type Graph =
  { nodes :: Map NodeId Node
  , edges :: Array Edge
  , forward :: Map NodeId (Set NodeId)
  , backward :: Map NodeId (Set NodeId)
  }

-- | Optional alternate graph payload source declared in config.json.
type GraphSource =
  { format :: String
  , path :: String
  -- | Optional human-readable label. Empty string means "no label
  -- | configured"; UI code falls back to the path in that case.
  , label :: String
  }

-- | Application configuration loaded from config.json.
type Config =
  { title :: String
  , description :: String
  , sourceUrl :: String
  , kinds :: Map KindId KindDef
  , graphSource :: Maybe GraphSource
  , graphSources :: Array GraphSource
  }

-- | An empty graph.
emptyGraph :: Graph
emptyGraph =
  { nodes: Map.empty
  , edges: []
  , forward: Map.empty
  , backward: Map.empty
  }

-- | Default empty config.
emptyConfig :: Config
emptyConfig =
  { title: "Knowledge Graph"
  , description: ""
  , sourceUrl: ""
  , kinds: Map.empty
  , graphSource: Nothing
  , graphSources: []
  }
