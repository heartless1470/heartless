# AstroCode Backend Setup Guide

## Phase 1: Foundation (✅ Complete)

This is the first phase of building the AstroCode backend system. All core functionality for managing leads, employees, and commissions is in place.

### What's Been Built

#### 1. **Database Schema** (`SQL_SCHEMA.sql`)
Complete Supabase database schema with:
- `profiles` - User accounts with roles (OWNER, ADMIN, EMPLOYEE)
- `employees` - Employee profiles with commission tracking
- `leads` - Lead management with status workflow
- `lead_notes` - Notes/comments on leads
- `clients` - Converted clients from leads
- `projects` - Client projects
- `project_sections` - Project phases/milestones
- `quotes` - Quote builder
- `quote_items` - Quote line items
- `invoices` - Invoice management
- `invoice_items` - Invoice line items
- `commissions` - Employee commission tracking
- `activity_log` - Audit trail of all actions
- `files` - File uploads for projects/clients

**Row-Level Security (RLS)** implemented:
- Employees see only their own leads and commissions
- Admins/Owners see all data
- Activity log visible only to admins/owners

#### 2. **Dashboard** (`/dashboard`)
- **Owner/Admin Dashboard** - Shows:
  - New Leads (clickable → leads review)
  - Active Projects (clickable → projects)
  - Pending Quotes (clickable → quotes)
  - Unpaid Invoices (clickable → invoices)
  - Monthly Revenue, Commission Owed
  - Total Clients
  - Recent Activity feed

- **Employee Dashboard** - Shows:
  - My Leads submitted
  - Converted Clients
  - Pending Commission
  - Paid Commission
  - Quick actions for adding leads

#### 3. **Leads Management** (`/dashboard/leads`)
- **List View** - Table with:
  - Business Name, Contact Person, Email, Phone
  - Status badges (new, contacted, reviewing, quoted, converted, rejected)
  - Filter by status
  - Edit/view actions

- **Lead Detail Page** (`/dashboard/leads/[id]`)
  - Full lead information
  - Contact methods (clickable email/phone)
  - Employee who brought the lead
  - **Actions:**
    - Update status (new → contacted → reviewing → quoted)
    - Create Quote
    - Convert to Client (creates commission automatically!)
    - Reject Lead
    - Add Notes with full history

- **Add Lead Form** - Employees/Admin can submit:
  - Contact Person (required)
  - Business Name, Type
  - Phone, Email
  - Initial Notes

#### 4. **Clients Page** (`/dashboard/clients`)
- List of all converted clients
- Business name, contact, email, status
- Click to view client detail (page to be built)

#### 5. **Commissions System** (`/dashboard/commissions`)

**Commission Rules:**
- $100 per converted lead (once payment confirmed)
- Automatically created when lead converts to client
- Status workflow: pending → approved → paid

**Employee View:**
- See their own commissions
- Filter by status
- Summary: Total Earned, Paid, Pending Approval, Approved Not Paid

**Admin/Owner View:**
- See all commissions by all employees
- Approve pending commissions
- Mark commissions as paid
- Filter by status
- Generate payment reports

#### 6. **Activity Logging**
Every action is automatically logged:
- Lead created, updated, converted
- Client created
- Commission created, approved, paid
- Who did it, when, entity details
- Activity feed on dashboard (10 most recent)

#### 7. **Styling**
Complete responsive design with:
- Dashboard card layout
- Leads table with status badges
- Commission tracking tables
- Activity feed styling
- Mobile-optimized layouts
- Dark theme matching AstroCode branding

### Utility Functions

#### Database Queries (`lib/db/queries.ts`)
```typescript
getDashboardStatsOwner()          // Owner dashboard numbers
getDashboardStatsEmployee()        // Employee dashboard numbers
getRecentLeads()                   // For dashboard feed
getRecentActivity()                // Activity log feed
getLeads()                         // List leads with filters
getLeadDetail()                    // Full lead info + notes
getEmployees()                     // List all employees
getEmployeeDetail()                // Employee stats
getClients()                       // List clients
getClientDetail()                  // Client full view
```

#### Activity Logging (`lib/utils/activity.ts`)
```typescript
logActivity()                      // Generic activity logger
logLeadActivity()                  // Lead-specific logging
logClientActivity()                // Client-specific logging
logCommissionActivity()            // Commission-specific logging
```

#### Commission Management (`lib/utils/commission.ts`)
```typescript
createCommissionForConvertedLead() // Auto-create on conversion
approveCommission()                // Admin approves
markCommissionAsPaid()             // Admin marks paid
cancelCommission()                 // Admin cancels
getEmployeeCommissionSummary()    // Get totals for employee
getPendingCommissions()            // For approval page
```

### File Structure

