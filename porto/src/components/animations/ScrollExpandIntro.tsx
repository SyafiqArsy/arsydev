"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ScrollExpand from "@/components/animations/ScrollExpand";

interface ScrollExpandIntroProps {
  /** Dipanggil setelah intro selesai (fade-out selesai) — parent masuk ke landing page. */
  onDone: () => void;
}

/**
 * Intro bertingkat: layar putih dengan frame navy ter-inset ("Arsy Dev")
 * yang membuka penuh seiring scroll pengguna, langsung usai animasi loading.
 */
export default function ScrollExpandIntro({ onDone }: ScrollExpandIntroProps) {
  const [exiting, setExiting] = useState(false);

  // Ketika frame mencapai full bleed, tahan sesaat lalu fade-out.
  const handleFinish = useCallback(() => {
    setExiting(true);
  }, []);

  const handleExitComplete = useCallback(() => {
    onDone();
  }, [onDone]);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!exiting ? (
        <motion.div
          className="fixed inset-0 z-[9000] bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ pointerEvents: exiting ? "none" : "auto" }}
        >
          <ScrollExpand
            title="Arsy Dev"
            scrollHint="Scroll"
            startWidth={40}
            startHeight={60}
            startRadius={28}
            endRadius={0}
            mediaZoom={1.35}
            scrollDistance={1.2}
            holdDistance={0.35}
            smoothing={0.1}
            onFinish={handleFinish}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}