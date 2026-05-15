export interface PreviewSyncState {
  previewUrl: string | null;
  triggeredAt: string;
}

const memoryStore = new Map<string, PreviewSyncState>();

function buildPreviewSyncKey(contentType: string, slug: string) {
  return `${contentType}:${slug}`;
}

export async function setPreviewSyncState(
  contentType: string,
  slug: string,
  state: PreviewSyncState,
) {
  memoryStore.set(buildPreviewSyncKey(contentType, slug), state);
}

export async function getPreviewSyncState(
  contentType: string,
  slug: string,
): Promise<PreviewSyncState | null> {
  return memoryStore.get(buildPreviewSyncKey(contentType, slug)) ?? null;
}
