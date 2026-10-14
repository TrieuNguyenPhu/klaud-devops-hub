import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToReadableStream } from "react-dom/server";
import { Markdown } from "../src/components/mdx/markdown";
test("Markdown highlights code, detects Mermaid, anchors headings and blocks raw HTML", async () => {
  const stream = await renderToReadableStream(await Markdown({ body: '## Example\n\n```bash\necho hello\n```\n\n```mermaid\nflowchart LR\n A --> B\n```\n\n<script>alert("unsafe")</script>\n\n> [!WARNING]\n> Sandbox only.' }));
  const html = await new Response(stream).text();
  assert.match(html, /id="example"/);
  assert.match(html, /class="shiki/);
  assert.match(html, /<span>bash<\/span>/);
  assert.match(html, /mermaid-frame/);
  assert.match(html, /data-callout="warning"/);
  assert.equal(html.includes('<script>'), false);
});
