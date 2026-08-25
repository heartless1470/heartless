import Link from "next/link";

const offers = [
  {
    number: "01",
    name: "Website Refresh",
    usd: "From US$350",
    jmd: "From J$55,700",
    description: "For a sound website that needs a sharper, more credible customer experience.",
    includes: ["Focused visual refresh", "Mobile and usability review", "Core page improvements", "Clearer conversion routes"],
  },
  {
    number: "02",
    name: "Business Website Redesign",
    usd: "From US$750",
    jmd: "From J$119,300",
    description: "For businesses ready to rethink structure, messaging, design, and performance together.",
    includes: ["Strategy and content structure", "Custom responsive design", "Development and technical SEO", "Launch and handover support"],
  },
  {
    number: "03",
    name: "Custom Business Systems",
    usd: "From US$1,500",
    jmd: "From J$230,000",
    description: "Discovery-led private web applications tailored to a defined operational problem.",
    includes: ["Paid discovery: US$100 / J$15,000", "Discovery fee credited toward build", "Workflow and access planning", "Final quote after discovery"],
  },
];

export default function Pricing() {
  return (
    <section className="pricing-section section-block" id="pricing">
      <div className="section-frame">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Starting points</p>
            <h2>Useful numbers before the conversation.</h2>
          </div>
          <p>
            These prices establish a realistic starting point. Your proposal confirms the deliverables,
            timeline, revision allowance, payment schedule, and billing currency before work begins.
          </p>
        </div>
        <div className="pricing-list">
          {offers.map((offer) => (
            <article className="price-row" key={offer.name}>
              <span className="price-number">{offer.number}</span>
              <div className="price-intro"><h3>{offer.name}</h3><p>{offer.description}</p></div>
              <div className="dual-price"><strong>{offer.usd}</strong><span>{offer.jmd}</span></div>
              <div className="price-details">
                <ul>{offer.includes.map((item) => <li key={item}>{item}</li>)}</ul>
                <Link href="#brief">Discuss this service <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
        </div>
        <div className="pricing-footnotes">
          <p><strong>USD and JMD are shown side by side for clarity.</strong> They are fixed published reference prices, not an automatic or live currency conversion.</p>
          <p>Custom systems have no preset maximum. The final price follows discovery because workflows, integrations, users, data, and security requirements differ.</p>
          <p><strong>Website Care:</strong> a monthly USD or JMD proposal is prepared after reviewing the site and support scope.</p>
        </div>
      </div>
    </section>
  );
}
