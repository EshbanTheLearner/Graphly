# Graphly
Graphly is a lightweight tool that turns simple text-based graph syntax into interactive, auto-laid-out diagrams that can be visualized and exported instantly.

## Features

- Simple DSL (A --> B)
- Edge labels
- Colored nodes
- Node types: start, end, process, decision
- Automatic graph layout (Dagre)
- Interactive diagram (React Flow)
- Export to PNG
- No backend required

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


## Install

```bash
npm install
npm run dev
```

## Tech Stack

- React + Vite
- React Flow
- Dagre
- html-to-image


---

MIT License

Copyright (c) 2026

Permission is hereby granted...
