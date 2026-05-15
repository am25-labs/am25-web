"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { PodcastEpisode } from "@/types/domain";

interface EpisodeContextValue {
  currentEpisode: PodcastEpisode | null;
  setCurrentEpisode: (episode: PodcastEpisode) => void;
}

const EpisodeContext = createContext<EpisodeContextValue | null>(null);

interface EpisodeProviderProps {
  children: React.ReactNode;
  initialEpisode: PodcastEpisode;
  episodes: PodcastEpisode[];
}

export function EpisodeProvider({
  children,
  initialEpisode,
  episodes,
}: EpisodeProviderProps) {
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode | null>(
    initialEpisode,
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    const guid = searchParams.get("guid");
    if (guid && episodes) {
      const episodeFromUrl = episodes.find((ep) => ep.guid === guid);
      if (episodeFromUrl && episodeFromUrl.guid !== currentEpisode?.guid) {
        setCurrentEpisode(episodeFromUrl);
      }
    }
  }, [searchParams, episodes]);

  return (
    <EpisodeContext.Provider value={{ currentEpisode, setCurrentEpisode }}>
      {children}
    </EpisodeContext.Provider>
  );
}

export function useCurrentEpisode() {
  const context = useContext(EpisodeContext);
  if (!context) {
    throw new Error(
      "useCurrentEpisode debe usarse dentro de <EpisodeProvider>",
    );
  }
  return context;
}
