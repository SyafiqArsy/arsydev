"use client";

import { motion, Variants } from "framer-motion";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "24px 80px",
        borderTop: "1px solid #e6ecf4",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "11px",
        color: "#7c97c0",
        letterSpacing: "0.05em",
      }}
    >
      <span>&copy; 2026 Studio Arsy</span>
      <div style={{ display: "flex", gap: "24px" }}>
        {["Twitter", "Instagram", "LinkedIn"].map((s) => (
          <a
            key={s}
            href="#"
            style={{
              color: "#7c97c0",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            {s}
          </a>
        ))}
      </div>
    </footer>
  );
}
