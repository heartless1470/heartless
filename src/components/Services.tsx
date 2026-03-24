"use client";
import { useReveal } from "@/hooks/useReveal";

const services = [
  {
    icon: "⚡",
    title: "Landing Pages",
    desc: "High-converting single-page sites built to turn visitors into customers. Fast, beautiful, and SEO-ready from day one.",
  },
  {
    icon: "🛒",
    title: "Multi-Page Sites",
    desc: "Professional brochure and service websites with clear structure, strong messaging, and pages built to move visitors toward booking or enquiry.",
  },
  {
    icon: "🔍",
    title: "SEO Optimization",
    desc: "Schema markup, meta tags, sitemaps, Core Web Vitals — everything Google needs to rank your site higher.",
  },
  {
    icon: "✨",
    title: "Scroll Animations",
    desc: "Buttery smooth Framer Motion and GSAP animations that make your site feel premium and modern without sacrificing performance.",
  },
  {
    icon: "📱",
    title: "Mobile-First Design",
    desc: "Every site looks and works perfectly on all screen sizes. Mobile visitors aren't an afterthought — they're the priority.",
  },
  {
    icon: "🧩",
    title: "CMS Integration",
    desc: "Sanity, Contentful, or Webflow so you can update your own content without touching a line of code.",
  },
];

export default function Services() {
  const ref = useReveal();

  return (
    <section
      id="services"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal section-container"
    >
      <div style={{ marginBottom: 60 }}>
        <span style={{ color: "#c8f545", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          What I Build
        </span>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            margin: "12px 0 0",
          }}
        >
          Services that <span style={{ color: "#c8f545" }}>actually work.</span>
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        {services.map((s, i) => (
          <div
            key={i}
            data-hover
            style={{
              background: "#13131a",
              border: "1px solid #1e1e2a",
              borderRadius: 16,
              padding: 32,
              transition: "border-color 0.25s, transform 0.25s",
              animationDelay: `${i * 0.1}s`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#c8f545";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#1e1e2a";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
            <h3 style={{ fontWeight: 700, fontSize: 18, margin: "0 0 10px", letterSpacing: "-0.02em" }}>
              {s.title}
            </h3>
            <p style={{ color: "#7a7a8c", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
