import { isPlankPreviewSyncWebhookPayload } from "@plank-cms/client";
import { setPreviewSyncState } from "@/lib/plank/preview-sync-store";

export const prerender = false;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export async function POST({ request }: { request: Request }) {
  const payload = await request.json().catch(() => null);

  if (!isPlankPreviewSyncWebhookPayload(payload)) {
    return json({ error: "Invalid payload" }, 400);
  }

  if (!payload.slug) {
    return json({ ok: true });
  }

  await setPreviewSyncState(payload.content_type, payload.slug, {
    previewUrl: payload.preview_url,
    triggeredAt: payload.triggered_at,
  });

  return json({ ok: true });
}
