-- ============================================================================
-- AstroCode Backend Database Schema
-- ============================================================================
-- This SQL script creates all necessary tables for the AstroCode backend system
-- Execute this in your Supabase SQL editor

-- ============================================================================
-- 1. EXTENSIONS
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 2. PROFILES TABLE (already exists via Supabase Auth)
-- ============================================================================
-- Modify existing profiles table to add necessary columns
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'EMPLOYEE' CHECK (role IN ('OWNER', 'ADMIN', 'EMPLOYEE'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT now();

-- ============================================================================
-- 3. EMPLOYEES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  hire_date DATE DEFAULT CURRENT_DATE,
  commission_rate NUMERIC DEFAULT 100, -- Amount per converted client
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_employees_user_id ON public.employees(user_id);

-- ============================================================================
-- 4. LEADS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES public.employees(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  business_name TEXT,
  phone TEXT,
  email TEXT,
  business_type TEXT,
  notes TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'reviewing', 'quoted', 'rejected', 'converted')),
  follow_up_date DATE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_employee_id ON public.leads(employee_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);

-- ============================================================================
-- 5. LEAD NOTES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.lead_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON public.lead_notes(lead_id);

-- ============================================================================
-- 6. CLIENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  referred_by_employee UUID REFERENCES public.employees(id) ON DELETE SET NULL,
  business_name TEXT NOT NULL,
  contact_person TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on-hold')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_clients_lead_id ON public.clients(lead_id);
CREATE INDEX IF NOT EXISTS idx_clients_referred_by ON public.clients(referred_by_employee);

-- ============================================================================
-- 7. PROJECTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  package TEXT NOT NULL, -- 'landing', 'website', 'dashboard', 'cms', etc.
  price NUMERIC NOT NULL DEFAULT 0,
  deposit NUMERIC DEFAULT 0,
  balance NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'needs-review', 'completed')),
  progress_percentage INTEGER DEFAULT 0,
  started_date DATE,
  due_date DATE,
  completed_date DATE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_projects_client_id ON public.projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);

-- ============================================================================
-- 8. PROJECT SECTIONS TABLE (phases/milestones)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.project_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  section_name TEXT NOT NULL, -- 'Discovery', 'Homepage', 'Services Page', etc.
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'needs-review', 'completed')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_project_sections_project_id ON public.project_sections(project_id);

-- ============================================================================
-- 9. QUOTES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  quote_number TEXT UNIQUE,
  package TEXT NOT NULL, -- Selected package type
  subtotal NUMERIC NOT NULL DEFAULT 0,
  tax NUMERIC DEFAULT 0,
  total NUMERIC NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected')),
  sent_date TIMESTAMP,
  accepted_date TIMESTAMP,
  rejected_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quotes_client_id ON public.quotes(client_id);
CREATE INDEX IF NOT EXISTS idx_quotes_project_id ON public.quotes(project_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON public.quotes(status);

-- ============================================================================
-- 10. QUOTE ITEMS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.quote_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity NUMERIC DEFAULT 1,
  unit_price NUMERIC NOT NULL,
  amount NUMERIC NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quote_items_quote_id ON public.quote_items(quote_id);

-- ============================================================================
-- 11. INVOICES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  invoice_number TEXT UNIQUE,
  subtotal NUMERIC NOT NULL DEFAULT 0,
  tax NUMERIC DEFAULT 0,
  total NUMERIC NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'partially-paid', 'overdue')),
  sent_date TIMESTAMP,
  due_date DATE,
  paid_date TIMESTAMP,
  amount_paid NUMERIC DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON public.invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_project_id ON public.invoices(project_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);

-- ============================================================================
-- 12. INVOICE ITEMS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.invoice_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity NUMERIC DEFAULT 1,
  unit_price NUMERIC NOT NULL,
  amount NUMERIC NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_id ON public.invoice_items(invoice_id);

