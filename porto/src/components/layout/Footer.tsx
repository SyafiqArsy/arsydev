"use client";

export default function Footer() {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        padding: "16px 80px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(10,22,40,0.85)",
        backdropFilter: "blur(12px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "11px",
        color: "#9aa7bd",
        letterSpacing: "0.05em",
        fontFamily: '"Inter","Helvetica Neue",Arial,sans-serif',
      }}
    >
      <span>&copy; {new Date().getFullYear()} Studio Arsy</span>
      <div style={{ display: "flex", gap: "24px" }}>
        {["GitHub", "Instagram", "LinkedIn"].map((s) => (
          <a
            key={s}
            href="#"
            style={{ color: "#9aa7bd", textDecoration: "none", textTransform: "uppercase" }}
          >
            {s}
          </a>
        ))}
      </div>
    </footer>
  );
}
