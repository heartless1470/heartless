"use client";

import Link from "next/link";
import { deleteLeadAction } from "@/app/dashboard/leads/actions";

export interface Lead {
  id: string;
  client_name: string;
  business_name?: string;
  phone?: string;
  email?: string;
  status: "new" | "contacted" | "reviewing" | "quoted" | "converted" | "rejected";
  created_at: string;
  employees?: { full_name: string };
}

export function LeadsTable({ leads, canDelete }: { leads: Lead[]; canDelete?: boolean }) {
  if (leads.length === 0) {
    return (
      <div className="empty-state">
        <p>No leads found</p>
      </div>
    );
  }

  return (
    <div className="leads-table">
      <div className="leads-header">
        <div>Business Name</div>
        <div>Contact Person</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Status</div>
        {canDelete && <div></div>}
      </div>
      {leads.map((lead) => (
        <div key={lead.id} className="leads-row">
          <div>
            <Link href={`/dashboard/leads/${lead.id}`}>{lead.business_name || lead.client_name}</Link>
          </div>
          <div>{lead.client_name}</div>
          <div>{lead.email || "—"}</div>
          <div>{lead.phone || "—"}</div>
          <div>
            <span className={`lead-status ${lead.status}`}>{lead.status}</span>
          </div>
          {canDelete && (
            <div>
              {lead.status === "rejected" && (
                <form
                  action={deleteLeadAction}
                  onSubmit={(e) => {
                    if (!confirm("Delete this rejected lead? This cannot be undone.")) {
                      e.preventDefault();
                    }
                  }}
                >
                  <input type="hidden" name="leadId" value={lead.id} />
                  <button type="submit" className="mini-button reject-button">
                    Delete
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
