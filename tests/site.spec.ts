import { test as base, expect } from "@playwright/test";
import { getAllContent } from "../src/lib/content";
import { getQuestions } from "../src/lib/questions";
import { technologies } from "../src/data/technologies";
const test = base.extend({ page: async ({ page }, run) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await run(page);
  expect(errors, "browser console/runtime errors").toEqual([]);
} });

async function primaryContrast(page: import("@playwright/test").Page) {
  return page.locator(".hero-actions [data-slot=button]").evaluate(element => {
    const luminance = (color: string) => { const rgb = color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map(value => { const channel = value / 255; return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4; }); return .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2]; };
    const styles = getComputedStyle(element); const a = luminance(styles.color), b = luminance(styles.backgroundColor);
    return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
  });
}

test("all public routes and content links resolve, private paths return 404", async ({ request }) => {
  const routes = ["/", "/blog", "/knowledge", "/interview", "/certifications", "/certifications/practice", "/cheatsheets", "/roadmaps", "/about", "/robots.txt", "/sitemap.xml", ...getAllContent().map(item => item.href), ...technologies.map(tech => `/knowledge/${tech.slug}`), ...getAllContent().filter(item => item.collection === "certifications").map(item => `${item.href}/quiz`)];
  for (const route of routes) { const response = await request.get(route); expect(response.status(), route).toBe(200); }
  const health = await request.get("/api/health");
  expect(health.status()).toBe(200);
  expect(await health.json()).toEqual({ status: "ok", commit: process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || "local" });
  const headers = (await request.get("/")).headers();
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect((await request.get("/blog/no-such-post")).status()).toBe(404);
  expect((await request.get(encodeURI("/gôm nhặt trên mạng/anything.pdf"))).status()).toBe(404);
  for (const route of ["/blog", "/interview", "/cheatsheets"]) expect((await request.get(`${route}?q=docker&q=linux`)).status()).toBe(200);
});
test("home is responsive and theme toggle persists without browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/"); await expect(page.getByRole("heading", { name: /Hiểu hệ thống/ })).toBeVisible();
  expect(await primaryContrast(page)).toBeGreaterThanOrEqual(4.5);
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `overflow at ${width}`).toBe(true);
    await page.screenshot({ path: `.qa/home-${width}-dark.png`, fullPage: true });
  }
  await page.getByRole("button", { name: "Đổi giao diện sáng tối" }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  expect(await primaryContrast(page)).toBeGreaterThanOrEqual(4.5);
  await page.reload(); await expect(page.locator("html")).not.toHaveClass(/dark/);
  await page.screenshot({ path: ".qa/home-mobile-light.png", fullPage: true });
  await page.getByRole("button", { name: "Mở menu" }).click();
  await page.getByRole("dialog").getByRole("link", { name: "Cheatsheets" }).click();
  await expect(page).toHaveURL(/\/cheatsheets/);
  expect(errors).toEqual([]);
});
test("global search supports keyboard, accent-insensitive matches and empty results", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Control+k");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const input = dialog.getByRole("combobox");
  await input.fill("iam thiet ke quyen");
  await expect(dialog.getByRole("option").first()).toContainText(/IAM/);
  await page.keyboard.press("ArrowDown"); await page.keyboard.press("ArrowUp"); await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/blog\/aws-iam-quyen-toi-thieu/);
  await page.keyboard.press("Control+k"); await page.getByRole("dialog").getByRole("combobox").fill("zqxnomatch902");
  await expect(page.getByText("Không tìm thấy nội dung.", { exact: false })).toBeVisible();
  await page.keyboard.press("Escape"); await expect(page.getByRole("dialog")).not.toBeVisible();
});
test("blog filtering, pagination, highlighted code, copy, TOC and Mermaid work", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/blog");
  await expect(page.locator(".article-card")).toHaveCount(6);
  await page.getByRole("navigation", { name: "Phân trang" }).getByRole("link", { name: "2", exact: true }).click();
  await expect(page.locator(".article-card")).toHaveCount(4);
  await page.getByRole("combobox", { name: "Chủ đề", exact: true }).selectOption("Docker");
  await page.getByRole("button", { name: "Áp dụng" }).click(); await expect(page.locator(".article-card")).toHaveCount(2);
  await page.goto("/blog/aws-vpc-duong-di-goi-tin");
  await expect(page.locator(".toc")).toBeVisible();
  await page.locator(".toc a").last().click();
  await expect(page.locator(".toc a").last()).toHaveAttribute("aria-current", "location");
  await expect(page.locator("pre.shiki").first()).toBeVisible();
  await page.getByRole("button", { name: "Sao chép code" }).first().click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("aws");
  await page.locator(".mermaid-frame").scrollIntoViewIfNeeded();
  await expect(page.locator(".mermaid-frame svg.flowchart")).toBeVisible({ timeout: 20000 });
  await page.screenshot({ path: ".qa/article-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: ".qa/article-mobile.png", fullPage: true });
  const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
  expect(JSON.parse(jsonLd || "{}")["@type"]).toBe("Article");
});
test("interview filters and expands answers; cheatsheet tabs switch content", async ({ page }) => {
  await page.goto("/interview?category=Linux"); await expect(page.locator(".question-card")).toHaveCount(2);
  await page.locator('[data-slot="accordion-trigger"]').first().click();
  await expect(page.locator('[data-slot="accordion-content"]').first()).toBeVisible();
  await page.goto("/cheatsheets");
  await page.getByRole("tab", { name: "Git", exact: true }).click();
  await expect(page.getByRole("tabpanel")).toContainText("git");
  await page.getByRole("tab", { name: "Docker", exact: true }).click();
  await expect(page.getByRole("tabpanel")).toContainText("docker");
});
test("quiz grades multi-choice, restores, finishes, reviews errors and retries", async ({ page }) => {
  const questions = getQuestions();
  await page.goto("/certifications/practice");
  await page.getByRole("button", { name: "Bắt đầu / Tiếp tục" }).click();
  await expect(page.getByRole("button", { name: "Nộp đáp án" })).toBeDisabled();
  for (const id of questions[0].correct) {
    const choice = questions[0].choices.find(c => c.id === id)!;
    await page.locator(".quiz-choice").filter({ hasText: choice.text }).locator("input").check();
  }
  await page.getByRole("button", { name: "Nộp đáp án" }).click();
  await expect(page.getByRole("heading", { name: "Chính xác!" })).toBeVisible();
  await page.reload(); await page.getByRole("button", { name: "Bắt đầu / Tiếp tục" }).click();
  await expect(page.locator(".quiz-status")).toContainText("1/15");
  for (let i = 1; i < questions.length; i++) {
    const question = questions[i];
    const choice = i === 1 ? question.choices.find(c => !question.correct.includes(c.id))! : question.choices.find(c => c.id === question.correct[0])!;
    const answers = i === 1 ? [choice] : question.correct.map(id => question.choices.find(c => c.id === id)!);
    for (const answer of answers) await page.locator(".quiz-choice").filter({ hasText: answer.text }).locator("input").check();
    await page.getByRole("button", { name: "Nộp đáp án" }).click();
    if (i < questions.length - 1) await page.getByRole("button", { name: "Câu tiếp", exact: true }).click();
  }
  await expect(page.locator(".quiz-summary")).toContainText("14/15");
  await page.getByRole("button", { name: "Ôn câu trả lời sai" }).click();
  await expect(page.locator(".quiz-card h2")).toHaveText(questions[1].question);
  await page.getByRole("button", { name: "Làm lại", exact: true }).click();
  await expect(page.locator(".quiz-status")).toContainText("0/15");
  await expect(page.getByRole("button", { name: "Nộp đáp án" })).toBeDisabled();
});
