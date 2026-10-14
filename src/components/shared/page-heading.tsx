import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function PageHeading({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: React.ReactNode }) {
  return <div className="page-heading"><div className="eyebrow"><span />{eyebrow}</div><h1>{title}</h1><p>{description}</p>{children}</div>;
}
export function SectionHeading({ kicker, title, href, label = "Xem tất cả" }: { kicker: string; title: string; href?: string; label?: string }) {
  return <div className="section-heading"><div><p className="section-kicker">{kicker}</p><h2>{title}</h2></div>{href && <Link href={href} className="text-link">{label}<ArrowUpRight size={16} /></Link>}</div>;
}
