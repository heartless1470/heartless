"use client";
import { useReveal } from "@/hooks/useReveal";

const services = [
  {
    icon: "⚡",
    title: "Landing Pages",
    desc: "Single page websites built to get you more calls, orders and enquiries. Fast to load and built to look sharp.",
  },
  {
    icon: "🛒",
    title: "Multi-Page Sites",
    desc: "Full business websites with a clear layout and pages that guide visitors toward booking or contacting you.",
  },
  {
    icon: "🔍",
    title: "SEO Setup",
    desc: "Page titles, meta tags, sitemaps and the technical setup Google needs to find and rank your site.",
  },
  {
    icon: "✨",
    title: "Scroll Animations",
    desc: "Framer Motion and GSAP animations that make your site feel like it cost a lot more than it did.",
  },
  {
    icon: "📱",
    title: "Mobile Design",
    desc: "Every site looks and works properly on phones and tablets. Most of your visitors are on mobile so this gets full attention.",
  },
  {
    icon: "🧩",
    title: "CMS Integration",
    desc: "Sanity, Contentful or Webflow so you can update your own content without needing a developer every time.",
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
