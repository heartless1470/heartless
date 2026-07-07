-- ============================================================================
-- Add: lead_notes table, referenced by the Lead Detail "Notes & Activity"
-- section (add note / list notes), but never actually created in the live
-- database. Purely additive - does not touch any existing table or data.
-- Run this once in the Supabase SQL editor.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.lead_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON public.lead_notes(lead_id);

ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;

-- Reuses is_owner_or_admin(), added by supabase_fix_rls_policies.sql
DROP POLICY IF EXISTS "Users can view notes on leads they can view" ON public.lead_notes;
CREATE POLICY "Users can view notes on leads they can view"
  ON public.lead_notes FOR SELECT
  USING (
    public.is_owner_or_admin()
    OR EXISTS (
      SELECT 1 FROM public.leads l
      JOIN public.employees e ON e.id = l.employee_id
      WHERE l.id = lead_notes.lead_id AND e.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can add notes on leads they can view" ON public.lead_notes;
CREATE POLICY "Users can add notes on leads they can view"
  ON public.lead_notes FOR INSERT
  WITH CHECK (
    created_by = auth.uid()
    AND (
      public.is_owner_or_admin()
      OR EXISTS (
        SELECT 1 FROM public.leads l
        JOIN public.employees e ON e.id = l.employee_id
        WHERE l.id = lead_notes.lead_id AND e.user_id = auth.uid()
      )
    )
  );
