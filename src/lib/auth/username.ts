const AUTH_EMAIL_DOMAIN = process.env.AUTH_USERNAME_EMAIL_DOMAIN || "users.astrocodestudio.com";

export function normalizeUsername(username: string) {
  return username.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "");
}

export function usernameToAuthEmail(username: string) {
  const normalized = normalizeUsername(username);

  if (!normalized) {
    throw new Error("Username is required.");
  }

  return `${normalized}@${AUTH_EMAIL_DOMAIN}`;
}
