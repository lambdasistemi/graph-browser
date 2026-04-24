-- | Pure anchor-based model for the interactively shaped visible subset.
-- | Expand adds reasons to a node's reason-set; collapse removes them.
-- | A node stays visible while any reason holds.
module Graph.Shaping
  ( Reason(..)
  , Position
  , ShapingState
  , emptyShaping
  , initFromSeed
  , expand
  , collapse
  , shrink
  , reset
  , isVisible
  , visibleNodes
  , hasHiddenNeighbors
  , recordPosition
  , dropPositions
  , largeExpandThreshold
  , anchorsOf
  , hasAnyAnchor
  ) where

import Prelude

import Data.Foldable (foldl)
import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Set (Set)
import Data.Set as Set
import Data.Tuple (Tuple(..))
import Graph.Operations (neighborhood)
import Graph.Types (Graph, NodeId)

data Reason
  = InitialSeed
  | ExpandedFrom NodeId

derive instance eqReason :: Eq Reason
derive instance ordReason :: Ord Reason

instance showReason :: Show Reason where
  show InitialSeed = "InitialSeed"
  show (ExpandedFrom n) = "ExpandedFrom " <> show n

type Position = { x :: Number, y :: Number }

type ShapingState =
  { reasons :: Map NodeId (Set Reason)
  , positions :: Map NodeId Position
  }

-- | Upper bound before a single expand requires user confirmation.
largeExpandThreshold :: Int
largeExpandThreshold = 20

emptyShaping :: ShapingState
emptyShaping = { reasons: Map.empty, positions: Map.empty }

-- | Seed the visible set; every seed node carries only the InitialSeed reason.
initFromSeed :: Set NodeId -> ShapingState
initFromSeed seed =
  { reasons: foldl (\m n -> Map.insert n (Set.singleton InitialSeed) m) Map.empty (Set.toUnfoldable seed :: Array NodeId)
  , positions: Map.empty
  }

-- | Alias of initFromSeed: discards any prior shaping.
reset :: Set NodeId -> ShapingState
reset = initFromSeed

isVisible :: NodeId -> ShapingState -> Boolean
isVisible n s = Map.member n s.reasons

visibleNodes :: ShapingState -> Set NodeId
visibleNodes s = Map.keys s.reasons # Set.fromFoldable

-- | Add reason (ExpandedFrom anchor) to every hidden direct neighbor of
-- | `anchor`. Returns the updated state and the set of newly-revealed node ids.
expand
  :: NodeId
  -> Graph
  -> ShapingState
  -> { next :: ShapingState, added :: Set NodeId }
expand anchor g s =
  let
    oneHop = neighborhood 1 anchor g
    visible = visibleNodes s
    candidates = Set.delete anchor oneHop
    added = Set.difference candidates visible
    reason = ExpandedFrom anchor
    addReason acc nid =
      Map.alter
        ( case _ of
            Nothing -> Just (Set.singleton reason)
            Just existing -> Just (Set.insert reason existing)
        )
        nid
        acc
    -- Update reasons for every direct neighbor of the anchor, whether it
    -- was already visible or brought in by this call. That is how a
    -- shared neighbor accumulates multiple anchors.
    nextReasons = foldl addReason s.reasons (Set.toUnfoldable candidates :: Array NodeId)
  in
    { next: s { reasons = nextReasons }
    , added
    }

-- | Remove the ExpandedFrom-anchor reason from every node's reason-set;
-- | drop nodes whose reason-set became empty (and their positions). The
-- | anchor itself is never removed by collapsing itself.
collapse
  :: NodeId
  -> ShapingState
  -> { next :: ShapingState, removed :: Set NodeId }
collapse anchor s =
  let
    target = ExpandedFrom anchor

    step
      :: NodeId
      -> Set Reason
      -> { reasons :: Map NodeId (Set Reason), removed :: Set NodeId }
      -> { reasons :: Map NodeId (Set Reason), removed :: Set NodeId }
    step nid rs acc =
      if nid == anchor then
        acc { reasons = Map.insert nid rs acc.reasons }
      else
        let
          rs' = Set.delete target rs
        in
          if Set.isEmpty rs' then
            acc { removed = Set.insert nid acc.removed }
          else
            acc { reasons = Map.insert nid rs' acc.reasons }

    folded =
      foldl
        (\acc (Tuple nid rs) -> step nid rs acc)
        { reasons: Map.empty, removed: Set.empty }
        (Map.toUnfoldable s.reasons :: Array (Tuple NodeId (Set Reason)))

    nextPositions =
      foldl (flip Map.delete) s.positions
        (Set.toUnfoldable folded.removed :: Array NodeId)
  in
    { next:
        { reasons: folded.reasons
        , positions: nextPositions
        }
    , removed: folded.removed
    }

-- | Remove the node and any neighbors that were only anchored by it. This
-- | is the "fallback collapse" for nodes that have nothing to expand (all
-- | 1-hop neighbors already visible) and nothing to collapse in the
-- | anchor sense (no dependents). InitialSeed protection is overridden:
-- | an explicit click is an explicit hide request.
shrink :: NodeId -> ShapingState -> { next :: ShapingState, removed :: Set NodeId }
shrink n s =
  let
    r = collapse n s
    reasons' = Map.delete n r.next.reasons
    positions' = Map.delete n r.next.positions
    removed = Set.insert n r.removed
  in
    { next: { reasons: reasons', positions: positions' }
    , removed
    }

-- | True iff `n` has at least one direct neighbor (in `g`) that is not
-- | currently visible in `s`.
hasHiddenNeighbors :: Graph -> NodeId -> ShapingState -> Boolean
hasHiddenNeighbors g n s =
  let
    oneHop = Set.delete n (neighborhood 1 n g)
    visible = visibleNodes s
    hidden = Set.difference oneHop visible
  in
    not (Set.isEmpty hidden)

recordPosition :: NodeId -> Position -> ShapingState -> ShapingState
recordPosition n p s =
  if Map.member n s.reasons then s { positions = Map.insert n p s.positions }
  else s

dropPositions :: Set NodeId -> ShapingState -> ShapingState
dropPositions ids s =
  s
    { positions =
        foldl (flip Map.delete) s.positions
          (Set.toUnfoldable ids :: Array NodeId)
    }

-- | The set of anchors (ExpandedFrom) for a given node, if any.
anchorsOf :: NodeId -> ShapingState -> Set NodeId
anchorsOf n s =
  case Map.lookup n s.reasons of
    Nothing -> Set.empty
    Just rs ->
      foldl
        ( \acc r -> case r of
            ExpandedFrom k -> Set.insert k acc
            InitialSeed -> acc
        )
        Set.empty
        (Set.toUnfoldable rs :: Array Reason)

-- | True iff the node is listed as an anchor in any other node's reason-set
-- | (i.e. collapsing it would actually remove something).
hasAnyAnchor :: NodeId -> ShapingState -> Boolean
hasAnyAnchor anchor s =
  foldl
    ( \found rs -> found || Set.member (ExpandedFrom anchor) rs
    )
    false
    (Map.values s.reasons)

