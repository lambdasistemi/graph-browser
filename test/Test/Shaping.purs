module Test.Shaping (spec) where

import Prelude

import Data.Maybe (Maybe(..))
import Data.Map as Map
import Data.Set (Set)
import Data.Set as Set
import Graph.Build (buildGraph)
import Graph.Shaping
  ( Reason(..)
  , anchorsOf
  , collapse
  , expand
  , hasAnyAnchor
  , hasHiddenNeighbors
  , initFromSeed
  , isVisible
  , largeExpandThreshold
  , reset
  , visibleNodes
  )
import Graph.Types (Edge, Graph, Node)
import Test.Spec (Spec, describe, it)
import Test.Spec.Assertions (shouldEqual)

-- Fixtures -------------------------------------------------------------

mkNode :: String -> Node
mkNode nid =
  { id: nid
  , label: nid
  , kind: ""
  , group: ""
  , description: ""
  , links: []
  , ontologyRef: Nothing
  , sources: []
  }

mkEdge :: String -> String -> Edge
mkEdge s t =
  { source: s
  , target: t
  , label: ""
  , description: ""
  , predicateRef: Nothing
  , sources: []
  }

-- A tiny 3-node graph:  a -- b -- c  (undirected semantics via forward/backward
-- indexes produced by buildGraph)
simpleGraph :: Graph
simpleGraph =
  buildGraph (map mkNode [ "a", "b", "c" ])
    [ mkEdge "a" "b", mkEdge "b" "c" ]

-- Two anchors share neighbor m:
--   a - m - b
--   a - x
--   b - y
sharedGraph :: Graph
sharedGraph =
  buildGraph
    (map mkNode [ "a", "b", "m", "x", "y" ])
    [ mkEdge "a" "m"
    , mkEdge "b" "m"
    , mkEdge "a" "x"
    , mkEdge "b" "y"
    ]

-- Tests ----------------------------------------------------------------

spec :: Spec Unit
spec = describe "Graph.Shaping" do
  describe "constants" do
    it "largeExpandThreshold is 20" do
      largeExpandThreshold `shouldEqual` 20

  describe "initFromSeed" do
    it "every seed node is visible with only InitialSeed" do
      let s = initFromSeed (Set.fromFoldable [ "a", "b" ])
      isVisible "a" s `shouldEqual` true
      isVisible "b" s `shouldEqual` true
      isVisible "c" s `shouldEqual` false
      visibleNodes s `shouldEqual` Set.fromFoldable [ "a", "b" ]
      Map.lookup "a" s.reasons `shouldEqual` Just (Set.singleton InitialSeed)

  describe "expand" do
    it "reveals hidden direct neighbors" do
      let
        s0 = initFromSeed (Set.singleton "b")
        r = expand "b" simpleGraph s0
      r.added `shouldEqual` Set.fromFoldable [ "a", "c" ]
      visibleNodes r.next `shouldEqual` Set.fromFoldable [ "a", "b", "c" ]
      anchorsOf "a" r.next `shouldEqual` Set.singleton "b"
      anchorsOf "c" r.next `shouldEqual` Set.singleton "b"

    it "is idempotent" do
      let
        s0 = initFromSeed (Set.singleton "b")
        once = (expand "b" simpleGraph s0).next
        twice = (expand "b" simpleGraph once).next
      once `shouldEqual` twice

    it "returns an empty added set when neighbors are already visible" do
      let
        s0 = initFromSeed (Set.fromFoldable [ "a", "b", "c" ])
        r = expand "b" simpleGraph s0
      r.added `shouldEqual` Set.empty
      -- The visible set is unchanged even though the anchor reasons for
      -- already-visible neighbors are augmented.
      visibleNodes r.next `shouldEqual` visibleNodes s0

    it "shared neighbor gets both anchors" do
      let
        s0 = initFromSeed (Set.fromFoldable [ "a", "b" ])
        s1 = (expand "a" sharedGraph s0).next
        s2 = (expand "b" sharedGraph s1).next
      anchorsOf "m" s2 `shouldEqual` Set.fromFoldable [ "a", "b" ]

  describe "collapse" do
    it "removes anchor-exclusive neighbors" do
      let
        s0 = initFromSeed (Set.singleton "b")
        s1 = (expand "b" simpleGraph s0).next
        r = collapse "b" s1
      r.removed `shouldEqual` Set.fromFoldable [ "a", "c" ]
      visibleNodes r.next `shouldEqual` Set.singleton "b"

    it "keeps shared neighbors when one anchor collapses" do
      let
        s0 = initFromSeed (Set.fromFoldable [ "a", "b" ])
        s1 = (expand "a" sharedGraph s0).next
        s2 = (expand "b" sharedGraph s1).next
        r = collapse "a" s2
      Set.member "m" (visibleNodes r.next) `shouldEqual` true
      Set.member "x" (visibleNodes r.next) `shouldEqual` false
      Set.member "y" (visibleNodes r.next) `shouldEqual` true
      anchorsOf "m" r.next `shouldEqual` Set.singleton "b"

    it "never removes the anchor itself (seed case)" do
      let
        s0 = initFromSeed (Set.singleton "b")
        s1 = (expand "b" simpleGraph s0).next
        r = collapse "b" s1
      isVisible "b" r.next `shouldEqual` true

    it "is idempotent" do
      let
        s0 = initFromSeed (Set.fromFoldable [ "a", "b" ])
        s1 = (expand "a" sharedGraph s0).next
        once = (collapse "a" s1).next
        twice = (collapse "a" once).next
      once `shouldEqual` twice

    it "collapsing a pure seed is a no-op (no anchor reasons to drop)" do
      let
        s0 = initFromSeed (Set.fromFoldable [ "a", "b" ])
        r = collapse "a" s0
      r.removed `shouldEqual` Set.empty
      r.next `shouldEqual` s0

  describe "reset" do
    it "discards anchors and positions, restoring only the seed" do
      let
        s0 = initFromSeed (Set.singleton "b")
        _s1 = (expand "b" simpleGraph s0).next
        r = reset (Set.fromFoldable [ "a" ])
      visibleNodes r `shouldEqual` Set.singleton "a"
      Map.isEmpty r.positions `shouldEqual` true

  describe "hasHiddenNeighbors" do
    it "is true when a direct neighbor is hidden" do
      let s0 = initFromSeed (Set.singleton "b")
      hasHiddenNeighbors simpleGraph "b" s0 `shouldEqual` true

    it "is false when all direct neighbors are visible" do
      let s0 = initFromSeed (Set.fromFoldable [ "a", "b", "c" ])
      hasHiddenNeighbors simpleGraph "b" s0 `shouldEqual` false

  describe "hasAnyAnchor" do
    it "is true while the anchor has at least one dependent" do
      let
        s0 = initFromSeed (Set.singleton "b")
        s1 = (expand "b" simpleGraph s0).next
      hasAnyAnchor "b" s1 `shouldEqual` true

    it "is false when no node is anchored via the given id" do
      let s0 = initFromSeed (Set.fromFoldable [ "a", "b" ])
      hasAnyAnchor "a" s0 `shouldEqual` false
