module FFI.Resize
  ( initResize
  ) where

import Prelude

import Effect (Effect)

foreign import initResize :: Effect Unit
