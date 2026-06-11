export function parseDSL(input) {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const nodesMap = new Map();
  const edges = [];

  for (const line of lines) {
    const match = line.match(/^(.+?)\s*-->\s*(.+?)(?:\s*:\s*(.+))?$/);
    if (!match) continue;

    const [, rawFrom, rawTo, rawLabel] = match;
    const fromNode = parseNode(rawFrom);
    const toNode = parseNode(rawTo);

    if (!fromNode || !toNode) continue;

    upsertNode(nodesMap, fromNode);
    upsertNode(nodesMap, toNode);

    const edge = { from: fromNode.id, to: toNode.id };

    if (rawLabel?.trim()) {
      edge.label = rawLabel.trim();
    }

    edges.push(edge);
  }

  const nodes = Array.from(nodesMap.values());

  return { nodes, edges };
}

function parseNode(rawNode) {
  const match = rawNode.trim().match(/^(\w+)(?:\s*\[([^\]]+)\])?$/);
  if (!match) return null;

  const [, id, rawAttributes] = match;
  const node = { id, label: id };

  if (!rawAttributes) return node;

  const attributes = rawAttributes
    .split(",")
    .map((attribute) => attribute.trim())
    .filter(Boolean);

  for (const attribute of attributes) {
    const [key, value] = attribute.split("=").map((part) => part.trim());

    if (!value) {
      node.type = key;
      continue;
    }

    if (key === "type") {
      node.type = value;
    }

    if (key === "color") {
      node.color = value;
    }
  }

  return node;
}

function upsertNode(nodesMap, node) {
  const existing = nodesMap.get(node.id) ?? { id: node.id, label: node.label };

  nodesMap.set(node.id, {
    ...existing,
    ...node
  });
}
