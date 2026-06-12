import { toPng } from "html-to-image";
import { getNodesBounds, getViewportForBounds } from "reactflow";

const exportPadding = 96;
const exportPixelRatio = 4;
const fallbackNodeSize = {
  width: 160,
  height: 90
};

export function getExportOptions({ width, height, transparentBackground }) {
  return {
    backgroundColor: transparentBackground ? undefined : "#f8fafc",
    cacheBust: true,
    height,
    pixelRatio: exportPixelRatio,
    width
  };
}

export default function ExportButton({
  mode,
  targetRef,
  nodes,
  transparentBackground
}) {
  const handleExport = async () => {
    if (!targetRef.current) return;

    if (mode === "mermaid") {
      await exportMermaidDiagram(targetRef.current, transparentBackground);
      return;
    }

    await exportReactFlowDiagram(targetRef.current, nodes, transparentBackground);
  };

  return (
    <button className="export-button" onClick={handleExport}>
      Export PNG
    </button>
  );
}

async function exportReactFlowDiagram(target, nodes, transparentBackground) {
  const viewport = target.querySelector(".react-flow__viewport");
  if (!viewport || nodes.length === 0) return;

  const nodesWithDimensions = nodes.map((node) => ({
    ...node,
    width: node.width ?? fallbackNodeSize.width,
    height: node.height ?? fallbackNodeSize.height
  }));
  const bounds = getNodesBounds(nodesWithDimensions);
  const width = Math.ceil(bounds.width + exportPadding * 2);
  const height = Math.ceil(bounds.height + exportPadding * 2);
  const viewportTransform = getViewportForBounds(bounds, width, height, 0.5, 2);

  const dataUrl = await toPng(viewport, {
    ...getExportOptions({ width, height, transparentBackground }),
    style: {
      height: `${height}px`,
      transform: `translate(${viewportTransform.x}px, ${viewportTransform.y}px) scale(${viewportTransform.zoom})`,
      width: `${width}px`
    }
  });

  const link = document.createElement("a");
  link.download = "diagram.png";
  link.href = dataUrl;
  link.click();
}

async function exportMermaidDiagram(target, transparentBackground) {
  const diagram = target.querySelector(".mermaid-export-target");
  if (!diagram) return;

  const rect = diagram.getBoundingClientRect();
  const width = Math.ceil(rect.width);
  const height = Math.ceil(rect.height);
  const dataUrl = await toPng(diagram, getExportOptions({
    height,
    transparentBackground,
    width
  }));

  const link = document.createElement("a");
  link.download = "diagram.png";
  link.href = dataUrl;
  link.click();
}
