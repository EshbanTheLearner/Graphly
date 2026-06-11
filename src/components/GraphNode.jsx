import { Handle, Position } from "reactflow";

const typeStyles = {
  start: {
    borderRadius: 999
  },
  end: {
    borderRadius: 999
  },
  process: {
    borderRadius: 8
  },
  decision: {
    borderRadius: 8,
    transform: "rotate(45deg)"
  }
};

const labelStyles = {
  decision: {
    transform: "rotate(-45deg)"
  }
};

const defaultColors = {
  start: "#dcfce7",
  end: "#fee2e2",
  process: "#dbeafe",
  decision: "#fef3c7"
};

export default function GraphNode({ data }) {
  const nodeType = data.nodeType ?? "process";
  const background = data.color ?? defaultColors[nodeType] ?? "#f8fafc";

  return (
    <div
      className="graph-node"
      style={{
        ...baseStyle,
        ...typeStyles[nodeType],
        background
      }}
    >
      <Handle type="target" position={Position.Top} />
      <div style={labelStyles[nodeType]}>{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

const baseStyle = {
  alignItems: "center",
  border: "1px solid rgba(15, 23, 42, 0.18)",
  boxShadow: "0 14px 30px rgba(15, 23, 42, 0.16)",
  color: "#0f172a",
  display: "flex",
  fontSize: 14,
  fontWeight: 700,
  height: 52,
  justifyContent: "center",
  minWidth: 128,
  padding: "0 16px"
};
