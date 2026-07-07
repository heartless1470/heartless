import { EmptyPanel } from "@/components/portal/BackendCards";
import { getSessionProfile } from "@/lib/supabase/server";

const labels: Record<string, string> = {
  leads: "Leads",
  clients: "Clients",
  projects: "Projects",
  employees: "Employees",
  commissions: "Commissions",
  invoices: "Invoices",
  content: "Website Content",
};

const employeeAllowed = new Set(["leads", "commissions"]);

export default async function DashboardSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const { profile } = await getSessionProfile();
  const title = labels[section] || "Backend Module";
  const isEmployee = profile?.role === "EMPLOYEE";
  const denied = isEmployee && !employeeAllowed.has(section);

  if (denied) {
    return (
      <EmptyPanel
        title="Access limited"
        text="Employees can only access their own leads and commission status."
      />
    );
  }

  return (
    <EmptyPanel
      title={`${title} module`}
      text="This route is scaffolded for Supabase data. The SQL schema and RLS policies define what each role can read and change."
      items={
        section === "leads"
          ? ["new", "contacted", "quoted", "accepted", "rejected", "converted"]
          : section === "commissions"
            ? ["pending", "earned", "paid", "cancelled"]
            : []
      }
    />
  );
}
