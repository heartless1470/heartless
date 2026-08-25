import Link from "next/link";
import { portalAccessMailto } from "@/lib/portal-access";

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
          I provide portal access by invitation only. When your private workspace is ready, you will use
          your own verified account and see only the project records assigned to you.
        </p>
        <ul>{portalItems.map((item) => <li key={item}>{item}</li>)}</ul>
        <div className="button-row">
          <Link className="button button-secondary" href="/client-portal">View portal approach</Link>
          <a className="text-link" href={portalAccessMailto}>Request portal access <span aria-hidden="true">→</span></a>
        </div>
        <p className="portal-request-note">Invitation-only. Sending a request does not automatically create an account, and no sensitive information is needed.</p>
      </div>
      <div className="portal-security-card">
        <span className="status-dot" />
        <p className="eyebrow">Security model</p>
        <h3>Private by design—not a shared login.</h3>
        <p>
          I enable access only after email invitations, verified individual accounts, role-based permissions,
          and project ownership rules pass production testing. Studio access remains separate from client access.
        </p>
      </div>
    </section>
  );
}
