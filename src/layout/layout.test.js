import { describe, expect, it } from "vitest";
import { applyLayout } from "./layout";

describe("applyLayout", () => {
  it("adds Dagre positions while preserving edges", () => {
    const nodes = [
      { id: "A", data: { label: "A" }, position: { x: 0, y: 0 } },
      { id: "B", data: { label: "B" }, position: { x: 0, y: 0 } }
    ];
    const edges = [{ id: "e-0", source: "A", target: "B" }];

    const result = applyLayout(nodes, edges);

    expect(result.edges).toBe(edges);
    expect(result.nodes).toHaveLength(2);
    expect(result.nodes[0].position).toEqual(
      expect.objectContaining({
        x: expect.any(Number),
        y: expect.any(Number)
      })
    );
  });
});
