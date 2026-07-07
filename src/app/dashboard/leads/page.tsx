import { createLeadAction } from "./actions";
import { getSessionProfile } from "@/lib/supabase/server";
import { getLeads } from "@/lib/db/queries";
import { LeadsTable } from "@/components/portal/LeadsTable";

const errors: Record<string, string> = {
  "missing-name": "Contact person is required.",
  "create-failed": "Could not create the lead. Check that you have permission to do so.",
};

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; created?: string }>;
}) {
  const { error, created } = await searchParams;
  const errorMessage = error ? errors[error] || "Something went wrong." : null;
  const { supabase, profile } = await getSessionProfile();

  let leads: any[] = [];

  if (supabase && profile) {
    if (profile.role === "EMPLOYEE") {
      // Get employee's own leads
      const { data: employee } = await supabase
        .from("employees")
        .select("id")
        .eq("user_id", profile.id)
        .single();

      if (employee) {
        leads = await getLeads(supabase, { employeeId: employee.id });
      }
    } else {
      // Get all leads for admin/owner
      leads = await getLeads(supabase);
    }
  }

  return (
    <div className="leads-container">
      <div className="backend-topbar">
        <h1>Leads</h1>
        <span>{leads.length} leads</span>
      </div>

      <article className="backend-panel">
        <h2>
          {profile?.role === "EMPLOYEE"
            ? "Submit a New Lead"
            : "Create or Manage Leads"}
        </h2>
        <p>
          {profile?.role === "EMPLOYEE"
            ? "Add leads you've found. Track them from qualification to client conversion."
            : "Add new leads manually or review incoming leads."}
        </p>
        {errorMessage && <div className="auth-error">{errorMessage}</div>}
        {created === "lead" && <div className="auth-success">Lead created.</div>}
        <form action={createLeadAction} className="backend-form">
          <label>
            Contact Person *
            <input name="client_name" placeholder="John Smith" required />
          </label>

          <label>
            Business Name
            <input name="business_name" placeholder="Acme Corp" />
          </label>

          <label>
            Business Type
            <input name="business_type" placeholder="E-commerce, SaaS, Local Services, Consulting" />
          </label>

          <label>
            Phone
            <input name="phone" type="tel" placeholder="+1 (555) 000-0000" />
          </label>

          <label>
            Email
            <input name="email" type="email" placeholder="john@acmecorp.com" />
          </label>

          <label>
            Initial Notes
            <input
              name="notes"
              placeholder="How did they find you? What problem are they trying to solve?"
            />
          </label>

          <button type="submit">Save Lead</button>
        </form>
      </article>

      <article className="backend-panel">
        <h2>
          {profile?.role === "EMPLOYEE" ? "Your Leads" : "All Leads"}
        </h2>
        <p>Click on any lead to view details, add notes, and move them through the pipeline.</p>
        <LeadsTable
          leads={leads.map((lead) => ({
            id: lead.id,
            client_name: lead.client_name,
            business_name: lead.business_name,
            phone: lead.phone,
            email: lead.email,
            status: lead.status,
            created_at: lead.created_at,
            employees: lead.employees,
          }))}
          canDelete={profile?.role === "OWNER" || profile?.role === "ADMIN"}
        />
      </article>
    </div>
  );
}
