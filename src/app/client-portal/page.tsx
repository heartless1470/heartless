import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/site/BrandMark";

export const metadata: Metadata = {
  title: "Client Portal",
  description: "The secure, invitation-only AstroCodes client experience.",
};

const features = [
  ["Milestones", "See the current stage, completed work, and what is coming next."],
  ["Files", "Find briefs, approved assets, deliverables, and handover documents in one place."],
  ["Approvals", "Review decisions, submit change requests, and keep feedback tied to the project."],
  ["Updates", "Follow progress, support requests, and payment status without searching through threads."],
];

export default function ClientPortalPage() {
  const requestSubject = encodeURIComponent("AstroCodes client portal access request");
  return (
    <main className="access-page">
      <header className="access-nav"><BrandMark /><Link href="/">Back to website</Link></header>
      <section className="access-hero">
        <div>
          <p className="eyebrow">Client portal</p>
          <h1>A clear view of your project.</h1>
          <p>
            AstroCodes is preparing an invitation-only client workspace for milestones, files, approvals,
            updates, support requests, and payment status.
          </p>
          <div className="access-status"><span />Portal access is provisioned per project—there is no public or shared login.</div>
          <a className="button" href={`mailto:astrocodestudio@gmail.com?subject=${requestSubject}`}>Request portal access</a>
        </div>
        <div className="access-panel">
          <p className="eyebrow">Planned secure flow</p>
          <ol>
            <li><span>01</span><div><strong>Receive an invitation</strong><p>Your project invitation is tied to your verified email address.</p></div></li>
            <li><span>02</span><div><strong>Create your account</strong><p>Use passwordless sign-in where available, with magic link or one-time code fallback.</p></div></li>
            <li><span>03</span><div><strong>Access your project</strong><p>You see only records assigned to your verified user account.</p></div></li>
          </ol>
        </div>
      </section>
      <section className="access-features">
        {features.map(([title, copy]) => <article key={title}><h2>{title}</h2><p>{copy}</p></article>)}
      </section>
      <section className="security-disclosure">
        <p className="eyebrow">Honest security status</p>
        <h2>No simulated access. No fake project data.</h2>
        <p>
          This release prepares the client experience and access architecture. Client authentication is
          enabled only after the production identity provider, invitation flow, and project-level access
          policies are configured and securely tested.
        </p>
      </section>
    </main>
  );
}
