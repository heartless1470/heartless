"use client";
import { useEffect, useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const testimonials = [
  {
    quote: "Our website went from looking like it was built in 2012 to something that genuinely impresses new clients. We got 3 inbound leads the week it launched.",
    author: "Sarah M.",
    company: "Bloom Bakery",
    avatar: "S",
    color: "#c8f545",
  },
  {
    quote: "Worth every penny. I was skeptical spending $849 but we booked two new cases from organic search within 30 days. The ROI is real.",
    author: "James T.",
    company: "LexFirm Pro",
    avatar: "J",
    color: "#5af0e0",
  },
  {
    quote: "The animations alone blew my mind. My customers keep saying they love the 'vibe' of the site. Conversion rate jumped from 1.4% to 4.2%.",
    author: "Priya K.",
    company: "Nova Apparel",
    avatar: "P",
    color: "#f545c8",
  },
  {
    quote: "I was paying $100/month for a WordPress site that was slow and looked terrible. Spent $349 here and got something 10x better.",
    author: "Carlos R.",
    company: "ClinicCare",
    avatar: "C",
    color: "#f5a545",
  },
  {
    quote: "The strategy call alone was worth it. He pointed out 5 things I was doing wrong before we even started designing. Highly recommend.",
    author: "Dana W.",
    company: "RealNest Realty",
    avatar: "D",
    color: "#a545f5",
  },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      className="testimonial-card"
      style={{
        background: "#13131a",
        border: "1px solid #1e1e2a",
        borderRadius: 20,
        padding: 32,
        minWidth: 340,
        maxWidth: 380,
        flexShrink: 0,
      }}
    >
      <div style={{ color: t.color, fontSize: 24, marginBottom: 16 }}>★★★★★</div>
      <p style={{ color: "#f0ede8", fontSize: 15, lineHeight: 1.7, margin: "0 0 24px", fontStyle: "italic" }}>
          &ldquo;{t.quote}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: t.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0a0a0f",
            fontWeight: 800,
            fontSize: 16,
          }}
        >
          {t.avatar}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{t.author}</div>
          <div style={{ color: "#7a7a8c", fontSize: 12 }}>{t.company}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const sectionRef = useReveal();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let x = 0;
    let raf: number;
    const speed = 0.7;

    const animate = () => {
      if (!isPaused.current) {
        x -= speed;
        const half = track.scrollWidth / 2;
        if (Math.abs(x) >= half) x = 0;
        track.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="reveal"
      style={{ padding: "100px 0", overflow: "hidden" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", marginBottom: 48 }}>
        <span style={{ color: "#c8f545", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Testimonials
        </span>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            margin: "12px 0 0",
          }}
        >
          What clients <span style={{ color: "#c8f545" }}>actually say.</span>
        </h2>
      </div>

      <div
        style={{ overflow: "hidden" }}
        onMouseEnter={() => { isPaused.current = true; }}
        onMouseLeave={() => { isPaused.current = false; }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: 20,
            width: "max-content",
            willChange: "transform",
          }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
