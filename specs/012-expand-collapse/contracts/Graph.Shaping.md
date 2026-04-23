# Contract — `Graph.Shaping` (NEW module)

Pure PureScript module encapsulating the anchor model. No effects, no Cytoscape, no localStorage. This is the module the `/speckit.tasks` breakdown can put behind unit tests.

```purescript
module Graph.Shaping
  ( Reason(..)
  , ShapingState
  , Position
  , initFromSeed
  , expand
  , collapse
  , reset
  , isVisible
  , visibleNodes
  , hasHiddenNeighbors
  , recordPosition
  , dropPositions
  , largeExpandThreshold
  ) where

import Graph.Types (Graph, NodeId)
import Data.Map (Map)
import Data.Set (Set)

data Reason = InitialSeed | ExpandedFrom NodeId

type Position = { x :: Number, y :: Number }

type ShapingState =
  { reasons :: Map NodeId (Set Reason)
  , positions :: Map NodeId Position
  }

initFromSeed :: Set NodeId -> ShapingState
expand       :: NodeId -> Graph -> ShapingState -> { next :: ShapingState, added :: Set NodeId }
collapse     :: NodeId -> ShapingState -> { next :: ShapingState, removed :: Set NodeId }
reset        :: Set NodeId -> ShapingState
isVisible    :: NodeId -> ShapingState -> Boolean
visibleNodes :: ShapingState -> Set NodeId
hasHiddenNeighbors :: Graph -> NodeId -> ShapingState -> Boolean
recordPosition :: NodeId -> Position -> ShapingState -> ShapingState
dropPositions  :: Set NodeId -> ShapingState -> ShapingState

largeExpandThreshold :: Int
largeExpandThreshold = 20
```

### Behavioral contract (must hold for all inputs)

1. **Idempotence of expand**: `expand n g (expand n g s).next == (expand n g s).next`.
2. **Idempotence of collapse**: `collapse n (collapse n s).next == (collapse n s).next`.
3. **Collapse preserves multi-anchored neighbors**: if `m ∈ visible` and `reasons[m] ⊇ {ExpandedFrom a, r}` with `r ≠ ExpandedFrom a`, then `m ∈ visible (collapse a s).next`.
4. **Self-preservation on collapse**: `n ∈ visible s ⟹ n ∈ visible (collapse n s).next`.
5. **Position preservation**: for any `m` with `m ∈ visible s ∧ m ∈ visible s'` where `s' = (expand x g s).next` or `s' = (collapse x s).next`, `positions[m]` is unchanged.
6. **Empty reason-set removes node**: if `reasons[m]` would become `∅` after a transition, `m` is removed from both `reasons` and `positions`.
7. **Seed purity**: no transition adds `InitialSeed` to a node's reasons except `initFromSeed` and `reset`.
