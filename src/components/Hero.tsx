"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
const FINAL = "Websites that win\nclients on sight.";

function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text.replace(/[^\n]/g, "█"));
  const iRef = useRef(0);

  useEffect(() => {
    let frame = 0;
    const chars = text.split("");
    const revealed = new Array(chars.length).fill(false);

    const interval = setInterval(() => {
      frame++;
      const result = chars.map((ch, i) => {
        if (ch === "\n") return "\n";
        if (revealed[i]) return ch;
        if (frame > i * 2 && Math.random() > 0.6) {
          revealed[i] = true;
          return ch;
        }
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });
      setDisplay(result.join(""));
      if (revealed.every(Boolean)) clearInterval(interval);
    }, 40);
    iRef.current = frame;
    return () => clearInterval(interval);
  }, [text]);

  return (
    <>
      {display.split("\n").map((line, i) => (
        <span key={i} style={{ display: "block" }}>
          {line}
        </span>
      ))}
    </>
  );
}

const TECHS = ["React", "Next.js", "Framer Motion", "GSAP", "Tailwind", "Three.js", "Figma", "Webflow", "Sanity"];

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 24px",
        maxWidth: 1200,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
        paddingTop: 100,
      }}
    >
      {/* Headline */}
      <h1
        style={{
          fontSize: "clamp(3rem, 8vw, 7rem)",
          fontWeight: 900,
          lineHeight: 1.0,
          letterSpacing: "-0.04em",
          margin: 0,
          marginBottom: 28,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s 0.1s",
          fontFamily: "var(--font-geist-sans)",
        }}
      >
        <ScrambleText text={FINAL} />
      </h1>

      {/* Subtext */}
      <p
        style={{
          color: "#7a7a8c",
          fontSize: "clamp(1rem, 2vw, 1.25rem)",
          maxWidth: 520,
          marginBottom: 40,
          lineHeight: 1.7,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s 0.3s, transform 0.7s 0.3s",
        }}
      >
        I build high-converting websites for small businesses — fast, animated, and SEO-ready. One new customer pays for the whole investment.
      </p>

      {/* CTAs */}
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 60,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s 0.5s, transform 0.7s 0.5s",
        }}
      >
        <a
          href="#work"
          style={{
            background: "#c8f545",
            color: "#0a0a0f",
            fontWeight: 700,
            fontSize: 15,
            padding: "16px 32px",
            borderRadius: 10,
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          View Work →
        </a>
        <a
          href="#contact"
          style={{
            background: "transparent",
            color: "#f0ede8",
            fontWeight: 600,
            fontSize: 15,
            padding: "16px 32px",
            borderRadius: 10,
            textDecoration: "none",
            border: "1px solid #1e1e2a",
            display: "inline-block",
          }}
        >
          Contact Form
        </a>
      </div>

      {/* Tech pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s 0.7s",
        }}
      >
        {TECHS.map((t) => (
          <span
            key={t}
            style={{
              border: "1px solid #1e1e2a",
              borderRadius: 100,
              padding: "5px 14px",
              fontSize: 12,
              color: "#7a7a8c",
              fontWeight: 500,
              background: "#13131a",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          color: "#7a7a8c",
          fontSize: 11,
          opacity: visible ? 0.6 : 0,
          transition: "opacity 0.7s 1s",
        }}
      >
        <span>scroll</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #7a7a8c, transparent)" }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
