-- | View types, decoding, and graph filtering.
module Graph.Views
  ( EdgeTriple
  , View
  , ViewIndexEntry
  , filterByView
  , decodeView
  , decodeViewIndex
  ) where

import Prelude

import Data.Argonaut.Core (Json)
import Data.Argonaut.Decode.Class (decodeJson)
import Data.Argonaut.Decode.Combinators ((.:), (.:?))
import Data.Argonaut.Decode.Error (printJsonDecodeError)
import Data.Array as Array
import Data.Either (Either(..))
import Data.Foldable (foldl)
import Data.List as List
import Data.Map as Map
import Data.Maybe (Maybe(..), fromMaybe)
import Data.Set as Set
import Data.Traversable (traverse)
import Graph.Build (buildGraph)
import Graph.Types (Edge, Graph, Node)
import Tutorial (Tutorial, decodeTutorial)

-- | An edge reference: source, target, label.
type EdgeTriple =
  { source :: String
  , target :: String
  , label :: String
  }

-- | A view: named subset of edges with optional tours.
type View =
  { name :: String
  , description :: String
  , edges :: Array EdgeTriple
  , tours :: Array Tutorial
  }

-- | Entry in the view index.
type ViewIndexEntry =
  { name :: String
  , description :: String
  , file :: String
  }

-- | Filter a graph by a view. Keeps only matching edges
-- | and computes the node set from them.
filterByView :: View -> Graph -> Graph
filterByView view graph =
  let
    tripleSet = Set.fromFoldable
      (map tripleKey view.edges)
    matchedEdges = Array.filter
      (\e -> Set.member (edgeKey e) tripleSet)
      graph.edges
    nodeIds = foldl
      ( \acc e ->
          Set.insert e.source
            (Set.insert e.target acc)
      )
      Set.empty
      matchedEdges
    allNodes = Array.fromFoldable
      (Map.values graph.nodes)
    matchedNodes = Array.filter
      (\n -> Set.member n.id nodeIds)
      allNodes
  in
    buildGraph matchedNodes matchedEdges

tripleKey :: EdgeTriple -> String
tripleKey t = t.source <> "|" <> t.target <> "|" <> t.label

edgeKey :: Edge -> String
edgeKey e = e.source <> "|" <> e.target <> "|" <> e.label

-- | Decode a view from JSON.
decodeView :: Json -> Either String View
decodeView json = do
  obj <- lmap' $ decodeJson json
  name <- lmap' $ obj .: "name"
  description <- lmap' $ obj .: "description"
  rawEdges <- lmap' $ obj .: "edges"
  edges <- traverse decodeTriple rawEdges
  rawTours <- lmap' $ fromMaybe [] <$> obj .:? "tours"
  tours <- traverse decodeTutorial rawTours
  pure { name, description, edges, tours }

decodeTriple :: Json -> Either String EdgeTriple
decodeTriple json = do
  arr :: Array String <- lmap' $ decodeJson json
  case Array.index arr 0, Array.index arr 1, Array.index arr 2 of
    Just source, Just target, Just label ->
      Right { source, target, label }
    _, _, _ ->
      Left "Edge triple must be [source, target, label]"

-- | Decode the view index.
decodeViewIndex :: Json -> Either String (Array ViewIndexEntry)
decodeViewIndex json = lmap' $ decodeJson json

lmap' :: forall a. Either _ a -> Either String a
lmap' (Left e) = Left (printJsonDecodeError e)
lmap' (Right a) = Right a
