const services = [
  {
    number: "01",
    title: "Website Refresh",
    summary: "A focused visual and usability upgrade for a site with solid foundations.",
    detail: "Best for businesses that need sharper presentation, clearer calls to action, and a better mobile experience without rebuilding every page.",
  },
  {
    number: "02",
    title: "Business Website Redesign",
    summary: "A strategic rebuild of the website your customers judge you by.",
    detail: "We rethink the structure, messaging, visual system, performance, and enquiry journey so the site supports the next stage of the business.",
    featured: true,
  },
  {
    number: "03",
    title: "Custom Business Systems",
    summary: "Private web applications designed around a real operational problem.",
    detail: "Explain the bottleneck. We map the workflow and build the right tool—such as a client portal, dashboard, quoting flow, booking system, or internal tracker.",
    id: "systems",
  },
  {
    number: "04",
    title: "Website Care",
    summary: "Practical post-launch support that keeps the site dependable.",
    detail: "Updates, monitoring, content assistance, performance checks, and improvement planning are scoped around the needs of your website.",
  },
];

export default function Services() {
  return (
    <section className="section-frame section-block" id="services">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow">What we do</p>
          <h2>Focused services. Clear business value.</h2>
        </div>
        <p>
          The technology stays in the background. We focus on the customer experience, the operational
          problem, and the result your business needs.
        </p>
      </div>
      <div className="service-grid">
        {services.map((service) => (
          <article className={`service-card${service.featured ? " featured" : ""}`} id={service.id} key={service.title}>
            <span className="service-number">{service.number}</span>
            <h3>{service.title}</h3>
            <p className="service-summary">{service.summary}</p>
            <p>{service.detail}</p>
          </article>
        ))}
      </div>
      <div className="systems-note">
        <div>
          <p className="eyebrow">Web-first by default</p>
          <h3>Use the simplest platform that solves the problem well.</h3>
        </div>
        <p>
          Custom systems are normally secure browser-based applications that work across computers,
          tablets, and phones. Native mobile apps are recommended only when offline work, phone-specific
          features, or device integrations genuinely require them.
        </p>
      </div>
    </section>
  );
}
