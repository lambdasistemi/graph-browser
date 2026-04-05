module FFI.Clipboard
  ( copyToClipboard
  ) where

import Prelude

import Control.Promise (Promise, toAffE)
import Effect (Effect)
import Effect.Aff (Aff)

foreign import writeClipboard :: String -> Effect (Promise Unit)

copyToClipboard :: String -> Aff Unit
copyToClipboard t = toAffE (writeClipboard t)
