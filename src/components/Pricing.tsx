"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const plans = [
  {
    name: "Starter",
    monthly: 349,
    annual: 299,
    desc: "For solo entrepreneurs and new businesses that need a clean, fast site.",
    features: [
      "Up to 5 pages",
      "Mobile-first design",
      "Basic SEO setup",
      "Contact form",
      "7-day delivery",
      "30-day revisions",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    monthly: 849,
    annual: 749,
    desc: "The most popular choice. Gets you animations, SEO, CMS, and everything you need to compete.",
    features: [
      "Up to 10 pages",
      "Scroll animations",
      "Full SEO optimization",
      "CMS integration",
      "Analytics + heatmap",
      "Strategy call",
      "7-day delivery",
      "30-day revisions",
    ],
    cta: "Contact Form",
    highlight: true,
  },
  {
    name: "Enterprise",
    monthly: 1799,
    annual: 1599,
    desc: "For established local businesses that need a full online presence and custom functionality.",
    features: [
      "Unlimited pages",
      "Custom interactions",
      "Custom integrations",
      "Full SEO + schema",
      "Priority support",
      "Source files",
      "7-day delivery",
      "30-day revisions",
    ],
    cta: "Let's Talk",
    highlight: false,
  },
];

const addons = [
  { label: "Booking System", price: "$199" },
  { label: "Logo & Branding", price: "$149" },
  { label: "Copywriting", price: "$149" },
  { label: "Rush Delivery", price: "$99" },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const ref = useReveal();

  return (
    <section
      id="pricing"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal section-container"
    >
      <div style={{ marginBottom: 20, textAlign: "center" }}>
        <span style={{ color: "#c8f545", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Pricing
        </span>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            margin: "12px 0 16px",
          }}
        >
          Small business friendly <span style={{ color: "#c8f545" }}>investments.</span>
        </h2>
        <p style={{ color: "#7a7a8c", fontSize: 15, marginBottom: 32 }}>
          One new customer from your site pays for the whole package.
        </p>

        {/* Toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 48 }}>
          <span style={{ color: annual ? "#7a7a8c" : "#f0ede8", fontSize: 14, fontWeight: 600 }}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            style={{
              width: 52,
              height: 28,
              borderRadius: 14,
              background: "#c8f545",
              border: "none",
              cursor: "pointer",
              position: "relative",
              transition: "background 0.2s",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 4,
                left: annual ? 26 : 4,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#0a0a0f",
                transition: "left 0.25s",
              }}
            />
          </button>
          <span style={{ color: annual ? "#f0ede8" : "#7a7a8c", fontSize: 14, fontWeight: 600 }}>
            Annual <span style={{ color: "#c8f545" }}>–15%</span>
          </span>
        </div>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          alignItems: "start",
        }}
      >
        {plans.map((p) => (
          <div
            key={p.name}
            data-hover
            style={{
              background: p.highlight ? "#c8f545" : "#13131a",
              border: `1px solid ${p.highlight ? "#c8f545" : "#1e1e2a"}`,
              borderRadius: 20,
              padding: 32,
              position: "relative",
              transition: "transform 0.25s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            {p.highlight && (
              <div
                style={{
                  position: "absolute",
                  top: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#0a0a0f",
                  color: "#c8f545",
                  fontSize: 11,
                  fontWeight: 800,
                  padding: "4px 16px",
                  borderRadius: 100,
                  border: "1px solid #c8f545",
                  letterSpacing: "0.08em",
                  whiteSpace: "nowrap",
                }}
              >
                MOST POPULAR
              </div>
            )}
            <h3
              style={{
                fontWeight: 800,
                fontSize: 18,
                margin: "0 0 8px",
                color: p.highlight ? "#0a0a0f" : "#f0ede8",
              }}
            >
              {p.name}
            </h3>
            <div
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: p.highlight ? "#0a0a0f" : "#f0ede8",
                lineHeight: 1,
                marginBottom: 4,
              }}
            >
              ${annual ? p.annual : p.monthly}
            </div>
            <p style={{ color: p.highlight ? "#0a0a0f" : "#7a7a8c", fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>
              {p.desc}
            </p>
            <ul style={{ listStyle: "none", margin: "0 0 28px", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {p.features.map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 14,
                    color: p.highlight ? "#0a0a0f" : "#f0ede8",
                  }}
                >
                  <span style={{ color: p.highlight ? "#0a0a0f" : "#c8f545", fontWeight: 700 }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              style={{
                display: "block",
                textAlign: "center",
                padding: "14px",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
                background: p.highlight ? "#0a0a0f" : "#c8f545",
                color: p.highlight ? "#c8f545" : "#0a0a0f",
                transition: "opacity 0.2s",
              }}
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>

      {/* Add-ons */}
      <div style={{ marginTop: 48, textAlign: "center" }}>
        <p style={{ color: "#7a7a8c", fontSize: 14, marginBottom: 16 }}>Add-on services</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          {addons.map((a) => (
            <div
              key={a.label}
              style={{
                background: "#13131a",
                border: "1px solid #1e1e2a",
                borderRadius: 10,
                padding: "10px 20px",
                fontSize: 14,
                color: "#f0ede8",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <span>{a.label}</span>
              <span style={{ color: "#c8f545", fontWeight: 700 }}>{a.price}</span>
            </div>
          ))}
        </div>
        <p style={{ color: "#7a7a8c", fontSize: 13, marginTop: 20 }}>
          50% upfront · 50% on delivery · I reply within 4 hours
        </p>
      </div>
    </section>
  );
}
