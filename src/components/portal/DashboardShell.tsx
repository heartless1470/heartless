import Link from "next/link";
import { logoutAction } from "@/app/login/actions";

type Role = "OWNER" | "ADMIN" | "EMPLOYEE";

type DashboardShellProps = {
  role: Role;
  username: string;
  title: string;
  children: React.ReactNode;
};

const ownerAdminNav = [
  ["Dashboard", "/dashboard"],
  ["Leads", "/dashboard/leads"],
  ["Clients", "/dashboard/clients"],
  ["Projects", "/dashboard/projects"],
  ["Employees", "/dashboard/employees"],
  ["Commissions", "/dashboard/commissions"],
  ["Invoices", "/dashboard/invoices"],
  ["Content (not available)", "/dashboard/content"],
  ["Settings", "/dashboard/settings"],
];

const employeeNav = [
  ["Dashboard", "/dashboard"],
  ["My Leads", "/dashboard/leads"],
  ["My Commissions", "/dashboard/commissions"],
  ["Settings", "/dashboard/settings"],
];

export default function DashboardShell({ role, username, title, children }: DashboardShellProps) {
  const nav = role === "EMPLOYEE" ? employeeNav : ownerAdminNav;

  return (
    <main className="backend-shell">
      <aside className="backend-sidebar">
        <Link href="/" className="backend-brand">
          Astro<span>Codes</span>
        </Link>
        <div className="backend-user">
          <strong>{username}</strong>
          <span>{role}</span>
        </div>
        <nav>
          {nav.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction}>
          <button type="submit">Logout</button>
        </form>
      </aside>
      <section className="backend-main">
        <div className="backend-topbar">
          <div>
            <p>AstroCodes internal operations</p>
            <h1>{title}</h1>
          </div>
          <span>{role === "EMPLOYEE" ? "Employee access" : "Owner/Admin access"}</span>
        </div>
        {children}
      </section>
    </main>
  );
}
