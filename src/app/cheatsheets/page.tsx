import Link from "next/link";
import { getCollection } from "@/lib/content";
import { matchesSearch, queryValues } from "@/lib/search";
import { PageHeading } from "@/components/shared/page-heading";
import { Markdown } from "@/components/mdx/markdown";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Cheatsheets", "Tra cứu nhanh lệnh Linux, Git và Docker. Ví dụ dễ sao chép, kèm giải thích ngắn và lưu ý.", "/cheatsheets");
export default async function Cheatsheets({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = queryValues(await searchParams); const sheets = getCollection("cheatsheets");
  const filtered = sheets.filter(item => (!params.category || params.category === item.category) && matchesSearch(`${item.title} ${item.description} ${item.body}`, params.q || ""));
  return <div className="container page-main"><PageHeading eyebrow="CHEATSHEETS / TRA CỨU NHANH" title="Lệnh cần dùng. Ngay trong tầm tay." description="Ghi chú ngắn gọn để nhớ cách dùng, hiểu tác dụng và tránh những lỗi phổ biến. Sao chép ví dụ rồi điều chỉnh cho môi trường thực hành của bạn." /><form action="/cheatsheets" className="filter-bar"><label className="filter-field">Tìm kiếm<input name="q" defaultValue={params.q} placeholder="docker inspect, journalctl, git log…" /></label><label className="filter-field">Công nghệ<select name="category" defaultValue={params.category || ""}><option value="">Tất cả</option>{sheets.map(sheet => <option key={sheet.slug}>{sheet.category}</option>)}</select></label><div className="flex gap-2 items-end"><Button type="submit">Tìm kiếm</Button><Button asChild variant="ghost"><Link href="/cheatsheets">Xóa lọc</Link></Button></div></form>{filtered.length ? <Tabs key={filtered.map(item => item.slug).join("|")} defaultValue={filtered[0].slug} className="cheatsheet-tabs"><TabsList>{filtered.map(item => <TabsTrigger key={item.slug} value={item.slug}>{item.category}</TabsTrigger>)}</TabsList>{filtered.map(item => <TabsContent key={item.slug} value={item.slug} className="max-w-4xl mt-5"><h2 className="text-2xl font-semibold mb-3">{item.title}</h2><p className="text-muted-foreground text-sm mb-6">{item.description}</p><Markdown body={item.body} /></TabsContent>)}</Tabs> : <div className="empty-state"><h2>Chưa tìm thấy cheatsheet</h2><p>Thử một lệnh hoặc chủ đề khác.</p><Button asChild variant="outline"><Link href="/cheatsheets">Xem tất cả</Link></Button></div>}</div>;
}
