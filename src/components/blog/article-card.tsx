import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TechnologyIcon } from "@/components/shared/technology-icon";
import type { ContentMeta } from "@/lib/content";
export function ArticleCard({ article, prominent = false }: { article: ContentMeta; prominent?: boolean }) {
  return <article className={`article-card ${prominent ? "prominent" : ""}`}><Link href={article.href} className="article-card-link"><div className={`article-visual tech-${article.category.toLowerCase().replace(/\//g, "-")}`} aria-hidden="true"><div className="visual-grid" /><span className="visual-label">{article.category === "AWS" ? "CLOUD / INFRASTRUCTURE" : `${article.category.toUpperCase()} / ENGINEERING`}</span><TechnologyIcon name={article.category} size={prominent ? 72 : 54} /><span className="visual-corner">{article.category === "Docker" ? "FROM knowledge:latest" : "learn → build → ship"}</span><ArrowUpRight className="visual-arrow" size={20} /></div><div className="article-card-body"><div className="article-meta"><Badge variant="secondary">{article.category}</Badge><span><Clock size={12} />{article.readingTime} phút đọc</span></div><h3>{article.title}</h3><p>{article.description}</p><div className="article-bottom"><span>{new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" }).format(new Date(article.date))}</span><span>Đọc bài viết<ArrowUpRight size={14} /></span></div></div></Link></article>;
}
