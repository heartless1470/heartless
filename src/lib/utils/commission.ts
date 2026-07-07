import { SupabaseClient } from "@supabase/supabase-js";
import { ACTIVITY_MESSAGES, logCommissionActivity } from "./activity";

export const DEFAULT_COMMISSION_AMOUNT = 100; // $100 per converted client

/**
 * Create a commission when a lead is converted to a client
 */
export async function createCommissionForConvertedLead(
  supabase: SupabaseClient,
  userId: string,
  leadId: string,
  employeeId: string,
  clientId: string,
  projectId?: string,
) {
  // Get employee name for logging
  const { data: employee } = await supabase
    .from("employees")
    .select("full_name")
    .eq("id", employeeId)
    .single();

  if (!employee) return null;

  // Create commission
  const { data: commission, error } = await supabase
    .from("commissions")
    .insert({
      employee_id: employeeId,
      client_id: clientId,
      project_id: projectId || null,
      amount: DEFAULT_COMMISSION_AMOUNT,
      status: "pending",
      earned_date: new Date().toISOString().split("T")[0], // Today's date
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to create commission:", error);
    return null;
  }

  // Log activity
  await logCommissionActivity(
    supabase,
    userId,
    ACTIVITY_MESSAGES.COMMISSION_CREATED,
    commission.id,
    employee.full_name,
    DEFAULT_COMMISSION_AMOUNT,
    { lead_id: leadId, client_id: clientId },
  );

  return commission;
}

/**
 * Approve a commission
 */
export async function approveCommission(
  supabase: SupabaseClient,
  userId: string,
  commissionId: string,
) {
  const { data: commission, error } = await supabase
    .from("commissions")
    .update({ status: "approved" })
    .eq("id", commissionId)
    .select(
      `
      id,
      employee_id,
      amount,
      employees (full_name)
    `,
    )
    .single();

  if (error) {
    console.error("Failed to approve commission:", error);
    return null;
  }

  // Log activity
  const employeeName =
    commission.employees && typeof commission.employees === 'object' && 'full_name' in commission.employees
      ? (commission.employees as any).full_name
      : "Unknown";
  
  await logCommissionActivity(
    supabase,
    userId,
    ACTIVITY_MESSAGES.COMMISSION_APPROVED,
    commission.id,
    employeeName,
    commission.amount,
  );

  return commission;
}

/**
 * Mark commission as paid
 */
export async function markCommissionAsPaid(
  supabase: SupabaseClient,
  userId: string,
  commissionId: string,
) {
  const today = new Date().toISOString().split("T")[0];

  const { data: commission, error } = await supabase
    .from("commissions")
    .update({ status: "paid", paid_date: today })
    .eq("id", commissionId)
    .select(
      `
      id,
      employee_id,
      amount,
      employees (full_name)
    `,
    )
    .single();

  if (error) {
    console.error("Failed to mark commission as paid:", error);
    return null;
  }

  // Log activity
  const employeeName =
    commission.employees && typeof commission.employees === 'object' && 'full_name' in commission.employees
      ? (commission.employees as any).full_name
      : "Unknown";
  
  await logCommissionActivity(
    supabase,
    userId,
    ACTIVITY_MESSAGES.COMMISSION_MARKED_PAID,
    commission.id,
    employeeName,
    commission.amount,
  );

  return commission;
}

/**
 * Cancel a commission
 */
export async function cancelCommission(
  supabase: SupabaseClient,
  userId: string,
  commissionId: string,
) {
  const { data: commission, error } = await supabase
    .from("commissions")
    .update({ status: "cancelled" })
    .eq("id", commissionId)
    .select(
      `
      id,
      employee_id,
      amount,
      employees (full_name)
    `,
    )
    .single();

  if (error) {
    console.error("Failed to cancel commission:", error);
    return null;
  }

  // Log activity
  const employeeName =
    commission.employees && typeof commission.employees === 'object' && 'full_name' in commission.employees
      ? (commission.employees as any).full_name
      : "Unknown";
  
  await logCommissionActivity(
    supabase,
    userId,
    ACTIVITY_MESSAGES.COMMISSION_CANCELLED,
    commission.id,
    employeeName,
    commission.amount,
  );

  return commission;
}

/**
 * Get commission summary for employee
 */
export async function getEmployeeCommissionSummary(
  supabase: SupabaseClient,
  employeeId: string,
) {
  const { data: commissions } = await supabase
    .from("commissions")
    .select("amount, status")
    .eq("employee_id", employeeId);

  if (!commissions) return null;

  const earned = commissions.reduce((sum, c) => sum + (c.amount || 0), 0);
  const paid = commissions
    .filter((c) => c.status === "paid")
    .reduce((sum, c) => sum + (c.amount || 0), 0);
  const pending = commissions
    .filter((c) => c.status === "pending")
    .reduce((sum, c) => sum + (c.amount || 0), 0);
  const approved = commissions
    .filter((c) => c.status === "approved")
    .reduce((sum, c) => sum + (c.amount || 0), 0);

  return {
    totalEarned: earned,
    totalPaid: paid,
    pendingApproval: pending,
    approvedNotPaid: approved,
    unpaid: pending + approved,
  };
}

/**
 * Get all pending commissions for approval
 */
export async function getPendingCommissions(supabase: SupabaseClient) {
  const { data } = await supabase
    .from("commissions")
    .select(
      `
      id,
      employee_id,
      client_id,
      amount,
      status,
      earned_date,
      employees (full_name),
      clients (business_name)
    `,
    )
    .eq("status", "pending")
    .order("earned_date", { ascending: false });

  return data || [];
}
