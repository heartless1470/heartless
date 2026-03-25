"use client";
import { useEffect, useState } from "react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.3s, backdrop-filter 0.3s",
        background: scrolled || menuOpen ? "rgba(10,10,15,0.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid #1e1e2a" : "none",
      }}
    >
      <nav className="nav-inner">
        {/* Logo */}
        <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.04em", color: "#c8f545" }}>
          astrocodestudio<span style={{ color: "#f0ede8" }}>.</span>
        </span>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{ color: "#7a7a8c", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a href="#contact" className="nav-cta">Contact Form →</a>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            style={{
              display: "block", width: 22, height: 2, background: "#f0ede8", borderRadius: 2,
              transition: "transform 0.25s",
              transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <span
            style={{
              display: "block", width: 22, height: 2, background: "#f0ede8", borderRadius: 2,
              transition: "opacity 0.25s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block", width: 22, height: 2, background: "#f0ede8", borderRadius: 2,
              transition: "transform 0.25s",
              transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile slide-down menu */}
      <div className={`mobile-nav${menuOpen ? " open" : ""}`}>
        <div style={{ padding: "8px 0 20px" }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              style={{
                display: "block",
                padding: "15px 24px",
                color: "#f0ede8",
                textDecoration: "none",
                fontSize: 17,
                fontWeight: 600,
                borderBottom: "1px solid #1e1e2a",
                transition: "color 0.2s",
              }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ padding: "20px 24px 4px" }}>
            <a
              href="#contact"
              onClick={closeMenu}
              style={{
                display: "block",
                textAlign: "center",
                background: "#c8f545",
                color: "#0a0a0f",
                fontWeight: 700,
                fontSize: 15,
                padding: "14px 20px",
                borderRadius: 10,
                textDecoration: "none",
              }}
            >
              Contact Form →
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
