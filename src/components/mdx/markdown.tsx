import { MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolink from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";
import { toString } from "hast-util-to-string";
import type { Root } from "mdast";
import { CodeBlock } from "./code-block";
import { Mermaid } from "./mermaid";

function callouts() {
  return (tree: Root) => {
    for (const node of tree.children) {
      if (node.type !== "blockquote") continue;
      const first = node.children[0];
      if (first?.type !== "paragraph" || first.children[0]?.type !== "text") continue;
      const text = first.children[0];
      const match = text.value.match(/^\[!(NOTE|TIP|WARNING|DANGER)\]\s*/);
      if (match) { text.value = text.value.replace(match[0], ""); node.data = { hProperties: { "data-callout": match[1].toLowerCase() } }; }
    }
  };
}
export async function Markdown({ body }: { body: string }) {
  return <div className="prose"><MarkdownAsync remarkPlugins={[remarkGfm, callouts]} rehypePlugins={[rehypeSlug, [rehypeAutolink, { behavior: "wrap" }], [rehypeShiki, { themes: { light: "github-light", dark: "github-dark" }, addLanguageClass: true, langs: ["bash", "yaml", "json", "dockerfile", "hcl", "typescript", "javascript", "text", "mermaid"], fallbackLanguage: "text" }]]} components={{
    pre({ node, children, ...props }) {
      const code = node?.children.find(child => child.type === "element" && child.tagName === "code");
      const classes = code?.type === "element" ? code.properties.className ?? code.properties.class : [];
      const language = (Array.isArray(classes) ? classes.join(" ") : String(classes || "")).match(/\blanguage-(\S+)/)?.[1] || "";
      if (language === "mermaid" && code) return <Mermaid source={toString(code)} />;
      return <CodeBlock language={language} {...props}>{children}</CodeBlock>;
    },
    table({ children }) { return <div className="table-scroll"><table>{children}</table></div>; },
    a({ children, href, title }) { const external = href?.startsWith("https://") || href?.startsWith("http://"); return <a href={href} title={title} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>; },
  }}>{body}</MarkdownAsync></div>;
}
