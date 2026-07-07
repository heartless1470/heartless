import { getSessionProfile } from "@/lib/supabase/server";
import { getEmployeeDetail } from "@/lib/db/queries";
import Link from "next/link";

export default async function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase, profile } = await getSessionProfile();

  if (!supabase || !profile || profile.role === "EMPLOYEE") {
    return <div>Unauthorized</div>;
  }

  const employee = await getEmployeeDetail(supabase, id);

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div className="leads-detail-container">
      <div className="leads-detail-header">
        <div>
          <Link href="/dashboard/employees" className="back-link">
            ← Back to Employees
          </Link>
          <h1>{employee.full_name}</h1>
          <p>@{employee.user_id}</p>
        </div>
        <span className={`lead-status ${employee.status}`}>{employee.status}</span>
      </div>

      <div className="leads-detail-grid">
        {/* Main Info */}
        <article className="backend-panel leads-detail-section">
          <h2>Team Member Profile</h2>

          <div className="info-grid">
            <div>
              <label>Full Name</label>
              <p>{employee.full_name}</p>
            </div>
            <div>
              <label>Account</label>
              <p>
                {employee.user_id ? `@${employee.user_id}` : "—"}
              </p>
            </div>
            <div>
              <label>Phone</label>
              <p>
                {employee.phone ? (
                  <a href={`tel:${employee.phone}`}>{employee.phone}</a>
                ) : (
                  "—"
                )}
              </p>
            </div>
            <div>
              <label>Hire Date</label>
              <p>{new Date(employee.hire_date).toLocaleDateString()}</p>
            </div>
            <div>
              <label>Commission Rate</label>
              <p>${employee.commission_rate} per conversion</p>
            </div>
            <div>
              <label>Status</label>
              <p className="capitalize">{employee.status}</p>
            </div>
          </div>
        </article>

        {/* Stats */}
        <div className="leads-detail-actions">
          <article className="backend-panel">
            <h2>Sales Metrics</h2>

            <div className="stat-section">
              <div className="stat-item">
                <span className="stat-label">Leads Submitted</span>
                <strong className="stat-value">{employee.leadsCount}</strong>
              </div>

              <div className="stat-item">
                <span className="stat-label">Converted Clients</span>
                <strong className="stat-value">{employee.convertedCount}</strong>
              </div>

              <div className="stat-item">
                <span className="stat-label">Commission Earned</span>
                <strong className="stat-value">${employee.commissionEarned}</strong>
              </div>

              <div className="stat-item">
                <span className="stat-label">Commission Paid</span>
                <strong className="stat-value">${employee.commissionPaid}</strong>
              </div>

              <div className="stat-item">
                <span className="stat-label">Commission Unpaid</span>
                <strong className="stat-value highlight">
                  ${employee.commissionUnpaid}
                </strong>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Quick Links */}
      <article className="backend-panel">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <Link
            href={`/dashboard/leads?employee=${employee.id}`}
            className="action-button"
          >
            View Their Leads
          </Link>
          <Link
            href={`/dashboard/commissions?employee=${employee.id}`}
            className="action-button"
          >
            View Their Commissions
          </Link>
        </div>
      </article>
    </div>
  );
}
