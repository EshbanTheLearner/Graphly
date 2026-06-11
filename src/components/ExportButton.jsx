import { toPng } from "html-to-image";
import { getNodesBounds, getViewportForBounds } from "reactflow";

const exportPadding = 96;
const fallbackNodeSize = {
  width: 160,
  height: 90
};

export default function ExportButton({
  targetRef,
  nodes,
  transparentBackground
}) {
  const handleExport = async () => {
    if (!targetRef.current) return;

    const viewport = targetRef.current.querySelector(".react-flow__viewport");
    if (!viewport) return;

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
      backgroundColor: transparentBackground ? undefined : "#f8fafc",
      cacheBust: true,
      height,
      pixelRatio: 2,
      style: {
        height: `${height}px`,
        transform: `translate(${viewportTransform.x}px, ${viewportTransform.y}px) scale(${viewportTransform.zoom})`,
        width: `${width}px`
      },
      width
    });

    const link = document.createElement("a");
    link.download = "diagram.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <button className="export-button" onClick={handleExport}>
      Export PNG
    </button>
  );
}
