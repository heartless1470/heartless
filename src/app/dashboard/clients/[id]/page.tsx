import { getSessionProfile } from "@/lib/supabase/server";
import { getClientDetail } from "@/lib/db/queries";
import Link from "next/link";

function safeWebsiteUrl(value: string | null | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export default async function ClientDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ converted?: string }>;
}) {
  const { id } = await params;
  const { converted } = await searchParams;
  const { supabase, profile } = await getSessionProfile();

  if (!supabase || !profile) {
    return <div>Please log in to view this page.</div>;
  }

  const client = await getClientDetail(supabase, id);

  if (!client) {
    return <div>Client not found.</div>;
  }

  const websiteUrl = safeWebsiteUrl(client.website);

  return (
    <div className="leads-detail-container">
      <div className="leads-detail-header">
        <div>
          <Link href="/dashboard/clients" className="back-link">
            ← Back to Clients
          </Link>
          <h1>{client.business_name || client.name}</h1>
          <p>{client.name}</p>
        </div>
        <span className={`lead-status ${client.status}`}>{client.status}</span>
      </div>

      {converted === "true" && (
        <div className="auth-success">Lead converted to client.</div>
      )}

      <div className="leads-detail-grid">
        {/* Main Info */}
        <article className="backend-panel leads-detail-section">
          <h2>Client Information</h2>

          <div className="info-grid">
            <div>
              <label>Contact Person</label>
              <p>{client.name || "—"}</p>
            </div>
            <div>
              <label>Business Name</label>
              <p>{client.business_name || "—"}</p>
            </div>
            <div>
              <label>Email</label>
              <p>
                {client.email ? (
                  <a href={`mailto:${client.email}`}>{client.email}</a>
                ) : (
                  "—"
                )}
              </p>
            </div>
            <div>
              <label>Phone</label>
              <p>
                {client.phone ? <a href={`tel:${client.phone}`}>{client.phone}</a> : "—"}
              </p>
            </div>
            <div>
              <label>Location</label>
              <p>{client.location || "—"}</p>
            </div>
            <div>
              <label>Website</label>
              <p>
                {websiteUrl ? (
                  <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                    {client.website}
                  </a>
                ) : (
                  "—"
                )}
              </p>
            </div>
            <div>
              <label>Client Since</label>
              <p>{new Date(client.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </article>

        {/* Stats */}
        <div className="leads-detail-actions">
          <article className="backend-panel">
            <h2>Overview</h2>

            <div className="stat-section">
              <div className="stat-item">
                <span className="stat-label">Projects</span>
                <strong className="stat-value">{client.projects.length}</strong>
              </div>
              <div className="stat-item">
                <span className="stat-label">Invoices</span>
                <strong className="stat-value">{client.invoices.length}</strong>
              </div>
            </div>

            {profile.role !== "EMPLOYEE" && (
              <div className="quick-actions">
                <Link href={`/dashboard/quotes/new?client=${client.id}`} className="action-button">
                  Create Quote
                </Link>
              </div>
            )}
          </article>
        </div>
      </div>

      {/* Projects */}
      <article className="backend-panel">
        <h2>Projects</h2>
        {client.projects.length === 0 ? (
          <div className="empty-state">
            <p>No projects yet for this client.</p>
          </div>
        ) : (
          <div className="leads-table">
            <div className="leads-header">
              <div>Title</div>
              <div>Status</div>
              <div>Price</div>
              <div>Balance</div>
            </div>
            {client.projects.map((project: any) => (
              <div key={project.id} className="leads-row">
                <div>{project.title}</div>
                <div>
                  <span className={`lead-status ${project.status}`}>{project.status}</span>
                </div>
                <div>${project.price}</div>
                <div>${project.balance}</div>
              </div>
            ))}
          </div>
        )}
      </article>

      {/* Invoices */}
      <article className="backend-panel">
        <h2>Invoices</h2>
        {client.invoices.length === 0 ? (
          <div className="empty-state">
            <p>No invoices yet for this client.</p>
          </div>
        ) : (
          <div className="leads-table">
            <div className="leads-header">
              <div>Invoice #</div>
              <div>Status</div>
              <div>Amount</div>
              <div>Created</div>
            </div>
            {client.invoices.map((invoice: any) => (
              <div key={invoice.id} className="leads-row">
                <div>{invoice.invoice_number}</div>
                <div>
                  <span className={`lead-status ${invoice.status}`}>{invoice.status}</span>
                </div>
                <div>${invoice.amount}</div>
                <div>{new Date(invoice.created_at).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
