export function parseDSL(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  const nodesSet = new Set();
  const edges = [];

  for (const line of lines) {
    const match = line.match(/(\w+)\s*-->\s*(\w+)/);
    if (!match) continue;

    const [, from, to] = match;

    nodesSet.add(from);
    nodesSet.add(to);

    edges.push({ from, to });
  }

  const nodes = Array.from(nodesSet).map(id => ({
    id,
    label: id
  }));

  return { nodes, edges };
}