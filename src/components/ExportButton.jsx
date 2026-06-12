import { toPng } from "html-to-image";

const exportPixelRatio = 4;

export function getExportOptions({ width, height, transparentBackground }) {
  return {
    backgroundColor: transparentBackground ? undefined : "#f8fafc",
    cacheBust: true,
    height,
    pixelRatio: exportPixelRatio,
    width
  };
}

export default function ExportButton({ targetRef, transparentBackground }) {
  const handleExport = async () => {
    if (!targetRef.current) return;

    await exportMermaidDiagram(targetRef.current, transparentBackground);
  };

  return (
    <button className="export-button" onClick={handleExport}>
      Export PNG
    </button>
  );
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
