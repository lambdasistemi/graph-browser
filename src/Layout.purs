module Layout
  ( LayoutId(..)
  , LayoutSource(..)
  , allLayouts
  , defaultLayout
  , layoutIdToString
  , layoutLabel
  , parseLayoutId
  ) where

import Prelude

import Data.Maybe (Maybe(..))
import Data.String as String

data LayoutId
  = Fcose
  | Elk
  | Cola
  | Dagre
  | Concentric

derive instance eqLayoutId :: Eq LayoutId

instance showLayoutId :: Show LayoutId where
  show = case _ of
    Fcose -> "Fcose"
    Elk -> "Elk"
    Cola -> "Cola"
    Dagre -> "Dagre"
    Concentric -> "Concentric"

data LayoutSource
  = SavedExplicit
  | ViewDefault
  | Fallback

derive instance eqLayoutSource :: Eq LayoutSource

instance showLayoutSource :: Show LayoutSource where
  show = case _ of
    SavedExplicit -> "SavedExplicit"
    ViewDefault -> "ViewDefault"
    Fallback -> "Fallback"

allLayouts :: Array LayoutId
allLayouts =
  [ Fcose
  , Elk
  , Cola
  , Dagre
  , Concentric
  ]

defaultLayout :: LayoutId
defaultLayout = Fcose

layoutIdToString :: LayoutId -> String
layoutIdToString = case _ of
  Fcose -> "fcose"
  Elk -> "elk"
  Cola -> "cola"
  Dagre -> "dagre"
  Concentric -> "concentric"

layoutLabel :: LayoutId -> String
layoutLabel = case _ of
  Fcose -> "fCoSE"
  Elk -> "ELK"
  Cola -> "Cola"
  Dagre -> "Dagre"
  Concentric -> "Concentric"

parseLayoutId :: String -> Maybe LayoutId
parseLayoutId raw = case String.toLower raw of
  "fcose" -> Just Fcose
  "elk" -> Just Elk
  "cola" -> Just Cola
  "dagre" -> Just Dagre
  "concentric" -> Just Concentric
  _ -> Nothing
