import { useMemo, useRef, useState } from "react";
import Editor from "./components/Editor";
import Diagram from "./components/Diagram";
import ExportButton from "./components/ExportButton";

import { parseDSL } from "./parser/parseDSL";
import { buildGraph } from "./graph/buildGraph";
import { applyLayout } from "./layout/layout";

export default function App() {
  const [input, setInput] = useState(`Start[start,color=#bbf7d0] --> Plan[process,color=#bfdbfe] : begin
Plan --> Check[decision,color=#fde68a] : review
Check --> End[end,color=#fecaca] : approved`);
  const [transparentExport, setTransparentExport] = useState(true);

  const graphRef = useRef(null);

  const graph = useMemo(() => {
    const parsed = parseDSL(input);
    const built = buildGraph(parsed);
    return applyLayout(built.nodes, built.edges);
  }, [input]);

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

          <div className="panel-section editor-section">
            <div className="section-heading">
              <span>DSL</span>
              <span>{input.split("\n").filter(Boolean).length} lines</span>
            </div>
            <Editor value={input} onChange={setInput} />
          </div>

          <div className="panel-footer">
            <div className="graph-stats" aria-label="Graph stats">
              <span>{graph.nodes.length} nodes</span>
              <span>{graph.edges.length} edges</span>
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
              <span className="toolbar-meta">Auto layout</span>
            </div>
          </div>
          <div className="diagram-surface" ref={graphRef}>
            <Diagram nodes={graph.nodes} edges={graph.edges} />
          </div>
        </div>
      </section>
    </main>
  );
}
