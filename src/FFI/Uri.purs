module FFI.Uri
  ( absoluteUrl
  , decodeUriComponent
  , encodeUriComponent
  ) where

import Effect (Effect)

foreign import decodeUriComponent :: String -> String

foreign import encodeUriComponent :: String -> String

-- | Resolve a possibly-relative URL against the current page location,
-- | returning an absolute URL. Needed because Oxigraph requires an
-- | absolute base IRI for RDF parsing.
foreign import absoluteUrl :: String -> Effect String
