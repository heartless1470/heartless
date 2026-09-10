import Image from "next/image";

const projects = [
  { name: "Network", kind: "Social scrapbook", status: "In development", href: "https://webapp-two-weld.vercel.app", linkLabel: "Preview on Vercel ↗", description: "A place for text, photos, links, and audio, with scrapbook-style profiles and ways to discover other members.", focus: "React interfaces · Media posts · Profiles & discovery", detail: "I’m developing Network as a personal social app. The work brings together a React frontend, serverless endpoints, and a Postgres database. I’m keeping the member experience separate from this portfolio, so personal posts and profiles stay out of the showcase." },
  { name: "Focus Ledger", kind: "Personal productivity app", status: "Interactive sample", description: "A paper-planner idea turned into a browser tool for assignments, due dates, class schedules, and daily notes.", focus: "State management · Planning flows · Useful feedback", detail: "The sample below lets you try task completion, filters, and progress feedback using example tasks. It is isolated from the personal planner and does not load or save anyone’s information." },
  { name: "LexFirm Pro", kind: "Law-firm website concept", status: "Demo", href: "https://lexfirm-pro.vercel.app", linkLabel: "View demo ↗", description: "A multi-page design exercise for a professional-services business, covering practice areas, the firm, and contact information.", focus: "Next.js · Page structure · Visual consistency", detail: "This is a fictional law-firm concept, not a client engagement. It explores how a consistent visual system carries across a homepage and supporting pages. Example firm details and results are demonstration content, not claims about a real practice." },
  { name: "Matching Game", kind: "Browser-game experiment", status: "Archived experiment", href: "https://matching-game-rose.vercel.app", linkLabel: "Visit project ↗", description: "A card-matching game with level-based and timed modes, built with plain HTML, CSS, and JavaScript.", focus: "Game state · Timers · DOM interactions", detail: "An earlier experiment in managing turns, matching pairs, scores, and timed play. I keep it as part of my development history rather than present it as a maintained product." },
];

export default function PersonalProjects() {
  return <section className="section-frame section-block personal-projects" id="personal-projects">
    <div className="section-heading split-heading"><div><p className="eyebrow">Personal projects & experiments</p><h2>Things I build<br />out of curiosity.</h2></div><p>Alongside business websites, I work on my own apps and smaller experiments. Some are still growing; others mark a useful step along the way.</p></div>
    <div className="personal-project-list">{projects.map((project, index) => <article className="personal-project" key={project.name}>
      <div className="personal-project-number" aria-hidden="true">0{index + 1}</div>
      <div>
        <p className="eyebrow">{project.kind}</p><h3>{project.name}</h3>
        {(project.name === "Network" || project.name === "LexFirm Pro") && <figure className="personal-project-preview">
          <Image src={project.name === "Network" ? "/network-preview.png" : "/lexfirm-preview.png"} alt={project.name === "Network" ? "Network’s cream-coloured public landing page with scrapbook-style illustrations" : "LexFirm Pro’s fictional law-firm homepage"} width={1440} height={1000} sizes="(max-width: 700px) 85vw, 680px" />
          <figcaption>{project.name === "Network" ? "Landing-page preview · In development" : "Website concept · Fictional firm"}</figcaption>
        </figure>}
        <p className="personal-project-description">{project.description}</p><p className="personal-project-focus">{project.focus}</p>
        {project.href && <a className="personal-project-link" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name} (opens in a new tab)`}>Visit project ↗</a>}
        {project.name === "Focus Ledger" && <a className="service-link" href="#craft">Try the safe sample ↓</a>}
        <details><summary>About this project</summary><p>{project.name === "Network" ? "I’m developing Network as a personal social app using React, serverless endpoints, and Postgres. Explore the live app to see its community feed, scrapbook profiles, and inline media posts." : project.detail}</p></details>
      </div>
      <span className="personal-project-status">{project.status}</span>
    </article>)}</div>
  </section>;
}
