"use client";
import { useReveal } from "@/hooks/useReveal";

const features = [
  { icon: "🚀", label: "100 PageSpeed Score", desc: "Loads fast on every connection including mobile data." },
  { icon: "📱", label: "Mobile Design", desc: "Looks good on phones, tablets and desktops without any compromises." },
  { icon: "🔍", label: "SEO Setup", desc: "Meta tags, schema and sitemap so Google can find and index your pages." },
  { icon: "✨", label: "Custom Animations", desc: "Framer Motion and GSAP scroll effects built into every project." },
  { icon: "🧩", label: "CMS Integration", desc: "Sanity, Contentful or Webflow so you can update content yourself." },
  { icon: "📊", label: "Analytics Setup", desc: "GA4 and event tracking so you know where your visitors are coming from." },
  { icon: "📦", label: "Source Files", desc: "You get full ownership of the code when the project is delivered." },
  { icon: "🛡️", label: "30 Day Revisions", desc: "Changes and fixes for 30 days after launch at no extra cost." },
];

export default function Features() {
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
            Every Site Includes
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              margin: "12px 0 0",
            }}
          >
            Everything. <span style={{ color: "#c8f545" }}>No surprises.</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                background: "#0a0a0f",
                border: "1px solid #1e1e2a",
                borderRadius: 14,
                padding: "24px 24px",
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#c8f545"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#1e1e2a"; }}
            >
              <span style={{ fontSize: 24, flexShrink: 0 }}>{f.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{f.label}</div>
                <div style={{ color: "#7a7a8c", fontSize: 13, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
