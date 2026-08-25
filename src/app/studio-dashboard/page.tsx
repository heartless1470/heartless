import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/site/BrandMark";

export const metadata: Metadata = { title: "Studio Dashboard", robots: { index: false, follow: false } };

const areas = ["Leads", "Projects", "Milestones", "Tasks", "Files", "Approvals", "Support requests", "Payment status"];

export default function StudioDashboardEntryPage() {
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  return (
    <main className="access-page studio-entry">
      <header className="access-nav"><BrandMark /><Link href="/">Back to website</Link></header>
      <section className="access-hero">
        <div>
          <p className="eyebrow">Internal operations</p>
          <h1>Studio Dashboard</h1>
          <p>
            The founder-led internal workspace for managing delivery. It is separate from the client
            portal and is never a shared client access point.
          </p>
          {configured ? (
            <Link className="button" href="/login">Open secure Studio Dashboard</Link>
          ) : (
            <div className="access-status"><span />Studio Dashboard sign-in is currently unavailable.</div>
          )}
        </div>
        <div className="access-panel">
          <p className="eyebrow">Operational scope</p>
          <div className="scope-cloud">{areas.map((area) => <span key={area}>{area}</span>)}</div>
          <p className="panel-note">Studio access is restricted to authorized accounts. Any replacement access model must pass verified identity, role, row-level access, and MFA checks before it can go live.</p>
        </div>
      </section>
    </main>
  );
}
