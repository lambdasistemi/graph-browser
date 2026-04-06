module FFI.Node
  ( getArgv
  , joinPath
  , makeDirectory
  , readTextFile
  , setExitCode
  , writeTextFile
  ) where

import Prelude

import Effect (Effect)

foreign import getArgv :: Effect (Array String)

foreign import readTextFile :: String -> Effect String

foreign import writeTextFile :: String -> String -> Effect Unit

foreign import makeDirectory :: String -> Effect Unit

foreign import joinPath :: Array String -> Effect String

foreign import setExitCode :: Int -> Effect Unit
