import assert from "node:assert/strict";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { getAllContent, collections } from "../src/lib/content";
import { getQuestions } from "../src/lib/questions";
import { technologies } from "../src/data/technologies";
import type { Root, RootContent } from "mdast";

const items = getAllContent();
const questions = getQuestions();
const knownRoutes = new Set(["/", "/about", "/certifications/practice", ...collections.map(collection => `/${collection}`), ...items.map(item => item.href), ...technologies.map(tech => `/knowledge/${tech.slug}`), ...items.filter(item => item.collection === "certifications").map(item => `${item.href}/quiz`)]);
function links(node: Root | RootContent): string[] {
  const result = node.type === "link" ? [node.url] : [];
  if ("children" in node) for (const child of node.children) result.push(...links(child as RootContent));
  return result;
}
for (const item of items) {
  const tree = unified().use(remarkParse).parse(item.body) as Root;
  for (const href of links(tree)) if (href.startsWith("/")) assert(knownRoutes.has(href.split(/[?#]/)[0]), `${item.href}: broken internal link ${href}`);
}
assert(questions.length >= 15, "At least 15 quiz questions required");
for (const certification of items.filter(item => item.collection === "certifications")) assert(questions.some(question => question.certification === certification.slug), `${certification.href}: quiz requires at least one question`);
assert(getAllContent().filter(item => item.collection === "blog").length >= 8, "At least 8 blog articles required");
assert(getAllContent().filter(item => item.collection === "interview").length >= 20, "At least 20 interview questions required");
for (const collection of collections) console.log(`${collection}: ${items.filter(item => item.collection === collection).length} validated`);
console.log(`quiz: ${questions.length} validated; all Markdown internal links resolve`);
