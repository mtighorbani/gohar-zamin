"use client";

import { useEffect, useRef, useState } from "react";

const HERO_VIDEO_SRC = "/hero/gohar-factory-new.mp4";

/**
 * Homepage hero background. The still in Hero.tsx shows until the first frame
 * is playing, then the video covers it.
 */
export function HeroBackgroundVideo() {
  const mediaRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = mediaRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // React does not reliably set the muted property, and unmuted autoplay is blocked.
    video.muted = true;
    video.defaultMuted = true;

    let cancelled = false;
    const markPlaying = () => setPlaying(true);
    const play = () => {
      if (cancelled || document.visibilityState === "hidden") return;
      if (!video.paused && video.readyState >= 2) markPlaying();
      void video.play().catch(() => {
        /* The poster stays up when autoplay is still blocked. */
      });
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") video.pause();
      else play();
    };

    // A cached file can fire `playing` before hydration, so the React handler never sees it.
    video.addEventListener("playing", markPlaying);
    video.addEventListener("loadeddata", play);
    video.addEventListener("ended", play);
    document.addEventListener("visibilitychange", onVisibility);
    play();

    return () => {
      cancelled = true;
      video.removeEventListener("playing", markPlaying);
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("ended", play);
      document.removeEventListener("visibilitychange", onVisibility);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={mediaRef}
      className={`hero__video${playing ? " hero__video--playing" : ""}`}
      src={HERO_VIDEO_SRC}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
      onPlaying={() => setPlaying(true)}
    />
  );
}
