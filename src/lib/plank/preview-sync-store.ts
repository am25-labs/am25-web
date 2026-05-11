export type PreviewSyncState = {
  previewUrl: string | null;
  triggeredAt: string;
};

const previewSyncStore = new Map<string, PreviewSyncState>();

export function buildPreviewSyncKey(contentType: string, slug: string) {
  return `${contentType}:${slug}`;
}

export async function setPreviewSyncState(
  contentType: string,
  slug: string,
  state: PreviewSyncState,
) {
  previewSyncStore.set(buildPreviewSyncKey(contentType, slug), state);
}

export async function getPreviewSyncState(contentType: string, slug: string) {
  return previewSyncStore.get(buildPreviewSyncKey(contentType, slug)) ?? null;
}
