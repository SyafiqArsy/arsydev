"use client";

import { useRadarChartContext } from "./radar-chart";

interface RadarGridProps {
  levels?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
}

export function RadarGrid({
  levels = 5,
  stroke = "var(--chart-grid)",
  strokeWidth = 1,
  strokeOpacity = 0.5,
}: RadarGridProps) {
  const { metrics, radius, angleScale } = useRadarChartContext();

  // Cincin poligon konsentris: tiap level = skala radius.
  return (
    <>
      {Array.from({ length: levels }).map((_, level) => {
        const r = radius * ((level + 1) / levels);
        const path = metrics
          .map((m, i) => {
            const angle = angleScale(m.key) || 0;
            const x = r * Math.sin(angle);
            const y = -r * Math.cos(angle);
            return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
          })
          .join(" ") + " Z";
        return (
          <path
            key={`grid-${level}`}
            d={path}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeOpacity={strokeOpacity}
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </>
  );
}
