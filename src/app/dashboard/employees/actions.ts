"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { usernameToAuthEmail, normalizeUsername } from "@/lib/auth/username";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSessionProfile } from "@/lib/supabase/server";

export async function createEmployeeAction(formData: FormData) {
  const { profile } = await getSessionProfile();

  if (profile?.role !== "OWNER") {
    redirect("/dashboard/employees?error=owner-only");
  }

  const admin = createSupabaseAdminClient();

  if (!admin) {
    redirect("/dashboard/employees?error=missing-service-key");
  }

  const username = normalizeUsername(String(formData.get("username") || ""));
  const fullName = String(formData.get("full_name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const password = String(formData.get("password") || "");
  const role = String(formData.get("role") || "EMPLOYEE");

  if (!username || !fullName || password.length < 8) {
    redirect("/dashboard/employees?error=invalid-input");
  }

  const { data: authUser, error: authError } = await admin.auth.admin.createUser({
    email: usernameToAuthEmail(username),
    password,
    email_confirm: true,
  });

  if (authError || !authUser.user) {
    redirect("/dashboard/employees?error=create-auth-failed");
  }

  const { error: profileError } = await admin.from("profiles").insert({
    id: authUser.user.id,
    username,
    full_name: fullName,
    role,
    status: "active",
  });

  if (profileError) {
    redirect("/dashboard/employees?error=create-profile-failed");
  }

  if (role === "EMPLOYEE") {
    await admin.from("employees").insert({
      user_id: authUser.user.id,
      phone: phone || null,
      commission_flat_amount: 100,
      status: "active",
    });
  }

  revalidatePath("/dashboard/employees");
  redirect("/dashboard/employees?created=user");
}
