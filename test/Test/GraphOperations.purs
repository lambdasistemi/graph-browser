module Test.GraphOperations (spec) where

import Prelude

import Data.Array as Array
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Set as Set
import Graph.Build (buildGraph)
import Graph.Operations (filterToSources)
import Graph.Types (Edge, Graph, Node)
import Test.Spec (Spec, describe, it)
import Test.Spec.Assertions (shouldEqual)

proposalSource :: String
proposalSource = "urn:gb:source:data/rdf/budget-2026/example.ttl"

supportSource :: String
supportSource = "urn:gb:source:data/rdf/budget-2026/proposers.ttl"

otherSource :: String
otherSource = "urn:gb:source:data/rdf/budget-2026/other.ttl"

mkNode :: String -> Array String -> Node
mkNode nid sources =
  { id: nid
  , label: nid
  , kind: "concept"
  , group: "test"
  , description: ""
  , links: []
  , ontologyRef: Nothing
  , sources
  }

mkEdge :: String -> String -> Array String -> Edge
mkEdge source target sources =
  { source
  , target
  , label: "relates to"
  , description: ""
  , predicateRef: Nothing
  , sources
  }

graph :: Graph
graph =
  buildGraph
    [ mkNode "proposal" [ proposalSource ]
    , mkNode "proposer" [ supportSource ]
    , mkNode "support-only" [ supportSource ]
    , mkNode "other-proposal" [ otherSource ]
    ]
    [ mkEdge "proposal" "proposer" [ proposalSource ]
    , mkEdge "proposer" "support-only" [ supportSource ]
    , mkEdge "other-proposal" "support-only" [ otherSource ]
    ]

spec :: Spec Unit
spec = describe "Graph.Operations.filterToSources" do
  it "keeps selected-source edges and support-sourced endpoint nodes" do
    let
      filtered = filterToSources (Set.singleton proposalSource) graph
    Map.keys filtered.nodes `shouldEqual`
      Set.fromFoldable [ "proposal", "proposer" ]
    map (\e -> e.source <> "->" <> e.target) filtered.edges `shouldEqual`
      [ "proposal->proposer" ]

  it "returns an empty graph when no source is selected" do
    let
      filtered = filterToSources Set.empty graph
    Map.isEmpty filtered.nodes `shouldEqual` true
    Array.null filtered.edges `shouldEqual` true
