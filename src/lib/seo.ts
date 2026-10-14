import type { Metadata } from "next";
import { site } from "@/config/site";
export function pageMetadata(title: string, description: string, pathname: string): Metadata {
  return { title, description, alternates: { canonical: pathname }, openGraph: { title, description, url: pathname, images: ["/opengraph-image"] }, twitter: { title, description, card: "summary_large_image", images: ["/opengraph-image"] } };
}
export function absoluteUrl(pathname: string) { return new URL(pathname, site.url).toString(); }
