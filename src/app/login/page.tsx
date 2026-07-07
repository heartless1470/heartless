import Link from "next/link";
import { loginAction } from "./actions";

const errors: Record<string, string> = {
  "missing-env": "Supabase environment variables are not configured yet.",
  "invalid-username": "Enter the username created by the owner.",
  "invalid-login": "Username or password is incorrect.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const errorMessage = error ? errors[error] : null;

  return (
    <main className="portal-auth-page">
      <section className="auth-card">
        <Link href="/" className="auth-brand">
          astrocodestudio<span>.</span>
        </Link>
        <p className="auth-kicker">Owner, admin, and employee portal</p>
        <h1>Sign in with username</h1>
        <p className="auth-copy">
          Usernames are created by the owner. Passwords can be changed later from account settings.
        </p>

        {errorMessage && <div className="auth-error">{errorMessage}</div>}

        <form action={loginAction} className="auth-form">
          <label>
            Username
            <input name="username" autoComplete="username" required />
          </label>
          <label>
            Password
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  );
}
