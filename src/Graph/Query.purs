-- | Query catalog types and JSON decoding.
module Graph.Query
  ( NamedQuery
  , Parameter
  , QueryCatalog
  , decodeQueryCatalog
  ) where

import Prelude

import Data.Argonaut.Core (Json)
import Data.Argonaut.Decode.Class (decodeJson)
import Data.Argonaut.Decode.Combinators ((.:), (.:?))
import Data.Argonaut.Decode.Error
  ( JsonDecodeError
  , printJsonDecodeError
  )
import Data.Either (Either(..))
import Data.Maybe (Maybe, fromMaybe)
import Data.Traversable (traverse)

-- | A parameter slot in a SPARQL query template.
type Parameter =
  { name :: String
  , label :: String
  , paramType :: String
  , default :: Maybe String
  }

-- | A named, curated SPARQL query.
type NamedQuery =
  { id :: String
  , name :: String
  , description :: String
  , sparql :: String
  , parameters :: Array Parameter
  , tags :: Array String
  }

-- | The full query catalog.
type QueryCatalog = Array NamedQuery

-- | Decode a JSON array into a query catalog.
decodeQueryCatalog :: Json -> Either String QueryCatalog
decodeQueryCatalog json = do
  arr <- lmap' $ decodeJson json
  traverse decodeNamedQuery arr

decodeNamedQuery :: Json -> Either String NamedQuery
decodeNamedQuery json = do
  obj <- lmap' $ decodeJson json
  id <- lmap' $ obj .: "id"
  name <- lmap' $ obj .: "name"
  description <- lmap' $ obj .: "description"
  sparql <- lmap' $ obj .: "sparql"
  rawParams <- lmap' $ fromMaybe [] <$> obj .:? "parameters"
  parameters <- traverse decodeParameter rawParams
  tags <- lmap' $ fromMaybe [] <$> obj .:? "tags"
  pure { id, name, description, sparql, parameters, tags }

decodeParameter :: Json -> Either String Parameter
decodeParameter json = do
  obj <- lmap' $ decodeJson json
  name <- lmap' $ obj .: "name"
  label <- lmap' $ obj .: "label"
  paramType <- lmap' $ obj .: "type"
  default <- lmap' $ obj .:? "default"
  pure { name, label, paramType, default }

lmap'
  :: forall a
   . Either JsonDecodeError a
  -> Either String a
lmap' (Left e) = Left (printJsonDecodeError e)
lmap' (Right a) = Right a
