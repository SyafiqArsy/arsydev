"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface PreloaderProps {
  progress: number;
  isLoaded: boolean;
  onExitComplete: () => void;
}

const WORDMARK = "SYAFIQ ARSY";

export default function Preloader({ progress, isLoaded, onExitComplete }: PreloaderProps) {
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded && minTimeElapsed) {
      const timer = setTimeout(() => setVisible(false), 350);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, minTimeElapsed]);

  const displayProgress = minTimeElapsed ? progress : Math.min(progress, 92);

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-light"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="flex flex-col items-center gap-6 px-6">
            <div className="flex overflow-hidden">
              {WORDMARK.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 + i * 0.045,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block text-4xl sm:text-6xl font-semibold tracking-tight text-accent-light"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-xs sm:text-sm uppercase tracking-[0.35em] text-slate"
            >
              Crafting Digital Experiences&hellip;
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="mt-4 flex w-56 flex-col items-center gap-3 sm:w-72"
            >
              <div className="h-px w-full overflow-hidden bg-accent-light/15">
                <motion.div
                  className="h-full bg-accent"
                  animate={{ width: `${displayProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              <span className="font-mono text-[11px] tabular-nums tracking-widest text-accent-light/60">
                {String(displayProgress).padStart(3, "0")}%
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
