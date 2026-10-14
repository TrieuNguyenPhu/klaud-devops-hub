import { notFound } from "next/navigation";
import { getCollection, getContent } from "@/lib/content";
import { ContentDetail } from "@/components/blog/content-detail";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return getCollection("blog").map(item => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = getContent("blog", slug); return item ? { ...pageMetadata(item.title, item.description, item.href), openGraph: { type: "article" as const, title: item.title, description: item.description, url: item.href, publishedTime: item.date, modifiedTime: item.updated || item.date, authors: [item.author], tags: item.tags, images: ["/opengraph-image"] } } : {}; }
export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = getContent("blog", slug); if (!item) notFound(); return <ContentDetail item={item} />; }
