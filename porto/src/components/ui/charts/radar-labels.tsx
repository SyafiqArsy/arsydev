"use client";

import { useRadarChartContext } from "./radar-chart";

interface RadarLabelsProps {
  labelOffset?: number;
  labelFontSize?: number;
  labelColor?: string;
}

export function RadarLabels({
  labelOffset = 20,
  labelFontSize = 10,
  labelColor = "var(--chart-label)",
}: RadarLabelsProps) {
  const { metrics, radius, angleScale } = useRadarChartContext();

  return (
    <>
      {metrics.map((m, i) => {
        const angle = angleScale(m.key) || 0;
        const r = radius + labelOffset;
        const x = r * Math.sin(angle);
        const y = -r * Math.cos(angle);

        // Anchoring: label kiri tengah-kanan, label kanan kiri-start.
        const nearTop = Math.sin(angle) < 0.5 && Math.sin(angle) > -0.5;
        const textAnchor = nearTop ? "middle" : Math.sin(angle) > 0 ? "start" : "end";

        return (
          <text
            key={`label-${i}`}
            x={x.toFixed(2)}
            y={y.toFixed(2)}
            textAnchor={textAnchor}
            dominantBaseline="middle"
            fontSize={labelFontSize}
            fill={labelColor}
            style={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
          >
            {m.label}
          </text>
        );
      })}
    </>
  );
}
