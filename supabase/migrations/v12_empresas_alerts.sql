-- NextStep V12-Infrastructure: B2B Leads and Job Alerts
-- Run this in Supabase > SQL Editor

CREATE TABLE IF NOT EXISTS public.company_leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  interest TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.job_alerts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role_title TEXT NOT NULL,
  location TEXT,
  frequency TEXT DEFAULT 'daily',    -- 'daily', 'weekly'
  active BOOLEAN DEFAULT true,
  last_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.company_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_alerts ENABLE ROW LEVEL SECURITY;

-- Leads can be inserted by anon (landing page form)
CREATE POLICY "Anyone can insert company leads" ON public.company_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Only admins can view company leads" ON public.company_leads FOR SELECT USING (auth.jwt() ->> 'email' = 'automatize05@gmail.com');

-- Job alerts managed by users
CREATE POLICY "Users can manage own job alerts" ON public.job_alerts
  FOR ALL USING (auth.uid() = user_id);
