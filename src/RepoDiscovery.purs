module RepoDiscovery where

import Prelude

import Data.Argonaut.Decode.Class (decodeJson)
import Data.Argonaut.Decode.Combinators ((.:))
import Data.Argonaut.Decode.Error (printJsonDecodeError)
import Data.Argonaut.Parser as AP
import Data.Either (Either(..))
import Control.Alt ((<|>))
import Data.Maybe (Maybe(..))
import Data.String as String
import Effect.Aff (Aff, try)
import Fetch (Method(..), fetch)
import Viewer (DataUrls)

-- | Parsed repo source with derived URLs.
type RepoSource =
  { owner :: String
  , repo :: String
  , rawBaseUrl :: String
  , pagesBaseUrl :: String
  }

-- | Parse user input into a RepoSource.
-- | Accepts: "owner/repo", "https://github.com/owner/repo",
-- | "https://owner.github.io/repo/", direct manifest URL.
normalizeInput :: String -> Maybe RepoSource
normalizeInput input =
  let trimmed = String.trim input
  in
    parseOwnerSlashRepo trimmed
      <|> parseGitHubUrl trimmed
      <|> parseGitHubPagesUrl trimmed

parseOwnerSlashRepo :: String -> Maybe RepoSource
parseOwnerSlashRepo str = do
  let parts = splitFirst "/" str
  case parts of
    Just { before: owner, after: repo } ->
      if String.contains (String.Pattern "/") repo
        then Nothing
        else if owner == "" || repo == ""
          then Nothing
          else Just (mkRepoSource owner repo)
    Nothing -> Nothing

parseGitHubUrl :: String -> Maybe RepoSource
parseGitHubUrl str = do
  rest <- stripPrefix "https://github.com/" str
  let cleaned = stripTrailingSlash rest
  let parts = splitFirst "/" cleaned
  case parts of
    Just { before: owner, after: rest2 } -> do
      let repo = stripSuffix ".git" (takeUntil "/" rest2)
      if owner == "" || repo == ""
        then Nothing
        else Just (mkRepoSource owner repo)
    Nothing -> Nothing

parseGitHubPagesUrl :: String -> Maybe RepoSource
parseGitHubPagesUrl str = do
  rest <- stripPrefix "https://" str
  let parts = splitFirst ".github.io/" rest
  case parts of
    Just { before: owner, after: rest2 } -> do
      let repo = stripTrailingSlash (takeUntil "/" rest2)
      if owner == "" || repo == ""
        then Nothing
        else Just (mkRepoSource owner repo)
    Nothing -> Nothing

mkRepoSource :: String -> String -> RepoSource
mkRepoSource owner repo =
  { owner
  , repo
  , rawBaseUrl: "https://raw.githubusercontent.com/"
      <> owner <> "/" <> repo
  , pagesBaseUrl: "https://" <> owner
      <> ".github.io/" <> repo <> "/"
  }

-- | Discover data URLs for a repo.
-- | Tries manifest first (main then master branch),
-- | falls back to convention data/ paths on GitHub Pages.
discoverDataUrls :: RepoSource -> Aff (Either String DataUrls)
discoverDataUrls src = do
  mainResult <- tryFetchManifest
    (src.rawBaseUrl <> "/main/.graph-browser.json")
  case mainResult of
    Right urls -> pure (Right urls)
    Left _ -> do
      masterResult <- tryFetchManifest
        (src.rawBaseUrl <> "/master/.graph-browser.json")
      case masterResult of
        Right urls -> pure (Right urls)
        Left _ -> pure (Right (conventionUrls src))

tryFetchManifest :: String -> Aff (Either String DataUrls)
tryFetchManifest url = do
  result <- try do
    resp <- fetch url { method: GET }
    body <- resp.text
    pure body
  case result of
    Left _ -> pure (Left "fetch failed")
    Right body ->
      pure $ parseManifest body

parseManifest :: String -> Either String DataUrls
parseManifest body =
  case AP.jsonParser body of
    Left err -> Left err
    Right json ->
      case decodeJson json of
        Left err -> Left (printJsonDecodeError err)
        Right obj ->
          case decodeManifest obj of
            Left err -> Left (printJsonDecodeError err)
            Right urls -> Right urls
  where
  decodeManifest obj = do
    config <- obj .: "config"
    graph <- obj .: "graph"
    tutorials <- obj .: "tutorials"
    pure
      { configUrl: config
      , graphUrl: graph
      , tutorialIndexUrl: tutorials
      }

-- | Convention-based URLs when no manifest exists.
conventionUrls :: RepoSource -> DataUrls
conventionUrls src =
  { configUrl: src.pagesBaseUrl <> "data/config.json"
  , graphUrl: src.pagesBaseUrl <> "data/graph.json"
  , tutorialIndexUrl: src.pagesBaseUrl
      <> "data/tutorials/index.json"
  }

-- String helpers

stripPrefix :: String -> String -> Maybe String
stripPrefix prefix str =
  if String.take (String.length prefix) str == prefix
    then Just (String.drop (String.length prefix) str)
    else Nothing

stripSuffix :: String -> String -> String
stripSuffix suffix str =
  let sLen = String.length suffix
      strLen = String.length str
  in
    if strLen >= sLen
      && String.drop (strLen - sLen) str == suffix
      then String.take (strLen - sLen) str
      else str

stripTrailingSlash :: String -> String
stripTrailingSlash str =
  let len = String.length str
  in
    if len > 0
      && String.drop (len - 1) str == "/"
      then String.take (len - 1) str
      else str

takeUntil :: String -> String -> String
takeUntil sep str =
  case String.indexOf (String.Pattern sep) str of
    Just idx -> String.take idx str
    Nothing -> str

splitFirst
  :: String
  -> String
  -> Maybe { before :: String, after :: String }
splitFirst sep str =
  case String.indexOf (String.Pattern sep) str of
    Just idx -> Just
      { before: String.take idx str
      , after: String.drop
          (idx + String.length sep) str
      }
    Nothing -> Nothing
