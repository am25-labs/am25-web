export interface PodcastEpisodeItunes {
  season: number;
  episode?: number;
  episodeNumber?: number;
  episodeType?: string;
  explicit?: boolean;
  image?: string;
}

export interface PodcastEpisodeEnclosure {
  url: string;
}

export interface PodcastEpisode {
  guid: string;
  title: string;
  description?: string;
  isoDate?: string;
  enclosure?: PodcastEpisodeEnclosure;
  itunes: PodcastEpisodeItunes;
}
