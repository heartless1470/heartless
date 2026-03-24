"use client";
import { useReveal } from "@/hooks/useReveal";

export default function CTA() {
  const ref = useReveal();

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal cta-section"
      style={{
        background: "#c8f545",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(10,10,15,0.1)",
            border: "1px solid rgba(10,10,15,0.2)",
            borderRadius: 100,
            padding: "6px 16px",
            marginBottom: 28,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0a0a0f", display: "inline-block" }} />
          <span style={{ color: "#0a0a0f", fontSize: 13, fontWeight: 600 }}>3 spots left this month</span>
        </div>
        <h2
          style={{
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "#0a0a0f",
            margin: "0 0 20px",
            lineHeight: 1.0,
          }}
        >
          Ready to grow your business?
        </h2>
        <p style={{ color: "#0a0a0f", opacity: 0.6, fontSize: 18, marginBottom: 40 }}>
          I reply within 4 hours. Let&apos;s build something that actually works.
        </p>
        <a
          href="mailto:hello@heartless.studio"
          style={{
            display: "inline-block",
            background: "#0a0a0f",
            color: "#c8f545",
            fontWeight: 800,
            fontSize: 18,
            padding: "20px 48px",
            borderRadius: 12,
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Start a Project →
        </a>
      </div>
    </section>
  );
}
