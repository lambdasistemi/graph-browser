module Main where

import Prelude

import Data.Array as Array
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Aff (Aff)
import Effect.Aff.Class (liftAff)
import Effect.Class (liftEffect)
import FFI.Resize as Resize
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.HTML.Properties as HP
import Halogen.VDom.Driver (runUI)
import Persist as Persist
import RepoDiscovery as RD
import RepoManager as RM
import Type.Proxy (Proxy(..))
import Viewer as Viewer

main :: Effect Unit
main = HA.runHalogenAff do
  body <- HA.awaitBody
  runUI appComponent unit body

type Slots =
  ( repoManager :: H.Slot RM.Query RM.Output Unit
  , viewer :: forall q. H.Slot q Void Unit
  )

_repoManager :: Proxy "repoManager"
_repoManager = Proxy

_viewer :: Proxy "viewer"
_viewer = Proxy

type AppState =
  { repos :: Array Persist.RepoListEntry
  , activeRepo :: Maybe Persist.RepoListEntry
  , dataUrls :: Maybe Viewer.DataUrls
  , loading :: Boolean
  }

data AppAction
  = AppInit
  | HandleRepo RM.Output

appComponent
  :: forall q i o. H.Component q i o Aff
appComponent = H.mkComponent
  { initialState: \_ ->
      { repos: []
      , activeRepo: Nothing
      , dataUrls: Nothing
      , loading: false
      }
  , render: appRender
  , eval: H.mkEval H.defaultEval
      { handleAction = appHandleAction
      , initialize = Just AppInit
      }
  }

appRender
  :: AppState
  -> H.ComponentHTML AppAction Slots Aff
appRender state =
  HH.div [ cls "app-shell" ]
    [ HH.slot _repoManager unit RM.repoManager unit
        HandleRepo
    , HH.div [ cls "main-area" ]
        [ case state.dataUrls of
            Nothing ->
              HH.div [ cls "empty-main" ]
                [ HH.text
                    "Add a repository to get started"
                ]
            Just urls ->
              HH.slot_ _viewer unit Viewer.viewer urls
        ]
    ]

appHandleAction
  :: forall o
   . AppAction
  -> H.HalogenM AppState AppAction Slots o Aff Unit
appHandleAction = case _ of
  AppInit -> do
    liftEffect Resize.initResize
    repos <- liftEffect Persist.loadRepoList
    H.modify_ _ { repos = repos }
    void $ H.tell _repoManager unit
      (RM.SetRepos repos)
    -- Auto-select first repo if any
    case Array.head repos of
      Nothing -> pure unit
      Just repo -> selectRepo repo

  HandleRepo output -> case output of
    RM.RepoAdded input -> do
      case RD.normalizeInput input of
        Nothing -> do
          void $ H.tell _repoManager unit
            (RM.SetError (Just "Invalid repo format. Use owner/repo"))
        Just src -> do
          H.modify_ _ { loading = true }
          void $ H.tell _repoManager unit
            (RM.SetError Nothing)
          result <- liftAff (RD.discoverDataUrls src)
          case result of
            Left err -> do
              H.modify_ _ { loading = false }
              void $ H.tell _repoManager unit
                (RM.SetError (Just err))
            Right urls -> do
              let
                entry =
                  { id: src.owner <> "/" <> src.repo
                  , title: ""
                  , hasToken: false
                  }
              state <- H.get
              let
                exists = Array.any
                  (\r -> r.id == entry.id)
                  state.repos
                newRepos =
                  if exists then state.repos
                  else Array.snoc state.repos entry
              H.modify_ _
                { repos = newRepos
                , activeRepo = Just entry
                , dataUrls = Just urls
                , loading = false
                }
              liftEffect $ Persist.saveRepoList newRepos
              void $ H.tell _repoManager unit
                (RM.SetRepos newRepos)
              void $ H.tell _repoManager unit
                (RM.SetActive (Just entry.id))

    RM.RepoSelected entry ->
      selectRepo entry

    RM.RepoDeleted entry -> do
      liftEffect $ Persist.deleteRepo entry.id
      state <- H.get
      let
        newRepos = Array.filter
          (\r -> r.id /= entry.id)
          state.repos
        wasActive = state.activeRepo
          == Just entry
      H.modify_ _
        { repos = newRepos
        , activeRepo =
            if wasActive then Nothing
            else state.activeRepo
        , dataUrls =
            if wasActive then Nothing
            else state.dataUrls
        }
      liftEffect $ Persist.saveRepoList newRepos
      void $ H.tell _repoManager unit
        (RM.SetRepos newRepos)
      when wasActive do
        void $ H.tell _repoManager unit
          (RM.SetActive Nothing)

selectRepo
  :: forall o
   . Persist.RepoListEntry
  -> H.HalogenM AppState AppAction Slots o Aff Unit
selectRepo entry = do
  case RD.normalizeInput entry.id of
    Nothing -> pure unit
    Just src -> do
      result <- liftAff (RD.discoverDataUrls src)
      case result of
        Left _ -> pure unit
        Right urls -> do
          H.modify_ _
            { activeRepo = Just entry
            , dataUrls = Just urls
            }
          void $ H.tell _repoManager unit
            (RM.SetActive (Just entry.id))

-- Helpers

cls
  :: forall r i
   . String
  -> HH.IProp (class :: String | r) i
cls = HP.class_ <<< HH.ClassName
