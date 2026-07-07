import { getSessionProfile } from "@/lib/supabase/server";
import { getClients } from "@/lib/db/queries";
import { createQuoteAction } from "./actions";
import Link from "next/link";

const errors: Record<string, string> = {
  "missing-fields": "Client and total are required.",
  "create-failed": "Could not create the quote.",
  "owner-admin-only": "Only owners and admins can create quotes.",
};

export default async function NewQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; client?: string }>;
}) {
  const { error, client: preselectedClientId } = await searchParams;
  const errorMessage = error ? errors[error] || "Something went wrong." : null;
  const { supabase, profile } = await getSessionProfile();

  if (!supabase || !profile || profile.role === "EMPLOYEE") {
    return (
      <div className="dashboard-container">
        <article className="backend-panel" style={{ textAlign: "center", padding: "3rem" }}>
          <p>Only owners and admins can create quotes.</p>
        </article>
      </div>
    );
  }

  const clients = await getClients(supabase);

  return (
    <div className="leads-container">
      <div className="backend-topbar">
        <h1>New Quote</h1>
        <Link href="/dashboard/quotes" className="back-link">
          ← Back to Quotes
        </Link>
      </div>

      <article className="backend-panel">
        <h2>Quote Details</h2>
        {errorMessage && <div className="auth-error">{errorMessage}</div>}

        {clients.length === 0 ? (
          <div className="empty-state">
            <p>No clients yet. Convert a lead to a client before creating a quote.</p>
            <Link href="/dashboard/leads" className="action-button">
              Go to Leads
            </Link>
          </div>
        ) : (
          <form action={createQuoteAction} className="backend-form">
            <label>
              Client *
              <select name="clientId" defaultValue={preselectedClientId || ""} required>
                <option value="" disabled>
                  Select a client
                </option>
                {clients.map((client: any) => (
                  <option key={client.id} value={client.id}>
                    {client.business_name || client.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Quote Number
              <input name="quoteNumber" placeholder="Q-1001" />
            </label>

            <label>
              Total *
              <input name="total" type="number" min="0" step="0.01" placeholder="0.00" required />
            </label>

            <label>
              Notes
              <input name="notes" placeholder="Scope, packages included, terms..." />
            </label>

            <button type="submit">Create Quote</button>
          </form>
        )}
      </article>
    </div>
  );
}
