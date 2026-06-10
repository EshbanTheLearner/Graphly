import { describe, it, expect } from "vitest";
import { buildGraph } from "./buildGraph";

describe("buildGraph", () => {
  it("converts nodes and edges to ReactFlow format", () => {
    const input = {
      nodes: [{ id: "A", label: "A" }],
      edges: [{ from: "A", to: "B" }]
    };

    const result = buildGraph(input);

    expect(result.nodes[0]).toMatchObject({
      id: "A",
      data: { label: "A" }
    });

    expect(result.edges[0]).toMatchObject({
      source: "A",
      target: "B"
    });
  });
});