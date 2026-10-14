import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/layout/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getSearchIndex } from "@/lib/content";
import { site } from "@/config/site";
import "./globals.css";
const sans = Geist({ subsets: ["latin", "vietnamese"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin", "vietnamese"], variable: "--font-geist-mono", display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(site.url), title: { default: site.name, template: `%s | ${site.name}` }, description: site.description,
  openGraph: { type: "website", locale: "vi_VN", siteName: site.name, title: site.name, description: site.description, images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ["/opengraph-image"] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="vi" suppressHydrationWarning><body className={`${sans.variable} ${mono.variable}`}><Providers><a className="skip-link" href="#main">Đến nội dung chính</a><Header index={getSearchIndex()} /><main id="main">{children}</main><Footer /></Providers></body></html>;
}
