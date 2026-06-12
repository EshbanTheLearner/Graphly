import { useMemo, useRef, useState } from "react";
import Editor from "./components/Editor";
import Diagram from "./components/Diagram";
import ExportButton from "./components/ExportButton";
import MermaidDiagram from "./components/MermaidDiagram";

import { parseDSL } from "./parser/parseDSL";
import { buildGraph } from "./graph/buildGraph";
import { applyLayout } from "./layout/layout";

const examples = {
  graphly: `Start[start,color=#bbf7d0] --> Plan[process,color=#bfdbfe] : begin
Plan --> Check[decision,color=#fde68a] : review
Check --> End[end,color=#fecaca] : approved`,
  mermaid: `flowchart TD
    Start([Start]) -->|begin| Plan[Plan]
    Plan -->|review| Check{Check}
    Check -->|approved| End([End])`
};

export default function App() {
  const [mode, setMode] = useState("mermaid");
  const [input, setInput] = useState(examples.mermaid);
  const [transparentExport, setTransparentExport] = useState(true);
  const [renderError, setRenderError] = useState("");

  const graphRef = useRef(null);

  const graph = useMemo(() => {
    if (mode !== "graphly") return { nodes: [], edges: [] };

    const parsed = parseDSL(input);
    const built = buildGraph(parsed);
    return applyLayout(built.nodes, built.edges);
  }, [input, mode]);

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    setInput(examples[nextMode]);
    setRenderError("");
  };

  const stats =
    mode === "graphly"
      ? [`${graph.nodes.length} nodes`, `${graph.edges.length} edges`]
      : ["Mermaid", "SVG render"];

  return (
    <main className="app-shell">
      <section className="workspace">
        <aside className="editor-panel">
          <div className="brand-bar">
            <div>
              <h1>Graphly</h1>
              <p>Diagram studio</p>
            </div>
            <span className="status-pill">Live</span>
          </div>

          <div className="panel-section">
            <div className="mode-switch" aria-label="Diagram mode">
              <button
                className={mode === "mermaid" ? "active" : ""}
                onClick={() => handleModeChange("mermaid")}
                type="button"
              >
                Mermaid
              </button>
              <button
                className={mode === "graphly" ? "active" : ""}
                onClick={() => handleModeChange("graphly")}
                type="button"
              >
                Graphly DSL
              </button>
            </div>
          </div>

          <div className="panel-section editor-section">
            <div className="section-heading">
              <span>{mode === "mermaid" ? "Mermaid" : "DSL"}</span>
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
                mode={mode}
                targetRef={graphRef}
                nodes={graph.nodes}
                transparentBackground={transparentExport}
              />
            </div>
          </div>
        </aside>

        <div className="diagram-panel">
          <div className="diagram-toolbar">
            <div>
              <span className="toolbar-title">Canvas</span>
              <span className="toolbar-meta">
                {mode === "mermaid" ? "Mermaid renderer" : "Auto layout"}
              </span>
            </div>
          </div>
          <div className="diagram-surface" ref={graphRef}>
            {mode === "mermaid" ? (
              <MermaidDiagram source={input} onError={setRenderError} />
            ) : (
              <Diagram nodes={graph.nodes} edges={graph.edges} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
