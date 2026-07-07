"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSessionProfile } from "@/lib/supabase/server";
import { approveCommission, markCommissionAsPaid } from "@/lib/utils/commission";

export async function approveCommissionAction(formData: FormData) {
  const { supabase, profile } = await getSessionProfile();

  if (!supabase || !profile) {
    redirect("/login");
  }

  const commissionId = String(formData.get("commissionId") || "").trim();

  if (!commissionId) {
    return;
  }

  await approveCommission(supabase, profile.id, commissionId);
  revalidatePath("/dashboard/commissions");
}

export async function markPaidAction(formData: FormData) {
  const { supabase, profile } = await getSessionProfile();

  if (!supabase || !profile) {
    redirect("/login");
  }

  const commissionId = String(formData.get("commissionId") || "").trim();

  if (!commissionId) {
    return;
  }

  await markCommissionAsPaid(supabase, profile.id, commissionId);
  revalidatePath("/dashboard/commissions");
}
