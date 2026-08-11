"use client";

import { motion } from "framer-motion";
import { useRadarChartContext } from "./radar-chart";

interface RadarPointerProps {
  dataKey: string;
  stroke?: string;
  strokeWidth?: number;
  radius?: number;
}

export function RadarPointer({
  dataKey,
  stroke = "var(--chart-1)",
  strokeWidth = 2,
  radius = 5,
}: RadarPointerProps) {
  const { metrics, data, getPointPosition, setHoveredMetric } =
    useRadarChartContext();

  const currentData = data.find((d) => d.key === dataKey);
  if (!currentData) return null;

  return (
    <>
      {metrics.map((m) => {
        const value = currentData.values[m.key] || 0;
        const p = getPointPosition(m, value);
        return (
          <motion.circle
            key={`pointer-${m.key}`}
            cx={p.x.toFixed(2)}
            cy={p.y.toFixed(2)}
            r={radius}
            fill={stroke}
            stroke="var(--chart-background)"
            strokeWidth={strokeWidth}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            onMouseEnter={() => setHoveredMetric(m.key)}
            onMouseLeave={() => setHoveredMetric(null)}
            style={{ cursor: "pointer" }}
          />
        );
      })}
    </>
  );
}
