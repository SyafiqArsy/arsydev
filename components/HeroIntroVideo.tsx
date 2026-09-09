"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ambient intro clip shown whenever the user is back at the very top of the
 * page. Frame 001 of the image sequence is intentionally an empty backdrop,
 * which reads as flat/static on arrival — this clip adds motion for that
 * dwell time, then hands off to the scroll-driven canvas as soon as the
 * user scrolls away from the top (and returns if they scroll back).
 */
const COLOR_MATCH_FILTER = "brightness(1.15) saturate(0.85)";
const TOP_THRESHOLD_PX = 4;

export default function HeroIntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [atTop, setAtTop] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const updateAtTop = () => setAtTop(window.scrollY <= TOP_THRESHOLD_PX);
    updateAtTop();
    window.addEventListener("scroll", updateAtTop, { passive: true });
    return () => window.removeEventListener("scroll", updateAtTop);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (atTop) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [atTop]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible" && atTop) {
        videoRef.current?.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [atTop]);

  const visible = atTop && ready;

  return (
    <video
      ref={videoRef}
      src="/hero-intro.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onCanPlay={() => setReady(true)}
      style={{
        filter: COLOR_MATCH_FILTER,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
      className="pointer-events-none absolute inset-0 h-full w-full scale-110 bg-navy object-cover"
    />
  );
}
