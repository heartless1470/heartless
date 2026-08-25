import { getSessionProfile } from "@/lib/supabase/server";
import Link from "next/link";

export default async function ProjectsPage() {
  const { profile } = await getSessionProfile();

  return (
    <div className="leads-container">
      <div className="backend-topbar">
        <h1>Projects</h1>
        <span>Not available yet</span>
      </div>

      <article className="backend-panel">
        <h2>Project Management</h2>
        <p>Project tracking is not available yet. Client records remain available from the Clients section.</p>

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
