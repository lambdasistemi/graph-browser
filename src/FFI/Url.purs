module FFI.Url
  ( getRepoParam
  , setRepoParam
  , getViewParam
  , setViewParam
  , getBranchParam
  , setBranchParam
  , getThemeParam
  , setThemeParam
  ) where

import Prelude

import Effect (Effect)

foreign import getRepoParam :: Effect String

foreign import setRepoParam :: String -> Effect Unit

foreign import getViewParam :: Effect String

foreign import setViewParam :: String -> Effect Unit

foreign import getBranchParam :: Effect String

foreign import setBranchParam :: String -> Effect Unit

foreign import getThemeParam :: Effect String

foreign import setThemeParam :: String -> Effect Unit
