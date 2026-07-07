/**
 * Creates the first OWNER account in Supabase.
 * Run once after applying the database migration.
 *
 * Usage:
 *   node scripts/setup-owner.mjs <your-password>
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY to be set in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "..", ".env.local");

function loadEnv(path) {
  const env = {};
  try {
    const lines = readFileSync(path, "utf-8").split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx === -1) continue;
      env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
    }
  } catch {
    console.error("Could not read .env.local — make sure it exists.");
    process.exitCode = 1;
    return null;
  }
  return env;
}

async function main() {
  const env = loadEnv(envPath);
  if (!env) return;

  const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
  const SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
  const AUTH_DOMAIN = env.AUTH_USERNAME_EMAIL_DOMAIN || "users.astrocodestudio.com";

  if (!SUPABASE_URL) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL in .env.local");
    process.exitCode = 1;
    return;
  }
  if (!SERVICE_ROLE_KEY) {
    console.error("Missing SUPABASE_SERVICE_ROLE_KEY in .env.local");
    console.error("Get it from: Supabase dashboard > Settings > API > service_role (secret) key");
    process.exitCode = 1;
    return;
  }

  const password = process.argv[2];
  if (!password || password.length < 8) {
    console.error("Usage: node scripts/setup-owner.mjs <password>");
    console.error("Password must be at least 8 characters.");
    process.exitCode = 1;
    return;
  }

  const USERNAME = "admin";
  const FULL_NAME = "Howard Duffus";
  const EMAIL = `${USERNAME}@${AUTH_DOMAIN}`;

  console.log(`\nConnecting to: ${SUPABASE_URL}`);
  console.log(`Key starts with: ${SERVICE_ROLE_KEY.slice(0, 20)}...`);
  console.log(`\nSetting up owner account...`);
  console.log(`  Username : ${USERNAME}`);
  console.log(`  Email    : ${EMAIL}`);
  console.log(`  Role     : OWNER\n`);

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: createData, error: createError } = await supabase.auth.admin.createUser({
    email: EMAIL,
    password,
    email_confirm: true,
  });

  let userId = createData?.user?.id;

  if (createError) {
    const msg = createError.message || "";
    const code = createError.code || createError.__isAuthError;
    const status = createError.status;

    console.error("Auth creation failed:");
    console.error("  message :", msg || "(none)");
    console.error("  code    :", code || "(none)");
    console.error("  status  :", status || "(none)");
    console.error("  raw     :", JSON.stringify(createError));

    if (status === 401 || msg.toLowerCase().includes("invalid") || msg.toLowerCase().includes("unauthorized")) {
      console.error("\nThe service_role key looks wrong. Make sure you copied the 'service_role' key");
      console.error("(not the anon key) from Supabase > Settings > API > Project API keys.");
      process.exitCode = 1;
      return;
    }

    if (msg.toLowerCase().includes("already been registered") || createError.code === "email_exists") {
      console.log("Auth user already exists — updating password...");
      const { data: listData, error: listErr } = await supabase.auth.admin.listUsers({ perPage: 1000 });
      if (listErr) {
        console.error("Could not list users:", listErr.message, JSON.stringify(listErr));
        process.exitCode = 1;
        return;
      }
      const existing = listData?.users?.find((u) => u.email === EMAIL);
      if (!existing) {
        console.error("Could not locate existing user in list.");
        process.exitCode = 1;
        return;
      }
      userId = existing.id;
      const { error: updateError } = await supabase.auth.admin.updateUserById(userId, { password });
      if (updateError) {
        console.error("Could not update password:", updateError.message);
        process.exitCode = 1;
        return;
      }
      console.log("Password updated.");
    } else {
      process.exitCode = 1;
      return;
    }
  }

  if (!userId) {
    const { data: listData } = await supabase.auth.admin.listUsers({ perPage: 1000 });
    userId = listData?.users?.find((u) => u.email === EMAIL)?.id;
  }

  if (!userId) {
    console.error("Could not determine user ID after auth step.");
    process.exitCode = 1;
    return;
  }

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: userId,
      username: USERNAME,
      full_name: FULL_NAME,
      role: "OWNER",
      status: "active",
    },
    { onConflict: "id" }
  );

  if (profileError) {
    console.error("Profile upsert failed:", profileError.message);
    console.error("Make sure the migration in supabase/migrations/0001_astrocode_backend_foundation.sql has been run.");
    process.exitCode = 1;
    return;
  }

  console.log("Owner account ready!\n");
  console.log(`  Login URL : /login`);
  console.log(`  Username  : ${USERNAME}`);
  console.log(`  Password  : (what you passed to this script)\n`);
}

main();
