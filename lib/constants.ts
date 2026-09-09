export const TOTAL_FRAMES = 121;

export function framePath(index: number): string {
  const clamped = Math.min(TOTAL_FRAMES, Math.max(1, index));
  return `/sequence/ezgif-frame-${String(clamped).padStart(3, "0")}.jpg`;
}

export const COLORS = {
  navy: "#0b1120",
  navyLight: "#111a2e",
  abyss: "#060911",
  steel: "#2a3a5c",
  slate: "#8899bb",
  accent: "#5b8def",
  accentLight: "#bdd0ff",
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
