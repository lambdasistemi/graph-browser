-- | Persist and restore UI state via localStorage.
-- | Storage key is namespaced: "graph-browser:<title>"
module Persist
  ( PersistedState
  , save
  , restore
  ) where

import Prelude

import Data.Argonaut.Core (stringify)
import Data.Argonaut.Decode.Class (decodeJson)
import Data.Argonaut.Decode.Combinators ((.:), (.:?))
import Data.Argonaut.Encode.Class (encodeJson)
import Data.Argonaut.Parser (jsonParser)
import Data.Either (hush)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Web.HTML as Web.HTML
import Web.HTML.Window as Window
import Web.Storage.Storage as Storage

type PersistedState =
  { selectedNodeId :: Maybe String
  , depth :: Int
  , tutorialId :: Maybe String
  , tutorialStep :: Maybe Int
  }

storageKey :: String -> String
storageKey title = "graph-browser:" <> title

save :: String -> PersistedState -> Effect Unit
save title st = do
  w <- Web.HTML.window
  storage <- Window.localStorage w
  let
    json = encodeJson
      { selectedNodeId: st.selectedNodeId
      , depth: st.depth
      , tutorialId: st.tutorialId
      , tutorialStep: st.tutorialStep
      }
  Storage.setItem (storageKey title) (stringify json)
    storage

restore :: String -> Effect (Maybe PersistedState)
restore title = do
  w <- Web.HTML.window
  storage <- Window.localStorage w
  mRaw <- Storage.getItem (storageKey title) storage
  pure do
    raw <- mRaw
    json <- hush (jsonParser raw)
    obj <- hush (decodeJson json)
    selectedNodeId <- hush (obj .:? "selectedNodeId")
    depth <- hush (obj .: "depth")
    tutorialId <- hush (obj .:? "tutorialId")
    tutorialStep <- hush (obj .:? "tutorialStep")
    pure { selectedNodeId, depth, tutorialId, tutorialStep }
