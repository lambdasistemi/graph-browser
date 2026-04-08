module FFI.Oxigraph
  ( ImportedRdfObject
  , ImportedRdfQuad
  , OxigraphStore
  , RdfObject
  , RdfQuad
  , SparqlBinding
  , createStore
  , loadTurtle
  , parseQuads
  , querySparql
  , querySparqlNodeIds
  , querySparqlStrings
  , serializeQuads
  ) where

import Prelude (Unit)
import Effect (Effect)
import Foreign (Foreign)

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

-- | Opaque handle to an in-memory Oxigraph triple store.
foreign import data OxigraphStore :: Type

-- | A row from a SPARQL SELECT result: variable name → string value.
type SparqlBinding = Foreign

foreign import createStore :: Effect OxigraphStore

foreign import loadTurtle
  :: OxigraphStore -> String -> String -> Effect Unit

foreign import querySparql
  :: OxigraphStore -> String -> Effect (Array SparqlBinding)

foreign import querySparqlStrings
  :: OxigraphStore -> String -> Effect (Array String)

foreign import querySparqlNodeIds
  :: OxigraphStore -> String -> Effect (Array String)
