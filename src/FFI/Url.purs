module FFI.Url
  ( getRepoParam
  , setRepoParam
  , getViewParam
  , setViewParam
  , getBranchParam
  , setBranchParam
  ) where

import Prelude

import Effect (Effect)

foreign import getRepoParam :: Effect String

foreign import setRepoParam :: String -> Effect Unit

foreign import getViewParam :: Effect String

foreign import setViewParam :: String -> Effect Unit

foreign import getBranchParam :: Effect String

foreign import setBranchParam :: String -> Effect Unit
