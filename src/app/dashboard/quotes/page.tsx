import { getSessionProfile } from "@/lib/supabase/server";
import { getQuotes } from "@/lib/db/queries";
import Link from "next/link";

export default async function QuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string }>;
}) {
  const { created } = await searchParams;
  const { supabase, profile } = await getSessionProfile();

  let quotes: any[] = [];

  if (supabase && profile && profile.role !== "EMPLOYEE") {
    quotes = await getQuotes(supabase);
  }

  return (
    <div className="leads-container">
      <div className="backend-topbar">
        <h1>Quotes</h1>
        <span>{quotes.length} quotes</span>
      </div>

      <article className="backend-panel">
        <h2>Quote Builder</h2>
        <p>Create quotes for clients and track acceptance/rejection.</p>
        {created === "quote" && <div className="auth-success">Quote created.</div>}

        {profile?.role === "EMPLOYEE" ? (
          <div className="empty-state">
            <p>Only owners and admins can create and view quotes.</p>
          </div>
        ) : (
          <>
            <div className="empty-state" style={{ marginBottom: "1.5rem" }}>
              <Link href="/dashboard/quotes/new" className="action-button">
                Create New Quote
              </Link>
            </div>

            {quotes.length === 0 ? (
              <div className="empty-state">
                <p>No quotes yet.</p>
              </div>
            ) : (
              <div className="leads-table">
                <div className="leads-header">
                  <div>Quote #</div>
                  <div>Client</div>
                  <div>Total</div>
                  <div>Status</div>
                  <div>Created</div>
                </div>
                {quotes.map((quote: any) => (
                  <div key={quote.id} className="leads-row">
                    <div>{quote.quote_number || "—"}</div>
                    <div>{quote.clients?.business_name || quote.clients?.name || "—"}</div>
                    <div>${quote.total}</div>
                    <div>
                      <span className={`lead-status ${quote.status}`}>{quote.status}</span>
                    </div>
                    <div>{new Date(quote.created_at).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </article>
    </div>
  );
}
