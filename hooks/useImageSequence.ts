
"use client";

import { useEffect, useRef, useState } from "react";
import { TOTAL_FRAMES, framePath } from "@/lib/constants";

interface UseImageSequenceResult {
  /** Mutable ref containing loaded image elements, indexed 0..TOTAL_FRAMES-1. */
  imagesRef: React.RefObject<HTMLImageElement[]>;
  /** 0-100 loading progress. */
  progress: number;
  isLoaded: boolean;
}

const MAX_CONCURRENT_LOADS = 6;

export function useImageSequence(): UseImageSequenceResult {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    let nextIndex = 0;

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    imagesRef.current = images;

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();

        img.decoding = "async";
        img.fetchPriority = "low";

        img.onload = () => {
          if (!cancelled) {
            loadedCount += 1;
            setProgress(
              Math.round((loadedCount / TOTAL_FRAMES) * 100)
            );
          }

          resolve();
        };

        img.onerror = () => {
          if (!cancelled) {
            loadedCount += 1;
            setProgress(
              Math.round((loadedCount / TOTAL_FRAMES) * 100)
            );

            console.error(
              `Failed to load image sequence frame: ${index + 1}`
            );
          }

          resolve();
        };

        images[index] = img;
        img.src = framePath(index + 1);
      });
    };

    const worker = async () => {
      while (!cancelled) {
        const index = nextIndex++;

        if (index >= TOTAL_FRAMES) return;

        await loadImage(index);
      }
    };

    const startLoading = async () => {
      const workerCount = Math.min(
        MAX_CONCURRENT_LOADS,
        TOTAL_FRAMES
      );

      await Promise.all(
        Array.from({ length: workerCount }, () => worker())
      );

      if (!cancelled) {
        setIsLoaded(true);
      }
    };

    void startLoading();

    return () => {
      cancelled = true;
    };
  }, []);

  return { imagesRef, progress, isLoaded };
}
