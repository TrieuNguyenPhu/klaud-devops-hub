import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { loadContent, metadataSchema, headings } from "../src/lib/content";
import { normalize, matchesSearch, queryValues } from "../src/lib/search";
import { isCorrect, restoreProgress, type QuizQuestion } from "../src/lib/quiz";

const metadata = { title: "Docker cơ bản", description: "Kiến thức thực hành", date: "2026-10-01", category: "Docker", tags: ["docker"], difficulty: "beginner", featured: false, draft: false, author: "DevOps Knowledge Hub" };
test("metadata rejects impossible dates and incomplete articles", () => {
  assert.equal(metadataSchema.safeParse(metadata).success, true);
  assert.equal(metadataSchema.safeParse({ ...metadata, date: "2026-02-30" }).success, false);
  assert.equal(metadataSchema.safeParse({ ...metadata, title: "" }).success, false);
});
test("content loader excludes drafts/private files and reports duplicate slugs", () => {
  const root = mkdtempSync(path.join(tmpdir(), "hub-content-"));
  try {
    const write = (file: string, draft = false) => { mkdirSync(path.dirname(path.join(root, file)), { recursive: true }); writeFileSync(path.join(root, file), `---\n${Object.entries({ ...metadata, draft }).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join("\n")}\n---\n## Ví dụ\nNội dung`); };
    write("blog/docker/published.md"); write("blog/docker/draft.md", true);
    write("blog/gôm nhặt trên mạng/private.md");
    assert.deepEqual(loadContent(root).map(item => item.slug), ["published"]);
    write("blog/another/published.md");
    assert.throws(() => loadContent(root), /published/);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
test("TOC ignores code fences and gives duplicate headings unique anchors", () => {
  assert.deepEqual(headings("## Ví dụ\n## Ví dụ\n```bash\n## hidden\n```"), [{ id: "ví-dụ", text: "Ví dụ", depth: 2 }, { id: "ví-dụ-1", text: "Ví dụ", depth: 2 }]);
});
test("Vietnamese search is accent-insensitive and matches every query token", () => {
  assert.equal(normalize("Hạ tầng ĐÁM MÂY"), "ha tang dam may");
  assert.equal(matchesSearch("Docker: tối ưu image", "docker toi uu"), true);
  assert.equal(matchesSearch("Docker networking", "docker linux"), false);
});
test("repeated URL parameters select the first value safely", () => {
  assert.deepEqual(queryValues({ q: ["docker", "linux"], category: "Docker", tag: undefined }), { q: "docker", category: "Docker", tag: "" });
});
const question: QuizQuestion = { id: "one", certification: "cka", question: "Q?", choices: [{ id: "a", text: "A", explanation: "A" }, { id: "b", text: "B", explanation: "B" }, { id: "c", text: "C", explanation: "C" }], correct: ["a", "b"], explanation: "Explanation", source: "https://kubernetes.io" };
test("multi-choice grading requires exact set without extra or duplicate choices", () => {
  assert.equal(isCorrect(question, ["b", "a"]), true);
  assert.equal(isCorrect(question, ["a"]), false);
  assert.equal(isCorrect(question, ["a", "b", "c"]), false);
  assert.equal(isCorrect(question, ["a", "a"]), false);
});
test("quiz restoration rejects corrupted, stale, and tampered progress", () => {
  assert.equal(restoreProgress("oops", [question]), null);
  assert.equal(restoreProgress(JSON.stringify({ version: 1, ids: ["old"], answers: {}, submitted: [] }), [question]), null);
  assert.equal(restoreProgress(JSON.stringify({ version: 1, ids: ["one"], answers: { one: ["invalid"] }, submitted: ["one"] }), [question]), null);
  const value = { version: 2, revision: JSON.stringify([question]), ids: ["one"], answers: { one: ["a", "b"] }, submitted: ["one"] };
  assert.deepEqual(restoreProgress(JSON.stringify(value), [question]), value);
  assert.equal(restoreProgress(JSON.stringify(value), [{ ...question, correct: ["a"] }]), null);
});
