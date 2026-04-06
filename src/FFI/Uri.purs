module FFI.Uri
  ( decodeUriComponent
  , encodeUriComponent
  ) where

foreign import decodeUriComponent :: String -> String

foreign import encodeUriComponent :: String -> String
