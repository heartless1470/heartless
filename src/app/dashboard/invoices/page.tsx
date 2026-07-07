import { getSessionProfile } from "@/lib/supabase/server";
import Link from "next/link";

export default async function InvoicesPage() {
  const { profile } = await getSessionProfile();

  return (
    <div className="leads-container">
      <div className="backend-topbar">
        <h1>Invoices</h1>
        <span>Coming soon</span>
      </div>

      <article className="backend-panel">
        <h2>Invoice Management</h2>
        <p>Create, send, and track invoices. Mark payments and generate reports.</p>

        <div className="empty-state">
          <p>Invoices will appear here once you create them.</p>
          <Link href="/dashboard/clients" className="action-button">
            View Clients
          </Link>
        </div>
      </article>
    </div>
  );
}
