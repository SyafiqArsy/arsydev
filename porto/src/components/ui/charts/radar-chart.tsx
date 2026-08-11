"use client";

import { createContext, useContext, useState } from "react";
import type { SpringOptions } from "framer-motion";
import { scaleBand, scaleLinear } from "@visx/scale";
type ScaleBand = ReturnType<typeof scaleBand<string>>;
type ScaleLinear = ReturnType<typeof scaleLinear>;
import { Group } from "@visx/group";

export interface RadarMetric {
  key: string;
  label: string;
  max: number;
}

export interface RadarData {
  key: string;
  values: Record<string, number>;
}

interface RadarChartContextProps {
  metrics: RadarMetric[];
  data: RadarData[];
  radius: number;
  center: { x: number; y: number };
  angleScale: ScaleBand;
  yScale: ScaleLinear;
  getPointPosition: (
    metric: RadarMetric,
    value: number,
  ) => { x: number; y: number };
  hoveredMetric: string | null;
  setHoveredMetric: (metric: string | null) => void;
  springOptions: SpringOptions;
}

const RadarChartContext = createContext<RadarChartContextProps | undefined>(
  undefined,
);

export function useRadarChartContext() {
  const context = useContext(RadarChartContext);
  if (!context) {
    throw new Error("useRadarChartContext must be used within a RadarChart");
  }
  return context;
}

interface RadarChartProps {
  metrics: RadarMetric[];
  data: RadarData[];
  size?: number;
  springOptions?: SpringOptions;
  children: React.ReactNode;
}

export function RadarChart({
  metrics,
  data,
  size = 250,
  springOptions = { stiffness: 100, damping: 10, mass: 0.5 },
  children,
}: RadarChartProps) {
  const radius = size / 2;
  const center = { x: radius, y: radius };

  const angleScale = scaleBand<string>({
    range: [0, Math.PI * 2],
    domain: metrics.map((m) => m.key),
    padding: 0,
  });

  const domainMax = Math.max(...metrics.map((m) => m.max), 1);
  const yScale = scaleLinear({
    range: [0, radius],
    domain: [0, domainMax],
  });

  // Koordinat relatif ke pusat chart (Group sudah ditranslasi ke tengah).
  const getPointPosition = (metric: RadarMetric, value: number) => {
    const angle = angleScale(metric.key) || 0;
    const r = yScale(value);
    return { x: r * Math.sin(angle), y: -r * Math.cos(angle) };
  };

  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  const contextValue: RadarChartContextProps = {
    metrics,
    data,
    radius,
    center,
    angleScale,
    yScale,
    getPointPosition,
    hoveredMetric,
    setHoveredMetric,
    springOptions,
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <RadarChartContext.Provider value={contextValue}>
        <Group left={center.x} top={center.y}>
          {children}
        </Group>
      </RadarChartContext.Provider>
    </svg>
  );
}
