-- ============================================================================
-- Fix: RLS policies referenced auth.jwt() ->> 'user_role', a claim that is
-- never set anywhere in this project (no custom access token hook syncs
-- profiles.role into the JWT). This silently blocked OWNER/ADMIN users from
-- inserting/selecting leads (and employees/clients/commissions/activity_log).
-- Run this once in the Supabase SQL editor against the existing database.
-- ============================================================================

-- Ensure activity_log exists (it was missing from the live database,
-- which caused this migration to fail and roll back entirely on first run).
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  description TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON public.activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_entity ON public.activity_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON public.activity_log(created_at);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_owner_or_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('OWNER', 'ADMIN')
  );
$$;

DROP POLICY IF EXISTS "Employees can view their own record" ON public.employees;
CREATE POLICY "Employees can view their own record"
  ON public.employees FOR SELECT
  USING (user_id = auth.uid() OR public.is_owner_or_admin());

DROP POLICY IF EXISTS "Owners and admins can view all employees" ON public.employees;
CREATE POLICY "Owners and admins can view all employees"
  ON public.employees FOR SELECT
  USING (public.is_owner_or_admin());

DROP POLICY IF EXISTS "Employees can view their own leads" ON public.leads;
CREATE POLICY "Employees can view their own leads"
  ON public.leads FOR SELECT
  USING (
    employee_id = (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR public.is_owner_or_admin()
  );

DROP POLICY IF EXISTS "Employees can insert their own leads" ON public.leads;
CREATE POLICY "Employees can insert their own leads"
  ON public.leads FOR INSERT
  WITH CHECK (
    employee_id = (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR public.is_owner_or_admin()
  );

DROP POLICY IF EXISTS "Owners and admins can view all clients" ON public.clients;
CREATE POLICY "Owners and admins can view all clients"
  ON public.clients FOR SELECT
  USING (public.is_owner_or_admin());

DROP POLICY IF EXISTS "Employees can view their own commissions" ON public.commissions;
CREATE POLICY "Employees can view their own commissions"
  ON public.commissions FOR SELECT
  USING (
    employee_id = (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR public.is_owner_or_admin()
  );

DROP POLICY IF EXISTS "Owners and admins can view all activity" ON public.activity_log;
CREATE POLICY "Owners and admins can view all activity"
  ON public.activity_log FOR SELECT
  USING (public.is_owner_or_admin());
