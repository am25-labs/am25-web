import { useState, useRef, useEffect } from "react";
import type { PodcastEpisode } from "@/types/domain";

export default function usePodcastPlayer(
  audioUrl: string,
  episode: PodcastEpisode,
) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLElement>) => {
    const audio = audioRef.current;
    const progressBar = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const width = progressBar.offsetWidth;
    const newTime = (clickX / width) * duration;
    if (audio) audio.currentTime = newTime;
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (audio) audio.currentTime += seconds;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
  };

  const cyclePlaybackRate = () => {
    const rates = [0.5, 1, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    setPlaybackRate(rates[nextIndex]);
  };

  const handleShare = async () => {
    const title = `${episode.title} | ALT-SIDE with Ale`;
    const text =
      "ALT-SIDE with Ale es un espacio para explorar creatividad, experimentación y todo lo que pasa detrás de mis proyectos creativos. Sin reglas, sin guion, solo ideas y curiosidad.";
    const url = `/podcast?guid=${episode.guid}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });

        if (window.plausible && episode) {
          const eventLabel = `T${episode.itunes.season}E${episode.itunes.episodeNumber} ${episode.title}`;

          window.plausible("podcast-shared", {
            props: {
              title: eventLabel,
              season: episode.itunes.season,
              source: "player",
            },
          });
        }
      } catch (err) {
        console.error("Error al compartir:", err);
      }
    } else {
      alert("Tu navegador no soporta la opción de compartir nativa.");
    }
  };

  return {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    handleProgressClick,
    skip,
    progressPercentage,
    playbackRate,
    setPlaybackRate,
    changePlaybackRate,
    cyclePlaybackRate,
    handleShare,
  };
}
