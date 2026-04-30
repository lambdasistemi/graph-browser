-- | Pure graph operations: neighborhood extraction,
-- | filtering, subgraph construction.
module Graph.Operations
  ( neighborhood
  , subgraph
  , filterBySources
  , filterToSources
  ) where

import Prelude

import Data.Array as Array
import Data.Foldable (foldl)
import Data.Map as Map
import Data.Maybe (fromMaybe)
import Data.Set (Set)
import Data.Set as Set
import Graph.Build (buildGraph)
import Graph.Types (Graph, NodeId)

-- | Collect all node IDs reachable within n hops
-- | (both forward and backward) from a root node.
neighborhood :: Int -> NodeId -> Graph -> Set NodeId
neighborhood depth root graph = go depth (Set.singleton root)
  where
  go 0 visited = visited
  go n visited =
    let
      newNeighbors = foldl
        ( \acc nid ->
            let
              fwd = fromMaybe Set.empty
                (Map.lookup nid graph.forward)
              bwd = fromMaybe Set.empty
                (Map.lookup nid graph.backward)
            in
              Set.union acc
                (Set.union fwd bwd)
        )
        Set.empty
        visited
      expanded = Set.union visited newNeighbors
    in
      if expanded == visited then visited
      else go (n - 1) expanded

-- | Extract a subgraph containing only the given
-- | node IDs and their connecting edges.
subgraph :: Set NodeId -> Graph -> Graph
subgraph keep graph =
  buildGraph keptNodes keptEdges
  where
  keptNodes = Array.filter
    (\n -> Set.member n.id keep)
    (Array.fromFoldable (Map.values graph.nodes))

  keptEdges = Array.filter
    ( \e ->
        Set.member e.source keep
          && Set.member e.target keep
    )
    graph.edges

-- | Hide nodes and edges whose `sources` is a non-empty subset of the
-- | user-hidden sources. Elements with an empty `sources` list have no
-- | provenance to filter against and are always visible. Edges whose
-- | source or target node is hidden are also dropped, to keep the
-- | output well-formed.
filterBySources :: Set String -> Graph -> Graph
filterBySources hidden graph
  | Set.isEmpty hidden = graph
  | otherwise = buildGraph keptNodes keptEdges
      where
      nodeVisible n =
        Array.null n.sources
          || Array.any
            (\src -> not (Set.member src hidden))
            n.sources

      edgeVisible e =
        Array.null e.sources
          || Array.any
            (\src -> not (Set.member src hidden))
            e.sources

      keptNodes = Array.filter
        nodeVisible
        (Array.fromFoldable (Map.values graph.nodes))

      keptNodeIds = Set.fromFoldable (map _.id keptNodes)

      keptEdges = Array.filter
        ( \e ->
            edgeVisible e
              && Set.member e.source keptNodeIds
              && Set.member e.target keptNodeIds
        )
        graph.edges

-- | Keep only graph structure contributed by one of the explicitly
-- | visible sources. Endpoint nodes of kept edges are retained even
-- | when their own label/metadata triples came from support sources.
filterToSources :: Set String -> Graph -> Graph
filterToSources visible graph
  | Set.isEmpty visible = buildGraph [] []
  | otherwise = buildGraph keptNodes keptEdges
      where
      hasVisibleSource sources =
        Array.any (\src -> Set.member src visible) sources

      keptEdges = Array.filter
        (\e -> hasVisibleSource e.sources)
        graph.edges

      endpointIds = foldl
        (\ids edge -> Set.insert edge.source (Set.insert edge.target ids))
        Set.empty
        keptEdges

      keptNodes = Array.filter
        (\n -> hasVisibleSource n.sources || Set.member n.id endpointIds)
        (Array.fromFoldable (Map.values graph.nodes))
