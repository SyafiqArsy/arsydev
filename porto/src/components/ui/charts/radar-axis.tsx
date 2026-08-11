"use client";

import { useRadarChartContext } from "./radar-chart";

interface RadarAxisProps {
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
}

export function RadarAxis({
  stroke = "var(--chart-grid)",
  strokeWidth = 1,
  strokeOpacity = 0.5,
}: RadarAxisProps) {
  const { metrics, radius, angleScale } = useRadarChartContext();

  return (
    <>
      {metrics.map((m, i) => {
        const angle = angleScale(m.key) || 0;
        const x = radius * Math.sin(angle);
        const y = -radius * Math.cos(angle);
        return (
          <line
            key={`axis-${i}`}
            x1={0}
            y1={0}
            x2={x.toFixed(2)}
            y2={y.toFixed(2)}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeOpacity={strokeOpacity}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </>
  );
}
