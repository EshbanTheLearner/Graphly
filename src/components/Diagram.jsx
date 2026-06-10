import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

export default function Diagram({ nodes, edges }) {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodesDraggable={true}
      />
    </div>
  );
}