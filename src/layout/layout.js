import dagre from "dagre";

export function applyLayout(nodes, edges) {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));

  g.setGraph({
    rankdir: "TB",
    nodesep: 40,
    ranksep: 60
  });

  nodes.forEach((node) => {
    g.setNode(node.id, { width: 120, height: 40 });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  const layoutedNodes = nodes.map((node) => {
    const pos = g.node(node.id);

    return {
      ...node,
      position: {
        x: pos.x,
        y: pos.y
      }
    };
  });

  return { nodes: layoutedNodes, edges };
}