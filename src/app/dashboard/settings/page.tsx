import { getSessionProfile } from "@/lib/supabase/server";
import { updatePasswordAction } from "@/app/login/actions";

export default async function SettingsPage() {
  const { profile } = await getSessionProfile();
  const isOwner = profile?.role === "OWNER";

  return (
    <div className="leads-container">
      <div className="backend-topbar">
        <h1>Settings</h1>
        <span>Manage your account and system settings</span>
      </div>

      {/* Account Settings */}
      <article className="backend-panel">
        <h2>Account Settings</h2>
        <p>Secure your account by updating your password.</p>

        <form action={updatePasswordAction} className="backend-form">
          <label>
            Current Password
            <input name="current_password" type="password" required />
          </label>
          <label>
            New Password
            <input
              name="password"
              type="password"
              minLength={8}
              placeholder="Minimum 8 characters"
              required
            />
          </label>
          <label>
            Confirm Password
            <input name="password_confirm" type="password" minLength={8} required />
          </label>
          <button type="submit">Update Password</button>
        </form>
      </article>

      {/* System Settings (Owner Only) */}
      {isOwner && (
        <>
          <article className="backend-panel">
            <h2>System Configuration</h2>
            <p>Manage AstroCode backend settings, packages, and team roles.</p>

            <div className="settings-section">
              <h3>Commission Settings</h3>
              <div className="setting-item">
                <label>Standard Commission Rate</label>
                <p className="setting-value">$100 per lead conversion</p>
                <p className="setting-note">
                  Earned when a lead converts to a paying client. Requires payment confirmation for payout.
                </p>
              </div>
            </div>

            <div className="settings-section">
              <h3>Available Packages</h3>
              <div className="setting-item">
                <ul className="package-list">
                  <li>Landing Page — Quick online presence</li>
                  <li>Business Website — Standard 4-6 page site</li>
                  <li>Admin Dashboard — Client portal interface</li>
                  <li>CMS Integration — Client-manageable content</li>
                  <li>SEO Optimization — Search engine setup</li>
                  <li>Custom Animations — Scroll effects & micro-interactions</li>
                  <li>Maintenance Plan — Ongoing support & updates</li>
                </ul>
              </div>
            </div>

            <div className="settings-section">
              <h3>Team Roles & Permissions</h3>
              <div className="setting-item">
                <label>👑 Owner</label>
                <p className="setting-note">
                  Complete system access. Manages team, approves commissions, configures settings.
                </p>
              </div>
              <div className="setting-item">
                <label>🔑 Admin</label>
                <p className="setting-note">
                  Manages clients, projects, and invoices. Can approve and process commission payouts.
                </p>
              </div>
              <div className="setting-item">
                <label>👤 Employee</label>
                <p className="setting-note">
                  Submits and qualifies leads. Tracks personal sales metrics and commissions earned.
                </p>
              </div>
            </div>
          </article>

          <article className="backend-panel">
            <h2>Upcoming Features</h2>
            <div className="settings-section">
              <div className="feature-list">
                <div className="feature-item">
                  <strong>Email Integration</strong>
                  <p>Send automated notifications for leads, commissions, and invoices</p>
                </div>
                <div className="feature-item">
                  <strong>PDF Generation</strong>
                  <p>Generate professional quotes and invoices</p>
                </div>
                <div className="feature-item">
                  <strong>Payment Processing</strong>
                  <p>Accept payments directly through the platform</p>
                </div>
                <div className="feature-item">
                  <strong>Custom Reports</strong>
                  <p>Generate sales, commission, and performance reports</p>
                </div>
              </div>
            </div>
          </article>
        </>
      )}
    </div>
  );
}
