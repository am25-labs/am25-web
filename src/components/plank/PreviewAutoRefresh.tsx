"use client";

import { useEffect } from "react";

type PreviewAutoRefreshProps = {
  contentType: string;
  slug: string;
};

type PreviewStateResponse = {
  triggeredAt: string | null;
  previewUrl: string | null;
};

export function PreviewAutoRefresh({
  contentType,
  slug,
}: PreviewAutoRefreshProps) {
  useEffect(() => {
    let cancelled = false;
    const storageKey = `plank-preview:${contentType}:${slug}`;

    const poll = async () => {
      try {
        const response = await fetch(
          `/api/plank/preview-state/${contentType}/${slug}`,
          { cache: "no-store" },
        );

        if (!response.ok) return;

        const state = (await response.json()) as PreviewStateResponse;

        if (!state.triggeredAt) return;

        const lastTriggeredAt = window.localStorage.getItem(storageKey);

        if (!lastTriggeredAt) {
          window.localStorage.setItem(storageKey, state.triggeredAt);
          return;
        }

        if (state.triggeredAt === lastTriggeredAt) return;

        window.localStorage.setItem(storageKey, state.triggeredAt);

        if (state.previewUrl && state.previewUrl !== window.location.href) {
          window.location.assign(state.previewUrl);
          return;
        }

        window.location.reload();
      } catch {
        // Ignore transient polling failures.
      }
    };

    const intervalId = window.setInterval(() => {
      if (!cancelled) void poll();
    }, 2000);

    void poll();

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [contentType, slug]);

  return null;
}
