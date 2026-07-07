"use client";
import { useEffect, useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const skills = [
  { label: "UI/UX Design", pct: 95 },
  { label: "React / Next.js", pct: 98 },
  { label: "SEO Optimization", pct: 90 },
  { label: "Framer Motion / GSAP", pct: 88 },
  { label: "CMS Integration", pct: 85 },
];

function SkillBar({ label, pct }: { label: string; pct: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.width = `${pct}%`;
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#f0ede8" }}>{label}</span>
        <span style={{ fontSize: 13, color: "#c8f545", fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ height: 4, background: "#1e1e2a", borderRadius: 2, overflow: "hidden" }}>
        <div
          ref={barRef}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #c8f545, #a8d530)",
            borderRadius: 2,
            width: "0%",
            transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>
    </div>
  );
}

const stats = [
  { n: "Est.", label: "2025" },
  { n: "100", label: "PageSpeed target" },
  { n: "4hrs", label: "avg. response time" },
  { n: "7d", label: "avg. delivery time" },
];

export default function About() {
  const ref = useReveal();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal section-container"
    >
      <div className="about-grid">
        {/* Left */}
        <div>
          <span style={{ color: "#c8f545", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            About
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              margin: "12px 0 20px",
            }}
          >
            I build sites that <span style={{ color: "#c8f545" }}>pay for themselves.</span>
          </h2>
          <p style={{ color: "#7a7a8c", fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
              I build websites for businesses that need a proper online presence. Past clients include bakeries, flooring companies, pharmacies, contractors and building suppliers. The goal is always a site that looks credible and helps the business get more customers.
          </p>
          <p style={{ color: "#7a7a8c", fontSize: 15, lineHeight: 1.8, marginBottom: 40 }}>
            Every site is fast, built for mobile, set up for SEO and comes with animations as standard.
          </p>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {stats.map((s) => (
              <div key={s.n} style={{ background: "#13131a", border: "1px solid #1e1e2a", borderRadius: 14, padding: "20px 24px" }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#c8f545", letterSpacing: "-0.04em" }}>{s.n}</div>
                <div style={{ color: "#7a7a8c", fontSize: 13 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — skill bars + code snippet */}
        <div>
          <div style={{ marginBottom: 40 }}>
            {skills.map((s) => (
              <SkillBar key={s.label} {...s} />
            ))}
          </div>

          {/* Code snippet card */}
          <div
            style={{
              background: "#13131a",
              border: "1px solid #1e1e2a",
              borderRadius: 14,
              padding: 24,
              fontFamily: "var(--font-geist-mono)",
              fontSize: 13,
              lineHeight: 1.8,
            }}
          >
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <div>
              <span style={{ color: "#7a7a8c" }}>{"// Every site ships with"}</span>
              {"\n"}
              <span style={{ color: "#c8f545" }}>const</span>
              <span style={{ color: "#f0ede8" }}> siteConfig </span>
              <span style={{ color: "#7a7a8c" }}>= {"{"}</span>
              {"\n"}
              {"  "}
              <span style={{ color: "#5af0e0" }}>speed</span>
              <span style={{ color: "#7a7a8c" }}>: </span>
                <span style={{ color: "#c8f545" }}>{'"100/100"'}</span>
              <span style={{ color: "#7a7a8c" }}>,</span>
              {"\n"}
              {"  "}
              <span style={{ color: "#5af0e0" }}>seo</span>
              <span style={{ color: "#7a7a8c" }}>: </span>
                <span style={{ color: "#c8f545" }}>{'"optimized"'}</span>
              <span style={{ color: "#7a7a8c" }}>,</span>
              {"\n"}
              {"  "}
              <span style={{ color: "#5af0e0" }}>animations</span>
              <span style={{ color: "#7a7a8c" }}>: </span>
                <span style={{ color: "#c8f545" }}>{'"buttery smooth"'}</span>
              <span style={{ color: "#7a7a8c" }}>,</span>
              {"\n"}
              {"  "}
              <span style={{ color: "#5af0e0" }}>delivery</span>
              <span style={{ color: "#7a7a8c" }}>: </span>
                <span style={{ color: "#c8f545" }}>{'"7 days"'}</span>
              {"\n"}
              <span style={{ color: "#7a7a8c" }}>{"}"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
