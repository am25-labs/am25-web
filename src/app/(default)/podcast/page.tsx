import { fetchPodcast } from "@/lib/fetchPodcast";
import { getPodcastLinks } from "@/lib/links/podcast";
import { baseMetadata } from "@/lib/metadata";
import { EpisodeProvider } from "@/hooks/podcast/useEpisodeProvider";
import PodcastPlayer from "@/components/podcast/PodcastPlayer";
import PodcastEpisodes from "@/components/podcast/PodcastEpisodes";
import PodcastButtons from "@/components/podcast/PodcastButtons";
import type { Metadata } from "next";
import GridContainer from "@/components/grids/GridContainer";
import GridSix from "@/components/grids/GridSix";
import GridTwo from "@/components/grids/GridTwo";

const baseUrl = process.env.BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  const title = "ALT-SIDE with Ale Podcast";

  return {
    ...baseMetadata,
    title: `${title} | Alejandro Mártir`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${title} | Alejandro Mártir`,
      url: `${baseUrl}/podcast`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${title} | Alejandro Mártir`,
    },
  };
}

export default async function PodcastPage() {
  const episodes = await fetchPodcast();
  const initialEpisode = episodes[0];
  const links = await getPodcastLinks();

  return (
    <>
      <EpisodeProvider initialEpisode={initialEpisode} episodes={episodes}>
        <GridContainer className="mt-16 md:mt-24 mb-0">
          <GridSix>
            <div className="col-span-full">
              <PodcastPlayer />
            </div>
          </GridSix>

          <GridTwo>
            <div className="col-span-full">
              <p className="text-center font-bold md:hidden">Episode list:</p>
              <PodcastEpisodes episodes={episodes} />
            </div>
          </GridTwo>
        </GridContainer>
      </EpisodeProvider>

      <GridContainer className="mt-0">
        <div className="col-span-full">
          <div className="border-t mb-8" />

          <h3 className="text-center font-bold mb-4">Also available in:</h3>

          <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl mx-auto gap-2 md:gap-5">
            {links
              .filter((link) => link.url)
              .map((link) => {
                const { platform, label, url } = link;

                return (
                  <PodcastButtons
                    key={platform}
                    platform={platform}
                    label={label}
                    url={url}
                  />
                );
              })}
          </div>
        </div>
      </GridContainer>
    </>
  );
}
