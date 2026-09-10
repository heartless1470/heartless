import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/site/BrandMark";

export const metadata: Metadata = { title: "Project Terms" };

export default function TermsPage() {
  return (
    <main className="legal-page">
      <header className="access-nav"><BrandMark /><Link href="/">Back to website</Link></header>
      <article>
        <p className="eyebrow">Working expectations</p><h1>A clear scope protects the project.</h1>
        <p>This page is a plain-language summary. The signed proposal or agreement controls each engagement.</p>
        <h2>Scope and pricing</h2><p>I quote each project individually. Your proposal defines deliverables, exclusions, timeline, revision allowance, dependencies, price, and billing currency before work begins.</p>
        <h2>Custom systems</h2><p>I start custom systems with discovery to understand the workflow, users, integrations, and security requirements. Any discovery fee and build estimate are agreed with you before that work begins.</p>
        <h2>Client responsibilities</h2><p>Timelines depend on timely content, access, feedback, and approvals. Delays or material scope changes can affect delivery dates and cost.</p>
        <h2>Payments and ownership</h2><p>The proposal defines the payment schedule and handover terms. Final production files and agreed ownership are transferred after required payments are complete, except for licensed third-party materials and services.</p>
        <h2>Support</h2><p>Included post-launch support is stated in the proposal. Website Care and work outside the agreed scope are quoted separately.</p>
      </article>
    </main>
  );
}
