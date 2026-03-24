"use client";
import { useReveal } from "@/hooks/useReveal";

const steps = [
  { n: "01", label: "Discovery", desc: "Free strategy call to understand your business, goals, and target customers." },
  { n: "02", label: "Design", desc: "Custom Figma mockups tailored to your brand — presented for your feedback." },
  { n: "03", label: "Build", desc: "I code your site in React/Next.js with animations, SEO, and mobile-first in mind." },
  { n: "04", label: "Launch", desc: "Deployed, indexed, and live. 30-day revision window included, zero stress." },
];

export default function Process() {
  const ref = useReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal"
      style={{ background: "#13131a", borderTop: "1px solid #1e1e2a", borderBottom: "1px solid #1e1e2a" }}
    >
      <div className="section-container">
        <div style={{ marginBottom: 60, textAlign: "center" }}>
          <span style={{ color: "#c8f545", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            How It Works
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              margin: "12px 0 0",
            }}
          >
            From idea to live in <span style={{ color: "#c8f545" }}>7 days.</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 0,
            position: "relative",
          }}
        >
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "32px 28px",
                borderRight: i < steps.length - 1 ? "1px solid #1e1e2a" : "none",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  color: "#1e1e2a",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: 16,
                }}
              >
                {s.n}
              </div>
              <h3 style={{ color: "#c8f545", fontWeight: 800, fontSize: 20, margin: "0 0 10px" }}>
                {s.label}
              </h3>
              <p style={{ color: "#7a7a8c", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
