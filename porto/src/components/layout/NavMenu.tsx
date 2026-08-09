"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import OptionWheel from "@/components/animations/OptionWheel";

interface NavMenuProps {
  /** Section yang sedang aktif (0–3). */
  activeSection: number;
  /** Scroll ke section tujuan. */
  scrollToSection: (idx: number) => void;
}

const sectionLabels = ["Studio", "Projects", "Skills", "Contact"];

/** Pilihan pada OptionWheel memetakan 1:1 ke index section. */
const wheelItems = sectionLabels;

export default function NavMenu({ activeSection, scrollToSection }: NavMenuProps) {
  const [open, setOpen] = useState(false);
  // Opsi yang sedang disorot roda (belum tentu tujuan navigasi).
  const [selected, setSelected] = useState(
    Math.min(Math.max(activeSection, 0), wheelItems.length - 1),
  );

  // Hamburger muncul setelah melewati halaman Project (activeSection >= 1).
  // Latch status via render-phase adjustment agar tidak memicu lint
  // react-hooks/set-state-in-effect (idempotent setState saat render).
  const [visible, setVisible] = useState(activeSection >= 1);
  if (activeSection >= 1 && !visible) {
    setVisible(true);
  }

  // Freeze scroll halaman saat menu terbuka, dan tutup dengan tombol Escape.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Scroll/drag roda hanya meng-update sorotan — belum navigasi.
  const handleSelect = (idx: number) => {
    setSelected(idx);
  };

  // Navigasi via klik: tutup sidebar lalu gulir ke section tujuan.
  const goTo = (idx: number) => {
    setOpen(false);
    scrollToSection(idx);
  };

  return (
    <>
      {/* Hamburger — kanan atas, muncul (fade + slide) setelah masuk Projects */}
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.25, 0, 0, 1] }}
            style={{
              position: "fixed",
              top: "24px",
              right: "28px",
              zIndex: 80,
              width: "52px",
              height: "52px",
              borderRadius: "999px",
              background: "rgba(10,22,40,0.7)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.14)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                width: "22px",
                height: "2px",
                borderRadius: "2px",
                background: "#fff",
                transform: open ? "translateY(4px) rotate(45deg)" : "none",
                transition: "transform 0.35s ease",
              }}
            />
            <span
              style={{
                width: "22px",
                height: "2px",
                borderRadius: "2px",
                background: "#fff",
                opacity: open ? 0 : 1,
                transform: open ? "translateX(20px)" : "none",
                transition: "opacity 0.25s ease, transform 0.35s ease",
              }}
            />
            <span
              style={{
                width: "22px",
                height: "2px",
                borderRadius: "2px",
                background: "#fff",
                transform: open ? "translateY(-4px) rotate(-45deg)" : "none",
                transition: "transform 0.35s ease",
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar dari kanan berisi OptionWheel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed top-0 bottom-0 right-0 z-[70]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              style={{
                width: "min(440px, 100vw)",
                height: "100%",
                background: "#0a1628",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                position: "relative",
              }}
            >
              <OptionWheel
                items={wheelItems}
                defaultSelected={selected}
                textColor="#a6a6a6"
                activeColor="#ffffff"
                side="right"
                fontSize={2.6}
                spacing={1.5}
                curve={1}
                tilt={6}
                blur={2}
                fade={0.3}
                inset={88}
                draggable
                onChange={(idx) => handleSelect(idx)}
                onSelect={(idx) => goTo(idx)}
              />
              <div
                style={{
                  position: "absolute",
                  right: "88px",
                  bottom: "40px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  alignItems: "flex-end",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#7c97c0",
                  }}
                >
                  Selected: {sectionLabels[selected]}
                </span>
                <button
                  type="button"
                  onClick={() => goTo(selected)}
                  style={{
                    padding: "12px 34px",
                    borderRadius: "999px",
                    background: "#fff",
                    color: "#0a1628",
                    border: "none",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Go
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}