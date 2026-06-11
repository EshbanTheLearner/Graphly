import { describe, it, expect } from "vitest";
import { parseDSL } from "./parseDSL";

describe("parseDSL", () => {
  it("parses simple edges", () => {
    const input = `A --> B\nB --> C`;

    const result = parseDSL(input);

    expect(result.nodes).toEqual(
      expect.arrayContaining([
        { id: "A", label: "A" },
        { id: "B", label: "B" },
        { id: "C", label: "C" }
      ])
    );

    expect(result.edges).toEqual([
      { from: "A", to: "B" },
      { from: "B", to: "C" }
    ]);
  });

  it("ignores invalid lines", () => {
    const input = `A --> B\nINVALID LINE\nB --> C`;

    const result = parseDSL(input);

    expect(result.edges.length).toBe(2);
  });

  it("trims whitespace", () => {
    const input = `  A --> B  `;

    const result = parseDSL(input);

    expect(result.edges).toEqual([{ from: "A", to: "B" }]);
  });

  it("parses edge labels", () => {
    const result = parseDSL("A --> B : starts flow");

    expect(result.edges).toEqual([
      { from: "A", to: "B", label: "starts flow" }
    ]);
  });

  it("parses node types and colors", () => {
    const result = parseDSL(
      "Start[start,color=green] --> Check[type=decision,color=#fde68a]"
    );

    expect(result.nodes).toEqual(
      expect.arrayContaining([
        { id: "Start", label: "Start", type: "start", color: "green" },
        { id: "Check", label: "Check", type: "decision", color: "#fde68a" }
      ])
    );
  });
});
