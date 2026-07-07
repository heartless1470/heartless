"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { usernameToAuthEmail } from "@/lib/auth/username";

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/login?error=missing-env");
  }

  let email: string;
  try {
    email = usernameToAuthEmail(username);
  } catch {
    redirect("/login?error=invalid-username");
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/login?error=invalid-login");
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/login");
}

export async function updatePasswordAction(formData: FormData) {
  const password = String(formData.get("password") || "");
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/dashboard/settings?error=missing-env");
  }

  if (password.length < 8) {
    redirect("/dashboard/settings?error=password-too-short");
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect("/dashboard/settings?error=password-update-failed");
  }

  redirect("/dashboard/settings?updated=password");
}
