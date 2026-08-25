import Link from "next/link";

const offers = [
  {
    number: "01",
    name: "Website Refresh",
    usd: "US$350",
    jmd: "J$55,700",
    description: "For a sound website that needs a sharper, more credible customer experience.",
    includes: ["Focused visual refresh", "Mobile and usability review", "Core page improvements", "Clearer conversion routes"],
  },
  {
    number: "02",
    name: "Business Website Redesign",
    usd: "US$750",
    jmd: "J$119,300",
    description: "For businesses ready to rethink structure, messaging, design, and performance together.",
    includes: ["Strategy and content structure", "Custom responsive design", "Development and technical SEO", "Launch and handover support"],
  },
  {
    number: "03",
    name: "Custom Business Systems",
    usd: "US$1,500",
    jmd: "J$230,000",
    description: "Discovery-led private web applications tailored to a defined operational problem.",
    includes: ["Paid discovery: US$100 / J$15,000", "Discovery fee credited toward an approved build", "Workflow and access planning", "Final quote after discovery"],
    discovery: true,
  },
];

export default function Pricing() {
  return (
    <section className="pricing-section section-block" id="pricing">
      <div className="section-frame">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Starting prices</p>
            <h2>Clear starting points. A scope built around your project.</h2>
          </div>
          <p>
            These are one-time project starting prices, not fixed packages. I confirm deliverables,
            timeline, revisions, payment schedule, and billing currency in your proposal before work begins.
          </p>
        </div>

        <div className="pricing-list" aria-label="One-time project starting prices">
          {offers.map((offer) => (
            <article className="price-row" key={offer.name}>
              <span className="price-number">{offer.number}</span>
              <div className="price-intro">
                <p className="price-type">One-time project</p>
                <h3>{offer.name}</h3>
                <p>{offer.description}</p>
                {offer.discovery ? <strong className="discovery-note">Quoted after paid discovery. No preset maximum.</strong> : null}
              </div>
              <div className="dual-price" aria-label={`${offer.name} starting price in US dollars and Jamaican dollars`}>
                <p className="starting-label">Starting from</p>
                <div><span>USD</span><strong>{offer.usd}</strong></div>
                <div><span>JMD</span><strong>{offer.jmd}</strong></div>
              </div>
              <div className="price-details">
                <p className="price-includes-label">Typical starting scope</p>
                <ul>{offer.includes.map((item) => <li key={item}>{item}</li>)}</ul>
                <Link href="#brief">Discuss this service <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
        </div>

        <article className="care-price-row">
          <span className="price-number">04</span>
          <div>
            <p className="price-type">Ongoing service</p>
            <h3>Website Care</h3>
            <p>Updates, monitoring, content support, performance checks, and planned improvements under a clear monthly scope.</p>
          </div>
          <div className="care-quote"><span>Monthly pricing</span><strong>Quoted after site review</strong></div>
          <Link href="#brief">Request a care proposal <span aria-hidden="true">→</span></Link>
        </article>

        <div className="pricing-footnotes">
          <p><strong>USD and JMD are parallel billing options.</strong> The amounts shown are fixed published reference prices, not an automatic or live currency conversion.</p>
          <p>Every starting price depends on the agreed scope. Custom systems begin at the amounts shown and are quoted after paid discovery because users, workflows, integrations, data, and security requirements differ.</p>
        </div>
      </div>
    </section>
  );
}
