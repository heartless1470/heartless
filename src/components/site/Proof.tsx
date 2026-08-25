import Image from "next/image";

const projects = [
  {
    title: "Wildflour Local Bakery",
    sector: "Food & hospitality",
    href: "https://wildflourlocalbakery.com",
    image: "/wildflour.png",
    focus: "Brand presentation, product discovery, and clearer ordering routes.",
  },
  {
    title: "Duffus Flooring",
    sector: "Construction services",
    href: "https://www.duffusflooring.com",
    image: "/duffusflooring.png",
    focus: "Service clarity, project proof, and a direct path to enquiries.",
  },
  {
    title: "RX Essentials",
    sector: "Pharmacy",
    href: "https://www.rxessentialsja.com",
    focus: "Trust content, service navigation, and convenient mobile access.",
  },
];

export default function Proof() {
  return (
    <section className="proof-section section-block" id="work">
      <div className="section-frame">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2>Proof is more useful than promises.</h2>
          </div>
          <p>
            Each engagement starts with a different business context. The work below shows how I adapt
            the structure, presentation, and customer journey to fit it.
          </p>
        </div>
        <div className="proof-grid">
          {projects.map((project, index) => (
            <a className="proof-card" href={project.href} target="_blank" rel="noopener noreferrer" key={project.title}>
              <div className="proof-media">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`Preview of the ${project.title} website`}
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                ) : (
                  <div className="proof-placeholder" aria-hidden="true">
                    <small>PHARMACY / WEB</small><span>RX</span><strong>ESSENTIALS</strong><i />
                  </div>
                )}
                <span className="proof-index">0{index + 1}</span>
              </div>
              <div className="proof-copy">
                <p>{project.sector}</p>
                <h3>{project.title}</h3>
                <span>{project.focus}</span>
                <strong>View live project <span aria-hidden="true">↗</span></strong>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
