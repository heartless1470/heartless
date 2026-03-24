"use client";

const links = ["Services", "Work", "Pricing", "About", "FAQ"];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0a0a0f",
        borderTop: "1px solid #1e1e2a",
        padding: "48px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
        }}
      >
        <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.04em", color: "#c8f545" }}>
          heartless<span style={{ color: "#f0ede8" }}>.</span>
        </span>

        <nav style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{ color: "#7a7a8c", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
            >
              {l}
            </a>
          ))}
        </nav>

        <p style={{ color: "#7a7a8c", fontSize: 13, margin: 0 }}>
          © {new Date().getFullYear()} Heartless Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
