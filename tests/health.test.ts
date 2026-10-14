import assert from "node:assert/strict";
import { test } from "node:test";
import { GET } from "../src/app/api/health/route";
test("health identifies the built Git revision without returning secrets", async () => {
  const response = GET();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok", commit: process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || "local" });
});
