import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isPlankPreviewSyncWebhookPayload } from "@plank-cms/client";
import { setPreviewSyncState } from "@/lib/plank/preview-sync-store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isPlankPreviewSyncWebhookPayload(body)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (body.slug) {
    revalidatePath(`/draft/${body.content_type}/${body.slug}`);

    await setPreviewSyncState(body.content_type, body.slug, {
      previewUrl: body.preview_url,
      triggeredAt: body.triggered_at,
    });
  }

  return NextResponse.json({ ok: true });
}
