import { createEmployeeAction } from "./actions";
import { getSessionProfile } from "@/lib/supabase/server";
import { getEmployees } from "@/lib/db/queries";
import Link from "next/link";

export default async function EmployeesPage() {
  const { supabase, profile } = await getSessionProfile();
  const isOwner = profile?.role === "OWNER";

  let employees: any[] = [];

  if (supabase && isOwner) {
    employees = await getEmployees(supabase);
  }

  if (!isOwner) {
    return (
      <div className="dashboard-container">
        <article className="backend-panel" style={{ textAlign: "center", padding: "3rem" }}>
          <p>Only the account owner can manage team members. Contact your owner for employee management.</p>
        </article>
      </div>
    );
  }

  return (
    <div className="leads-container">
      <div className="backend-topbar">
        <h1>Employees</h1>
        <span>{employees.length} employees</span>
      </div>

      <article className="backend-panel">
        <h2>Add Team Member</h2>
        <p>Create a new account for an employee or admin. They can change their password on first login.</p>
        <form action={createEmployeeAction} className="backend-form">
          <label>
            Username *
            <input name="username" placeholder="john.smith (no spaces)" required />
          </label>
          <label>
            Full Name *
            <input name="full_name" placeholder="John Smith" required />
          </label>
          <label>
            Phone
            <input name="phone" type="tel" placeholder="+1 (555) 000-0000" />
          </label>
          <label>
            Role
            <select name="role" defaultValue="EMPLOYEE">
              <option value="EMPLOYEE">Employee (can submit leads)</option>
              <option value="ADMIN">Admin (full access)</option>
            </select>
          </label>
          <label>
            Temporary Password *
            <input
              name="password"
              type="password"
              minLength={8}
              placeholder="Temporary password (min 8 characters)"
              required
            />
          </label>
          <button type="submit">Create Account</button>
        </form>
      </article>

      <article className="backend-panel">
        <h2>Team Members</h2>
        <p>View team performance, sales activity, and commission tracking by clicking on any team member.</p>

        {employees.length === 0 ? (
          <div className="empty-state">
            <p>No employees yet. Create one to get started.</p>
          </div>
        ) : (
          <div className="employees-table">
            <div className="employees-header">
              <div>Name</div>
              <div>Email/Phone</div>
              <div>Role</div>
              <div>Status</div>
              <div></div>
            </div>

            {employees.map((employee) => (
              <Link
                key={employee.id}
                href={`/dashboard/employees/${employee.id}`}
                className="employees-row"
              >
                <div>
                  <strong>{employee.full_name}</strong>
                  <span>@{employee.username || "unknown"}</span>
                </div>
                <div>{employee.email || employee.phone || "—"}</div>
                <div>
                  <span className="role-badge">{employee.role}</span>
                </div>
                <div>
                  <span className={`lead-status ${employee.status}`}>
                    {employee.status}
                  </span>
                </div>
                <div className="view-link">View →</div>
              </Link>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
