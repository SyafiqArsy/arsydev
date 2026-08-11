"use client";

import { useEffect, useState } from "react";

import StaggeredMenu, {
  type StaggeredMenuItem,
} from "@/components/animations/StaggeredMenu";
import { getLenis } from "@/lib/smoothScroll";

interface NavMenuProps {
  /** Section yang sedang aktif (0–3). */
  readonly activeSection: number;
  /** Scroll ke section tujuan. */
  readonly scrollToSection: (idx: number) => void;
  /** Konten utama (Track A + Track B) — diblur saat menu terbuka. */
  readonly contentRef: React.RefObject<HTMLElement | null>;
}

/** Menu item → index section (urutan: Studio, Projects, Skills, Contact). */
const sectionItems: StaggeredMenuItem[] = [
  { label: "Studio", ariaLabel: "Go to Studio", link: "#studio" },
  { label: "Projects", ariaLabel: "Go to Projects", link: "#projects" },
  { label: "Skills", ariaLabel: "Go to Skills", link: "#skills" },
  { label: "Contact", ariaLabel: "Go to Contact", link: "#contact" },
];

const socialItems = [
  { label: "GitHub", link: "https://github.com" },
  { label: "Instagram", link: "https://instagram.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

export default function NavMenu({
  activeSection,
  scrollToSection,
  contentRef,
}: NavMenuProps) {
  // Hamburger muncul setelah melewati halaman Project (activeSection >= 1),
  // lalu latch (tetap tampil meski scroll balik). Render-phase update dengan
  // guard — pola derived-state, tanpa setState di effect.
  const [pastProjects, setPastProjects] = useState(activeSection >= 1);
  if (activeSection >= 1 && !pastProjects) {
    setPastProjects(true);
  }
  const [open, setOpen] = useState(false);
  const visible = pastProjects || open;

  // Konten utama diblur saat menu terbuka.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.classList.toggle("nav-blur", open);
    return () => el.classList.remove("nav-blur");
  }, [open, contentRef]);

  // Kunci scroll (body + Lenis) saat terbuka. Escape ditangani StaggeredMenu
  // (di sana → onMenuClose → setOpen(false) → blok ini melepas kunci).
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      getLenis()?.stop();
    }
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [open]);

  // Navigasi: buka kunci scroll & restart Lenis DULU (baru scroll berjalan),
  // tutup menu (StaggeredMenu tutup internal → onMenuClose), lalu gulir.
  // index = urutan sectionItems (0-3).
  const handleItemClick = (_item: StaggeredMenuItem, idx: number) => {
    document.body.style.overflow = "";
    getLenis()?.start();
    setOpen(false);
    scrollToSection(idx);
  };

  if (!visible) return null;

  return (
    <StaggeredMenu
      className="navmenu-staggered"
      position="right"
      isFixed
      items={sectionItems}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering
      logoUrl="/logo-arsy.svg"
      menuButtonColor="#ffffff"
      openMenuButtonColor="#0a1628"
      accentColor="#5227FF"
      colors={["#B497CF", "#5227FF"]}
      changeMenuColorOnOpen
      onMenuOpen={() => setOpen(true)}
      onMenuClose={() => setOpen(false)}
      onItemClick={handleItemClick}
    />
  );
}
