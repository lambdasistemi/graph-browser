module FFI.Crypto
  ( encrypt
  , decrypt
  ) where

import Prelude

import Control.Promise (Promise, toAffE)
import Effect (Effect)
import Effect.Aff (Aff)

foreign import encryptToken
  :: String -> Effect (Promise String)

foreign import decryptToken
  :: String -> Effect (Promise String)

encrypt :: String -> Aff String
encrypt t = toAffE (encryptToken t)

decrypt :: String -> Aff String
decrypt b = toAffE (decryptToken b)
