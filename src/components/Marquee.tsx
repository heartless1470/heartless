const SERVICES = [
  "Landing Pages",
  "Multi-Page Sites",
  "SaaS Websites",
  "Local Business Sites",
  "Branding",
  "SEO Optimization",
  "Scroll Animations",
  "CMS Integration",
  "Speed Optimization",
  "Strategy Calls",
];

const item = (s: string, i: number) => (
  <span
    key={i}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 24,
      padding: "0 24px",
      fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
      fontWeight: 700,
      letterSpacing: "0.02em",
      color: "#0a0a0f",
      whiteSpace: "nowrap",
    }}
  >
    {s}
    <span style={{ color: "#0a0a0f", opacity: 0.4, fontSize: "1.2em" }}>✦</span>
  </span>
);

export default function Marquee() {
  const doubled = [...SERVICES, ...SERVICES];
  return (
    <div
      style={{
        background: "#c8f545",
        overflow: "hidden",
        padding: "18px 0",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="marquee-track">
        {doubled.map((s, i) => item(s, i))}
      </div>
    </div>
  );
}
