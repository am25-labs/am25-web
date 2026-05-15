import { NextResponse } from "next/server";
import { getPreviewSyncState } from "@/lib/plank/preview-sync-store";

export async function GET(
  _request: Request,
  context: { params: Promise<{ contentType: string; slug: string }> },
) {
  const { contentType, slug } = await context.params;
  const state = await getPreviewSyncState(contentType, slug);

  return NextResponse.json(
    {
      triggeredAt: state?.triggeredAt ?? null,
      previewUrl: state?.previewUrl ?? null,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    },
  );
}
