import Link from "next/link";
import { getCollection } from "@/lib/content";
import { matchesSearch, queryValues } from "@/lib/search";
import { Markdown } from "@/components/mdx/markdown";
import { CopyButton } from "@/components/blog/reading-tools";
import { QuestionAccordion } from "@/components/shared/question-accordion";
import { PageHeading } from "@/components/shared/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Luyện phỏng vấn", "Câu hỏi phỏng vấn DevOps thực tế: Linux, mạng, cloud, container và xử lý sự cố production.", "/interview");
export default async function Interview({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = queryValues(await searchParams);
  const questions = getCollection("interview");
  const filtered = questions.filter(item => (!params.category || item.category === params.category) && (!params.difficulty || item.difficulty === params.difficulty) && matchesSearch(`${item.title} ${item.description} ${item.body}`, params.q || ""));
  return <div className="container page-main"><PageHeading eyebrow="LUYỆN PHỎNG VẤN" title="Giải thích được. Xử lý được." description="Ôn nền tảng, luyện tư duy vận hành và cách phân tích một tình huống thực tế. Tự trả lời trước khi mở phần giải thích." /><form action="/interview" className="filter-bar"><label className="filter-field">Tìm câu hỏi<input name="q" defaultValue={params.q} placeholder="DNS, state lock, rollback…" /></label><label className="filter-field">Công nghệ<select name="category" defaultValue={params.category || ""}><option value="">Tất cả</option>{[...new Set(questions.map(item => item.category))].sort().map(category => <option key={category}>{category}</option>)}</select></label><label className="filter-field">Độ khó<select name="difficulty" defaultValue={params.difficulty || ""}><option value="">Tất cả</option><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></label><div className="flex gap-2 items-end"><Button type="submit">Áp dụng</Button><Button asChild variant="ghost"><Link href="/interview">Xóa lọc</Link></Button></div></form><p className="result-count">{filtered.length} câu hỏi</p><div className="question-list">{filtered.map((item, i) => <QuestionAccordion id={item.slug} title={item.title} key={item.slug} metadata={<><Badge variant="secondary">{item.category}</Badge><Badge variant="outline">{item.difficulty}</Badge></>}><Markdown body={item.body} /><div className="question-controls"><CopyButton text={item.title} label="Copy câu hỏi" /><Link href={item.href} className="text-link">Mở riêng ↗</Link>{filtered[i + 1] && <Link href={`#${filtered[i + 1].slug}`} className="text-link">Câu tiếp →</Link>}</div></QuestionAccordion>)}</div>{!filtered.length && <div className="empty-state"><h2>Chưa tìm thấy câu hỏi</h2><p>Thử tìm không dấu hoặc chọn tất cả công nghệ.</p><Button asChild variant="outline"><Link href="/interview">Xóa bộ lọc</Link></Button></div>}</div>;
}
