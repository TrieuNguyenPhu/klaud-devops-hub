# Knowledge Hub Implementation Plan

**Goal:** Build the complete local knowledge hub from the supplied specification.
**Architecture:** Static server-rendered Markdown pages with isolated interactive client components.
**Tech Stack:** Next.js, TypeScript, Tailwind, shadcn, Shiki, Mermaid, next-themes.
**Spec:** ../specs/2026-10-14-knowledge-hub-design.md

## Constraints
Never include private references in Git or build output. Preserve staged changes. No push or deployment. Vietnamese content; no invented biography or exam dumps.

## Steps
- [x] Audit Git and protect private folder in `.gitignore` and tracing configuration.
- [x] Foundation: package/config, tokens, header/footer/theme and reusable shadcn components.
- [x] Content: `src/lib/content.ts`, schema, heading extraction, indexing and renderer; test validation, drafts and duplicate slugs.
- [x] Core blog: home, listing, detail, filtering, TOC, copy, diagrams and SEO.
- [x] Learning: knowledge, interviews, certification overviews/quiz, cheatsheets, roadmaps and about.
- [x] Search: grouped command palette with bounded indexed keywords and keyboard controls.
- [x] Verification: unit tests, lint, typecheck, production build, browser interaction/mobile checks, private-folder/output audit and README.

## Evidence
Production build passes without tracing warnings; 8 unit tests and 6 browser scenarios pass. Browser covers principal/content routes, repeated queries, 390/768/1440px layouts, light/dark persistence, command search, pagination/filters, copy, Mermaid, accordion/tabs, quiz restore/final/review/retry. Metadata and all Markdown internal path links validate. Private audit preserves 12 files and verifies Git index/history/ignore, output path/name/hash and tracing. Production dependency audit is clean; dev-only ESLint dependency advisories remain documented in README. No commit, push or deployment performed.

## Review focus
Malformed frontmatter and duplicate heading IDs; draft leakage; query filters surviving pagination; inaccessible dialog/mobile menu; corrupted or outdated quiz persistence. Test each at its owning layer.
