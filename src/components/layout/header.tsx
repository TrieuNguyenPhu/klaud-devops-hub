"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, Search, Sun, Moon, ArrowUpRight, Terminal, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandEmpty } from "@/components/ui/command";
import { navigation, collectionLabels } from "@/config/site";
import { matchesSearch, normalize, type SearchEntry } from "@/lib/search";

function Highlight({ text, query }: { text: string; query: string }) {
  const token = query.trim().split(/\s+/)[0];
  const start = token ? normalize(text).indexOf(normalize(token)) : -1;
  if (start < 0) return <>{text}</>;
  return <>{text.slice(0, start)}<mark>{text.slice(start, start + token.length)}</mark>{text.slice(start + token.length)}</>;
}
export function Header({ index }: { index: SearchEntry[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [query, setQuery] = useState("");
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen(value => !value); } };
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, []);
  const results = index.filter(item => matchesSearch(`${item.title} ${item.description} ${item.keywords}`, query)).slice(0, query ? 40 : 10);
  return <>
    <header className="site-header"><div className="header-inner">
      <Link href="/" className="brand" aria-label="DevOps Knowledge Hub — Trang chủ"><span className="brand-symbol"><Terminal size={19} /></span><span>devops<span className="text-primary">.hub</span></span></Link>
      <nav aria-label="Điều hướng chính" className="desktop-nav">{navigation.slice(0, 5).map(link => <Link key={link.href} href={link.href} aria-current={pathname.startsWith(link.href) ? "page" : undefined}>{link.label}</Link>)}</nav>
      <div className="header-actions"><button className="search-trigger" onClick={() => setOpen(true)} aria-label="Tìm kiếm toàn bộ nội dung"><Search size={16} /><span>Tìm kiếm</span><kbd>Ctrl K</kbd></button>
        <Button variant="ghost" size="icon" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label="Đổi giao diện sáng tối"><Sun className="hidden dark:block" /><Moon className="dark:hidden" /></Button>
        <Button className="mobile-menu" variant="ghost" size="icon" onClick={() => setMobile(true)} aria-label="Mở menu"><Menu /></Button>
      </div>
    </div></header>
    <Dialog open={mobile} onOpenChange={setMobile}><DialogContent><DialogTitle>Khám phá devops.hub</DialogTitle><DialogDescription>Bài viết và tài liệu thực hành DevOps.</DialogDescription><nav className="mobile-nav">{[...navigation, { href: "/about", label: "Về website" }].map(link => <Link key={link.href} href={link.href} onClick={() => setMobile(false)}>{link.label}<ArrowUpRight size={16} /></Link>)}</nav></DialogContent></Dialog>
    <Dialog open={open} onOpenChange={value => { setOpen(value); if (!value) setQuery(""); }}><DialogContent className="p-0 gap-0 sm:max-w-2xl" showCloseButton={false}>
      <DialogTitle className="sr-only">Tìm kiếm kiến thức</DialogTitle><DialogDescription className="sr-only">Tìm bài viết, phỏng vấn, cheatsheets và chứng chỉ. Dùng phím mũi tên để chọn, Enter để mở và Escape để đóng.</DialogDescription>
      <Command shouldFilter={false}><CommandInput placeholder="Bạn muốn tìm hiểu điều gì?" value={query} onValueChange={setQuery} aria-label="Tìm kiếm kiến thức" /><CommandList className="max-h-[55vh]"><CommandEmpty>Không tìm thấy nội dung. Thử từ khóa khác hoặc bỏ dấu tiếng Việt.</CommandEmpty>
        {Object.entries(collectionLabels).map(([kind, label]) => { const group = results.filter(item => item.kind === kind); return group.length > 0 && <CommandGroup key={kind} heading={label}>{group.map(item => <CommandItem key={item.href} value={item.href} onSelect={() => { setOpen(false); setQuery(""); router.push(item.href); }}><BookOpen className="text-muted-foreground" /><div className="min-w-0"><div><Highlight text={item.title} query={query} /></div><p className="search-description">{item.description}</p></div><ArrowUpRight className="ml-auto shrink-0" /></CommandItem>)}</CommandGroup>; })}
      </CommandList><div className="command-footer"><span>↑ ↓ chọn · ↵ mở</span><span>esc để đóng</span></div></Command>
    </DialogContent></Dialog>
  </>;
}
