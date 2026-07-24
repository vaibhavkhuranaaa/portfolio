export const dynamic = "force-static";

export function GET() {
  return Response.json({
    status: "ok",
    source_sha: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GITHUB_SHA ?? null,
  });
}
