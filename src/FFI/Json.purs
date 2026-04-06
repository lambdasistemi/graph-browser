module FFI.Json
  ( parseJson
  ) where

import Data.Argonaut.Core (Json)

foreign import parseJson :: String -> Json
