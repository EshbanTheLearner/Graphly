import { Handle, Position } from "reactflow";

const typeStyles = {
  start: {
    borderRadius: 999
  },
  end: {
    borderRadius: 999
  },
  process: {
    borderRadius: 6
  },
  decision: {
    borderRadius: 4,
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
  border: "1px solid #64748b",
  boxShadow: "0 1px 3px rgba(15, 23, 42, 0.12)",
  color: "#0f172a",
  display: "flex",
  fontSize: 14,
  fontWeight: 600,
  height: 48,
  justifyContent: "center",
  minWidth: 120,
  padding: "0 14px"
};
