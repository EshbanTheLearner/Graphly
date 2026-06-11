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

  it("passes node metadata and edge labels through", () => {
    const input = {
      nodes: [{ id: "A", label: "A", type: "decision", color: "yellow" }],
      edges: [{ from: "A", to: "B", label: "yes" }]
    };

    const result = buildGraph(input);

    expect(result.nodes[0]).toMatchObject({
      type: "graphNode",
      data: {
        label: "A",
        nodeType: "decision",
        color: "yellow"
      }
    });
    expect(result.edges[0]).toMatchObject({
      label: "yes"
    });
  });
});
