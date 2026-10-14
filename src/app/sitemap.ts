import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/content";
import { technologies } from "@/data/technologies";
import { absoluteUrl } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "blog", "knowledge", "interview", "certifications", "certifications/practice", "cheatsheets", "roadmaps", "about"];
  return [...pages.map(page => ({ url: absoluteUrl(`/${page}`), changeFrequency: "weekly" as const, priority: page ? .7 : 1 })), ...getAllContent().map(item => ({ url: absoluteUrl(item.href), lastModified: new Date(item.updated || item.date), changeFrequency: "monthly" as const, priority: .6 })), ...technologies.map(tech => ({ url: absoluteUrl(`/knowledge/${tech.slug}`), changeFrequency: "monthly" as const, priority: .5 })), ...getAllContent().filter(item => item.collection === "certifications").map(item => ({ url: absoluteUrl(`${item.href}/quiz`), priority: .5 }))];
}
