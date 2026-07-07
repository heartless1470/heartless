-- ============================================================================
-- Add: RLS policies for two new/changed pieces of the app.
-- Run this once in the Supabase SQL editor.
-- ============================================================================

-- 1) Allow owners/admins to delete rejected leads (cleanup action added to
--    the Leads list and lead detail page). Scoped to status = 'rejected' so
--    it can never be used to delete an active lead.
DROP POLICY IF EXISTS "Owners and admins can delete rejected leads" ON public.leads;
CREATE POLICY "Owners and admins can delete rejected leads"
  ON public.leads FOR DELETE
  USING (status = 'rejected' AND public.is_owner_or_admin());

-- 2) The quotes table had no RLS policies at all. Lock it down the same way
--    as clients/commissions - owner/admin only, since quotes carry pricing.
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Owners and admins can view quotes" ON public.quotes;
CREATE POLICY "Owners and admins can view quotes"
  ON public.quotes FOR SELECT
  USING (public.is_owner_or_admin());

DROP POLICY IF EXISTS "Owners and admins can create quotes" ON public.quotes;
CREATE POLICY "Owners and admins can create quotes"
  ON public.quotes FOR INSERT
  WITH CHECK (public.is_owner_or_admin());

DROP POLICY IF EXISTS "Owners and admins can update quotes" ON public.quotes;
CREATE POLICY "Owners and admins can update quotes"
  ON public.quotes FOR UPDATE
  USING (public.is_owner_or_admin());
