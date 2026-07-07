import { getSessionProfile } from "@/lib/supabase/server";
import { getClients } from "@/lib/db/queries";
import Link from "next/link";

export default async function ClientsPage() {
  const { supabase, profile } = await getSessionProfile();

  let clients: any[] = [];

  if (supabase && profile) {
    clients = await getClients(supabase);
  }

  return (
    <div className="leads-container">
      <div className="backend-topbar">
        <h1>Clients</h1>
        <span>{clients.length} clients</span>
      </div>

      <article className="backend-panel">
        <h2>Clients</h2>
        <p>View all active clients and their project history. Create new projects, quotes, and invoices from here.</p>

        {clients.length === 0 ? (
          <div className="empty-state">
            <p>No clients yet. Convert leads to clients from the leads section to get started.</p>
            <Link href="/dashboard/leads" className="action-button">
              Go to Leads
            </Link>
          </div>
        ) : (
          <div className="leads-table">
            <div className="leads-header">
              <div>Business Name</div>
              <div>Contact</div>
              <div>Email</div>
              <div>Status</div>
            </div>
            {clients.map((client) => (
              <div key={client.id} className="leads-row">
                <div>
                  <Link href={`/dashboard/clients/${client.id}`}>
                    {client.business_name}
                  </Link>
                </div>
                <div>{client.contact_person || "—"}</div>
                <div>{client.email || "—"}</div>
                <div>
                  <span className={`lead-status ${client.status}`}>{client.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
