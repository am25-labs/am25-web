import type { PodcastEpisode } from "@/lib/types"

export async function fetchPodcast(): Promise<PodcastEpisode[]> {
  const res = await fetch(process.env.PODCAST_API!, {
    cache: "no-store",
  })

  if (!res.ok) throw new Error("Failed to fetch podcast episodes")

  const episodes = await res.json()
  return episodes
}
