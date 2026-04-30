module FFI.Uri
  ( absoluteUrl
  , decodeUriComponent
  , encodeUriComponent
  , hostnameFromUrl
  ) where

import Effect (Effect)

foreign import decodeUriComponent :: String -> String

foreign import encodeUriComponent :: String -> String

-- | Extract the hostname from an absolute URL, or return an empty string
-- | when the URL parser rejects the input.
foreign import hostnameFromUrl :: String -> String

-- | Resolve a possibly-relative URL against the current page location,
-- | returning an absolute URL. Needed because Oxigraph requires an
-- | absolute base IRI for RDF parsing.
foreign import absoluteUrl :: String -> Effect String
