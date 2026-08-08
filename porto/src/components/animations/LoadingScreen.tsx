"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  /** Dipanggil setelah fade-out loading. Biasanya untuk menyambungkan ke intro berikutnya. */
  onDone?: () => void;
}

export default function LoadingScreen({ onDone }: LoadingScreenProps = {}) {
  const [show, setShow] = useState(true);
  const [render, setRender] = useState(true);

  useEffect(() => {
    // Total timeline: line anim (1.8s) + pause (0.3s) + fade (0.5s)
    const total = 1800 + 300 + 500;

    const timer = setTimeout(() => {
      setShow(false);
      // Wait for fade-out animation before unmounting
      setTimeout(() => {
        setRender(false);
        onDone?.();
      }, 500);
    }, total);

    return () => clearTimeout(timer);
  }, [onDone]);

  if (!render) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col justify-center bg-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: show ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ pointerEvents: show ? "auto" : "none" }}
      >
        <div className="relative w-full" style={{ paddingLeft: "6rem" }}>
          {/* "Loading" text */}
          <span
            className="block mb-3"
            style={{
              fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: "22px",
              fontWeight: 400,
              color: "#0b1d3a",
              letterSpacing: "0.02em",
            }}
          >
            Loading
          </span>

          {/* Animated horizontal line */}
          <motion.div
            className="h-[2px] bg-[#0b1d3a] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1.8,
              ease: [0.65, 0, 0.35, 1],
              delay: 0,
            }}
            style={{ transformOrigin: "left center", maxWidth: "80%" }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
