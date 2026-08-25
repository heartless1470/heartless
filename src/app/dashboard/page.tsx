import { DashboardCard, DashboardCardGrid, ActivityItem } from "@/components/portal/DashboardCards";
import { getSessionProfile } from "@/lib/supabase/server";
import { getDashboardStatsOwner, getDashboardStatsEmployee, getRecentActivity } from "@/lib/db/queries";
import Link from "next/link";

export default async function DashboardPage() {
  const { supabase, profile } = await getSessionProfile();
  const isEmployee = profile?.role === "EMPLOYEE";

  let stats: any = {};
  if (supabase) {
    if (isEmployee) {
      stats = await getDashboardStatsEmployee(supabase, profile!.id);
    } else {
      stats = await getDashboardStatsOwner(supabase);
    }
  }

  let recentActivity: any[] = [];
  if (supabase && !isEmployee) {
    recentActivity = await getRecentActivity(supabase, 6);
  }

  return (
    <div className="dashboard-container">
      {isEmployee ? (
        // Employee Dashboard
        <>
          <DashboardCardGrid title="My Performance">
            <DashboardCard
              label="My Leads"
              value={stats.myLeads || 0}
              detail="Leads submitted by you"
              href="/dashboard/leads"
              actionLabel="View"
            />
            <DashboardCard
              label="Converted Clients"
              value={stats.convertedClients || 0}
              detail="Leads that became clients"
              href="/dashboard/leads?status=converted"
              actionLabel="View"
            />
            <DashboardCard
              label="Pending Commission"
              value={`$${stats.pendingCommission || 0}`}
              detail="Earned but unpaid"
              href="/dashboard/commissions"
              actionLabel="View"
            />
            <DashboardCard
              label="Paid Commission"
              value={`$${stats.paidCommission || 0}`}
              detail="Commission received"
              href="/dashboard/commissions"
              actionLabel="View"
            />
          </DashboardCardGrid>

          <section className="dashboard-section">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <Link href="/dashboard/leads#new-lead" className="action-button">
                + Add New Lead
              </Link>
              <Link href="/dashboard/commissions" className="action-button">
                View My Commissions
              </Link>
              <Link href="/dashboard/settings" className="action-button">
                Account Settings
              </Link>
            </div>
          </section>
        </>
      ) : (
        // Owner/Admin Dashboard
        <>
          <DashboardCardGrid title="Sales Pipeline">
            <DashboardCard
              label="New Leads"
              value={stats.totalClients || 0}
              detail="Ready to qualify"
              href="/dashboard/leads?status=new"
              actionLabel="Qualify"
            />
            <DashboardCard
              label="Active Projects"
              value={stats.activeProjects || 0}
              detail="Currently in progress"
              href="/dashboard/projects"
              actionLabel="Manage"
            />
            <DashboardCard
              label="Pending Quotes"
              value="View quotes"
              detail="Create and review client quotes"
              href="/dashboard/quotes"
              actionLabel="Follow Up"
            />
            <DashboardCard
              label="Unpaid Invoices"
              value="Not available yet"
              detail="Invoice tracking is not available yet"
              href="/dashboard/invoices"
              actionLabel="View status"
            />
          </DashboardCardGrid>

          <DashboardCardGrid title="Revenue & Commissions">
            <DashboardCard
              label="Monthly Revenue"
              value={`$${stats.monthlyRevenue || 0}`}
              detail="From paid invoices"
              href="/dashboard/invoices"
              actionLabel="View status"
            />
            <DashboardCard
              label="Employee Commissions Due"
              value={`$${stats.commissionOwed || 0}`}
              detail="Ready for payout"
              href="/dashboard/commissions?status=earned"
              actionLabel="Process Payouts"
            />
            <DashboardCard
              label="Total Clients"
              value={stats.totalClients || 0}
              detail="Active relationships"
              href="/dashboard/clients"
              actionLabel="View All"
            />
          </DashboardCardGrid>

          <section className="dashboard-section">
            <h2>Recent Activity</h2>
            {recentActivity.length > 0 ? (
              <div className="activity-feed">
                {recentActivity.map((item) => (
                  <ActivityItem
                    key={item.id}
                    user={item.profiles?.full_name || "System"}
                    action={item.action}
                    entity={item.description}
                    timestamp={item.created_at}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No recent activity</p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
