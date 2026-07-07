import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Dashboard queries for owner/admin
 */
export async function getDashboardStatsOwner(supabase: SupabaseClient) {
  const { data: clients } = await supabase.from("clients").select("id", { count: "exact" });
  const { data: activeProjects } = await supabase
    .from("projects")
    .select("id", { count: "exact" })
    .neq("status", "completed");
  const { data: monthlyInvoices } = await supabase
    .from("invoices")
    .select("amount_paid")
    .eq("status", "paid")
    .gte("paid_date", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());
  const { data: commissions } = await supabase
    .from("commissions")
    .select("amount")
    .eq("status", "approved")
    .is("paid_date", null);

  const monthlyRevenue = monthlyInvoices?.reduce((sum, inv) => sum + (inv.amount_paid || 0), 0) || 0;
  const commissionOwed = commissions?.reduce((sum, c) => sum + (c.amount || 0), 0) || 0;

  return {
    totalClients: clients?.length || 0,
    activeProjects: activeProjects?.length || 0,
    monthlyRevenue,
    commissionOwed,
  };
}

/**
 * Dashboard queries for employees
 */
export async function getDashboardStatsEmployee(supabase: SupabaseClient, userId: string) {
  const { data: employee } = await supabase
    .from("employees")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (!employee) {
    return {
      myLeads: 0,
      convertedClients: 0,
      pendingCommission: 0,
      paidCommission: 0,
    };
  }

  const { data: myLeads } = await supabase
    .from("leads")
    .select("id", { count: "exact" })
    .eq("employee_id", employee.id);

  const { data: convertedClients } = await supabase
    .from("clients")
    .select("id", { count: "exact" })
    .eq("referred_by_employee", employee.id);

  const { data: pendingCommissions } = await supabase
    .from("commissions")
    .select("amount")
    .eq("employee_id", employee.id)
    .in("status", ["pending", "approved"]);

  const { data: paidCommissions } = await supabase
    .from("commissions")
    .select("amount")
    .eq("employee_id", employee.id)
    .eq("status", "paid");

  const pendingCommission = pendingCommissions?.reduce((sum, c) => sum + (c.amount || 0), 0) || 0;
  const paidCommission = paidCommissions?.reduce((sum, c) => sum + (c.amount || 0), 0) || 0;

  return {
    myLeads: myLeads?.length || 0,
    convertedClients: convertedClients?.length || 0,
    pendingCommission,
    paidCommission,
  };
}

/**
 * Get recent leads for dashboard
 */
export async function getRecentLeads(supabase: SupabaseClient, limit = 5) {
  const { data } = await supabase
    .from("leads")
    .select(
      `
      id,
      client_name,
      business_name,
      phone,
      email,
      status,
      created_at,
      employee_id,
      employees (full_name)
    `,
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  return data || [];
}

/**
 * Get recent activity for dashboard
 */
export async function getRecentActivity(supabase: SupabaseClient, limit = 10) {
  const { data } = await supabase
    .from("activity_log")
    .select(
      `
      id,
      action,
      entity_type,
      description,
      created_at,
      profiles (full_name)
    `,
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  return data || [];
}

/**
 * Get leads with optional filters
 */
export async function getLeads(
  supabase: SupabaseClient,
  options?: {
    employeeId?: string;
    status?: string;
    limit?: number;
    offset?: number;
  },
) {
  let query = supabase.from("leads").select(
    `
    id,
    client_name,
    business_name,
    phone,
    email,
    status,
    created_at,
    employee_id,
    employees (full_name)
  `,
  );

  if (options?.employeeId) {
    query = query.eq("employee_id", options.employeeId);
  }

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  query = query.order("created_at", { ascending: false });

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  const { data } = await query;
  return data || [];
}

/**
 * Get lead by ID with full details
 */
export async function getLeadDetail(supabase: SupabaseClient, leadId: string) {
  const { data: lead } = await supabase
    .from("leads")
    .select(
      `
      id,
      client_name,
      business_name,
      phone,
      email,
      business_type,
      notes,
      status,
      follow_up_date,
      created_at,
      updated_at,
      employee_id,
      employees (id, full_name, email)
    `,
    )
    .eq("id", leadId)
    .single();

  if (!lead) return null;

  const { data: leadNotes } = await supabase
    .from("lead_notes")
    .select(
      `
      id,
      note,
      created_at,
      profiles (full_name)
    `,
    )
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });

  return {
    ...lead,
    notes: leadNotes || [],
  };
}

/**
 * Get all employees
 */
export async function getEmployees(supabase: SupabaseClient) {
  const { data } = await supabase
    .from("employees")
    .select(
      `
      id,
      full_name,
      phone,
      email,
      hire_date,
      commission_rate,
      status,
      created_at
    `,
    )
    .eq("status", "active")
    .order("full_name");

  return data || [];
}

/**
 * Get employee detail with stats
 */
export async function getEmployeeDetail(supabase: SupabaseClient, employeeId: string) {
  const { data: employee } = await supabase
    .from("employees")
    .select("*")
    .eq("id", employeeId)
    .single();

  if (!employee) return null;

  const { data: leads } = await supabase
    .from("leads")
    .select("id", { count: "exact" })
    .eq("employee_id", employeeId);

  const { data: clients } = await supabase
    .from("clients")
    .select("id", { count: "exact" })
    .eq("referred_by_employee", employeeId);

  const { data: commissions } = await supabase
    .from("commissions")
    .select("amount, status")
    .eq("employee_id", employeeId);

  const earned = commissions?.reduce((sum, c) => sum + (c.amount || 0), 0) || 0;
  const paid = commissions
    ?.filter((c) => c.status === "paid")
    .reduce((sum, c) => sum + (c.amount || 0), 0) || 0;
  const unpaid = earned - paid;

  return {
    ...employee,
    leadsCount: leads?.length || 0,
    convertedCount: clients?.length || 0,
    commissionEarned: earned,
    commissionPaid: paid,
    commissionUnpaid: unpaid,
  };
}

/**
 * Get clients
 */
export async function getClients(supabase: SupabaseClient, limit?: number) {
  let query = supabase.from("clients").select(
    `
    id,
    business_name,
    contact_person,
    phone,
    email,
    status,
    created_at,
    referred_by_employee
  `,
  );

  if (limit) query = query.limit(limit);

  const { data } = await query.order("created_at", { ascending: false });
  return data || [];
}

/**
 * Get client detail
 */
export async function getClientDetail(supabase: SupabaseClient, clientId: string) {
  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", clientId)
    .single();

  if (!client) return null;

  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, status, price, balance")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  const { data: invoices } = await supabase
    .from("invoices")
    .select("id, invoice_number, total, status, created_at")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  return {
    ...client,
    projects: projects || [],
    invoices: invoices || [],
  };
}
