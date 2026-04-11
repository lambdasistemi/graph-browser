module Viewer.Detail where

import Prelude

import Data.Array as Array
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Graph.Types (Edge, Link, Node)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Viewer.Helpers
  ( cls
  , kindLabel
  , ontologyIdentity
  , renderOntologyReference
  , renderPromptBuilder
  )
import Viewer.Types (Action(..), EdgeInfo, PromptMode(..), State)

renderEdgeDetail
  :: forall m. State -> EdgeInfo -> H.ComponentHTML Action () m
renderEdgeDetail state edge =
  HH.div_ (edgeDetailContent edge <> [ renderPromptBuilder state PromptEdge "Generate prompt" ])

renderEdgePreview
  :: forall m. EdgeInfo -> H.ComponentHTML Action () m
renderEdgePreview edge =
  HH.div_ (edgeDetailContent edge)

edgeDetailContent
  :: forall m. EdgeInfo -> Array (H.ComponentHTML Action () m)
edgeDetailContent edge =
  [ HH.span [ cls "badge badge-mechanism" ]
      [ HH.text "relationship" ]
  , HH.div [ cls "edge-detail" ]
      [ HH.div [ cls "edge-endpoint" ]
          [ HH.span [ cls "edge-role" ]
              [ HH.text "From" ]
          , HH.span [ cls "edge-name" ]
              [ HH.text edge.sourceLabel ]
          ]
      , HH.div [ cls "edge-label" ]
          [ HH.text edge.label ]
      , HH.div [ cls "edge-endpoint" ]
          [ HH.span [ cls "edge-role" ]
              [ HH.text "To" ]
          , HH.span [ cls "edge-name" ]
              [ HH.text edge.targetLabel ]
          ]
      ]
  , renderOntologyReference "Predicate ontology" edge.predicateRef
  , HH.p [ cls "description" ]
      [ HH.text edge.description ]
  ]

renderNodeDetail
  :: forall m
   . State
  -> Node
  -> H.ComponentHTML Action () m
renderNodeDetail state node =
  HH.div_ (nodeDetailContent state node <> [ renderPromptBuilder state PromptNode "Generate prompt" ])

renderNodePreview
  :: forall m
   . State
  -> Node
  -> H.ComponentHTML Action () m
renderNodePreview state node =
  HH.div_ (nodeDetailContent state node)

nodeDetailContent
  :: forall m
   . State
  -> Node
  -> Array (H.ComponentHTML Action () m)
nodeDetailContent state node =
  [ HH.span
      [ cls ("badge badge-" <> node.kind) ]
      [ HH.text (kindLabel cfg node.kind) ]
  , renderOntologyIdentity node
  , HH.p [ cls "description" ]
      [ HH.text node.description ]
  , renderLinks node.links
  , renderConnections "Connects to" outEdges
  , renderConnections "Connected from" inEdges
  ]
  where
  cfg = state.config
  graph = state.graph
  outEdges = Array.filter
    (\e -> e.source == node.id)
    graph.edges
  inEdges = Array.filter
    (\e -> e.target == node.id)
    graph.edges

  renderLinks
    :: Array Link -> H.ComponentHTML Action () m
  renderLinks [] = HH.text ""
  renderLinks links =
    HH.ul [ cls "links" ]
      ( map
          ( \l -> HH.li_
              [ HH.a
                  [ HP.href l.url
                  , HP.target "_blank"
                  , HP.rel "noopener"
                  ]
                  [ HH.text l.label ]
              ]
          )
          links
      )

  renderOntologyIdentity :: Node -> H.ComponentHTML Action () m
  renderOntologyIdentity currentNode =
    case ontologyIdentity currentNode of
      Nothing -> HH.text ""
      Just ident ->
        HH.div [ cls "ontology-identity" ]
          [ HH.div [ cls "connection-item" ]
              [ HH.span [ cls "conn-label" ]
                  [ HH.text "Ontology term" ]
              , HH.a
                  [ HP.href ident.iri
                  , HP.target "_blank"
                  , HP.rel "noopener"
                  , cls "conn-node"
                  ]
                  [ HH.text ident.compact ]
              ]
          , HH.div [ cls "connection-item" ]
              [ HH.span [ cls "conn-label" ]
                  [ HH.text "Namespace" ]
              , HH.a
                  [ HP.href ident.namespace
                  , HP.target "_blank"
                  , HP.rel "noopener"
                  , cls "conn-node"
                  ]
                  [ HH.text ident.namespaceLabel ]
              ]
          ]

  renderConnections
    :: String
    -> Array Edge
    -> H.ComponentHTML Action () m
  renderConnections _ [] = HH.text ""
  renderConnections title edges =
    HH.div [ cls "connections" ]
      [ HH.h3_ [ HH.text title ]
      , HH.div_ (map mkConn edges)
      ]

  mkConn :: Edge -> H.ComponentHTML Action () m
  mkConn edge =
    let
      targetId =
        if edge.source == node.id then edge.target
        else edge.source
      targetNode = Map.lookup targetId graph.nodes
      targetLabel = case targetNode of
        Just n -> n.label
        Nothing -> targetId
    in
      HH.div
        [ cls "connection-item"
        , HE.onClick \_ -> NavigateTo targetId
        ]
        [ HH.span [ cls "conn-label" ]
            [ HH.text edge.label ]
        , HH.span [ cls "conn-node" ]
            [ HH.text targetLabel ]
        ]
