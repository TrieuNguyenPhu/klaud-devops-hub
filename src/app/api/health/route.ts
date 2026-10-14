export const dynamic = "force-static";
export function GET() {
  return Response.json({ status: "ok", commit: process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || "local" });
}
