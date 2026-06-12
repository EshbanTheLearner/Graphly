import { describe, expect, it } from "vitest";

import { getExportOptions } from "./ExportButton";

describe("getExportOptions", () => {
  it("uses a high-resolution export scale for PNG output", () => {
    const options = getExportOptions({
      width: 800,
      height: 600,
      transparentBackground: false
    });

    expect(options.width).toBe(800);
    expect(options.height).toBe(600);
    expect(options.pixelRatio).toBeGreaterThan(2);
    expect(options.backgroundColor).toBe("#f8fafc");
  });
});
