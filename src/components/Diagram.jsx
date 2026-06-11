import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import GraphNode from "./GraphNode";

const nodeTypes = {
  graphNode: GraphNode
};

export default function Diagram({ nodes, edges }) {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={true}
      />
    </div>
  );
}
