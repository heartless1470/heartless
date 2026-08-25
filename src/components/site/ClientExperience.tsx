import Link from "next/link";

const portalItems = ["Project milestones", "Files and deliverables", "Approvals and change requests", "Progress updates", "Support requests", "Payment status"];

export default function ClientExperience() {
  return (
    <section className="section-frame section-block portal-preview" id="portal">
      <div className="portal-diagram" aria-hidden="true">
        <span className="diagram-label">CLIENT / PROJECT</span>
        <div className="diagram-track"><i /><i /><i /><i /></div>
        <strong>01:01</strong>
        <span className="diagram-caption">VERIFIED ACCESS</span>
      </div>
      <div className="portal-copy">
        <p className="eyebrow">A better client experience</p>
        <h2>One clear place to follow the work.</h2>
        <p>
          The AstroCodes client portal is being prepared as an invitation-only experience. Each client
          will use their own verified account and see only the project records assigned to them.
        </p>
        <ul>{portalItems.map((item) => <li key={item}>{item}</li>)}</ul>
        <div className="button-row">
          <Link className="button button-secondary" href="/client-portal">View portal approach</Link>
          <Link className="text-link" href="#brief">Request project access <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <div className="portal-security-card">
        <span className="status-dot" />
        <p className="eyebrow">Security model</p>
        <h3>Private by design—not a shared login.</h3>
        <p>
          Production access will use email invitations, verified individual accounts, role-based access,
          and row-level ownership rules. Studio accounts will require multi-factor authentication.
        </p>
      </div>
    </section>
  );
}
