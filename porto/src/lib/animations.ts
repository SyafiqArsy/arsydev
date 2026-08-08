import type { Variants } from "framer-motion";

/** Easing yang dipakai di seluruh situs agar konsisten. */
export const easeOutExpo = [0.25, 0, 0, 1] as [number, number, number, number];

/** Variant fade-up generik untuk animasi masuk berurutan. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: easeOutExpo },
  }),
};

/** Variant slide-in dari kanan (dipakai section Projects & lainnya). */
export const slideIn: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

/** Palette navy & putih — warna aksen dipakai bersama antar komponen. */
export const theme = {
  navy: "#0a1628",
  navyDeep: "#08101f",
  navyText: "#0b1d3a",
  navyCard: "#101f38",
  accent: "#4a7bc4",
  accentSoft: "#7c97c0",
  muted: "#9aa7bd",
  line: "rgba(255,255,255,0.08)",
  white: "#ffffff",
} as const;
