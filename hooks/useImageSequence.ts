"use client";

import { useEffect, useRef, useState } from "react";
import { TOTAL_FRAMES, framePath } from "@/lib/constants";

interface UseImageSequenceResult {
  /** Mutable ref — always holds the freshest loaded <img> elements, indexed 0..TOTAL_FRAMES-1. */
  imagesRef: React.RefObject<HTMLImageElement[]>;
  /** 0-100 loading progress. */
  progress: number;
  isLoaded: boolean;
}

export function useImageSequence(): UseImageSequenceResult {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const handleSettled = () => {
      if (cancelled) return;
      loadedCount += 1;
      setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
      if (loadedCount === TOTAL_FRAMES) setIsLoaded(true);
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = handleSettled;
      img.onerror = handleSettled;
      img.src = framePath(i + 1);
      images[i] = img;
    }

    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, []);

  return { imagesRef, progress, isLoaded };
}
