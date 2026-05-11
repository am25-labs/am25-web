"use client";

import { useEffect, useRef } from "react";

type PreviewAutoRefreshProps = {
  contentType: string;
  entryId: string;
};

type PreviewStateResponse = {
  triggeredAt: string | null;
  previewUrl: string | null;
};

export function PreviewAutoRefresh({
  contentType,
  entryId,
}: PreviewAutoRefreshProps) {
  const lastTriggeredAtRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      try {
        const response = await fetch(
          `/api/plank/preview-state/${contentType}/${entryId}`,
          { cache: "no-store" },
        );

        if (!response.ok) return;

        const state = (await response.json()) as PreviewStateResponse;

        if (!state.triggeredAt) return;

        if (!lastTriggeredAtRef.current) {
          lastTriggeredAtRef.current = state.triggeredAt;
          return;
        }

        if (state.triggeredAt === lastTriggeredAtRef.current) return;

        lastTriggeredAtRef.current = state.triggeredAt;

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
  }, [contentType, entryId]);

  return null;
}
