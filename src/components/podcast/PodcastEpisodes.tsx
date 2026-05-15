"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCurrentEpisode } from "@/hooks/podcast/useEpisodeProvider";
import clsx from "clsx";
import { MicIcon, CalendarIcon } from "lucide-react";
import type { PodcastEpisode } from "@/types/domain";

interface PodcastEpisodesProps {
  episodes: PodcastEpisode[];
}

export default function PodcastEpisodes({ episodes }: PodcastEpisodesProps) {
  const { currentEpisode, setCurrentEpisode } = useCurrentEpisode();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleEpisodeClick = (ep: PodcastEpisode) => {
    setCurrentEpisode(ep);
    const params = new URLSearchParams(searchParams);
    params.set("guid", ep.guid);
    router.push(`/podcast?${params.toString()}`);
  };

  return (
    <aside className="w-full h-96 md:h-[28rem] xl:h-[36rem] border mt-4 mb-10 md:my-10 overflow-y-auto hidden-scrollbar">
      <ul className="flex flex-col">
        {episodes.map((ep) => {
          const isActive = currentEpisode?.guid === ep.guid;
          const d = new Date(ep.isoDate!);
          const formattedDate = `${d.toLocaleDateString("es-ES", { month: "short" })} ${d.getDate()}, ${d.getFullYear()}`;

          return (
            <li
              key={ep.guid}
              onClick={() => handleEpisodeClick(ep)}
              className={clsx(
                "cursor-pointer p-3",
                isActive ? "bg-accent" : "hover:bg-muted",
                "flex items-center gap-5",
              )}
            >
              <div className="relative w-16 h-16 shrink-0 overflow-hidden">
                <img
                  src={ep.itunes.image}
                  alt={ep.title}
                  className="w-full h-full object-cover block"
                />
              </div>

              <div className="flex flex-col">
                <span className=" mb-1 font-bold uppercase flex items-center gap-1.5">
                  {ep.title}
                  {ep.itunes.explicit === true && (
                    <span className="text-[0.5rem] border rounded px-1 mb-0.5">
                      E
                    </span>
                  )}
                </span>

                <div className="flex flex-col gap-0.5 text-muted-foreground text-xs uppercase">
                  {ep.itunes.episodeType === "trailer" ? (
                    <span className="flex items-center gap-0.5">
                      <MicIcon size={13} />T{ep.itunes.season} Trailer
                    </span>
                  ) : (
                    <span className="flex items-center gap-0.5">
                      <MicIcon size={13} />T{ep.itunes.season} E
                      {ep.itunes.episode}
                    </span>
                  )}
                  <span className="flex items-center gap-1 uppercase">
                    <CalendarIcon size={13} />
                    {formattedDate}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
