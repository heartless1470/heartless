import { getSessionProfile } from "@/lib/supabase/server";
import { approveCommissionAction, markPaidAction } from "./actions";

export default async function CommissionsPage() {
  const { supabase, profile } = await getSessionProfile();
  const isEmployee = profile?.role === "EMPLOYEE";

  let commissions: any[] = [];

  if (supabase && profile) {
    if (isEmployee) {
      // Get employee's own commissions
      const { data: employee } = await supabase
        .from("employees")
        .select("id")
        .eq("user_id", profile.id)
        .single();

      if (employee) {
        const { data } = await supabase
          .from("commissions")
          .select(
            `
            id,
            amount,
            status,
            earned_date,
            paid_date,
            clients (business_name)
          `
          )
          .eq("employee_id", employee.id)
          .order("earned_date", { ascending: false });

        commissions = data || [];
      }
    } else {
      // Get all commissions for admin/owner
      const { data } = await supabase
        .from("commissions")
        .select(
          `
          id,
          amount,
          status,
          earned_date,
          paid_date,
          employees (full_name),
          clients (business_name)
        `
        )
        .order("earned_date", { ascending: false });

      commissions = data || [];
    }
  }

  // Calculate totals
  const totalEarned = commissions.reduce((sum, c) => sum + (c.amount || 0), 0);
  const totalPaid = commissions
    .filter((c) => c.status === "paid")
    .reduce((sum, c) => sum + (c.amount || 0), 0);
  const pendingApproval = commissions
    .filter((c) => c.status === "pending")
    .reduce((sum, c) => sum + (c.amount || 0), 0);
  const approvedNotPaid = commissions
    .filter((c) => c.status === "approved")
    .reduce((sum, c) => sum + (c.amount || 0), 0);

  return (
    <div className="leads-container">
      <div className="backend-topbar">
        <h1>{isEmployee ? "My Commissions" : "Commissions"}</h1>
        <span>{commissions.length} commissions</span>
      </div>

      {/* Summary Stats */}
      <div className="dashboard-grid">
        <article className="backend-panel">
          <span className="stat-label">Total Earned</span>
          <strong className="stat-value">${totalEarned}</strong>
        </article>
        <article className="backend-panel">
          <span className="stat-label">Paid Out</span>
          <strong className="stat-value">${totalPaid}</strong>
        </article>
        <article className="backend-panel">
          <span className="stat-label">Pending Approval</span>
          <strong className="stat-value">${pendingApproval}</strong>
        </article>
        <article className="backend-panel">
          <span className="stat-label">Approved, Not Paid</span>
          <strong className="stat-value">${approvedNotPaid}</strong>
        </article>
      </div>

      <article className="backend-panel">
        <h2>Commission Details</h2>
        <p>Commissions are earned when leads convert to clients. Standard rate: $100 per conversion after payment confirmed.</p>

        {commissions.length === 0 ? (
          <div className="empty-state">
            <p>
              {isEmployee
                ? "No commissions yet. Submit leads and convert them to clients to earn commissions."
                : "No commissions yet."}
            </p>
          </div>
        ) : (
          <div className="commissions-table">
            <div className="commissions-header">
              {!isEmployee && <div>Employee</div>}
              <div>Client</div>
              <div>Amount</div>
              <div>Status</div>
              <div>Earned</div>
              <div>Paid</div>
              {!isEmployee && <div>Actions</div>}
            </div>

            {commissions.map((commission) => (
              <div key={commission.id} className="commissions-row">
                {!isEmployee && (
                  <div>{commission.employees?.full_name || "Unknown"}</div>
                )}
                <div>
                  {commission.clients?.business_name || "Unknown Client"}
                </div>
                <div>${commission.amount}</div>
                <div>
                  <span className={`comm-status ${commission.status}`}>
                    {commission.status}
                  </span>
                </div>
                <div>{new Date(commission.earned_date).toLocaleDateString()}</div>
                <div>
                  {commission.paid_date
                    ? new Date(commission.paid_date).toLocaleDateString()
                    : "—"}
                </div>

                {!isEmployee && commission.status === "pending" && (
                  <div>
                    <form action={approveCommissionAction} style={{ display: "inline" }}>
                      <input type="hidden" name="commissionId" value={commission.id} />
                      <button type="submit" className="mini-button">
                        Approve
                      </button>
                    </form>
                  </div>
                )}

                {!isEmployee && commission.status === "approved" && (
                  <div>
                    <form action={markPaidAction} style={{ display: "inline" }}>
                      <input type="hidden" name="commissionId" value={commission.id} />
                      <button type="submit" className="mini-button">
                        Mark Paid
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
