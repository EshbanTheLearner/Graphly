import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  securityLevel: "strict",
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    background: "transparent",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    primaryColor: "#dbeafe",
    primaryTextColor: "#0f172a",
    primaryBorderColor: "#93c5fd",
    lineColor: "#475569",
    secondaryColor: "#ccfbf1",
    tertiaryColor: "#fef3c7"
  }
});

export default function MermaidDiagram({ source, onError }) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");

  useEffect(() => {
    let isCurrent = true;

    async function renderDiagram() {
      try {
        const renderId = `graphly-${id}`;
        const { svg: renderedSvg } = await mermaid.render(renderId, source);

        if (!isCurrent) return;

        setSvg(renderedSvg);
        onError("");
      } catch (error) {
        if (!isCurrent) return;

        setSvg("");
        onError(error.message ?? "Unable to render Mermaid diagram.");
      }
    }

    renderDiagram();

    return () => {
      isCurrent = false;
    };
  }, [id, onError, source]);

  return (
    <div className="mermaid-stage">
      {svg ? (
        <div
          className="mermaid-export-target mermaid-diagram"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="mermaid-empty-state">Waiting for valid Mermaid syntax</div>
      )}
    </div>
  );
}
