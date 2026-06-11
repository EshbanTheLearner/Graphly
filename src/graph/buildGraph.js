export function buildGraph({ nodes, edges }) {
  return {
    nodes: nodes.map((n) => ({
      id: n.id,
      type: "graphNode",
      data: {
        label: n.label,
        nodeType: n.type ?? "process",
        color: n.color
      },
      position: { x: 0, y: 0 }
    })),
    edges: edges.map((e, i) => ({
      id: `e-${i}`,
      source: e.from,
      target: e.to,
      ...(e.label ? { label: e.label } : {})
    }))
  };
}
