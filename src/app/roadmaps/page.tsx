import Link from "next/link";
import { Route, ArrowRight } from "lucide-react";
import { getCollection, headings } from "@/lib/content";
import { PageHeading } from "@/components/shared/page-heading";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Lộ trình học", "Lộ trình DevOps và cloud native theo giai đoạn, có bài thực hành và tiêu chí hoàn thành.", "/roadmaps");
export default function Roadmaps() { return <div className="container page-main"><PageHeading eyebrow="LEARNING ROADMAPS" title="Một bước nhỏ. Một nền tảng lớn." description="Đi theo kết quả làm được, không theo số công cụ đã cài. Mỗi chặng gồm nội dung cần học, bài thực hành và một tiêu chí hoàn thành rõ ràng." /><div className="library-grid">{getCollection("roadmaps").map(item => <Link key={item.slug} href={item.href} className="library-card"><div className="card-top"><Route size={30} /><span>{item.difficulty}</span></div><h2>{item.title}</h2><p>{item.description}</p><div className="topic-tags">{headings(item.body).filter(heading => /^\d/.test(heading.text)).map(heading => <span key={heading.id}>{heading.text}</span>)}</div><span className="text-link">Bắt đầu lộ trình<ArrowRight size={14} /></span></Link>)}</div></div>; }
