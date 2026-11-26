"use client";

import StaggeredMenu from "@/components/ui/StaggeredMenu";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const menuItems = NAV_LINKS.map((link) => ({
    label: link.label,
    ariaLabel: `Navigate to ${link.label} page`,
    link: link.href,
  }));

  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      displayItemNumbering
      menuButtonColor="#f0f9ff"
      openMenuButtonColor="#f0f9ff"
      changeMenuColorOnOpen
      colors={["#102344", "#19365c"]}
      accentColor="#38bdf8"
      isFixed
      closeOnClickAway
    />
  );
}