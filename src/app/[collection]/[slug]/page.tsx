import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllContent, getContent, type Collection } from "@/lib/content";
import { ContentDetail } from "@/components/blog/content-detail";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
const supported = ["certifications", "roadmaps", "cheatsheets", "interview"];
export const dynamicParams = false;
export function generateStaticParams() { return getAllContent().filter(item => supported.includes(item.collection)).map(item => ({ collection: item.collection, slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ collection: string; slug: string }> }) { const { collection, slug } = await params; if (!supported.includes(collection)) return {}; const item = getContent(collection as Collection, slug); return item ? pageMetadata(item.title, item.description, item.href) : {}; }
export default async function Detail({ params }: { params: Promise<{ collection: string; slug: string }> }) { const { collection, slug } = await params; if (!supported.includes(collection)) notFound(); const item = getContent(collection as Collection, slug); if (!item) notFound(); return <ContentDetail item={item}>{collection === "certifications" && <div className="quiz-intro mt-8"><h2 className="text-xl font-semibold">Đưa kiến thức vào thực hành</h2><p>Làm bộ câu hỏi minh họa và đọc giải thích từng lựa chọn.</p><Button asChild><Link href={`${item.href}/quiz`}>Bắt đầu luyện tập →</Link></Button></div>}</ContentDetail>; }
