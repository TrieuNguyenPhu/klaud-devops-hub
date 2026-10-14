import { notFound } from "next/navigation";
import { getCollection, getContent } from "@/lib/content";
import { getQuestions } from "@/lib/questions";
import { Quiz } from "@/components/quiz/quiz";
import { PageHeading } from "@/components/shared/page-heading";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return getCollection("certifications").map(item => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = getContent("certifications", slug); return item ? pageMetadata(`Quiz: ${item.title}`, item.description, `${item.href}/quiz`) : {}; }
export default async function CertificationQuiz({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = getContent("certifications", slug); if (!item) notFound(); const questions = getQuestions().filter(q => q.certification === slug); return <div className="container page-main quiz-layout"><PageHeading eyebrow="LUYỆN TẬP CHỨNG CHỈ" title={item.title} description="Câu hỏi minh họa tự biên soạn, có giải thích từng lựa chọn. Bộ câu hỏi nhỏ này giúp ôn kiến thức, chưa bao phủ toàn bộ kỳ thi." /><Quiz questions={questions} storageKey={`devops-hub:quiz:${slug}`} /></div>; }
