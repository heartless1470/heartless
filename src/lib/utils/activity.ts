import { SupabaseClient } from "@supabase/supabase-js";

export type ActivityEntityType =
  | "lead"
  | "client"
  | "project"
  | "invoice"
  | "quote"
  | "commission"
  | "employee"
  | "account";

/**
 * Log activity for audit trail and activity feed
 */
export async function logActivity(
  supabase: SupabaseClient,
  userId: string,
  action: string,
  entityType: ActivityEntityType,
  entityId: string | null,
  description: string,
  metadata?: Record<string, any>,
) {
  const { error } = await supabase.from("activity_log").insert({
    user_id: userId,
    action,
    entity_type: entityType,
    entity_id: entityId,
    description,
    metadata: metadata || null,
  });

  if (error) {
    console.error("Failed to log activity:", error);
  }

  return error;
}

// Predefined activity messages
export const ACTIVITY_MESSAGES = {
  // Lead activities
  LEAD_CREATED: "Created lead",
  LEAD_CONTACTED: "Marked lead as contacted",
  LEAD_QUOTED: "Created quote for lead",
  LEAD_CONVERTED: "Converted lead to client",
  LEAD_REJECTED: "Rejected lead",
  LEAD_UPDATED: "Updated lead details",
  LEAD_NOTE_ADDED: "Added note to lead",

  // Client activities
  CLIENT_CREATED: "Created client from lead",
  CLIENT_UPDATED: "Updated client details",
  CLIENT_STATUS_CHANGED: "Changed client status",

  // Project activities
  PROJECT_CREATED: "Created project",
  PROJECT_UPDATED: "Updated project details",
  PROJECT_STATUS_CHANGED: "Changed project status",
  PROJECT_SECTION_UPDATED: "Updated project section status",

  // Quote activities
  QUOTE_CREATED: "Created quote",
  QUOTE_SENT: "Sent quote to client",
  QUOTE_ACCEPTED: "Accepted quote",
  QUOTE_REJECTED: "Rejected quote",

  // Invoice activities
  INVOICE_CREATED: "Created invoice",
  INVOICE_SENT: "Sent invoice to client",
  INVOICE_MARKED_PAID: "Marked invoice as paid",
  INVOICE_MARKED_PARTIAL: "Marked invoice as partially paid",
  INVOICE_MARKED_OVERDUE: "Marked invoice as overdue",

  // Commission activities
  COMMISSION_CREATED: "System created commission for converted lead",
  COMMISSION_APPROVED: "Approved commission",
  COMMISSION_MARKED_PAID: "Marked commission as paid",
  COMMISSION_CANCELLED: "Cancelled commission",

  // Employee activities
  EMPLOYEE_CREATED: "Created employee account",
  EMPLOYEE_SUSPENDED: "Suspended employee",
  EMPLOYEE_REACTIVATED: "Reactivated employee",
};

/**
 * Helper function to log lead-related activities
 */
export async function logLeadActivity(
  supabase: SupabaseClient,
  userId: string,
  action: string,
  leadId: string,
  clientName: string,
  metadata?: Record<string, any>,
) {
  return logActivity(
    supabase,
    userId,
    action,
    "lead",
    leadId,
    `${action}: ${clientName}`,
    metadata,
  );
}

/**
 * Helper function to log client-related activities
 */
export async function logClientActivity(
  supabase: SupabaseClient,
  userId: string,
  action: string,
  clientId: string,
  businessName: string,
  metadata?: Record<string, any>,
) {
  return logActivity(
    supabase,
    userId,
    action,
    "client",
    clientId,
    `${action}: ${businessName}`,
    metadata,
  );
}

/**
 * Helper function to log commission activities
 */
export async function logCommissionActivity(
  supabase: SupabaseClient,
  userId: string,
  action: string,
  commissionId: string,
  employeeName: string,
  amount: number,
  metadata?: Record<string, any>,
) {
  return logActivity(
    supabase,
    userId,
    action,
    "commission",
    commissionId,
    `${action}: ${employeeName} - $${amount}`,
    metadata,
  );
}
