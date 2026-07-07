import { redirect } from "next/navigation";
import DashboardShell from "@/components/portal/DashboardShell";
import { getSessionProfile } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, user, missingEnv } = await getSessionProfile();

  if (missingEnv) {
    return (
      <main className="portal-auth-page">
        <section className="auth-card">
          <p className="auth-kicker">Supabase setup needed</p>
          <h1>Cloud login is not connected yet</h1>
          <p className="auth-copy">
            Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local,
            then apply the Supabase schema in supabase/migrations.
          </p>
        </section>
      </main>
    );
  }

  if (!user) {
    redirect("/login");
  }

  if (!profile) {
    return (
      <main className="portal-auth-page">
        <section className="auth-card">
          <p className="auth-kicker">Profile missing</p>
          <h1>This user needs a profile row</h1>
          <p className="auth-copy">
            Create a matching profile row for this Supabase Auth user with a username and role.
          </p>
        </section>
      </main>
    );
  }

  return (
    <DashboardShell
      role={profile.role}
      username={profile.username}
      title="Dashboard"
    >
      {children}
    </DashboardShell>
  );
}
