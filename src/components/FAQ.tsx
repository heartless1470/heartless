"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const faqs = [
  {
    q: "How long does it take to build a website?",
    a: "A landing page usually takes 3 to 7 days once your content is ready. Standard business websites take 1 to 3 weeks. Advanced builds and redesigns depend on the number of pages, how much content needs to be organised and how many rounds of feedback there are.",
  },
  {
    q: "Do I need to know how to code or design?",
    a: "No. I handle the design, development, mobile layout, SEO setup, launch and domain connection. If you already have a logo, brand colours, photos or written content that helps the project move faster.",
  },
  {
    q: "What packages are available?",
    a: "Current packages are: Basic Landing Page, Standard Business Website, Advanced Business Website and Website Redesign. Each one shows the intro price, a JMD estimate and the original target range on the pricing cards.",
  },
  {
    q: "Will my site rank on Google?",
    a: "Every site includes page titles, descriptions, a sitemap and the technical setup Google needs. Long term ranking depends on your content, your competition and how often the site gets updated.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Your business name, what you offer, who your customers are, the package you want, your contact details and WhatsApp number. Photos or brand assets help but are not required to start.",
  },
  {
    q: "Can I pay in installments?",
    a: "Yes. The standard terms are 50% upfront before work starts and 50% on delivery before handover.",
  },
  {
    q: "What are the monthly costs?",
    a: "Managed hosting is $25 per month when needed. Database support is $25 per month when needed. Rush delivery is $99. Domain name is included as long as the domain you want is available.",
  },
  {
    q: "Why are testimonials not showing?",
    a: "They will be added back through the client portal so reviews come from real clients who went through the actual process rather than placeholders.",
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
          maxHeight: open ? 340 : 0,
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
