"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSessionProfile } from "@/lib/supabase/server";
import { logLeadActivity } from "@/lib/utils/activity";

export async function createLeadAction(formData: FormData) {
  const { supabase, profile } = await getSessionProfile();

  if (!supabase || !profile) {
    redirect("/login");
  }

  const clientName = String(formData.get("client_name") || "").trim();
  const businessName = String(formData.get("business_name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const businessType = String(formData.get("business_type") || "").trim();
  const notes = String(formData.get("notes") || "").trim();

  if (!clientName) {
    redirect("/dashboard/leads?error=missing-name");
  }

  let employeeId: string | null = null;

  if (profile.role === "EMPLOYEE") {
    const { data: employee } = await supabase
      .from("employees")
      .select("id")
      .eq("user_id", profile.id)
      .single();

    employeeId = employee?.id || null;
  }

  const { data: leadData, error } = await supabase
    .from("leads")
    .insert({
      employee_id: employeeId,
      client_name: clientName,
      business_name: businessName || null,
      phone: phone || null,
      email: email || null,
      business_type: businessType || null,
      notes: notes || null,
      status: "new",
    })
    .select()
    .single();

  if (error) {
    redirect("/dashboard/leads?error=create-failed");
  }

  // Log activity
  if (leadData) {
    await logLeadActivity(
      supabase,
      profile.id,
      "Created lead",
      leadData.id,
      clientName
    );
  }

  revalidatePath("/dashboard/leads");
  redirect("/dashboard/leads?created=lead");
}

