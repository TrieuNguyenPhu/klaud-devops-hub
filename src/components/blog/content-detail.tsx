import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Markdown } from "@/components/mdx/markdown";
import { ReadingProgress, TableOfContents, CopyButton } from "./reading-tools";
import { ArticleCard } from "./article-card";
import { SectionHeading } from "@/components/shared/page-heading";
import { headings, getCollection, type Content } from "@/lib/content";
import { collectionLabels, site } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";
export function ContentDetail({ item, children }: { item: Content; children?: React.ReactNode }) {
  const siblings = getCollection(item.collection);
  const position = siblings.findIndex(sibling => sibling.slug === item.slug);
  const related = siblings.filter(sibling => sibling.slug !== item.slug && sibling.category === item.category).slice(0, 2);
  const structured = { "@context": "https://schema.org", "@type": item.collection === "blog" ? "Article" : "TechArticle", headline: item.title, description: item.description, datePublished: item.date, dateModified: item.updated || item.date, author: { "@type": "Organization", name: item.author }, publisher: { "@type": "Organization", name: site.name }, mainEntityOfPage: absoluteUrl(item.href), image: absoluteUrl("/opengraph-image"), inLanguage: "vi" };
  return <><ReadingProgress /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} /><div className="container reading-layout"><article><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Trang chủ</Link><ChevronRight size={12} /><Link href={`/${item.collection}`}>{collectionLabels[item.collection]}</Link><ChevronRight size={12} /><span>{item.category}</span></nav><header className="article-header"><div className="article-meta"><Badge variant="secondary">{item.category}</Badge><span>{item.readingTime} phút đọc · {item.difficulty}</span></div><h1>{item.title}</h1><p>{item.description}</p><div className="article-byline"><span>{item.author}</span><time dateTime={item.date}>{new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(item.date))}</time>{item.updated && <span>Cập nhật {item.updated}</span>}<CopyButton useUrl /></div></header><Markdown body={item.body} />{children}<div className="article-tags">{item.tags.map(tag => <Link href={`/blog?tag=${encodeURIComponent(tag)}`} key={tag}>#{tag}</Link>)}</div><nav className="article-next" aria-label="Bài trước và sau">{[siblings[position - 1], siblings[position + 1]].map((sibling, i) => sibling ? <Link key={sibling.slug} href={sibling.href}><span>{i === 0 ? "← Bài trước" : "Bài tiếp theo →"}</span>{sibling.title}</Link> : <div key={i} />)}</nav>{item.collection === "blog" && related.length > 0 && <section><SectionHeading kicker="TIẾP TỤC KHÁM PHÁ" title="Bài viết liên quan" /><div className="related-grid">{related.map(article => <ArticleCard key={article.slug} article={article} />)}</div></section>}</article><TableOfContents items={headings(item.body)} /></div></>;
}
