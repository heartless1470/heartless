import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Studio Dashboard Access",
  robots: { index: false, follow: false },
};

export default function LoginPage() {

  return (
    <main className="portal-auth-page">
      <section className="auth-card">
        <Link href="/" className="auth-brand">
          Astro<span>Codes</span>
        </Link>
        <p className="auth-kicker">Studio Dashboard</p>
        <h1>Secure owner access is being activated.</h1>
        <p className="auth-copy">
          The old username and password form has been removed. Owner access will use a verified email
          invitation and a one-time sign-in link—never a shared password.
        </p>
        <div className="auth-setup-status" role="status">
          <strong>Owner sign-in is not enabled yet.</strong>
          <p>No owner account has been created, and this page cannot accept credentials.</p>
        </div>
        <p className="auth-copy">
          Sign-in will open here after transactional email delivery, the AstroCodes sending domain,
          and project-level access rules pass production verification.
        </p>
        <Link className="auth-home-link" href="/">Back to AstroCodes</Link>
      </section>
    </main>
  );
}
