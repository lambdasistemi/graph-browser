# Core And Application Layers

## Why The Split Exists

Without a split, a repository-specific term like `gbkind:ffi` or `gbgroup:ui` gets mixed into the same ontology document as portable graph-browser concepts such as `gb:Node` or `gb:View`.

That is useful for export, but conceptually wrong. The project now separates:

- **core ontology**
  Shared graph-browser concepts and constraints
- **application ontology**
  Repository-specific vocabulary generated from data

## Core Ontology Responsibilities

The core ontology is responsible for:

- the structure of exported datasets
- shared classes and properties
- structural multiplicities, such as one `gb:nodeId` per `gb:Node`
- common extension points like `gb:EdgeRelation`

It is not responsible for domain semantics like "Regulator" or "ProtocolAction".

## Application Ontology Responsibilities

The application ontology is responsible for:

- declaring local node kinds as subclasses of `gb:Node`
- declaring local groups as `gb:Group`
- declaring local edge predicates as subproperties of `gb:EdgeRelation`

This keeps the extension contract strict while leaving domain modeling free.

## Downstream Contract

A downstream repository can define its own ontology, but to remain graph-browser compatible it should:

- import the core ontology
- subclass node kinds from `gb:Node`
- model edge predicates under `gb:EdgeRelation`
- expose any local validation rules as application SHACL shapes
