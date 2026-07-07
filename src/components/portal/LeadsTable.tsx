"use client";

import Link from "next/link";

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

export function LeadsTable({ leads }: { leads: Lead[] }) {
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
        </div>
      ))}
    </div>
  );
}
