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
  params: { contentType?: string; entryId?: string };
}) {
  const contentType = params.contentType;
  const entryId = params.entryId;

  if (!contentType || !entryId) {
    return json({ error: "Missing preview identifier" }, 400);
  }

  const state = await getPreviewSyncState(contentType, entryId);

  return json({
    triggeredAt: state?.triggeredAt ?? null,
    previewUrl: state?.previewUrl ?? null,
  });
}
