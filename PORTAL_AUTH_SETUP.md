# AstroCodes portal authentication setup

The public release contains the client-portal experience and the existing Supabase-backed Studio Dashboard,
but it does not claim client authentication is active until the production identity, invitation, and row-level
authorization flow is configured and tested.

## Product boundaries

- **Client Portal:** separate, invitation-only accounts for clients. Each verified user can access only the
  project records explicitly assigned to that user.
- **Studio Dashboard:** internal founder/studio access for leads, projects, milestones, tasks, files, approvals,
  support requests, and payment status. It is not a client login and must require MFA in production.

## Recommended production flow

1. A studio account creates a client invitation tied to the client’s email address and intended project.
2. The client verifies that address and creates or signs into an individual account.
3. Prefer passwordless passkey sign-in when the selected production auth provider supports it reliably.
   Provide a magic-link or one-time-code fallback.
4. The Studio Dashboard assigns the verified user ID to a project membership.
5. Row-level security authorizes reads and writes through that membership. Merely being authenticated is not
   sufficient authorization.
6. The client can see only their own project, milestones, files, approvals, change requests, updates, support
   requests, and payment-status records.
7. Studio accounts use separate roles and must enroll in MFA before accessing internal project data.

AstroCodes never stores application passwords directly. Password or passwordless credential handling belongs
to the configured identity provider.

## Suggested data model

- `client_profiles`: one row per verified client auth user.
- `projects`: studio-owned project record.
- `project_memberships`: `project_id`, `user_id`, and client role; unique per project/user.
- `milestones`, `project_files`, `approvals`, `change_requests`, `project_updates`, `support_requests`, and
  `payment_status`: each includes `project_id` and is authorized through `project_memberships`.
- Invitations should be short-lived, single-use, tied to email and project, and audited.

Every exposed table requires RLS. Client policies should combine `TO authenticated` with a membership predicate
using `(select auth.uid())`; update policies require both `USING` and `WITH CHECK`. Do not authorize from
user-editable `user_metadata`, and never expose a Supabase service-role key to the browser.

## One-time production setup

1. Configure the production Supabase URL and publishable/anonymous client key in Vercel.
2. Select and configure the production invitation/passwordless auth provider.
3. Create the portal tables through a reviewed migration and explicitly grant Data API access only where needed.
4. Enable and test RLS for two different client accounts to prove cross-client isolation.
5. Configure private file storage policies with the same project-membership boundary.
6. Enforce MFA for Studio Dashboard roles and verify session-expiry/revocation behavior.
7. Add audit logging, recovery procedures, privacy/retention rules, and production monitoring.
8. Only after these checks pass, replace the public access-request state with the live invitation sign-in flow.

Reference the current Supabase Auth and RLS documentation during implementation; the platform changes frequently.
