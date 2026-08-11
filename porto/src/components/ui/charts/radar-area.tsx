"use client";

import { motion } from "framer-motion";
import { useRadarChartContext } from "./radar-chart";
import type { RadarMetric } from "./radar-chart";

interface RadarAreaProps {
  dataKey: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  fillOpacity?: number;
  strokeOpacity?: number;
  glow?: boolean;
}

/** Bangun path polygon radar dari nilai data. Jika progress < 1, nilai di-interpolasi untuk animasi scale-in. */
function buildPath(
  metrics: RadarMetric[],
  values: Record<string, number>,
  getPoint: (metric: RadarMetric, value: number) => { x: number; y: number },
  progress: number,
): string {
  return metrics
    .map((m, i) => {
      const v = (values[m.key] || 0) * progress;
      const p = getPoint(m, v);
      return `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    })
    .join(" ") + " Z";
}

export function RadarArea({
  dataKey,
  fill = "var(--chart-1)",
  stroke = "var(--chart-1)",
  strokeWidth = 1,
  fillOpacity = 0.2,
  strokeOpacity = 1,
  glow = false,
}: RadarAreaProps) {
  const { metrics, data, getPointPosition, springOptions } =
    useRadarChartContext();

  const currentData = data.find((d) => d.key === dataKey);
  if (!currentData) return null;

  const targetPath = buildPath(metrics, currentData.values, getPointPosition, 1);

  return (
    <>
      <motion.path
        d={targetPath}
        fill={fill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeOpacity={strokeOpacity}
        vectorEffect="non-scaling-stroke"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: "50%", originY: "50%", transformBox: "fill-box" }}
      />
      {glow && (
        <motion.path
          d={targetPath}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth * 3}
          strokeOpacity={strokeOpacity * 0.35}
          filter="url(#radar-glow)"
          vectorEffect="non-scaling-stroke"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: "50%", originY: "50%", transformBox: "fill-box" }}
        />
      )}
      <defs>
        <filter id="radar-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </>
  );
}
