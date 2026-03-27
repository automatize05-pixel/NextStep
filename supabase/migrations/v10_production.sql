-- ============================================================
-- NextStep V10 Production Migration
-- Run this in Supabase > SQL Editor
-- ============================================================

-- 1. Add plan and username to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS subscription_expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;

-- 2. Subscriptions / Payments table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  plan_type TEXT NOT NULL,
  amount_kz NUMERIC NOT NULL,
  receipt_url TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own subscription"
  ON public.subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can manage all subscriptions"
  ON public.subscriptions FOR ALL
  USING (auth.jwt() ->> 'email' = 'automatize05@gmail.com');

-- 3. Cover Letters table
CREATE TABLE IF NOT EXISTS public.cover_letters (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  job_title TEXT NOT NULL,
  company_name TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cover_letters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own cover letters"
  ON public.cover_letters FOR ALL
  USING (auth.uid() = user_id);

-- 4. Application CRM (Candidaturas)
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  company TEXT NOT NULL,
  job_title TEXT NOT NULL,
  status TEXT DEFAULT 'applied',
  application_date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  job_url TEXT,
  salary_expected NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own applications"
  ON public.applications FOR ALL
  USING (auth.uid() = user_id);

-- 5. Tracks table (migrate from hardcoded)
CREATE TABLE IF NOT EXISTS public.tracks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  level TEXT DEFAULT 'Todos',
  duration TEXT,
  category TEXT,
  modules_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.track_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  track_id UUID REFERENCES public.tracks(id) ON DELETE CASCADE NOT NULL,
  progress_percent INTEGER DEFAULT 0,
  completed_modules INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, track_id)
);

ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.track_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tracks are viewable by all authenticated users"
  ON public.tracks FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage tracks"
  ON public.tracks FOR ALL
  USING (auth.jwt() ->> 'email' = 'automatize05@gmail.com');

CREATE POLICY "Users can manage their own track progress"
  ON public.track_progress FOR ALL
  USING (auth.uid() = user_id);

-- 6. Seed default tracks
INSERT INTO public.tracks (title, description, level, duration, category, modules_count, is_featured, is_premium) VALUES
  ('Primeiro Passo: Mercado de Trabalho', 'Guia definitivo para quem busca o primeiro emprego sem experiência prévia. Documentação, postura e networking.', 'Iniciante', '4h', 'Carreira', 12, true, false),
  ('Masterclass: Entrevistas de Sucesso', 'Aprenda a técnica STAR para responder perguntas comportamentais e domine entrevistas técnicas com confiança.', 'Todos', '3h', 'Soft Skills', 8, false, false),
  ('Transição: Rumo à Tecnologia', 'Mapeamento completo do mercado de TI: Papéis, responsabilidades e trilha de estudos técnica inicial.', 'Intermediário', '10h', 'Tecnologia', 24, false, true),
  ('Liderança e Gestão de Equipas', 'Desenvolva competências de liderança adaptadas ao contexto empresarial angolano, de startups a multinacionais.', 'Avançado', '6h', 'Liderança', 18, false, true)
ON CONFLICT DO NOTHING;

-- 7. Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  metadata JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view all audit logs"
  ON public.audit_logs FOR SELECT
  USING (auth.jwt() ->> 'email' = 'automatize05@gmail.com');

CREATE POLICY "System can insert audit logs"
  ON public.audit_logs FOR INSERT
  WITH CHECK (true);

-- 8. Interview Sessions
CREATE TABLE IF NOT EXISTS public.interview_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  topic TEXT NOT NULL,
  messages JSONB DEFAULT '[]',
  score INTEGER,
  feedback TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.interview_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own interview sessions"
  ON public.interview_sessions FOR ALL
  USING (auth.uid() = user_id);
