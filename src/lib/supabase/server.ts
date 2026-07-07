import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

export async function createSupabaseServerClient() {
  const env = getSupabaseEnv();

  if (!env) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot set cookies. Server Actions and Route Handlers can.
        }
      },
    },
  });
}

export async function getSessionProfile() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { supabase: null, user: null, profile: null, missingEnv: true };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null, profile: null, missingEnv: false };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, full_name, role, status")
    .eq("id", user.id)
    .single();

  return { supabase, user, profile, missingEnv: false };
}
