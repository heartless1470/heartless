"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const faqs = [
  {
    q: "How long does it actually take to build a website?",
    a: "Most sites are live in 7 days from the moment I have all your content and branding. Larger custom builds can take 10–14 days. I'll give you a specific timeline on our strategy call.",
  },
  {
    q: "Do I need to know how to code or design?",
    a: "Not at all. I handle everything — design, development, SEO, and launch. If you have a logo and brand colors, great. If not, I offer branding add-ons to get you sorted.",
  },
  {
    q: "What if I want to update the site myself after launch?",
    a: "The Pro plan includes CMS integration (like Sanity or Contentful) so you can update text, images, and blog posts without touching code. Starter can add CMS as an add-on.",
  },
  {
    q: "Will my site actually rank on Google?",
    a: "I implement technical SEO (meta tags, schema markup, sitemaps, robots.txt, Core Web Vitals) on every site. That gives you a strong foundation — long-term rankings depend on your content and backlinks too.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Business name, what you do, who your customers are, any existing logo/colors, and your site goals. That's it. We cover everything else on the strategy call.",
  },
  {
    q: "Can I pay in installments?",
    a: "Yes — I always do 50% upfront and 50% on delivery. This removes risk for you while keeping the project moving. No full upfront required.",
  },
  {
    q: "What's included in the monthly retainer?",
    a: "At $69/mo you get: security updates, plugin/dependency updates, minor content changes (up to 1hr/month), uptime monitoring, and priority support. Cancel any time.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: "1px solid #1e1e2a",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 0",
          textAlign: "left",
          gap: 16,
        }}
      >
        <span style={{ color: "#f0ede8", fontWeight: 600, fontSize: 16 }}>{q}</span>
        <span
          style={{
            color: "#c8f545",
            fontSize: 20,
            fontWeight: 700,
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "rotate(0)",
            transition: "transform 0.25s",
            display: "inline-block",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? 300 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <p style={{ color: "#7a7a8c", fontSize: 15, lineHeight: 1.8, margin: "0 0 24px" }}>{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const ref = useReveal();

  return (
    <section
      id="faq"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal faq-container"
    >
      <div style={{ marginBottom: 60, textAlign: "center" }}>
        <span style={{ color: "#c8f545", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          FAQ
        </span>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            margin: "12px 0 0",
          }}
        >
          Common <span style={{ color: "#c8f545" }}>questions.</span>
        </h2>
      </div>
      <div>
        {faqs.map((f, i) => (
          <FAQItem key={i} {...f} />
        ))}
      </div>
    </section>
  );
}
