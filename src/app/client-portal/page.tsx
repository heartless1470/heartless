import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/site/BrandMark";
import { portalAccessMailto } from "@/lib/portal-access";

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
  return (
    <main className="access-page">
      <header className="access-nav"><BrandMark /><Link href="/">Back to website</Link></header>
      <section className="access-hero">
        <div>
          <p className="eyebrow">Client portal</p>
          <h1>A clear view of your project.</h1>
          <p>
            This invitation-only workspace keeps milestones, files, approvals, updates, support requests,
            and payment status tied to your project.
          </p>
          <div className="access-status"><span />Client sign-in is not live yet. Request access and I will confirm when your private workspace is ready.</div>
          <a className="button" href={portalAccessMailto}>Request portal access</a>
          <p className="portal-request-note">The email draft asks only for your name, business, project name, and preferred invitation email. It does not create an account automatically.</p>
        </div>
        <div className="access-panel">
          <p className="eyebrow">How access works</p>
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
        <h2>Your project data stays private.</h2>
        <p>
          Client sign-in remains disabled until the identity checks, invitation flow, and project-level
          access rules pass production testing. I will never use a shared login or display sample client records as real data.
        </p>
      </section>
    </main>
  );
}
