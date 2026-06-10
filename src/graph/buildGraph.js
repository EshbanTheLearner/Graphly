export function buildGraph({ nodes, edges }) {
  return {
    nodes: nodes.map((n) => ({
      id: n.id,
      data: { label: n.label },
      position: { x: 0, y: 0 }
    })),
    edges: edges.map((e, i) => ({
      id: `e-${i}`,
      source: e.from,
      target: e.to
    }))
  };
}