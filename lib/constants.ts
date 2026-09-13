export const TOTAL_FRAMES = 121;

export function framePath(index: number): string {
  const clamped = Math.min(TOTAL_FRAMES, Math.max(1, index));
  return `/sequence/ezgif-frame-${String(clamped).padStart(3, "0")}.jpg`;
}

export const COLORS = {
  navy: "#05070d",
  navyLight: "#0a0f1c",
  abyss: "#03040a",
  steel: "#16203a",
  slate: "#8fa3c8",
  accent: "#6d9dff",
  accentLight: "#cdd9f5",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/syafiqarsy" },
  { label: "LinkedIn", href: "https://linkedin.com/in/syafiqarsy" },
  { label: "Instagram", href: "https://instagram.com/syafiqarsy" },
  { label: "Email", href: "mailto:syafiq@example.com" },
] as const;
