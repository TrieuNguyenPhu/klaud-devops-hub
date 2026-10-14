"use client";
import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { CodeBlock } from "./code-block";
export function Mermaid({ source }: { source: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const render = async () => {
      try {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: resolvedTheme === "dark" ? "dark" : "default", fontFamily: "sans-serif" });
        const result = await mermaid.render(`diagram${id}`, source);
        if (!cancelled) { setSvg(result.svg); setError(false); }
      } catch { if (!cancelled) setError(true); }
    };
    const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); void render(); } }, { rootMargin: "200px" });
    if (ref.current) observer.observe(ref.current);
    return () => { cancelled = true; observer.disconnect(); };
  }, [source, resolvedTheme, id]);
  return <div className="mermaid-frame" ref={ref} role="figure" aria-label="Sơ đồ kiến trúc"><div dangerouslySetInnerHTML={{ __html: svg }} />{!svg && !error && <p>Đang tải sơ đồ…</p>}{error && <p>Không thể hiển thị sơ đồ. Mã sơ đồ ở bên dưới.</p>}<details><summary className="text-xs text-muted-foreground mt-3">Xem mã sơ đồ</summary><CodeBlock language="mermaid"><code>{source}</code></CodeBlock></details></div>;
}
