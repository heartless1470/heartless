"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSessionProfile } from "@/lib/supabase/server";

export async function createQuoteAction(formData: FormData) {
  const { supabase, profile } = await getSessionProfile();

  if (!supabase || !profile) {
    redirect("/login");
  }

  if (profile.role === "EMPLOYEE") {
    redirect("/dashboard/quotes?error=owner-admin-only");
  }

  const clientId = String(formData.get("clientId") || "").trim();
  const quoteNumber = String(formData.get("quoteNumber") || "").trim();
  const total = Number(formData.get("total") || 0);
  const notes = String(formData.get("notes") || "").trim();

  if (!clientId || !total) {
    redirect("/dashboard/quotes/new?error=missing-fields");
  }

  const { error } = await supabase.from("quotes").insert({
    client_id: clientId,
    quote_number: quoteNumber || null,
    total,
    notes: notes || null,
    status: "draft",
  });

  if (error) {
    redirect("/dashboard/quotes/new?error=create-failed");
  }

  revalidatePath("/dashboard/quotes");
  redirect("/dashboard/quotes?created=quote");
}
