import { getSessionProfile } from "@/lib/supabase/server";
import { getLeadDetail } from "@/lib/db/queries";
import Link from "next/link";
import {
  updateLeadStatusAction,
  addLeadNoteAction,
  convertLeadToClientAction,
  rejectLeadAction,
} from "./actions";
import { deleteLeadAction } from "../actions";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase, profile } = await getSessionProfile();

  if (!supabase || !profile) {
    return <div>Please log in to view this page.</div>;
  }

  const lead = await getLeadDetail(supabase, id);

  if (!lead) {
    return <div>Lead not found.</div>;
  }

  return (
    <div className="leads-detail-container">
      <div className="leads-detail-header">
        <div>
          <Link href="/dashboard/leads" className="back-link">
            ← Back to Leads
          </Link>
          <h1>{lead.client_name}</h1>
          <p>{lead.business_name || lead.business_type || "No business info"}</p>
        </div>
        <span className={`lead-status ${lead.status}`}>{lead.status}</span>
      </div>

      <div className="leads-detail-grid">
        {/* Main Info */}
        <article className="backend-panel leads-detail-section">
          <h2>Lead Information</h2>

          <div className="info-grid">
            <div>
              <label>Contact Person</label>
              <p>{lead.client_name}</p>
            </div>
            <div>
              <label>Business Name</label>
              <p>{lead.business_name || "—"}</p>
            </div>
            <div>
              <label>Business Type</label>
              <p>{lead.business_type || "—"}</p>
            </div>
            <div>
              <label>Email</label>
              <p>
                {lead.email ? (
                  <a href={`mailto:${lead.email}`}>{lead.email}</a>
                ) : (
                  "—"
                )}
              </p>
            </div>
            <div>
              <label>Phone</label>
              <p>
                {lead.phone ? (
                  <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                ) : (
                  "—"
                )}
              </p>
            </div>
            <div>
              <label>Added By</label>
              <p>{lead.employees && typeof lead.employees === 'object' && 'full_name' in lead.employees ? (lead.employees as any).full_name : "Admin"}</p>
            </div>
            <div>
              <label>Added Date</label>
              <p>{new Date(lead.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </article>

        {/* Actions */}
        <div className="leads-detail-actions">
          <article className="backend-panel">
            <h2>Actions</h2>

            <div className="action-group">
              <h3>Update Pipeline Status</h3>
              <form action={updateLeadStatusAction} className="quick-actions-form">
                <input type="hidden" name="leadId" value={lead.id} />
                <select name="status" defaultValue={lead.status}>
                  <option value="new">New Lead</option>
                  <option value="contacted">Contacted</option>
                  <option value="reviewing">Under Review</option>
                  <option value="quoted">Quote Sent</option>
                </select>
                <button type="submit">Update Status</button>
              </form>
            </div>

            <div className="action-group">
              {lead.converted_client_id ? (
                <Link
                  href={`/dashboard/quotes/new?client=${lead.converted_client_id}`}
                  className="action-link-button"
                >
                  Create Quote →
                </Link>
              ) : (
                <p className="text-gray-400">Convert this lead to a client to create a quote.</p>
              )}
            </div>

            <div className="action-group">
              <ConvertToClientForm leadId={lead.id} lead={lead} />
            </div>

            {lead.status !== "rejected" && (
              <div className="action-group">
                <form action={rejectLeadAction} className="reject-form">
                  <input type="hidden" name="leadId" value={lead.id} />
                  <button type="submit" className="reject-button">
                    Reject Lead
                  </button>
                </form>
              </div>
            )}

            {lead.status === "rejected" && (profile.role === "OWNER" || profile.role === "ADMIN") && (
              <div className="action-group">
                <form action={deleteLeadAction} className="reject-form">
                  <input type="hidden" name="leadId" value={lead.id} />
                  <button type="submit" className="reject-button">
                    Delete Lead
                  </button>
                </form>
              </div>
            )}
          </article>
        </div>
      </div>

      {/* Notes Section */}
      <article className="backend-panel">
        <h2>Notes & Activity</h2>

        <div className="notes-section">
          <form action={addLeadNoteAction} className="add-note-form">
            <input type="hidden" name="leadId" value={lead.id} />
            <textarea
              name="note"
              placeholder="Add internal notes: next steps, contact details, quote info, follow-up reminders..."
              rows={3}
            ></textarea>
            <button type="submit">Save Note</button>
          </form>

          {lead.notes && lead.notes.length > 0 ? (
            <div className="notes-list">
              {lead.notes.map((note: any) => (
                <div key={note.id} className="note-item">
                  <div className="note-header">
                    <strong>{note.profiles?.full_name || "You"}</strong>
                    <span className="note-time">
                      {new Date(note.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p>{note.note}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-notes">No notes yet. Add one to get started.</p>
          )}
        </div>
      </article>
    </div>
  );
}

function ConvertToClientForm({ leadId, lead }: { leadId: string; lead: any }) {
  return (
    <form action={convertLeadToClientAction} className="convert-form">
      <input type="hidden" name="leadId" value={leadId} />

      <label>
        Business Name
        <input
          type="text"
          name="businessName"
          defaultValue={lead.business_name || lead.client_name}
          required
        />
      </label>

      <label>
        Contact Person
        <input
          type="text"
          name="contactPerson"
          defaultValue={lead.client_name}
          required
        />
      </label>

      <button type="submit" className="convert-button">
        Convert to Client →
      </button>
    </form>
  );
}
