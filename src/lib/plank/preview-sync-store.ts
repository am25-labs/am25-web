export type PreviewSyncState = {
  previewUrl: string | null;
  triggeredAt: string;
};

const previewSyncStore = new Map<string, PreviewSyncState>();

export function buildPreviewSyncKey(contentType: string, entryId: string) {
  return `${contentType}:${entryId}`;
}

export async function setPreviewSyncState(
  contentType: string,
  entryId: string,
  state: PreviewSyncState,
) {
  previewSyncStore.set(buildPreviewSyncKey(contentType, entryId), state);
}

export async function getPreviewSyncState(contentType: string, entryId: string) {
  return previewSyncStore.get(buildPreviewSyncKey(contentType, entryId)) ?? null;
}
