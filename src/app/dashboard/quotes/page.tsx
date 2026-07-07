import { getSessionProfile } from "@/lib/supabase/server";
import Link from "next/link";

export default async function QuotesPage() {
  const { profile } = await getSessionProfile();

  return (
    <div className="leads-container">
      <div className="backend-topbar">
        <h1>Quotes</h1>
        <span>Coming soon</span>
      </div>

      <article className="backend-panel">
        <h2>Quote Builder</h2>
        <p>Create custom quotes by selecting packages and services.</p>

        <div className="empty-state">
          <p>Build quotes for clients and track acceptance/rejection.</p>
          <Link href="/dashboard/quotes/new" className="action-button">
            Create New Quote
          </Link>
        </div>
      </article>
    </div>
  );
}
