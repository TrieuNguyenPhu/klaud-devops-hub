# DevOps Knowledge Hub

Blog kỹ thuật và kho học tập bằng tiếng Việt. Next.js App Router, React, TypeScript strict, Tailwind CSS, component shadcn/ui, Lucide/React Icons, next-themes, Motion và Sonner. Nội dung Markdown dùng YAML frontmatter + Zod; GFM, Shiki, heading anchors chạy trên server. Mermaid được tải khi sơ đồ gần viewport.

## Chạy local

Yêu cầu Node.js 22+ và npm. Dự án giữ npm từ portfolio trước; dùng lockfile đã có để cài đúng phiên bản.

```bash
npm ci
npm run dev
```

Mở http://localhost:3000. Light/dark mode được lưu trong trình duyệt. `Ctrl+K` hoặc `Cmd+K` mở tìm kiếm; dùng mũi tên, Enter và Escape để điều hướng.

## Tính năng

- Home: terminal/pipeline visual, 12 chủ đề, bài nổi bật/mới, các hướng học.
- `/blog`: tìm trong tiêu đề/mô tả/nội dung, category/tag/featured filters, sort và phân trang.
- `/blog/[slug]`: GFM, code highlighting/copy, Mermaid, callouts, mục lục tự sinh/active, reading progress, copy URL, bài liên quan và trước/sau.
- `/knowledge`: phân loại dữ liệu theo công nghệ; chủ đề chưa có bài có empty state rõ ràng.
- `/interview`: tìm/lọc công nghệ/độ khó, accordion đáp án, copy và trang câu hỏi riêng.
- `/certifications`: 8 tổng quan với nguồn chính thức, quiz riêng từng chứng chỉ và bài tổng hợp 15 câu.
- Quiz: single/multiple choice, chấm đúng toàn bộ tập đáp án, giải thích từng lựa chọn, điểm cuối, ôn câu sai, làm lại và lưu tiến độ localStorage. Dữ liệu hỏng hoặc nội dung câu hỏi thay đổi sẽ không được khôi phục. Lưu trữ bị chặn vẫn làm bài được trong phiên hiện tại.
- `/cheatsheets`: Linux/Git/Docker, search/filter, tabs và copy lệnh.
- `/roadmaps`: 2 lộ trình có tiêu chí hoàn thành và liên kết bài thực hành.
- SEO: metadata riêng/canonical, Open Graph/Twitter, Article JSON-LD, sitemap, robots, ảnh OG và font tối ưu.

Nội dung mẫu gồm 10 bài blog, 20 câu phỏng vấn, 8 tổng quan chứng chỉ, 15 câu quiz, 3 cheatsheets và 2 roadmaps. Được biên soạn độc lập với liên kết tài liệu chính thức. Câu quiz không phải đề thi thật hoặc exam dumps. Các snippet kỹ thuật chưa được chạy trên hạ tầng thật.

## Cấu trúc

```text
src/app/                   Routes, metadata và CSS tokens
src/components/layout/     Navbar, footer, theme
src/components/ui/         Component shadcn sở hữu trong repo
src/components/blog/       Card, trang đọc, TOC, copy/progress
src/components/mdx/        Renderer Markdown, code và Mermaid
src/components/quiz/       Quiz tương tác
src/lib/                   Content/schema, search, grading, SEO
src/data/technologies.ts   Chủ đề và cấu trúc kho kiến thức
content/blog/              Blog theo category
content/interview/         Câu hỏi và lời giải Markdown
content/certifications/    Tổng quan chứng chỉ
content/quiz/questions.json
content/cheatsheets/
content/roadmaps/
scripts/                   Validation content và kiểm tra tài liệu riêng
tests/                     Unit và Playwright
```

## Thêm nội dung

Tạo `content/blog/docker/my-new-article.md`. Tên file là slug ASCII kebab-case, duy nhất trong collection. Metadata bắt buộc:

```yaml
---
title: "Một bài thực hành mới"
description: "Mô tả ngắn, có ích cho người đọc."
date: "2026-10-14"
category: "Docker"
tags: ["docker", "practice"]
difficulty: "beginner"
featured: false
draft: false
author: "Tên tác giả công khai"
---
```

`updated: "YYYY-MM-DD"` là tùy chọn. Ngày cần được đặt trong dấu nháy. `difficulty`: `beginner`, `intermediate`, `advanced`. Category: AWS, Linux, Docker, Kubernetes, Terraform, Ansible, Git, CI/CD, Networking, Observability, Security, DevOps. `draft: true` được loại khỏi tất cả public routes, search và sitemap ngay cả khi chạy local. Không dùng thư mục tham khảo làm nguồn dữ liệu runtime.

Viết nội dung bằng Markdown (`.md`), dùng `##`/`###` để sinh mục lục. Code fence có ngôn ngữ (`bash`, `yaml`, `json`, `dockerfile`, `hcl`, `typescript`, `javascript`); ngôn ngữ không có trong cấu hình sẽ hiển thị plain text. Fence `mermaid` tạo sơ đồ. GFM hỗ trợ bảng/checklist. Callouts:

