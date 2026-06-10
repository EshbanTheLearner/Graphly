export default function Editor({ value, onChange }) {
  return (
    <textarea
      style={{
        width: "100%",
        height: "100%",
        padding: 12,
        fontFamily: "monospace",
        fontSize: 14,
        border: "1px solid #ddd"
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}