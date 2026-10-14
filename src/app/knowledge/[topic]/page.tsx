import Link from "next/link";
import { notFound } from "next/navigation";
import { technologies } from "@/data/technologies";
import { getCollection } from "@/lib/content";
import { PageHeading } from "@/components/shared/page-heading";
import { ArticleCard } from "@/components/blog/article-card";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return technologies.map(tech => ({ topic: tech.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) { const { topic } = await params; const tech = technologies.find(item => item.slug === topic); return tech ? pageMetadata(tech.name, tech.description, `/knowledge/${tech.slug}`) : {}; }
export default async function Topic({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params; const tech = technologies.find(item => item.slug === topic); if (!tech) notFound();
  const articles = getCollection("blog").filter(post => post.category === tech.name);
  const questions = getCollection("interview").filter(item => item.category === tech.name);
  return <div className="container page-main"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/knowledge">Kho kiến thức</Link><span>/</span><span>{tech.name}</span></nav><PageHeading eyebrow="CHỦ ĐỀ CÔNG NGHỆ" title={tech.name} description={tech.description} /><div className="category-tabs">{tech.topics.map(name => <Link key={name} href={`/blog?category=${encodeURIComponent(tech.name)}&q=${encodeURIComponent(name)}`}>{name}</Link>)}</div>{articles.length ? <div className="articles-grid">{articles.map(article => <ArticleCard key={article.slug} article={article} />)}</div> : <div className="empty-state"><h2>Chủ đề đang được biên soạn</h2><p>Chưa có bài viết riêng cho {tech.name}. Khám phá lộ trình để học các nền tảng liên quan.</p><Button asChild variant="outline"><Link href="/roadmaps">Xem lộ trình</Link></Button></div>}{questions.length > 0 && <section className="section"><h2 className="text-2xl font-semibold mb-5">Câu hỏi ôn tập</h2><div className="recent-list">{questions.map(question => <Link key={question.slug} href={question.href}><h3>{question.title}</h3><span className="recent-time">{question.difficulty}</span><span>↗</span></Link>)}</div></section>}</div>;
}