```markdown
> [!WARNING]
> Chạy ví dụ trong môi trường sandbox.
```

Các loại hỗ trợ: NOTE, TIP, WARNING, DANGER. HTML raw được escape; MVP dùng Markdown thay cho MDX executable. Liên kết nội bộ viết `/blog/slug`; `npm run validate:content` kiểm tra liên kết đường dẫn. Metadata sai, slug trùng hoặc nội dung trống sẽ báo tên file cụ thể và dừng build.

Thêm quiz trong `content/quiz/questions.json`: `id`, `certification` (slug của overview), `question`, `choices: [{id, text, explanation}]`, `correct: [id]`, `explanation`, `source` (HTTPS). Một correct ID là single-choice; nhiều ID là multiple-choice. Mỗi lựa chọn phải có lời giải. Không nhập đề thi rò rỉ. Quiz riêng cần ít nhất một câu cho mỗi overview.

## Kiểm tra và production

```bash
npm run validate:content
npm test
npm run lint
npm run typecheck
npm run build
npm run check:private
npm run test:e2e
npm run start
```

Playwright mặc định dùng Chrome đã cài trên Windows và chạy headless; trong CI dùng Chromium cài bằng `npx playwright install --with-deps chromium`. Máy local không có Chrome: cài Chrome hoặc chuyển `channel` trong `playwright.config.ts` sang trình duyệt Chromium bạn quản lý. Tests khởi động production server nếu chưa có, kiểm tra các route/UI và lưu screenshot/trace vào `.qa/` được ignore. `npm run test:e2e` cần production build hiện hành. Ảnh desktop/tablet/mobile nằm trong `.qa/` sau khi test.

Trước khi triển khai, đặt `NEXT_PUBLIC_SITE_URL` thành origin thật (xem `.env.example`), hoàn thiện thông tin tác giả/GitHub/liên hệ tại `src/app/about/page.tsx`, rồi build lại. Không có secret nào cần cho bản MVP.

Deploy lên nền tảng hỗ trợ Next.js: cài `npm ci`, build `npm run build`, chạy `npm run start` với Node.js 22+. Các danh sách có query filters dùng server rendering; trang nội dung và các trang giới thiệu dùng static rendering. Đây không phải static export. GitHub Actions dùng Node 24 và deploy Vercel từ `main` sau quality gates. Xem [quy trình CI/CD, kiểm tra SHA và rollback](docs/deployment.md).

Nếu triển khai từ Git, chỉ stage các file ứng dụng cần thiết sau khi kiểm tra `git status`. Không dùng archive toàn bộ workspace để upload. Nếu cần đóng gói source, chỉ lấy cấu hình, `src/`, `content/`, scripts/test/docs cần thiết và lockfile. Không đưa tài liệu cá nhân, `.git`, `.env`, `.qa`, `node_modules` vào gói nguồn. Vercel CD chỉ upload artifact qua `--prebuilt`.

## Tài liệu cá nhân: không bao giờ công khai

Thư mục `gôm nhặt trên mạng` được giữ nguyên tại chỗ. `.gitignore` dùng `**/gôm nhặt trên mạng/` để loại trừ ở mọi cấp. `.dockerignore`, TypeScript/ESLint và output tracing cũng loại trừ tên này. Content loader chỉ đọc 5 collections trong `content/`, bỏ qua thư mục tên riêng này và symlink. Build tracing chỉ thêm nội dung đã định rõ, không quét root.

`npm run check:private` kiểm tra Git index/history, ignore ở root/nested, tên đường dẫn/tên file và SHA-256 của tài liệu trong `.next/` và các public outputs. Script đọc tài liệu local để đối chiếu, không in nội dung hoặc sao chép chúng. Trong CI, thư mục riêng phải vắng mặt khỏi checkout và script vẫn kiểm tra Git, tracing và output paths. Nếu tài liệu xuất hiện trong lịch sử, script yêu cầu báo chủ repo; không sửa lịch sử tự động.

## Giới hạn hiện tại

- Một số chủ đề mới chỉ có cấu trúc phân loại; chưa có bài viết riêng. Bộ quiz 15 câu có mục đích minh họa, chưa bao phủ toàn bộ exam domains.
- Chưa có database, login, CMS hoặc backend quiz; tiến độ chỉ có trên trình duyệt hiện tại.
- Cần bổ sung domain và thông tin tác giả thực trước khi xuất bản. Chưa đo Lighthouse/Core Web Vitals hoặc thử Safari/Firefox.
- `npm audit --omit=dev` hiện không có lỗ hổng được báo. Full audit báo 5 high trong chuỗi dev-only ESLint Next → fast-glob → micromatch → braces, chưa có bản braces vá trên registry khi kiểm tra. Không hạ Next hoặc dùng `audit fix --force` làm sai phiên bản. Theo dõi cập nhật tooling trước khi dùng trong CI nhận input không tin cậy.

Nguồn nền tảng: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [shadcn/ui](https://ui.shadcn.com/docs/installation/manual), [Shiki rehype](https://shiki.style/packages/rehype). Các tài liệu kỹ thuật cụ thể được dẫn ngay trong nội dung bài.
