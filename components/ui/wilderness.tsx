"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import DecryptedText from "@/components/ui/DecryptedText";

interface ParallaxLayer {
  src: string;
  alt: string;
  speedX: number;
  speedY: number;
  speedZ: number;
  rotation: number;
  distance: number;
  className?: string;
  zIndex: number;
  initialTop: string;
  initialLeft: string;
  width: string;
}

interface ParallaxHeroProps {
  layers?: ParallaxLayer[];
  title?: string;
  className?: string;
}

const defaultLayers: ParallaxLayer[] = [
  // Layer 1 — Galaxy Background
  {
    src: "/assets/parallax/layer%201(galaxy%20backgorud).png",
    alt: "Galaxy background",
    speedX: 0.025,
    speedY: 0.02,
    speedZ: 0.05,
    rotation: 0.015,
    distance: 4000,
    zIndex: 1,
    initialTop: "50%",
    initialLeft: "50%",
    width: "min(100vw, 1920px)",
  },

  // Layer 2 — Spaceship
  {
    src: "/assets/parallax/layer%202%20(pesawat).png",
    alt: "Spaceship",
    speedX: 0.09,
    speedY: 0.07,
    speedZ: 0.15,
    rotation: 0.04,
    distance: 2800,
    zIndex: 2,
    initialTop: "42%",
    initialLeft: "68%",
    width: "min(100vw, 1920px)",
  },

  // Layer 3 — Main Subject
  {
    src: "/assets/parallax/layer%203%20(orang).png",
    alt: "Main character",
    speedX: 0.055,
    speedY: 0.045,
    speedZ: 0.25,
    rotation: 0.025,
    distance: 1800,
    zIndex: 3,
    initialTop: "45%",
    initialLeft: "50%",
    width: "min(100vw, 1920px)",
  },

  // Layer 4 — Asteroid Foreground
  {
    src: "/assets/parallax/layer%204%20(asteroid).png",
    alt: "Foreground asteroid",
    speedX: 0.14,
    speedY: 0.11,
    speedZ: 0.35,
    rotation: 0.07,
    distance: 900,
    zIndex: 4,
    initialTop: "65%",
    initialLeft: "50%",
    width: "min(100vw, 1920px)",
  },
];

const ParallaxHero: React.FC<ParallaxHeroProps> = ({
  layers = defaultLayers,
  title = 'HERO',
  className,
}) => {
const layerRefs = useRef<(HTMLImageElement | null)[]>([]);
const textRef = useRef<HTMLDivElement>(null);

const updateLayers = useCallback(
  (
    cursorPosition: number,
    xVal: number,
    yVal: number,
    rotateDeg: number
  ) => {
    layerRefs.current.forEach((el, index) => {
      if (!el) return;

      const layer = layers[index];
      const { speedX, speedY, speedZ, rotation } = layer;

      const computedLeft = parseFloat(
        getComputedStyle(el).left.replace("px", "")
      );

      const isInLeft = computedLeft < window.innerWidth / 2 ? 1 : -1;
      const zValue = (cursorPosition - computedLeft) * isInLeft * 0.1;

      el.style.transform = `perspective(2300px) translateZ(${
        zValue * speedZ
      }px) rotateY(${rotateDeg * rotation}deg) translateX(calc(-50% + ${
        -xVal * speedX
      }px)) translateY(calc(-50% + ${yVal * speedY}px))`;
    });

    if (textRef.current) {
      const textSpeedX = 0.07;
      const textSpeedY = 0.05;
      const textSpeedZ = 0.08;
      const textRotation = 0.04;

      const computedLeft = parseFloat(
        getComputedStyle(textRef.current).left.replace("px", "")
      );

      const isInLeft = computedLeft < window.innerWidth / 2 ? 1 : -1;
      const zValue = (cursorPosition - computedLeft) * isInLeft * 0.1;

      textRef.current.style.transform = `perspective(2300px) translateZ(${
        zValue * textSpeedZ
      }px) rotateY(${rotateDeg * textRotation}deg) translateX(calc(-50% + ${
        -xVal * textSpeedX
      }px)) translateY(calc(-50% + ${yVal * textSpeedY}px))`;
    }
  },
  [layers]
);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newXValue = e.clientX - window.innerWidth / 2;
      const newYValue = e.clientY - window.innerHeight / 2;
      const newRotateDegree = (newXValue / (window.innerWidth / 2)) * 20;

      updateLayers(e.clientX, newXValue, newYValue, newRotateDegree);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    };
    }, [updateLayers]);

  return (
    <section
      aria-label="About page parallax hero"
      className={cn(
        "relative isolate h-screen min-h-[600px] w-full overflow-hidden bg-[#020617]",
        className
      )}
    >
      <div className="absolute inset-0 z-[100] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_65%,rgba(0,0,0,0.7))]" />

      {layers.map((layer, index) => (
        <img
          key={index}
          ref={(el) => {
            if (el) layerRefs.current[index] = el;
          }}
          src={layer.src}
          alt={layer.alt}
          className={cn(
            'absolute pointer-events-none transition-transform duration-[450ms] ease-out',
            layer.className
          )}
          style={{
            width: layer.width,
            top: layer.initialTop,
            left: layer.initialLeft,
            zIndex: layer.zIndex,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <div
        ref={textRef}
        className="absolute z-[2] text-white text-center pointer-events-auto transition-transform duration-[450ms] ease-out"
        style={{
          top: 'calc(60% - 130px)',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h1 className="whitespace-nowrap font-black font-mono text-[clamp(3rem,12vw,12rem)] leading-none tracking-[0.08em]">
          <DecryptedText
            text={title}
            animateOn="inViewHover"
            effect="scramble"
            sequential={true}
            revealDirection="random"
            speed={150}
            maxIterations={10}
            hoverRadius={70}
            scrambleColor="#38bdf8"
            loop={false}
            useOriginalCharsOnly={false}
            characters="!<>-_/[]{}=+*^?#"
            parentClassName="inline-block"
            className="text-slate-100"
            encryptedClassName="text-[#38bdf8]"
          />
        </h1>
      </div>
      {/* Bottom Fade Transition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[90] h-64 bg-gradient-to-b from-transparent via-[#020617]/70 to-[#020617]"
      />
    </section>
  );
};

interface ParallaxHeroDemoProps {
  title?: string;
  className?: string;
}

export default function ParallaxHeroDemo({
  title = "ABOUT",
  className,
}: ParallaxHeroDemoProps) {
  return <ParallaxHero title={title} className={className} />;
}