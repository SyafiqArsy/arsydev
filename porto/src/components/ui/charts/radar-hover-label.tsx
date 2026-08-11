"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRadarChartContext } from "./radar-chart";

interface RadarHoverLabelProps {
  labelColor?: string;
  valueColor?: string;
  fontSize?: number;
}

export function RadarHoverLabel({
  labelColor = "var(--chart-label)",
  valueColor = "var(--chart-foreground)",
  fontSize = 11,
}: RadarHoverLabelProps) {
  const { hoveredMetric, metrics, data, getPointPosition } =
    useRadarChartContext();

  if (!hoveredMetric) return null;

  const metric = metrics.find((m) => m.key === hoveredMetric);
  if (!metric) return null;

  const value = data[0]?.values[metric.key] || 0;
  const p = getPointPosition(metric, value);

  return (
    <AnimatePresence>
      <motion.g
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        style={{ pointerEvents: "none" }}
      >
        <rect
          x={p.x - 42}
          y={p.y - 34}
          width={84}
          height={40}
          rx={6}
          fill="var(--chart-background)"
          stroke="var(--border)"
          strokeWidth={1}
        />
        <text
          x={p.x}
          y={p.y - 14}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={fontSize - 1}
          fill={labelColor}
          style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
        >
          {metric.label}
        </text>
        <text
          x={p.x}
          y={p.y + 6}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={fontSize + 2}
          fontWeight={600}
          fill={valueColor}
        >
          {value}
        </text>
      </motion.g>
    </AnimatePresence>
  );
}
