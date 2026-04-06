module FFI.Oxigraph
  ( ImportedRdfObject
  , ImportedRdfQuad
  , RdfObject
  , RdfQuad
  , parseQuads
  , serializeQuads
  ) where

import Effect (Effect)

type ImportedRdfObject =
  { termType :: String
  , value :: String
  , datatype :: String
  , language :: String
  }

type ImportedRdfQuad =
  { subject :: String
  , predicate :: String
  , object :: ImportedRdfObject
  }

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

foreign import parseQuads
  :: String
  -> String
  -> String
  -> Effect (Array ImportedRdfQuad)

foreign import serializeQuads
  :: Array RdfQuad
  -> Effect
       { turtle :: String
       , nquads :: String
       }
