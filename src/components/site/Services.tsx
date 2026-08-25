import Link from "next/link";

type IconName = "refresh" | "redesign" | "systems" | "care";

function ServiceIcon({ name }: { name: IconName }) {
  const paths = {
    refresh: <><path d="M4 7h16v12H4z"/><path d="M4 11h16M8 4h8"/></>,
    redesign: <><path d="M4 4h16v16H4z"/><path d="M4 9h16M10 9v11"/><path d="m14 14 2-2 2 2"/></>,
    systems: <><rect x="3" y="4" width="7" height="6" rx="1"/><rect x="14" y="14" width="7" height="6" rx="1"/><path d="M10 7h4a3 3 0 0 1 3 3v4M14 17h-4a3 3 0 0 1-3-3v-4"/></>,
    care: <><path d="M12 21s8-4 8-10V5l-8-2-8 2v6c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
  };

  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden="true">{paths[name]}</svg>;
}

const services: Array<{
  number: string;
  icon: IconName;
  title: string;
  summary: string;
  detail: string;
  id?: string;
}> = [
  {
    number: "01",
    icon: "refresh",
    title: "Website Refresh",
    summary: "Sharpen a site with good bones.",
    detail: "A focused visual and usability upgrade for businesses that need clearer calls to action, better mobile presentation, and a more credible first impression.",
  },
  {
    number: "02",
    icon: "redesign",
    title: "Business Website Redesign",
    summary: "Rebuild the website customers judge you by.",
    detail: "The primary offer: strategy, structure, messaging, design, performance, and enquiry flow reconsidered as one complete business asset.",
  },
  {
    number: "03",
    icon: "systems",
    title: "Custom Business Systems",
    summary: "Fix the operational problem behind the website.",
    detail: "Tell me where the workflow breaks down. I map it and design a private browser-based tool around the people, data, and decisions involved.",
    id: "systems",
  },
  {
    number: "04",
    icon: "care",
    title: "Website Care",
    summary: "Keep the finished site dependable.",
    detail: "Updates, monitoring, content assistance, performance checks, and planned improvements under a clear monthly scope.",
  },
];

export default function Services() {
  return (
    <section className="section-frame section-block" id="services">
      <div className="section-heading split-heading">
        <div><p className="eyebrow">Services / 04</p><h2>Useful work, clearly scoped.</h2></div>
        <p>The technology stays in the background. The customer experience, operational problem, and result stay in view.</p>
      </div>
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" id={service.id} key={service.title}>
            <div className="service-meta"><span className="service-number">{service.number}</span><ServiceIcon name={service.icon} /></div>
            <div><h3>{service.title}</h3><p className="service-summary">{service.summary}</p></div>
            <div className="service-detail"><p>{service.detail}</p><Link className="service-link" href="#brief">Discuss this service <span aria-hidden="true">→</span></Link></div>
          </article>
        ))}
      </div>
      <div className="systems-note">
        <div><p className="eyebrow">Web-first by default</p><h3>Use the simplest platform that solves the problem well.</h3></div>
        <p>Custom systems normally ship as secure web apps that work across computers, tablets, and phones. Native mobile apps make sense only when offline work, phone-specific features, or device integrations truly require them.</p>
      </div>
    </section>
  );
}
