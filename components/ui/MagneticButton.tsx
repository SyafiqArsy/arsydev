"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
}

const MotionLink = motion.create(Link);

export default function MagneticButton({
  children,
  className = "",
  strength = 0.4,
  onClick,
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const commonProps = {
    ref,
    onClick,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { x: springX, y: springY },
    whileTap: { scale: 0.94 },
    className,
  };

  if (href) {
    return (
      <MotionLink
        href={href}
        target={target}
        rel={target === "_blank" && !rel ? "noopener noreferrer" : rel}
        {...commonProps}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button type="button" {...commonProps}>
      {children}
    </motion.button>
  );
}

