"use client";

import React from "react";

export interface SkillItem {
  id: string;
  name: string;
  category: "Backend" | "Frontend" | "Database" | "DevOps & Tools";
  color: string;
  bgColor: string;
  ring: number; // 1: inner, 2: mid, 3: outer
  speed: number;
  angleOffset: number;
  yOffset: number;
  icon: React.ReactNode;
}

export const SKILL_ITEMS: SkillItem[] = [
  // Ring 1 (Inner - Core languages & frameworks)
  {
    id: "react",
    name: "React",
    category: "Frontend",
    color: "#61DAFB",
    bgColor: "rgba(97, 218, 251, 0.15)",
    ring: 1,
    speed: 0.35,
    angleOffset: 0,
    yOffset: 0.3,
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    color: "#FFFFFF",
    bgColor: "rgba(255, 255, 255, 0.15)",
    ring: 1,
    speed: 0.35,
    angleOffset: (Math.PI * 2) / 3,
    yOffset: -0.2,
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="90" fill="#000" />
        <path
          d="M149.508 157.52L69.142 54H54V126H67.882V70.8141L138.314 161.428C142.256 160.316 145.999 159.002 149.508 157.52Z"
          fill="url(#next_grad)"
        />
        <rect x="115" y="54" width="14" height="72" fill="white" />
        <defs>
          <linearGradient id="next_grad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    color: "#3178C6",
    bgColor: "rgba(49, 120, 198, 0.15)",
    ring: 1,
    speed: 0.35,
    angleOffset: (Math.PI * 4) / 3,
    yOffset: 0.1,
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 128 128">
        <path fill="#3178C6" d="M0 0h128v128H0z" />
        <path fill="#FFF" d="M1.5 1.5v125h125V1.5H1.5zM67.7 114.7c-3.1 0-6.1-.5-8.9-1.5-2.8-1-5.3-2.5-7.5-4.5l6.5-10.7c1.6 1.4 3.4 2.5 5.3 3.3s4.1 1.2 6.4 1.2c2.2 0 3.9-.4 5-1.2 1.2-.8 1.8-2 1.8-3.5 0-1.1-.3-2-.9-2.7-.6-.7-1.6-1.3-2.9-1.8-1.3-.5-3.1-1.1-5.3-1.7-3.7-1.1-6.8-2.5-9.3-4.2-2.5-1.7-4.4-3.8-5.7-6.2-1.3-2.5-2-5.4-2-8.7 0-3.9 1-7.3 3-10.3 2-3 4.9-5.3 8.6-6.9 3.7-1.6 8.1-2.4 13.1-2.4 3.7 0 7.3.6 10.6 1.8 3.3 1.2 6.2 3 8.7 5.4l-6.3 10c-1.8-1.5-3.7-2.6-5.8-3.4s-4.3-1.2-6.7-1.2c-2.1 0-3.8.4-4.9 1.1-1.1.7-1.7 1.8-1.7 3.2 0 1.2.4 2.1 1.1 2.8.7.7 1.7 1.3 3 1.8s3.1 1 5.3 1.6c3.7 1.1 6.8 2.4 9.3 4.1 2.5 1.7 4.4 3.8 5.7 6.3 1.3 2.5 2 5.5 2 9 0 4.1-1 7.6-3 10.7-2 3.1-4.9 5.5-8.7 7.1-3.8 1.7-8.3 2.5-13.4 2.5zm47.9-1.9H101V68H84.7V55h47.9v13h-17v44.8z" />
      </svg>
    ),
  },

  // Ring 2 (Mid - Backend & Databases)
  {
    id: "laravel",
    name: "Laravel",
    category: "Backend",
    color: "#FF2D20",
    bgColor: "rgba(255, 45, 32, 0.15)",
    ring: 2,
    speed: -0.28,
    angleOffset: 0,
    yOffset: -0.4,
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 512 512" fill="#FF2D20">
        <path d="M495.9 149.8L350.2 65.7c-6.2-3.6-13.8-3.6-20 0L184.5 149.8c-6.2 3.6-10 10.2-10 17.3v168.1c0 7.2 3.8 13.8 10 17.3l145.7 84.1c6.2 3.6 13.8 3.6 20 0l145.7-84.1c6.2-3.6 10-10.2 10-17.3V167.1c0-7.1-3.8-13.7-10-17.3zM340.2 100.3l108.6 62.7-41.9 24.2-108.6-62.7 41.9-24.2zm-28.9 261.2L202.7 298.8V173.4l108.6 62.7v125.4zm14.5-142.1l-108.6-62.7 41.9-24.2 108.6 62.7-41.9 24.2zm108.6 142.1l-108.6 62.7V298.8l108.6-62.7v125.4z" />
      </svg>
    ),
  },
  {
    id: "php",
    name: "PHP",
    category: "Backend",
    color: "#777BB4",
    bgColor: "rgba(119, 123, 180, 0.15)",
    ring: 2,
    speed: -0.28,
    angleOffset: (Math.PI * 2) / 5,
    yOffset: 0.4,
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 128 128">
        <ellipse cx="64" cy="64" rx="60" ry="34" fill="#777BB4" />
        <text x="64" y="73" fontSize="32" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="sans-serif">
          php
        </text>
      </svg>
    ),
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Database",
    color: "#4169E1",
    bgColor: "rgba(65, 105, 225, 0.15)",
    ring: 2,
    speed: -0.28,
    angleOffset: (Math.PI * 4) / 5,
    yOffset: -0.2,
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 128 128">
        <path
          fill="#336791"
          d="M64 8c-30.9 0-56 25.1-56 56s25.1 56 56 56 56-25.1 56-56S94.9 8 64 8zm24.8 77.2c-2.3 2.1-5.7 3.5-9.8 3.5-4.8 0-8.6-2.1-11.4-5.2-4.1 4.7-10.4 7.6-17.5 7.6-11.4 0-20.1-8-20.1-18.7 0-9.8 7.3-17.4 17.8-18.9 4.3-.6 9.4-.5 14.1.3v-3.7c0-5.4-3.5-8.5-9.5-8.5-4.3 0-8.9 1.4-12.8 3.9l-3.3-7.2c4.9-3.2 11.2-5.1 17.8-5.1 11.4 0 18.2 6.3 18.2 16.9v21.1c0 3.7 1.5 5.5 4.3 5.5 1.8 0 3.4-.7 4.7-1.8l3.5 6.4z"
        />
      </svg>
    ),
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Backend",
    color: "#009688",
    bgColor: "rgba(0, 150, 136, 0.15)",
    ring: 2,
    speed: -0.28,
    angleOffset: (Math.PI * 6) / 5,
    yOffset: 0.3,
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r="56" fill="#009688" />
        <path d="M72 20L32 72h32l-8 36 40-52H64l8-36z" fill="white" />
      </svg>
    ),
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    color: "#5FA04E",
    bgColor: "rgba(95, 160, 78, 0.15)",
    ring: 2,
    speed: -0.28,
    angleOffset: (Math.PI * 8) / 5,
    yOffset: -0.3,
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 128 128">
        <path
          fill="#5FA04E"
          d="M64 10l50 28.8v57.6L64 125.2 14 96.4V38.8L64 10zm0 14.2L26.3 46.1v44.6L64 111.4l37.7-20.7V46.1L64 24.2z"
        />
        <path fill="#5FA04E" d="M64 42l26 15v30L64 102 38 87V57l26-15z" />
      </svg>
    ),
  },

  // Ring 3 (Outer - DevOps, Databases & Tools)
  {
    id: "docker",
    name: "Docker",
    category: "DevOps & Tools",
    color: "#2496ED",
    bgColor: "rgba(36, 150, 237, 0.15)",
    ring: 3,
    speed: 0.2,
    angleOffset: 0,
    yOffset: 0.5,
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 128 128">
        <path
          fill="#2496ED"
          d="M120 62c-3.2 0-7.3 1.7-10 4.1-3.6-2.5-8.4-3.6-13.2-3.1-3.8-11.8-14.8-20-27.2-20-1.8 0-3.6.2-5.4.6V38H51.8v11.4H39.4V38H27v11.4H14.6V38H2.2v25.2c0 15.6 12.6 28.2 28.2 28.2h56.4c17.2 0 31.2-14 31.2-31.2 0-.7-.1-1.4-.2-2.1 1.3.6 2.7.9 4.2.9 4.4 0 8-3.6 8-8s-3.6-8-8-8z"
        />
      </svg>
    ),
  },
  {
    id: "git",
    name: "Git",
    category: "DevOps & Tools",
    color: "#F05032",
    bgColor: "rgba(240, 80, 50, 0.15)",
    ring: 3,
    speed: 0.2,
    angleOffset: (Math.PI * 2) / 7,
    yOffset: -0.5,
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 128 128">
        <path
          fill="#F05032"
          d="M121.7 57.6L70.4 6.3c-3.1-3.1-8.1-3.1-11.2 0L47.5 18 61.9 32.4c3.3-1.1 7.1-.4 9.7 2.2 2.7 2.7 3.4 6.6 2.2 9.9l14.1 14.1c3.3-1.2 7.2-.5 9.9 2.2 3.7 3.7 3.7 9.8 0 13.5-3.7 3.7-9.8 3.7-13.5 0-2.9-2.9-3.5-7.1-2-10.4L68.7 49.6v33.7c.9.5 1.8 1.2 2.5 1.9 3.7 3.7 3.7 9.8 0 13.5-3.7 3.7-9.8 3.7-13.5 0-3.7-3.7-3.7-9.8 0-13.5.9-.9 1.9-1.5 3-2V48.5c-1.1-.5-2.1-1.1-3-2-2.9-2.9-3.5-7.1-2.1-10.4L41.3 21.7 6.3 56.7c-3.1 3.1-3.1 8.1 0 11.2l51.3 51.3c3.1 3.1 8.1 3.1 11.2 0l52.9-52.9c3.1-3.1 3.1-8.2 0-11.3z"
        />
      </svg>
    ),
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "Database",
    color: "#00758F",
    bgColor: "rgba(0, 117, 143, 0.15)",
    ring: 3,
    speed: 0.2,
    angleOffset: (Math.PI * 4) / 7,
    yOffset: 0.2,
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 128 128">
        <path
          fill="#00758F"
          d="M63.8 28c-18.7 0-33.8 15.1-33.8 33.8s15.1 33.8 33.8 33.8 33.8-15.1 33.8-33.8S82.5 28 63.8 28zm14.1 47.9c-4.2 2.5-9.3 3.9-14.8 3.9-13.1 0-23.7-10.6-23.7-23.7s10.6-23.7 23.7-23.7c5.5 0 10.6 1.4 14.8 3.9v39.6z"
        />
      </svg>
    ),
  },
  {
    id: "redis",
    name: "Redis",
    category: "Database",
    color: "#DC382D",
    bgColor: "rgba(220, 56, 45, 0.15)",
    ring: 3,
    speed: 0.2,
    angleOffset: (Math.PI * 6) / 7,
    yOffset: -0.3,
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 128 128">
        <path fill="#DC382D" d="M14 38l50-20 50 20v52l-50 20-50-20V38z" />
        <path fill="#FFF" opacity="0.3" d="M64 18l50 20-50 20-50-20 50-20z" />
      </svg>
    ),
  },
  {
    id: "python",
    name: "Python",
    category: "Backend",
    color: "#3776AB",
    bgColor: "rgba(55, 118, 171, 0.15)",
    ring: 3,
    speed: 0.2,
    angleOffset: (Math.PI * 8) / 7,
    yOffset: 0.4,
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 128 128">
        <path
          fill="#3776AB"
          d="M62.6 8c-28.7 0-26.9 12.5-26.9 12.5v12.9h27.4v3.9H24.7S8 35.6 8 64.6s12.9 27.9 12.9 27.9h7.7v-10.8s-.4-12.9 12.9-12.9h27.3V41.7s1.3-13.7-13.7-13.7H62.6z"
        />
        <path
          fill="#FFD43B"
          d="M65.4 120c28.7 0 26.9-12.5 26.9-12.5V94.6H64.9v-3.9h38.4s16.7 1.7 16.7-27.3-12.9-27.9-12.9-27.9h-7.7v10.8s.4 12.9-12.9 12.9H59.2v27.1s-1.3 13.7 13.7 13.7h-7.5z"
        />
      </svg>
    ),
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    category: "Frontend",
    color: "#06B6D4",
    bgColor: "rgba(6, 182, 212, 0.15)",
    ring: 3,
    speed: 0.2,
    angleOffset: (Math.PI * 10) / 7,
    yOffset: -0.1,
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 128 128">
        <path
          fill="#06B6D4"
          d="M64 32c-16 0-26.7 8-32 24 6.4-9.6 14.4-12 24-7.2 5.5 2.7 9.4 6.7 13.7 11.2C76.8 67.5 85 76 104 76c16 0 26.7-8 32-24-6.4 9.6-14.4 12-24 7.2-5.5-2.7-9.4-6.7-13.7-11.2C91.2 40.5 83 32 64 32zM32 68c-16 0-26.7 8-32 24 6.4-9.6 14.4-12 24-7.2 5.5 2.7 9.4 6.7 13.7 11.2C44.8 103.5 53 112 72 112c16 0 26.7-8 32-24-6.4 9.6-14.4 12-24 7.2-5.5-2.7-9.4-6.7-13.7-11.2C83.2 76.5 75 68 56 68H32z"
        />
      </svg>
    ),
  },
  {
    id: "linux",
    name: "Linux",
    category: "DevOps & Tools",
    color: "#FCC624",
    bgColor: "rgba(252, 198, 36, 0.15)",
    ring: 3,
    speed: 0.2,
    angleOffset: (Math.PI * 12) / 7,
    yOffset: 0.1,
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 128 128">
        <path
          fill="#FCC624"
          d="M64 12c-20 0-32 24-32 48 0 16 4 28 8 36-8 4-12 12-12 20 0 8 16 8 36 8s36 0 36-8c0-8-4-16-12-20 4-8 8-20 8-36 0-24-12-48-32-48z"
        />
        <circle cx="52" cy="44" r="5" fill="#000" />
        <circle cx="76" cy="44" r="5" fill="#000" />
        <ellipse cx="64" cy="58" rx="10" ry="6" fill="#FFA500" />
      </svg>
    ),
  },
];
