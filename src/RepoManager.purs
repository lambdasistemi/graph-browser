module RepoManager where

import Prelude

import Data.Array as Array
import Data.Maybe (Maybe(..))
import Effect.Aff (Aff)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Web.UIEvent.KeyboardEvent as KE

-- | A repo entry in the managed list.
type RepoEntry =
  { id :: String
  , title :: String
  , hasToken :: Boolean
  }

-- | Messages emitted to parent.
data Output
  = RepoSelected RepoEntry
  | RepoAdded String
  | RepoDeleted RepoEntry

-- | Internal state.
type State =
  { repos :: Array RepoEntry
  , activeId :: Maybe String
  , inputValue :: String
  , error :: Maybe String
  }

-- | Internal actions.
data Action
  = SetInput String
  | Submit
  | KeyPress KE.KeyboardEvent
  | Select RepoEntry
  | Delete RepoEntry

-- | Queries from parent.
data Query a
  = SetRepos (Array RepoEntry) a
  | SetActive (Maybe String) a
  | SetError (Maybe String) a

repoManager
  :: forall i. H.Component Query i Output Aff
repoManager = H.mkComponent
  { initialState: \_ ->
      { repos: []
      , activeId: Nothing
      , inputValue: ""
      , error: Nothing
      }
  , render
  , eval: H.mkEval H.defaultEval
      { handleAction = handleAction
      , handleQuery = handleQuery
      }
  }

render :: forall m. State -> H.ComponentHTML Action () m
render state =
  HH.div
    [ HP.id "repo-panel"
    , cls "repo-panel"
    ]
    [ HH.div [ cls "repo-form" ]
        [ HH.input
            [ cls "repo-input"
            , HP.type_ HP.InputText
            , HP.placeholder "owner/repo"
            , HP.value state.inputValue
            , HE.onValueInput SetInput
            , HE.onKeyUp KeyPress
            ]
        , HH.button
            [ cls "repo-add-btn"
            , HE.onClick \_ -> Submit
            ]
            [ HH.text "Add" ]
        ]
    , case state.error of
        Nothing -> HH.text ""
        Just err ->
          HH.div [ cls "repo-error" ]
            [ HH.text err ]
    , HH.div [ cls "repo-list" ]
        (map (renderRepoItem state.activeId) state.repos)
    , HH.div
        [ HP.id "repo-resize-handle"
        , cls "repo-resize-handle"
        ]
        []
    ]

renderRepoItem
  :: forall m
   . Maybe String
  -> RepoEntry
  -> H.ComponentHTML Action () m
renderRepoItem activeId entry =
  HH.div
    [ cls
        ( "repo-item"
            <> if activeId == Just entry.id
              then " active"
              else ""
        )
    , HE.onClick \_ -> Select entry
    ]
    [ HH.span [ cls "repo-item-title" ]
        [ HH.text
            ( if entry.title == "" then entry.id
              else entry.title
            )
        ]
    , HH.span [ cls "repo-item-id" ]
        [ HH.text entry.id ]
    , HH.button
        [ cls "repo-delete-btn"
        , HE.onClick \_ -> Delete entry
        ]
        [ HH.text "x" ]
    ]

handleAction
  :: forall m
   . Action
  -> H.HalogenM State Action () Output m Unit
handleAction = case _ of
  SetInput v ->
    H.modify_ _ { inputValue = v }
  KeyPress ev ->
    when (KE.key ev == "Enter") do
      handleAction Submit
  Submit -> do
    state <- H.get
    let v = state.inputValue
    when (v /= "") do
      H.modify_ _ { inputValue = "", error = Nothing }
      H.raise (RepoAdded v)
  Select entry ->
    H.raise (RepoSelected entry)
  Delete entry ->
    H.raise (RepoDeleted entry)

handleQuery
  :: forall a m
   . Query a
  -> H.HalogenM State Action () Output m (Maybe a)
handleQuery = case _ of
  SetRepos repos next -> do
    H.modify_ _ { repos = repos }
    pure (Just next)
  SetActive id next -> do
    H.modify_ _ { activeId = id }
    pure (Just next)
  SetError err next -> do
    H.modify_ _ { error = err }
    pure (Just next)

-- Helpers

cls
  :: forall r i
   . String
  -> HH.IProp (class :: String | r) i
cls = HP.class_ <<< HH.ClassName
