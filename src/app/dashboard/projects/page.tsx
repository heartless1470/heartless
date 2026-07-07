import { getSessionProfile } from "@/lib/supabase/server";
import Link from "next/link";

export default async function ProjectsPage() {
  const { profile } = await getSessionProfile();

  return (
    <div className="leads-container">
      <div className="backend-topbar">
        <h1>Projects</h1>
        <span>Coming soon</span>
      </div>

      <article className="backend-panel">
        <h2>Project Management</h2>
        <p>Manage all client projects here. Track status, progress, and deliverables.</p>

        <div className="empty-state">
          <p>Projects will appear here once you create them from a client profile.</p>
          <Link href="/dashboard/clients" className="action-button">
            View Clients
          </Link>
        </div>
      </article>
    </div>
  );
}