-- ============================================================================
-- 13. COMMISSIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.commissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  amount NUMERIC NOT NULL DEFAULT 100,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'cancelled')),
  earned_date DATE DEFAULT CURRENT_DATE,
  paid_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_commissions_employee_id ON public.commissions(employee_id);
CREATE INDEX IF NOT EXISTS idx_commissions_client_id ON public.commissions(client_id);
CREATE INDEX IF NOT EXISTS idx_commissions_status ON public.commissions(status);

-- ============================================================================
-- 14. ACTIVITY LOG TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL, -- 'lead', 'client', 'project', 'invoice', 'commission', etc.
  entity_id UUID,
  description TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON public.activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_entity ON public.activity_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON public.activity_log(created_at);

-- ============================================================================
-- 15. FILES TABLE (for document uploads)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL, -- 'client', 'project', 'invoice', etc.
  entity_id UUID NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT,
  file_path TEXT NOT NULL,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_files_entity ON public.files(entity_type, entity_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Helper: is the current user an OWNER or ADMIN?
-- (auth.jwt() ->> 'user_role' is never populated anywhere in this project -
-- there is no custom access token hook syncing profiles.role into the JWT -
-- so policies must check the profiles table directly instead.)
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

-- Employees can only see their own data
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can view their own record"
  ON public.employees FOR SELECT
  USING (user_id = auth.uid() OR public.is_owner_or_admin());

CREATE POLICY "Owners and admins can view all employees"
  ON public.employees FOR SELECT
  USING (public.is_owner_or_admin());

-- Leads - Employees see only their leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can view their own leads"
  ON public.leads FOR SELECT
  USING (
    employee_id = (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR public.is_owner_or_admin()
  );

CREATE POLICY "Employees can insert their own leads"
  ON public.leads FOR INSERT
  WITH CHECK (
    employee_id = (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR public.is_owner_or_admin()
  );

-- Clients table
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners and admins can view all clients"
  ON public.clients FOR SELECT
  USING (public.is_owner_or_admin());

-- Commissions - Employees see only their own
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can view their own commissions"
  ON public.commissions FOR SELECT
  USING (
    employee_id = (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR public.is_owner_or_admin()
  );

-- Activity log
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners and admins can view all activity"
  ON public.activity_log FOR SELECT
  USING (public.is_owner_or_admin());

-- ============================================================================
-- HELPFUL VIEWS
-- ============================================================================

-- Dashboard stats for owner
CREATE OR REPLACE VIEW public.dashboard_stats_owner AS
SELECT
  (SELECT COUNT(*) FROM public.clients) as total_clients,
  (SELECT COUNT(*) FROM public.projects WHERE status != 'completed') as active_projects,
  (SELECT COALESCE(SUM(amount_paid), 0) FROM public.invoices WHERE DATE_TRUNC('month', paid_date) = DATE_TRUNC('month', CURRENT_DATE) AND status = 'paid') as monthly_revenue,
  (SELECT COALESCE(SUM(amount), 0) FROM public.commissions WHERE status = 'approved' AND paid_date IS NULL) as commission_owed;

-- Dashboard stats for employee
CREATE OR REPLACE VIEW public.dashboard_stats_employee AS
SELECT
  auth.uid() as user_id,
  (SELECT COUNT(*) FROM public.leads WHERE employee_id = (SELECT id FROM public.employees WHERE user_id = auth.uid())) as my_leads,
  (SELECT COUNT(*) FROM public.clients WHERE referred_by_employee = (SELECT id FROM public.employees WHERE user_id = auth.uid())) as converted_clients,
  (SELECT COALESCE(SUM(amount), 0) FROM public.commissions WHERE employee_id = (SELECT id FROM public.employees WHERE user_id = auth.uid()) AND status IN ('pending', 'approved')) as pending_commission,
  (SELECT COALESCE(SUM(amount), 0) FROM public.commissions WHERE employee_id = (SELECT id FROM public.employees WHERE user_id = auth.uid()) AND status = 'paid') as paid_commission;
