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
          <p className="auth-kicker">Studio Dashboard unavailable</p>
          <h1>The secure data connection is offline.</h1>
          <p className="auth-copy">
            Studio access remains closed until the authenticated data connection is restored and verified.
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
          <p className="auth-kicker">Access not assigned</p>
          <h1>This account does not have a Studio profile.</h1>
          <p className="auth-copy">
            Contact the AstroCodes owner to confirm the account and assign the correct role.
          </p>
        </section>
      </main>
    );
  }

  return (
    <DashboardShell
      role={profile.role}
      username={profile.username}
      title="Studio Dashboard"
    >
      {children}
    </DashboardShell>
  );
}
