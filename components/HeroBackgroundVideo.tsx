"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Progressive background video for the homepage hero.
 *
 * The prioritized Next/Image poster in Hero.tsx handles LCP.
 * This component does NOT include a video src in server HTML, so the browser
 * cannot fetch an MP4 on the critical rendering path.
 */
export function HeroBackgroundVideo() {
  const mediaRef = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const video = mediaRef.current;
    if (!video) return;

    const network = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const weakNetwork = network?.saveData === true ||
      ["slow-2g", "2g", "3g"].includes(network?.effectiveType ?? "");

    // Never download decorative video on Data Saver, slow networks,
    // or when the visitor requests reduced motion.
    if (reducedMotion || weakNetwork) return;

    let visible = false;
    let settled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const startIfReady = () => {
      if (cancelled || !settled || !visible || document.visibilityState !== "visible") return;
      setSource(window.matchMedia("(max-width: 800px)").matches
        ? "/hero/gohar-hero-720.mp4"
        : "/hero/gohar-hero-1080.mp4");
    };

    const defer = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => {
          settled = true;
          startIfReady();
        }, { timeout: 2000 });
      } else {
        timeoutId = setTimeout(() => {
          settled = true;
          startIfReady();
        }, 700);
      }
    };

    // Delay the MP4 request until the page load event and an idle window.
    if (document.readyState === "complete") defer();
    else window.addEventListener("load", defer, { once: true });

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) video.pause();
      else if (video.currentSrc && document.visibilityState === "visible") {
        void video.play().catch(() => { /* The poster remains visible. */ });
      } else {
        startIfReady();
      }
    }, { threshold: 0.12 });
    intersection.observe(video);

    const visibilityChanged = () => {
      if (document.visibilityState === "hidden") video.pause();
      else if (visible && video.currentSrc) {
        void video.play().catch(() => { /* Poster fallback is intentional. */ });
      }
    };
    document.addEventListener("visibilitychange", visibilityChanged);

    return () => {
      cancelled = true;
      window.removeEventListener("load", defer);
      document.removeEventListener("visibilitychange", visibilityChanged);
      intersection.disconnect();
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      video.pause();
    };
  }, []);

  if (disabled) return null;

  return (
    <video
      ref={mediaRef}
      className={`hero__video${playing ? " hero__video--playing" : ""}`}
      src={source ?? undefined}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
      controlsList="nodownload noplaybackrate"
      onPlaying={() => setPlaying(true)}
      onError={() => {
        // If files are not deployed, keep the static hero image without a broken player.
        setPlaying(false);
        setDisabled(true);
      }}
    />
  );
}
