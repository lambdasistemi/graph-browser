module FFI.Oxigraph
  ( RdfObject
  , RdfQuad
  , serializeQuads
  ) where

import Effect (Effect)

type RdfObject =
  { termType :: String
  , value :: String
  , datatype :: String
  }

type RdfQuad =
  { subject :: String
  , predicate :: String
  , object :: RdfObject
  }

foreign import serializeQuads
  :: Array RdfQuad
  -> Effect
       { turtle :: String
       , nquads :: String
       }
