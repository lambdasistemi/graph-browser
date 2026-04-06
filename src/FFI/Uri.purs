module FFI.Uri
  ( encodeUriComponent
  ) where

foreign import encodeUriComponent :: String -> String
