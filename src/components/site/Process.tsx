const steps = [
  ["01", "Understand", "We clarify the problem, desired outcome, users, constraints, and what already exists."],
  ["02", "Define", "We organize the content or workflow, set priorities, and agree on a practical scope."],
  ["03", "Design", "You review the visual and functional direction before full development begins."],
  ["04", "Build", "We develop, test, and refine the experience around real business use."],
  ["05", "Launch", "We deploy, hand over, document, and support the solution after release."],
];

export default function Process() {
  return (
    <section className="section-frame section-block" id="process">
      <div className="section-heading centered-heading">
        <p className="eyebrow">How we work</p>
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
