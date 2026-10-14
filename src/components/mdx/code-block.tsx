"use client";
import { useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
export function CodeBlock({ children, language, ...props }: React.ComponentProps<"pre"> & { language?: string }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(ref.current?.textContent?.replace(/\n$/, "") ?? ""); setCopied(true); toast.success("Đã sao chép lệnh"); window.setTimeout(() => setCopied(false), 1800); } catch { toast.error("Không thể sao chép. Hãy chọn và sao chép nội dung trực tiếp."); } };
  return <div className="code-block"><div className="code-toolbar"><span>{language || "code"}</span><button className="copy-button" onClick={copy} aria-label="Sao chép code">{copied ? <Check size={13} /> : <Copy size={13} />}{copied ? "Đã copy" : "Copy"}</button></div><pre ref={ref} {...props}>{children}</pre></div>;
}
