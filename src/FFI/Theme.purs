module FFI.Theme
  ( getSystemTheme
  , applyTheme
  ) where

import Prelude

import Effect (Effect)

foreign import getSystemTheme :: Effect String

foreign import applyTheme :: String -> Effect Unit
