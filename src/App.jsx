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

  const graphRef = useRef(null);

  const graph = useMemo(() => {
    const parsed = parseDSL(input);
    const built = buildGraph(parsed);
    return applyLayout(built.nodes, built.edges);
  }, [input]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Left panel */}
      <div style={{ width: "30%", borderRight: "1px solid #eee" }}>
        <Editor value={input} onChange={setInput} />
        <div style={{ padding: 10 }}>
          <ExportButton targetRef={graphRef} />
        </div>
      </div>

      {/* Right panel */}
      <div style={{ width: "70%" }} ref={graphRef}>
        <Diagram nodes={graph.nodes} edges={graph.edges} />
      </div>
    </div>
  );
}
