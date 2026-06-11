import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
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
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#cbd5e1" gap={22} size={1.4} />
        <MiniMap pannable zoomable nodeStrokeWidth={3} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
