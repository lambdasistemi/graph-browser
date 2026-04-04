-- | Persist and restore UI state via localStorage.
-- | Storage key is namespaced: "graph-browser:<title>"
-- | Repo list stored at "graph-browser:repos"
module Persist
  ( PersistedState
  , save
  , restore
  , RepoListEntry
  , saveRepoList
  , loadRepoList
  , deleteRepo
  , saveToken
  , loadToken
  , deleteToken
  ) where

import Prelude

import Data.Argonaut.Core (stringify)
import Data.Argonaut.Decode.Class (decodeJson)
import Data.Argonaut.Decode.Combinators ((.:), (.:?))
import Data.Argonaut.Encode.Class (encodeJson)
import Data.Argonaut.Parser (jsonParser)
import Data.Array as Array
import Data.Either (hush)
import Data.Maybe (Maybe(..), fromMaybe)
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

type RepoListEntry =
  { id :: String
  , title :: String
  , hasToken :: Boolean
  }

storageKey :: String -> String
storageKey title = "graph-browser:" <> title

repoListKey :: String
repoListKey = "graph-browser:repos"

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

saveRepoList :: Array RepoListEntry -> Effect Unit
saveRepoList repos = do
  w <- Web.HTML.window
  storage <- Window.localStorage w
  let
    json = encodeJson $ map
      ( \r -> encodeJson
          { id: r.id
          , title: r.title
          , hasToken: r.hasToken
          }
      )
      repos
  Storage.setItem repoListKey (stringify json) storage

loadRepoList :: Effect (Array RepoListEntry)
loadRepoList = do
  w <- Web.HTML.window
  storage <- Window.localStorage w
  mRaw <- Storage.getItem repoListKey storage
  pure $ fromMaybe [] do
    raw <- mRaw
    json <- hush (jsonParser raw)
    arr <- hush (decodeJson json)
    pure $ Array.mapMaybe decodeEntry arr
  where
  decodeEntry json = hush do
    obj <- decodeJson json
    id <- obj .: "id"
    title <- obj .: "title"
    hasToken <- fromMaybe false <$> obj .:? "hasToken"
    pure { id, title, hasToken }

deleteRepo :: String -> Effect Unit
deleteRepo repoId = do
  w <- Web.HTML.window
  storage <- Window.localStorage w
  Storage.removeItem (storageKey repoId) storage
  Storage.removeItem (tokenKey repoId) storage
  repos <- loadRepoList
  let filtered = Array.filter (\r -> r.id /= repoId) repos
  saveRepoList filtered

tokenKey :: String -> String
tokenKey repoId = "graph-browser:token:" <> repoId

saveToken :: String -> String -> Effect Unit
saveToken repoId encryptedToken = do
  w <- Web.HTML.window
  storage <- Window.localStorage w
  Storage.setItem (tokenKey repoId) encryptedToken storage

loadToken :: String -> Effect (Maybe String)
loadToken repoId = do
  w <- Web.HTML.window
  storage <- Window.localStorage w
  Storage.getItem (tokenKey repoId) storage

deleteToken :: String -> Effect Unit
deleteToken repoId = do
  w <- Web.HTML.window
  storage <- Window.localStorage w
  Storage.removeItem (tokenKey repoId) storage
