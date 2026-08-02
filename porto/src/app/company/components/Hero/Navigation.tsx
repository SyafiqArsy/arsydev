"use client";

import { motion, Variants } from "framer-motion";

interface NavigationProps {
  mounted: boolean;
  stagger: Variants;
}

const items = ["About", "Projects", "Contact"];

export default function Navigation({ mounted, stagger }: NavigationProps) {
  return (
    <motion.nav
      custom={0}
      initial="hidden"
      animate={mounted ? "visible" : "hidden"}
      variants={stagger}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        marginBottom: "32px",
      }}
    >
      {items.map((item, i) => (
        <span key={item}>
          <a
            href="#"
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#0b1d3a",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            {item}
          </a>
          {i < items.length - 1 && (
            <span
              style={{
                marginLeft: "20px",
                color: "#9aa7bd",
                fontSize: "8px",
              }}
            >
              •
            </span>
          )}
        </span>
      ))}
    </motion.nav>
  );
}
