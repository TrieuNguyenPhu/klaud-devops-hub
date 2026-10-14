import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { technologies } from "@/data/technologies";
import { getCollection } from "@/lib/content";
import { PageHeading } from "@/components/shared/page-heading";
import { TechnologyIcon } from "@/components/shared/technology-icon";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Kho kiến thức", "Khám phá kiến thức DevOps theo công nghệ: AWS, Linux, Docker, Kubernetes và Terraform.", "/knowledge");
export default function Knowledge() { const posts = getCollection("blog"); return <div className="container page-main"><PageHeading eyebrow="KHO KIẾN THỨC" title="Kết nối những mảnh ghép." description="Một bản đồ kiến thức có cấu trúc. Chọn công nghệ bạn đang học để tìm bài thực hành, câu hỏi và tài liệu liên quan." /><div className="library-grid">{technologies.map(tech => <Link href={`/knowledge/${tech.slug}`} key={tech.slug} className="library-card"><div className="card-top"><TechnologyIcon name={tech.name} size={30} /><span>{posts.filter(post => post.category === tech.name).length} bài viết</span></div><h2>{tech.name}</h2><p>{tech.description}</p><div className="topic-tags">{tech.topics.map(topic => <span key={topic}>{topic}</span>)}</div><span className="text-link">Khám phá chủ đề<ArrowRight size={14} /></span></Link>)}</div></div>; }
