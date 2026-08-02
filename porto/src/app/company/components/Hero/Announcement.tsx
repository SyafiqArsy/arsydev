"use client";

import { motion, Variants } from "framer-motion";

interface AnnouncementProps {
  mounted: boolean;
  stagger: Variants;
}

export default function Announcement({ mounted, stagger }: AnnouncementProps) {
  return (
    <motion.div
      custom={1}
      initial="hidden"
      animate={mounted ? "visible" : "hidden"}
      variants={stagger}
      style={{
        marginBottom: "60px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <span
        style={{
          fontSize: "10px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#7c97c0",
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}
      >
        Latest —
      </span>
      <span
        style={{
          fontSize: "13px",
          color: "#44526b",
          fontWeight: 400,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        New identity system for Orbital — launched 2026
      </span>
    </motion.div>
  );
}
