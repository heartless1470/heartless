"use client";
import { useReveal } from "@/hooks/useReveal";

const plans = [
  {
    name: "Basic Landing Page",
    original: "US$250 - US$400",
    intro: "US$180 - US$300",
    jmd: "J$28,500 - J$47,700",
    desc: "Good starting point for small businesses that need a clean online presence without a large budget.",
    features: [
      "One-page website",
      "Mobile-friendly design",
      "WhatsApp/email button",
      "Basic sections",
      "Simple SEO setup",
    ],
    highlight: false,
  },
  {
    name: "Standard Business Website",
    subtitle: "4-6 pages",
    original: "US$500 - US$900",
    intro: "US$425 - US$650",
    jmd: "J$67,600 - J$103,400",
    desc: "The most common package. A proper business website with everything a small business needs to look credible and get enquiries.",
    features: [
      "Home, About, Services, Contact",
      "Gallery/Product Showcase or FAQ",
      "Mobile-friendly design",
      "Basic SEO setup",
      "Launch support",
    ],
    highlight: true,
  },
  {
    name: "Advanced Business Website",
    subtitle: "7-12 pages",
    original: "US$900 - US$1,500",
    intro: "US$750 - US$1,100",
    jmd: "J$119,300 - J$175,000",
    desc: "For businesses that need more pages and a more detailed site structure.",
    features: [
      "7-12 page structure",
      "Multiple service/product pages",
      "Stronger content organization",
      "Advanced launch support",
      "Scalable site foundation",
    ],
    highlight: false,
  },
  {
    name: "Website Redesign",
    original: "US$400 - US$1,200",
    intro: "US$350 - US$850",
    jmd: "J$55,700 - J$135,200",
    desc: "For businesses that already have a site but need it updated, improved or fully rebuilt.",
    features: [
      "Light refresh or full rebuild",
      "Improved layout",
      "Better mobile experience",
      "Content restructuring",
      "Cleaner contact routes",
    ],
    highlight: false,
    landscape: true,
  },
];

const addons = [
  { label: "Managed Hosting", price: "$25/mo" },
  { label: "Database", price: "$25/mo" },
  { label: "Domain Name", price: "Included if available" },
  { label: "Rush Delivery", price: "$99" },
];

export default function Pricing() {
  const ref = useReveal();

  return (
    <section
      id="pricing"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal section-container"
    >
      <div style={{ marginBottom: 20, textAlign: "center" }}>
        <span style={{ color: "#c8f545", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Pricing
        </span>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            margin: "12px 0 16px",
          }}
        >
          Small business friendly <span style={{ color: "#c8f545" }}>investments.</span>
        </h2>
        <p style={{ color: "#7a7a8c", fontSize: 15, marginBottom: 32 }}>
          Intro pricing for Jamaica and the wider Caribbean market.
        </p>
        <p style={{ color: "#7a7a8c", fontSize: 14, marginBottom: 48 }}>
          Original rates are shown next to the current intro prices.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 20,
          alignItems: "stretch",
        }}
      >
        {plans.map((p) => (
          <div
            key={p.name}
            data-hover
            style={{
              background: p.highlight ? "#c8f545" : "#13131a",
              border: `1px solid ${p.highlight ? "#c8f545" : "#1e1e2a"}`,
              borderRadius: 20,
              padding: 32,
              position: "relative",
              transition: "transform 0.25s",
              display: "grid",
              gridTemplateColumns: p.landscape ? "minmax(0, 1fr) minmax(280px, 0.78fr)" : "1fr",
              gap: p.landscape ? 28 : 0,
              alignItems: p.landscape ? "center" : "stretch",
              gridColumn: p.landscape ? "1 / -1" : undefined,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            {p.highlight && (
              <div
                style={{
                  position: "absolute",
                  top: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#0a0a0f",
                  color: "#c8f545",
                  fontSize: 11,
                  fontWeight: 800,
                  padding: "4px 16px",
                  borderRadius: 100,
                  border: "1px solid #c8f545",
                  letterSpacing: "0.08em",
                  whiteSpace: "nowrap",
                }}
              >
                MAIN OFFER
              </div>
            )}

            <div>
              <h3
                style={{
                  fontWeight: 800,
                  fontSize: 18,
                  margin: "0 0 8px",
                  color: p.highlight ? "#0a0a0f" : "#f0ede8",
                }}
              >
                {p.name}
              </h3>
              {p.subtitle && (
                <div style={{ color: p.highlight ? "#0a0a0f" : "#c8f545", fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
                  {p.subtitle}
                </div>
              )}
              <div
                style={{
                  fontSize: p.landscape ? "clamp(2.6rem, 7vw, 5.2rem)" : "clamp(1.9rem, 4vw, 2.8rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  color: p.highlight ? "#0a0a0f" : "#f0ede8",
                  lineHeight: 0.95,
                  marginBottom: 10,
                }}
              >
                {p.intro}
              </div>
              <div style={{ color: p.highlight ? "#0a0a0f" : "#c8f545", fontSize: 13, fontWeight: 800, marginBottom: 8 }}>
                {p.jmd}
              </div>
              <div style={{ color: p.highlight ? "#0a0a0f" : "#7a7a8c", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
                {p.original}
              </div>
              <p style={{ color: p.highlight ? "#0a0a0f" : "#7a7a8c", fontSize: 13, lineHeight: 1.6, margin: 0, maxWidth: p.landscape ? 520 : undefined }}>
                {p.desc}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
              <ul style={{ listStyle: "none", margin: "0 0 28px", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {p.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 14,
                      color: p.highlight ? "#0a0a0f" : "#f0ede8",
                    }}
                  >
                    <span style={{ color: p.highlight ? "#0a0a0f" : "#c8f545", fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "14px",
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: "none",
                  background: p.highlight ? "#0a0a0f" : "#c8f545",
                  color: p.highlight ? "#c8f545" : "#0a0a0f",
                  transition: "opacity 0.2s",
                  marginTop: "auto",
                }}
              >
                {p.landscape ? "Plan My Redesign" : "Start This Package"}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48, textAlign: "center" }}>
        <p style={{ color: "#7a7a8c", fontSize: 14, marginBottom: 16 }}>Add-ons</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          {addons.map((a) => (
            <div
              key={a.label}
              style={{
                background: "#13131a",
                border: "1px solid #1e1e2a",
                borderRadius: 10,
                padding: "10px 20px",
                fontSize: 14,
                color: "#f0ede8",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <span>{a.label}</span>
              <span style={{ color: "#c8f545", fontWeight: 700 }}>{a.price}</span>
            </div>
          ))}
        </div>
        <p style={{ color: "#7a7a8c", fontSize: 13, maxWidth: 720, margin: "20px auto 0", lineHeight: 1.7 }}>
          Hosting and database are billed monthly when needed. Domain name is included as long as the domain you want is available.
        </p>
        <p style={{ color: "#7a7a8c", fontSize: 13, marginTop: 20 }}>
          50% upfront · 50% on delivery · Reply within 4 hours
        </p>
      </div>
    </section>
  );
}
