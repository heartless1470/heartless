"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSessionProfile } from "@/lib/supabase/server";
import { logLeadActivity } from "@/lib/utils/activity";
import { createCommissionForConvertedLead } from "@/lib/utils/commission";

export async function updateLeadStatusAction(formData: FormData) {
  const { supabase, profile } = await getSessionProfile();

  if (!supabase || !profile) {
    redirect("/login");
  }

  const leadId = String(formData.get("leadId") || "").trim();
  const newStatus = String(formData.get("status") || "").trim();

  if (!leadId || !newStatus) {
    return;
  }

  const { data: lead, error: fetchError } = await supabase
    .from("leads")
    .select("client_name")
    .eq("id", leadId)
    .single();

  if (fetchError || !lead) {
    return;
  }

  const { error } = await supabase
    .from("leads")
    .update({ status: newStatus })
    .eq("id", leadId);

  if (error) {
    return;
  }

  // Log activity
  await logLeadActivity(
    supabase,
    profile.id,
    `Updated lead status to ${newStatus}`,
    leadId,
    lead.client_name
  );

  revalidatePath(`/dashboard/leads/${leadId}`);
}

export async function addLeadNoteAction(formData: FormData) {
  const { supabase, profile } = await getSessionProfile();

  if (!supabase || !profile) {
    redirect("/login");
  }

  const leadId = String(formData.get("leadId") || "").trim();
  const note = String(formData.get("note") || "").trim();

  if (!leadId || !note) {
    return;
  }

  const { error } = await supabase.from("lead_notes").insert({
    lead_id: leadId,
    created_by: profile.id,
    note,
  });

  if (error) {
    return;
  }

  // Log activity
  const { data: lead } = await supabase
    .from("leads")
    .select("client_name")
    .eq("id", leadId)
    .single();

  if (lead) {
    await logLeadActivity(
      supabase,
      profile.id,
      "Added note to lead",
      leadId,
      lead.client_name
    );
  }

  revalidatePath(`/dashboard/leads/${leadId}`);
}

export async function convertLeadToClientAction(formData: FormData) {
  const { supabase, profile } = await getSessionProfile();

  if (!supabase || !profile) {
    redirect("/login");
  }

  const leadId = String(formData.get("leadId") || "").trim();
  const businessName = String(formData.get("businessName") || "").trim();
  const contactPerson = String(formData.get("contactPerson") || "").trim();

  if (!leadId || !businessName || !contactPerson) {
    return;
  }

  // Get lead details
  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("*")
    .eq("id", leadId)
    .single();

  if (leadError || !lead) {
    return;
  }

  // Create client
  const { data: client, error: clientError } = await supabase
    .from("clients")
    .insert({
      lead_id: leadId,
      referred_by_employee: lead.employee_id,
      business_name: businessName,
      contact_person: contactPerson,
      phone: lead.phone,
      email: lead.email,
      status: "active",
    })
    .select()
    .single();

  if (clientError || !client) {
    return;
  }

  // Update lead status
  const { error: updateError } = await supabase
    .from("leads")
    .update({ status: "converted" })
    .eq("id", leadId);

  if (updateError) {
    return;
  }

  // Create commission for employee if they brought this lead
  if (lead.employee_id) {
    await createCommissionForConvertedLead(
      supabase,
      profile.id,
      leadId,
      lead.employee_id,
      client.id
    );
  }

  // Log activity
  await logLeadActivity(
    supabase,
    profile.id,
    "Converted lead to client",
    leadId,
    lead.client_name
  );

  revalidatePath("/dashboard/leads");
  redirect(`/dashboard/clients/${client.id}?converted=true`);
}

export async function rejectLeadAction(formData: FormData) {
  const { supabase, profile } = await getSessionProfile();

  if (!supabase || !profile) {
    redirect("/login");
  }

  const leadId = String(formData.get("leadId") || "").trim();

  if (!leadId) {
    return;
  }

  const { data: lead, error: fetchError } = await supabase
    .from("leads")
    .select("client_name")
    .eq("id", leadId)
    .single();

  if (fetchError || !lead) {
    return;
  }

  const { error } = await supabase
    .from("leads")
    .update({ status: "rejected" })
    .eq("id", leadId);

  if (error) {
    return;
  }

  // Log activity
  await logLeadActivity(
    supabase,
    profile.id,
    "Rejected lead",
    leadId,
    lead.client_name
  );

  revalidatePath("/dashboard/leads");
  redirect("/dashboard/leads?rejected=true");
}