```
src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx                    # Main dashboard
│   │   ├── leads/
│   │   │   ├── page.tsx               # Leads list
│   │   │   ├── actions.ts             # Leads actions
│   │   │   └── [id]/
│   │   │       ├── page.tsx           # Lead detail
│   │   │       └── actions.ts         # Lead detail actions
│   │   ├── clients/
│   │   │   └── page.tsx               # Clients list
│   │   ├── commissions/
│   │   │   ├── page.tsx               # Commissions view
│   │   │   └── actions.ts             # Commission actions
│   │   └── layout.tsx
│   └── globals.css                     # All styling
├── lib/
│   ├── db/
│   │   └── queries.ts                 # Database queries
│   ├── utils/
│   │   ├── activity.ts               # Activity logging
│   │   └── commission.ts             # Commission logic
│   └── supabase/
│       ├── server.ts                 # Server client
│       └── admin.ts                  # Admin client
└── components/
    └── portal/
        ├── DashboardCards.tsx        # Dashboard components
        └── LeadsTable.tsx            # Leads table component
```

## Setup Instructions

### 1. Initialize Database

1. Go to your Supabase project dashboard
2. Open SQL Editor
3. Copy the entire contents of `SQL_SCHEMA.sql`
4. Paste into the SQL editor
5. Run the query

This creates:
- All tables with proper relationships
- RLS policies for security
- Useful views for dashboards

### 2. Update Environment Variables

In `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
AUTH_USERNAME_EMAIL_DOMAIN=users.astrocodestudio.com
```

### 3. Create Initial Users

Use the Supabase Auth UI or run the setup script:
```bash
node scripts/setup-owner.mjs admin1470
```

This creates an OWNER account that can manage everything.

### 4. Create Employees

In `/dashboard/employees`:
- Owner creates employee accounts
- Set username, full name, phone, role (EMPLOYEE or ADMIN)
- Employee gets login credentials

## Testing the System

### Owner Flow
1. Go to `/dashboard` - See dashboard cards
2. Click "Review" on "New Leads" → See leads
3. Click any lead → Add notes, update status, convert to client
4. Converting lead creates $100 commission automatically
5. Go to `/dashboard/commissions` → See all commissions
6. Approve and mark as paid

### Employee Flow
1. Go to `/dashboard` - See personal stats
2. Click "Add Lead" or go to `/dashboard/leads`
3. Submit lead form
4. Lead appears in admin's queue
5. Admin converts it to client
6. Commission created automatically
7. Go to `/dashboard/commissions` - See earned commission

## Next Phase: To Be Built

### 8. Employee Detail Page (`/admin/employees/[id]`)
- Employee info, hire date, commission rate
- Stats: leads submitted, converted, commission earned/paid
- Actions: suspend, reactivate, view their leads

### 9. Client Detail Page (`/admin/clients/[id]`)
- Business info, contact details
- Projects list, invoices, quotes
- Actions: create project, create quote, upload file, add note

### 10. Projects (`/admin/projects/[id]`)
- Select package (Landing, Website, Dashboard, CMS, etc.)
- Track status (pending, in-progress, needs-review, completed)
- Project sections with individual status
- Progress tracking, files, notes, timeline

### 11. Quotes Builder (`/admin/quotes/new`)
- Select from: Landing page, Website, Dashboard, CMS, SEO, Animations, Maintenance
- Calculate pricing based on packages
- Generate PDF, send email, convert to project
- Track acceptance/rejection

### 12. Invoices (`/admin/invoices`)
- Create from quotes or manual
- Track payments: paid, partially-paid, overdue
- Generate PDF, send email reminder
- Mark as paid to trigger commission

### 13. Settings (`/admin/settings`)
- Configure commission amounts
- Email templates
- Notification preferences
- User management

### 14. Email Integration
- Welcome emails for new employees
- Lead converted notifications
- Commission approval/payment notifications
- Invoice reminders
- Quote follow-ups

### 15. PDF Generation
- Quote PDFs
- Invoice PDFs
- Commission reports

## Key Features Built

✅ **Lead Management Workflow**
- Submit → Review → Quote → Convert to Client → Pay Invoice → Commission

✅ **Commission Automation**
- Automatic creation on lead conversion
- Track earned, pending approval, approved not paid, paid
- Admin approval and payment workflow

✅ **Activity Audit Trail**
- Every action logged with user and timestamp
- Visible in activity feed for accountability

✅ **Role-Based Access**
- Employees see only their leads/commissions
- Admins/Owners see everything
- RLS enforced at database level

✅ **Responsive Design**
- Works on desktop, tablet, mobile
- Dark theme matching brand
- Accessible typography and spacing

## Performance Notes

- Queries use proper indexing (see SQL_SCHEMA.sql)
- RLS policies prevent unauthorized access at database level
- Server-side rendering for fast page loads
- Form actions use server actions for security
- Activity log can be archived/deleted in production

## Security

- ✅ RLS policies on all tables
- ✅ Server-side validation
- ✅ User must be authenticated
- ✅ Activity logged for compliance
- ✅ Employees can't see other employees' data
- ✅ Service role key not exposed to client

## Support

The system is built to scale:
- Add more package types in quotes
- Add more project sections
- Extend activity log with more entity types
- Add email templates/sending
- Add payment processing integration
- Add file storage for uploaded documents
