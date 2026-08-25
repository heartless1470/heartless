const steps = [
  ["01", "Understand", "I clarify the problem, desired outcome, users, constraints, and what already exists."],
  ["02", "Define", "I organize the content or workflow, set priorities, and agree a practical scope with you."],
  ["03", "Design", "You review the visual and functional direction before full development begins."],
  ["04", "Build", "I develop, test, and refine the experience around real business use."],
  ["05", "Launch", "I deploy, hand over, document, and support the solution after release."],
];

export default function Process() {
  return (
    <section className="section-frame section-block" id="process">
      <div className="section-heading centered-heading">
        <p className="eyebrow">How I work</p>
        <h2>Clear from first conversation to launch.</h2>
        <p>No mystery process. No build starting before the problem and scope make sense.</p>
      </div>
      <ol className="process-list">
        {steps.map(([number, title, copy]) => (
          <li key={number}>
            <span>{number}</span>
            <div><h3>{title}</h3><p>{copy}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}
