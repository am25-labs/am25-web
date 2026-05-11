import { getPreviewSyncState } from "@/lib/plank/preview-sync-store";

export const prerender = false;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export async function GET({
  params,
}: {
  params: { contentType?: string; slug?: string };
}) {
  const contentType = params.contentType;
  const slug = params.slug;

  if (!contentType || !slug) {
    return json({ error: "Missing preview identifier" }, 400);
  }

  const state = await getPreviewSyncState(contentType, slug);

  return json({
    triggeredAt: state?.triggeredAt ?? null,
    previewUrl: state?.previewUrl ?? null,
  });
}
