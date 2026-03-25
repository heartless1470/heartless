"use client";
import { useReveal } from "@/hooks/useReveal";

const plans = [
  {
    name: "Starter",
    project: 299,
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
    project: 399,
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
];

const addons = [
  { label: "Booking System", price: "$199" },
  { label: "Logo & Branding", price: "$149" },
  { label: "Copywriting", price: "$149" },
  { label: "Managed Hosting", price: "$20/mo" },
  { label: "Domain Name", price: "$12-25/yr" },
  { label: "Rush Delivery", price: "$99" },
];

export default function Pricing() {
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

        <p style={{ color: "#7a7a8c", fontSize: 14, marginBottom: 48 }}>
          One-time project pricing. No monthly commitment.
        </p>
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
              ${p.project}
            </div>
            <div style={{ color: p.highlight ? "#0a0a0f" : "#7a7a8c", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
              Per project
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
        <p style={{ color: "#7a7a8c", fontSize: 13, maxWidth: 720, margin: "20px auto 0", lineHeight: 1.7 }}>
          Hosting and domain are billed separately. I include setup, launch, SSL, and connecting everything for you, but the recurring provider costs stay in your name.
        </p>
        <p style={{ color: "#7a7a8c", fontSize: 13, marginTop: 20 }}>
          50% upfront · 50% on delivery · I reply within 4 hours
        </p>
      </div>
    </section>
  );
}
