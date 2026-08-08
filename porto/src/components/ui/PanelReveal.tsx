"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PanelRevealProps {
  /** Durasi animasi panel (detik). */
  duration?: number;
  /** Kunci untuk memicu ulang animasi dari luar (mis. setelah loading). */
  started?: boolean;
  /** Urutan delay tiap panel, sejajar dengan `widths`. */
  delays?: number[];
  /** Lebar tiap panel (persen). */
  widths?: string[];
  /** Warna panel penutup. */
  color?: string;
}

/**
 * Panel-panel vertikal yang membuka (scaleX → 0) untuk menampilkan
 * konten di belakangnya — dipakai pada artwork hero.
 */
export default function PanelReveal({
  duration = 1.4,
  started = false,
  delays = [0.2, 0.5, 0.35, 0.65, 0.8],
  widths = ["22%", "18%", "25%", "15%", "20%"],
  color = "#ffffff",
}: PanelRevealProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (started) setActive(true);
  }, [started]);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", zIndex: 2 }}>
      {widths.map((w, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 1 }}
          animate={active ? { scaleX: 0 } : { scaleX: 1 }}
          transition={{
            duration,
            delay: active ? 2.6 + delays[i] : 0,
            ease: [0.65, 0, 0.35, 1],
          }}
          style={{
            width: w,
            height: "100%",
            backgroundColor: color,
            transformOrigin: "left center",
            borderRight: i < widths.length - 1 ? "1px solid rgba(0,0,0,0.03)" : "none",
          }}
        />
      ))}
    </div>
  );
}
