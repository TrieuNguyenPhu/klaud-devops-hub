import Link from "next/link";
import { Terminal, ArrowUpRight } from "lucide-react";
import { navigation } from "@/config/site";
export function Footer() {
  return <footer className="site-footer"><div className="container footer-top"><div><Link href="/" className="brand"><Terminal size={20} /><span>devops<span className="text-primary">.hub</span></span></Link><p>Hiểu nền tảng. Thực hành mỗi ngày.<br />Xây những hệ thống tốt hơn.</p></div><nav aria-label="Điều hướng cuối trang">{[...navigation, { href: "/about", label: "Về website" }].map(link => <Link key={link.href} href={link.href}>{link.label}<ArrowUpRight size={13} /></Link>)}</nav></div><div className="container footer-bottom"><span>© 2026 DevOps Knowledge Hub</span><span>Được viết để học. Được chia sẻ để cùng tiến bộ.</span></div></footer>;
}
