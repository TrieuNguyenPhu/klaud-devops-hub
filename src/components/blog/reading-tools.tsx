"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { TocHeading } from "@/lib/content";
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className="reading-progress" style={{ scaleX }} aria-hidden="true" />;
}
export function TableOfContents({ items }: { items: TocHeading[] }) {
  const [active, setActive] = useState(items[0]?.id || "");
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { const visible = entries.filter(entry => entry.isIntersecting); if (visible[0]) setActive(visible[0].target.id); }, { rootMargin: "-90px 0px -60% 0px", threshold: 0 });
    items.forEach(item => { const node = document.getElementById(item.id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, [items]);
  return <aside className="toc" aria-label="Mục lục bài viết"><h2>TRONG BÀI VIẾT NÀY</h2><nav>{items.map(item => <a href={`#${item.id}`} key={item.id} data-depth={item.depth} data-active={active === item.id} aria-current={active === item.id ? "location" : undefined}>{item.text}</a>)}</nav><p className="toc-note">Học hiệu quả hơn bằng cách tự chạy ví dụ trong môi trường thực hành.</p></aside>;
}
export function CopyButton({ text, label = "Sao chép liên kết", useUrl = false }: { text?: string; label?: string; useUrl?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(useUrl ? window.location.href : text || ""); setCopied(true); toast.success("Đã sao chép"); window.setTimeout(() => setCopied(false), 1800); } catch { toast.error("Trình duyệt không cho phép sao chép. Hãy sao chép thủ công."); } };
  return <Button size="sm" variant="ghost" onClick={copy}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Đã sao chép" : label}</Button>;
}
