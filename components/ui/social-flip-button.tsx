"use client";

import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
    FaGithub,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaEnvelope,
    FaDiscord,
} from "react-icons/fa";

export interface SocialItem {
    letter: string;
    icon: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
}

interface SocialFlipButtonProps {
    items?: SocialItem[];
    className?: string;
    itemClassName?: string;
    frontClassName?: string;
    backClassName?: string;
}

const defaultItems: SocialItem[] = [
    { letter: "C", icon: <FaGithub />, label: "Github", href: "#" },
    { letter: "O", icon: <FaTwitter />, label: "Twitter", href: "#" },
    { letter: "N", icon: <FaLinkedin />, label: "LinkedIn", href: "#" },
    { letter: "T", icon: <FaInstagram />, label: "Instagram", href: "#" },
    { letter: "A", icon: <FaFacebook />, label: "Facebook", href: "#" },
    { letter: "C", icon: <FaEnvelope />, label: "Email", href: "#" },
    { letter: "T", icon: <FaDiscord />, label: "Discord", href: "#" },
];

const SocialFlipNode = ({
    item,
    index,
    isHovered,
    setTooltipIndex,
    tooltipIndex,
    itemClassName,
    frontClassName,
    backClassName,
}: {
    item: SocialItem;
    index: number;
    isHovered: boolean;
    setTooltipIndex: (val: number | null) => void;
    tooltipIndex: number | null;
    itemClassName?: string;
    frontClassName?: string;
    backClassName?: string;
}) => {
    const Wrapper = item.href ? "a" : "div";
    const wrapperProps = item.href
        ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
        : { onClick: item.onClick };

    return (
        <Wrapper
            {...wrapperProps}
            className={cn(
                "relative h-12 w-12 cursor-pointer",
                itemClassName
            )}
            style={{ perspective: "1000px" }}
            onMouseEnter={() => setTooltipIndex(index)}
            onMouseLeave={() => setTooltipIndex(null)}
        >
            <AnimatePresence>
                {isHovered && tooltipIndex === index && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
                        animate={{ opacity: 1, y: -50, scale: 1, x: "-50%" }}
                        exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-1/2 z-50 whitespace-nowrap rounded-lg border border-sky-400/25 bg-[#071426] px-3 py-1.5 text-xs font-semibold text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.15)]"
                    >
                        {item.label}
                        {/* Arrow */}
                        <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-sky-400/25 bg-[#071426]" />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="relative h-full w-full"
                initial={false}
                animate={{ rotateY: isHovered ? 180 : 0 }}
                transition={{
                    duration: 0.8,
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                    delay: index * 0.08,
                }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front - Letter */}
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center rounded-xl border border-sky-400/15 bg-[#10243d] text-xl font-bold text-sky-50 shadow-[0_4px_15px_rgba(0,0,0,0.25)] transition-colors duration-300",
                        frontClassName
                    )}
                    style={{ backfaceVisibility: "hidden" }}
                    
                >
                    {item.letter}
                </div>

                {/* Back - Icon */}
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center rounded-xl border border-sky-400/40 bg-[#08243b] text-xl text-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.18)]",
                        backClassName
                    )}
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    {item.icon}
                </div>
            </motion.div>
        </Wrapper>
    );
};

export default function SocialFlipButton({
    items = defaultItems,
    className,
    itemClassName,
    frontClassName,
    backClassName,
}: SocialFlipButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);

    return (
        <div className={cn("flex items-center justify-center gap-4 p-4", className)}>
            <div
                className="group relative flex items-center justify-center gap-3 rounded-2xl border border-sky-400/20 bg-[#071426] p-5 shadow-[0_8px_35px_rgba(0,0,0,0.35)]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setTooltipIndex(null);
                }}
            >
                {/* Border Lines Container - Clipped */}
                <div className="absolute -inset-[1px] overflow-hidden rounded-2xl pointer-events-none">
                    {/* Animated Top Border Line */}
                    <motion.div
                        className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent blur-[1px] opacity-100 shadow-[0_0_8px_2px_rgba(56,189,248,0.7)]"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />

                    {/* Animated Bottom Border Line */}
                    <motion.div
                        className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent blur-[1px] opacity-100 shadow-[0_0_8px_2px_rgba(56,189,248,0.7)]"
                        animate={{ x: ["100%", "-100%"] }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </div>

                {items.map((item, index) => (
                    <SocialFlipNode
                        key={index}
                        item={item}
                        index={index}
                        isHovered={isHovered}
                        setTooltipIndex={setTooltipIndex}
                        tooltipIndex={tooltipIndex}
                        itemClassName={itemClassName}
                        frontClassName={frontClassName}
                        backClassName={backClassName}
                    />
                ))}
            </div>
        </div>
    );
}
