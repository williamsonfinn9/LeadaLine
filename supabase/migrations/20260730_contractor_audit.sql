-- ============================================================
-- LeadaLine Contractor Enquiry Audit — schema
-- All tables are RLS-enabled with NO policies (deny all).
-- Access happens exclusively through serverless functions using
-- the service role key. Report access is gated by a 256-bit
-- random public_report_token, never by sequential ids.
-- ============================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
create table if not exists public.audit_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  first_name text not null,
  business_name text not null,
  email text not null,
  phone text not null,
  website_url text not null,
  normalised_domain text,
  trade text not null,
  other_trade text,
  service_area text,
  employee_range text,
  monthly_enquiry_range text,
  average_job_value_range text,
  current_crm text,
  booking_system text,
  referral_source text,
  marketing_consent boolean not null default false,
  privacy_consent_timestamp timestamptz,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  referral_code text,
  landing_page text,
  lead_status text not null default 'new',
  audit_score integer,
  internal_fit_score integer,
  internal_fit_label text,
  internal_fit_json jsonb,
  main_pain_point text,
  recommended_sales_angle text,
  notes text
);

create index if not exists audit_leads_email_domain_idx
  on public.audit_leads (email, normalised_domain, created_at desc);
create index if not exists audit_leads_status_idx on public.audit_leads (lead_status);
create index if not exists audit_leads_fit_idx on public.audit_leads (internal_fit_label);
create index if not exists audit_leads_created_idx on public.audit_leads (created_at desc);

-- ------------------------------------------------------------
create table if not exists public.audit_responses (
  id uuid primary key default gen_random_uuid(),
  audit_lead_id uuid not null references public.audit_leads(id) on delete cascade,
  question_key text not null,
  answer_value text not null,
  answer_label text,
  created_at timestamptz not null default now(),
  unique (audit_lead_id, question_key)
);
create index if not exists audit_responses_lead_idx on public.audit_responses (audit_lead_id);

-- ------------------------------------------------------------
create table if not exists public.audit_jobs (
  id uuid primary key default gen_random_uuid(),
  audit_lead_id uuid not null references public.audit_leads(id) on delete cascade,
  status text not null default 'queued'
    check (status in ('queued','running','complete','failed')),
  status_token text not null,
  started_at timestamptz,
  completed_at timestamptz,
  error_code text,
  error_message text,
  retry_count integer not null default 0,
  processing_version text,
  created_at timestamptz not null default now()
);
create index if not exists audit_jobs_lead_idx on public.audit_jobs (audit_lead_id, created_at desc);
create index if not exists audit_jobs_status_idx on public.audit_jobs (status);

-- ------------------------------------------------------------
create table if not exists public.website_observations (
  id uuid primary key default gen_random_uuid(),
  audit_lead_id uuid not null references public.audit_leads(id) on delete cascade,
  observation_key text not null,
  value text,
  evidence text,
  source_url text,
  confidence text,
  checked_at timestamptz not null default now()
);
create index if not exists website_observations_lead_idx on public.website_observations (audit_lead_id);

-- ------------------------------------------------------------
create table if not exists public.audit_reports (
  id uuid primary key default gen_random_uuid(),
  audit_lead_id uuid not null references public.audit_leads(id) on delete cascade,
  public_report_token text not null unique,
  overall_score integer not null,
  enquiry_capture_score integer not null,
  response_availability_score integer not null,
  lead_qualification_score integer not null,
  follow_up_score integer not null,
  visibility_score integer not null,
  overall_confidence text,
  executive_summary text,
  positives_json jsonb,
  gaps_json jsonb,
  unknowns_json jsonb,
  recommendations_json jsonb,
  workflow_json jsonb,
  website_analysed boolean not null default false,
  methodology_version text,
  generated_at timestamptz not null default now()
);
create index if not exists audit_reports_lead_idx on public.audit_reports (audit_lead_id, generated_at desc);

-- ------------------------------------------------------------
create table if not exists public.opportunity_estimates (
  id uuid primary key default gen_random_uuid(),
  audit_lead_id uuid not null references public.audit_leads(id) on delete cascade,
  monthly_enquiries_low numeric,
  monthly_enquiries_high numeric,
  average_job_value_low numeric,
  average_job_value_high numeric,
  exposure_rate_low numeric,
  exposure_rate_high numeric,
  recovery_rate_low numeric,
  recovery_rate_high numeric,
  jobs_recovered_low numeric,
  jobs_recovered_high numeric,
  value_low numeric,
  value_high numeric,
  assumptions_json jsonb,
  user_adjusted boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists opportunity_estimates_lead_idx on public.opportunity_estimates (audit_lead_id, created_at desc);

-- ------------------------------------------------------------
create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  audit_lead_id uuid references public.audit_leads(id) on delete cascade,
  report_id uuid references public.audit_reports(id) on delete set null,
  event_name text not null,
  event_metadata jsonb,
  session_id text,
  created_at timestamptz not null default now()
);
create index if not exists audit_events_lead_idx on public.audit_events (audit_lead_id, created_at desc);
create index if not exists audit_events_name_idx on public.audit_events (event_name, created_at desc);

-- ------------------------------------------------------------
create table if not exists public.audit_bookings (
  id uuid primary key default gen_random_uuid(),
  audit_lead_id uuid not null references public.audit_leads(id) on delete cascade,
  report_id uuid references public.audit_reports(id) on delete set null,
  booking_provider text,
  booking_reference text,
  booking_status text,
  scheduled_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists audit_bookings_lead_idx on public.audit_bookings (audit_lead_id);

-- ------------------------------------------------------------
create table if not exists public.email_preferences (
  id uuid primary key default gen_random_uuid(),
  audit_lead_id uuid not null references public.audit_leads(id) on delete cascade unique,
  transactional_allowed boolean not null default true,
  marketing_allowed boolean not null default false,
  unsubscribed_at timestamptz,
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- updated_at maintenance
create or replace function public.audit_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists audit_leads_touch on public.audit_leads;
create trigger audit_leads_touch before update on public.audit_leads
  for each row execute function public.audit_touch_updated_at();

drop trigger if exists email_preferences_touch on public.email_preferences;
create trigger email_preferences_touch before update on public.email_preferences
  for each row execute function public.audit_touch_updated_at();

-- ------------------------------------------------------------
-- RLS: enable with no policies = deny everything to anon +
-- authenticated. The service role bypasses RLS by design.
alter table public.audit_leads enable row level security;
alter table public.audit_responses enable row level security;
alter table public.audit_jobs enable row level security;
alter table public.website_observations enable row level security;
alter table public.audit_reports enable row level security;
alter table public.opportunity_estimates enable row level security;
alter table public.audit_events enable row level security;
alter table public.audit_bookings enable row level security;
alter table public.email_preferences enable row level security;

-- Retention note: audit_leads carries personal data. A scheduled
-- clean-up (e.g. pg_cron or a Make scenario) should delete leads
-- older than the configured retention period (default 24 months).
-- Deletes cascade to all child tables.
