import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

const themePalette = {
  dark: {
    background: "transparent",
    primaryColor: "#1e293b",
    primaryTextColor: "#eff6ff",
    primaryBorderColor: "#38bdf8",
    lineColor: "#94a3b8",
    secondaryColor: "#0f172a",
    tertiaryColor: "#111827"
  },
  light: {
    background: "transparent",
    primaryColor: "#dbeafe",
    primaryTextColor: "#0f172a",
    primaryBorderColor: "#93c5fd",
    lineColor: "#475569",
    secondaryColor: "#ccfbf1",
    tertiaryColor: "#fef3c7"
  }
};

mermaid.initialize({
  securityLevel: "strict",
  startOnLoad: false,
  theme: "base",
  themeVariables: themePalette.light
});

export default function MermaidDiagram({ source, onError, theme = "light" }) {
  const themeVariables = themePalette[theme] ?? themePalette.light;
  const [svg, setSvg] = useState("");
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [diagramSize, setDiagramSize] = useState({ width: 0, height: 0 });
  const dragState = useRef({ startX: 0, startY: 0, originX: 0, originY: 0 });
  const stageRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const updateSizes = () => {
      if (!stageRef.current || !svgRef.current) return;

      setDiagramSize({
        width: svgRef.current.getBoundingClientRect().width,
        height: svgRef.current.getBoundingClientRect().height
      });
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);

    const observer = new ResizeObserver(updateSizes);
    if (stageRef.current) observer.observe(stageRef.current);
    if (svgRef.current) observer.observe(svgRef.current);

    return () => {
      window.removeEventListener("resize", updateSizes);
      observer.disconnect();
    };
  }, [svg, scale, offset]);

  useEffect(() => {
    mermaid.initialize({
      securityLevel: "strict",
      startOnLoad: false,
      theme: "base",
      themeVariables
    });
  }, [themeVariables]);

  useEffect(() => {
    let isCurrent = true;

    async function renderDiagram() {
      try {
        setSvg("");
        const renderId = `graphly-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const { svg: renderedSvg } = await mermaid.render(renderId, source);

        if (!isCurrent) return;

        setSvg(renderedSvg);
        onError("");
      } catch (error) {
        if (!isCurrent) return;

        setSvg("");
        onError(error.message ?? "Unable to render Mermaid diagram.");
      }
    }

    renderDiagram();

    return () => {
      isCurrent = false;
    };
  }, [onError, source, themeVariables]);

  const zoomIn = () => setScale((current) => Math.min(2.2, Number((current + 0.1).toFixed(2))));
  const zoomOut = () => setScale((current) => Math.max(0.8, Number((current - 0.1).toFixed(2))));
  const previewScale = diagramSize.width && diagramSize.height
    ? Math.min(1, 180 / Math.max(diagramSize.width, diagramSize.height))
    : 1;
  const visibleWidth = Math.max(18, Math.min(100, 100 / scale));
  const visibleHeight = Math.max(18, Math.min(100, 100 / scale));
  const viewportLeft = diagramSize.width
    ? Math.max(0, Math.min(100 - visibleWidth, (-offset.x / (diagramSize.width * scale)) * 100))
    : 0;
  const viewportTop = diagramSize.height
    ? Math.max(0, Math.min(100 - visibleHeight, (-offset.y / (diagramSize.height * scale)) * 100))
    : 0;
  const resetView = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const nextScale = event.deltaY < 0 ? scale + 0.08 : scale - 0.08;
    setScale(Math.min(2.2, Math.max(0.8, Number(nextScale.toFixed(2)))));
  };

  const handlePointerDown = (event) => {
    if (event.target.closest("button, a, input, textarea, select")) return;

    dragState.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;

    setOffset({
      x: dragState.current.originX + (event.clientX - dragState.current.startX),
      y: dragState.current.originY + (event.clientY - dragState.current.startY)
    });
  };

  const handlePointerUp = () => setIsDragging(false);

  return (
    <div
      ref={stageRef}
      className={`mermaid-stage ${isDragging ? "dragging" : ""}`}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onWheel={handleWheel}
    >
      {svg ? (
        <>
          <div className="canvas-controls" aria-label="Canvas controls">
            <button type="button" onClick={zoomIn} aria-label="Zoom in">+</button>
            <button type="button" onClick={zoomOut} aria-label="Zoom out">−</button>
            <button type="button" onClick={resetView} aria-label="Reset view">Reset</button>
          </div>

          <div className="mermaid-minimap" aria-label="Minimap preview">
            <div
              className="mermaid-minimap-inner"
              style={{ transform: `scale(${previewScale})` }}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
            <div
              className="mermaid-minimap-viewport"
              style={{
                width: `${Math.max(8, visibleWidth)}%`,
                height: `${Math.max(8, visibleHeight)}%`,
                left: `${viewportLeft}%`,
                top: `${viewportTop}%`
              }}
            />
          </div>

          <div
            ref={svgRef}
            className="mermaid-export-target mermaid-diagram"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </>
      ) : (
        <div className="mermaid-empty-state">Waiting for valid Mermaid syntax</div>
      )}
    </div>
  );
}
