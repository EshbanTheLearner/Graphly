import { toPng } from "html-to-image";

export default function ExportButton({ targetRef }) {
  const handleExport = async () => {
    if (!targetRef.current) return;

    const dataUrl = await toPng(targetRef.current);

    const link = document.createElement("a");
    link.download = "diagram.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <button onClick={handleExport}>
      Export PNG
    </button>
  );
}