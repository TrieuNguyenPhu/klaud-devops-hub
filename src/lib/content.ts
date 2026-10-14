import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { parse as parseYaml } from "yaml";
import { z } from "zod";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { toString } from "mdast-util-to-string";
import GithubSlugger from "github-slugger";
import type { Root, Heading } from "mdast";
import { normalize, type SearchEntry } from "./search";

export const collections = ["blog", "interview", "certifications", "cheatsheets", "roadmaps"] as const;
export type Collection = typeof collections[number];
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => { const parsed = new Date(`${value}T00:00:00Z`); return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value; }, "Invalid calendar date");
export const metadataSchema = z.object({
  title: z.string().trim().min(1), description: z.string().trim().min(1), date, updated: date.optional(),
  category: z.enum(["AWS", "Linux", "Docker", "Kubernetes", "Terraform", "Ansible", "Git", "CI/CD", "Networking", "Observability", "Security", "DevOps"]),
  tags: z.array(z.string().trim().min(1)).min(1), difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  featured: z.boolean().default(false), draft: z.boolean().default(false), author: z.string().trim().min(1),
});
export type ContentMeta = z.infer<typeof metadataSchema> & { slug: string; collection: Collection; href: string; readingTime: number };
export type Content = ContentMeta & { body: string };
export type TocHeading = { id: string; text: string; depth: number };
export function headings(body: string): TocHeading[] {
  const tree = unified().use(remarkParse).parse(body) as Root;
  const slugger = new GithubSlugger();
  return tree.children.filter((node): node is Heading => node.type === "heading").map(node => ({ id: slugger.slug(toString(node)), text: toString(node), depth: node.depth })).filter(node => node.depth > 1 && node.depth < 4);
}
export function loadContent(root = path.join(process.cwd(), "content")): Content[] {
  const items: Content[] = [];
  for (const collection of collections) {
    const slugs = new Set<string>();
    const walk = (directory: string) => {
      let files;
      // Content paths are traced explicitly in next.config.ts to keep private files out.
      try { files = readdirSync(/* turbopackIgnore: true */ directory, { withFileTypes: true }); }
      catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return; throw error; }
      for (const file of files) {
        if (file.name === "gôm nhặt trên mạng" || file.isSymbolicLink()) continue;
        const filename = path.join(directory, file.name);
        if (file.isDirectory()) { walk(filename); continue; }
        if (!file.isFile() || !file.name.endsWith(".md")) continue;
        try {
          const raw = readFileSync(/* turbopackIgnore: true */ filename, "utf8").replace(/^\uFEFF/, "");
          const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
          if (!frontmatter) throw new Error("Missing YAML frontmatter");
          const data: unknown = parseYaml(frontmatter[1]);
          const body = raw.slice(frontmatter[0].length);
          const metadata = metadataSchema.parse(data);
          const slug = path.basename(file.name, ".md");
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid slug ${slug}`);
          if (slugs.has(slug)) throw new Error(`Duplicate slug ${slug}`);
          slugs.add(slug);
          if (!body.trim()) throw new Error("Empty content");
          if (metadata.draft) continue;
          items.push({ ...metadata, slug, collection, href: `/${collection}/${slug}`, body, readingTime: Math.max(1, Math.ceil(body.split(/\s+/).length / 220)) });
        } catch (error) { throw new Error(`Content error in ${filename}: ${error instanceof Error ? error.message : String(error)}`); }
      }
    };
    walk(path.join(/* turbopackIgnore: true */ root, collection));
  }
  return items.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}
export const getAllContent = cache(() => loadContent());
export function getCollection(collection: Collection) { return getAllContent().filter(item => item.collection === collection); }
export function getContent(collection: Collection, slug: string) { return getCollection(collection).find(item => item.slug === slug); }
export function metaOnly(item: Content): ContentMeta {
  const { title, description, date, updated, category, tags, difficulty, featured, draft, author, slug, collection, href, readingTime } = item;
  return { title, description, date, updated, category, tags, difficulty, featured, draft, author, slug, collection, href, readingTime };
}
export function getSearchIndex(): SearchEntry[] {
  return getAllContent().map(item => ({ title: item.title, description: item.description, href: item.href, kind: item.collection, keywords: [...new Set(normalize(`${item.category} ${item.tags.join(" ")} ${item.body}`).match(/[\p{L}\p{N}-]+/gu) ?? [])].join(" ") }));
}
