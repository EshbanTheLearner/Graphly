# Graphly
Graphly is a lightweight diagram studio for turning text-based graph syntax into interactive, auto-laid-out diagrams that can be previewed and exported instantly.

## What’s included

- Two editing modes: Graphly DSL and Mermaid syntax
- Automatic graph layout with Dagre
- Interactive canvas rendering with React Flow
- High-resolution PNG exports with improved export scaling for sharper images
- Optional transparent background export toggle
- No backend required

## Features

- Simple DSL input such as `A --> B`
- Full Mermaid rendering support via the official Mermaid package
- Edge labels and node metadata
- Colored nodes and node types: start, end, process, decision
- Auto layout for graph-style diagrams
- Export to PNG with higher-quality rendering
- Live preview and render error feedback in the editor

## Example DSL
A --> B <br>
B --> C <br>
A --> D

## Level 2 DSL
```txt
Start[start,color=#bbf7d0] --> Plan[process,color=#bfdbfe] : begin
Plan --> Check[decision,color=#fde68a] : review
Check --> End[end,color=#fecaca] : approved
```

Node metadata goes inside brackets. The first bare value is treated as the node type, and key/value attributes can be used for `type` and `color`.

## Modes

### Graphly DSL
Use the Graphly DSL for quick, structured graph definitions with layout and node metadata.

```txt
Start[start,color=#bbf7d0] --> Plan[process,color=#bfdbfe] : begin
Plan --> Check[decision,color=#fde68a] : review
Check --> End[end,color=#fecaca] : approved
```

### Mermaid Mode
Graphly can render Mermaid diagrams directly using Mermaid's official browser renderer.

```txt
flowchart TD
    Start([Start]) -->|begin| Plan[Plan]
    Plan -->|review| Check{Check}
    Check -->|approved| End([End])
```

Mermaid mode supports the diagram types supported by the installed Mermaid package, including flowcharts, sequence diagrams, class diagrams, state diagrams, ER diagrams, Gantt charts, pie charts, mindmaps, timelines, journeys, and git graphs.


## Install and run

```bash
npm install
npm run dev
```

## Useful scripts

```bash
npm test
npm run build
```

## Export quality

PNG exports now use a higher rendering scale, which produces clearer, sharper images for sharing and documentation.

## Tech Stack

- React + Vite
- React Flow
- Dagre
- Mermaid
- html-to-image


---

MIT License

Copyright (c) 2026

Permission is hereby granted...
