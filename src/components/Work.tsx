"use client";
import { useReveal } from "@/hooks/useReveal";

const projects = [
  {
    title: "Bloom Bakery",
    category: "Local Business · Landing Page",
    stat: "Conv. rate 1.1% → 4.8%",
    color: "#c8f545",
    size: "large",
  },
  {
    title: "LexFirm Pro",
    category: "Law Firm · 5-Page Site",
    stat: "+38% inbound leads",
    color: "#5af0e0",
    size: "small",
  },
  {
    title: "Nova Apparel",
    category: "Fashion Brand · Launch Site",
    stat: "87% mobile conversion",
    color: "#f545c8",
    size: "small",
  },
  {
    title: "ClinicCare",
    category: "Medical Clinic · Booking Site",
    stat: "3× organic traffic",
    color: "#f5a545",
    size: "small",
  },
  {
    title: "RealNest Realty",
    category: "Real Estate · Full Site",
    stat: "Conv. rate 0.8% → 3.9%",
    color: "#a545f5",
    size: "small",
  },
];

function Card({ p, large = false }: { p: typeof projects[0]; large?: boolean }) {
  return (
    <div
      data-hover
      style={{
        background: "#13131a",
        border: "1px solid #1e1e2a",
        borderRadius: 20,
        overflow: "hidden",
        position: "relative",
        minHeight: large ? 380 : 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 28,
        transition: "border-color 0.25s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = p.color;
        const overlay = el.querySelector<HTMLElement>(".card-overlay");
        if (overlay) overlay.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "#1e1e2a";
        const overlay = el.querySelector<HTMLElement>(".card-overlay");
        if (overlay) overlay.style.opacity = "0";
      }}
    >
      {/* Gradient bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 70% 30%, ${p.color}22 0%, transparent 60%)`,
        }}
      />
      {/* Hover overlay */}
      <div
        className="card-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10,10,15,0.85)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: 0,
          transition: "opacity 0.3s",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 36 }}>→</span>
        <span style={{ color: p.color, fontWeight: 700, fontSize: 14 }}>View Project</span>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "inline-block",
            background: `${p.color}22`,
            border: `1px solid ${p.color}44`,
            borderRadius: 100,
            padding: "4px 12px",
            fontSize: 11,
            color: p.color,
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          {p.stat}
        </div>
        <h3 style={{ fontWeight: 800, fontSize: large ? 28 : 20, margin: "0 0 4px", letterSpacing: "-0.03em" }}>
          {p.title}
        </h3>
        <p style={{ color: "#7a7a8c", fontSize: 13, margin: 0 }}>{p.category}</p>
      </div>
    </div>
  );
}

export default function Work() {
  const ref = useReveal();

  return (
    <section
      id="work"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal section-container"
    >
      <div style={{ marginBottom: 60 }}>
        <span style={{ color: "#c8f545", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Portfolio
        </span>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            margin: "12px 0 0",
          }}
        >
          Results that <span style={{ color: "#c8f545" }}>speak louder.</span>
        </h2>
      </div>

      {/* Asymmetric grid */}
      <div className="work-grid">
        {/* Big card spans 1 row, 1 col */}
        <div className="work-grid-featured">
          <Card p={projects[0]} large />
        </div>
        {/* Smaller cards */}
        <div className="work-grid-right">
          <Card p={projects[1]} />
          <Card p={projects[2]} />
        </div>
        <div className="work-grid-bottom">
          <Card p={projects[3]} />
          <Card p={projects[4]} />
        </div>
      </div>
    </section>
  );
}
