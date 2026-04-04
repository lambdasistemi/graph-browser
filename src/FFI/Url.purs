module FFI.Url
  ( getRepoParam
  , setRepoParam
  ) where

import Prelude

import Effect (Effect)

foreign import getRepoParam :: Effect String

foreign import setRepoParam :: String -> Effect Unit
