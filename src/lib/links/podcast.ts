import type { PodcastLink } from "@/lib/types";
import { getGlobals } from "@/lib/strapi/fetchSingle";

export async function getPodcastLinks(): Promise<PodcastLink[]> {
  const globals = await getGlobals();

  return [
    {
      platform: "spotify",
      label: "Spotify",
      url: globals.data.spotifyPod,
    },
    {
      platform: "apple",
      label: "Apple Podcasts",
      url: globals.data.applePod,
    },
    {
      platform: "amazon",
      label: "Amazon Music",
      url: globals.data.amazonMusicPod,
    },
    {
      platform: "youtube",
      label: "YouTube",
      url: globals.data.youTubePod,
    },
  ];
}
