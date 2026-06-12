# Graphly
Graphly is a Mermaid-first diagram studio for writing and previewing Mermaid syntax, then exporting sharp PNG images directly from the browser.

## What’s included

- Mermaid-only editing and rendering
- Live preview with render error feedback
- High-resolution PNG exports for sharper images
- Optional transparent background export toggle
- No backend required

## Features

- Full Mermaid rendering support via the official Mermaid package
- Fast editor and preview workflow in the browser
- Export to PNG with higher-quality rendering
- Transparent background option for presentations and docs

## Example Mermaid diagram

```txt
flowchart TD
    Start([Start]) -->|begin| Plan[Plan]
    Plan -->|review| Check{Check}
    Check -->|approved| End([End])
```

## Mermaid support

Graphly renders Mermaid diagrams directly using Mermaid's official browser renderer.

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
- Mermaid
- html-to-image


---

MIT License

Copyright (c) 2026

Permission is hereby granted...
