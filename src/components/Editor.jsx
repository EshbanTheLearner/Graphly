export default function Editor({ value, onChange }) {
  return (
    <textarea
      className="mermaid-editor"
      spellCheck="false"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
