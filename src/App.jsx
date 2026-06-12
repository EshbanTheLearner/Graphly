import { useEffect, useRef, useState } from "react";
import Editor from "./components/Editor";
import ExportButton from "./components/ExportButton";
import MermaidDiagram from "./components/MermaidDiagram";

const example = `flowchart TD
    Start([Start]) -->|begin| Plan[Plan]
    Plan -->|review| Check{Check}
    Check -->|approved| End([End])`;

const DEFAULT_PANEL_WIDTH = 460;
const MIN_PANEL_WIDTH = 320;

function getInitialSplitWidth() {
  if (typeof window === "undefined") return DEFAULT_PANEL_WIDTH;

  return Math.min(Math.max(Math.floor(window.innerWidth * 0.45), 440), 520);
}

export default function App() {
  const [input, setInput] = useState(example);
  const [transparentExport, setTransparentExport] = useState(true);
  const [renderError, setRenderError] = useState("");
  const [splitWidth, setSplitWidth] = useState(getInitialSplitWidth);
  const [isDragging, setIsDragging] = useState(false);

  const graphRef = useRef(null);
  const workspaceRef = useRef(null);

  const stats = ["Mermaid", "SVG render"];

  useEffect(() => {
    if (!isDragging) return undefined;

    const handlePointerMove = (event) => {
      const bounds = workspaceRef.current?.getBoundingClientRect();
      if (!bounds) return;

      const nextWidth = event.clientX - bounds.left;
      const maxWidth = Math.max(MIN_PANEL_WIDTH, bounds.width - 120);
      const clampedWidth = Math.min(Math.max(nextWidth, MIN_PANEL_WIDTH), maxWidth);

      setSplitWidth(clampedWidth);
    };

    const handlePointerUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
    };
  }, [isDragging]);

  return (
    <main className="app-shell">
      <section
        className="workspace"
        ref={workspaceRef}
        style={{ "--split-width": `${splitWidth}px` }}
      >
        <aside className="editor-panel">
          <div className="brand-bar">
            <div>
              <h1>Graphly</h1>
              <p>Diagram studio</p>
            </div>
            <span className="status-pill">Live</span>
          </div>

          <div className="panel-section editor-section">
            <div className="section-heading">
              <span>Mermaid</span>
              <span>{input.split("\n").filter(Boolean).length} lines</span>
            </div>
            <Editor value={input} onChange={setInput} />
            {renderError ? <div className="render-error">{renderError}</div> : null}
          </div>

          <div className="panel-footer">
            <div className="graph-stats" aria-label="Graph stats">
              {stats.map((stat) => (
                <span key={stat}>{stat}</span>
              ))}
            </div>
            <div className="export-controls">
              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={transparentExport}
                  onChange={(event) => setTransparentExport(event.target.checked)}
                />
                <span>Transparent</span>
              </label>
              <ExportButton
                targetRef={graphRef}
                transparentBackground={transparentExport}
              />
            </div>
          </div>
        </aside>

        <button
          type="button"
          className={`divider ${isDragging ? "dragging" : ""}`}
          aria-label="Drag to resize editor and canvas"
          onMouseDown={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
        />

        <div className="diagram-panel">
          <div className="diagram-toolbar">
            <div>
              <span className="toolbar-title">Canvas</span>
              <span className="toolbar-meta">Mermaid renderer</span>
            </div>
          </div>
          <div className="diagram-surface" ref={graphRef}>
            <MermaidDiagram source={input} onError={setRenderError} />
          </div>
        </div>
      </section>
    </main>
  );
}
