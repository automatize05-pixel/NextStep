-- NextStep V11-Achievements: Gamification Tables
-- Run this in Supabase > SQL Editor

CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,           -- e.g., 'Trophy', 'Star', 'Zap'
  color TEXT NOT NULL,          -- e.g., 'text-yellow-500 bg-yellow-50'
  points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Seed some initial achievements
INSERT INTO public.achievements (code, title, description, icon, color, points) VALUES
('profile_complete', 'Perfil 100%', 'Completou todas as informações básicas do perfil.', 'UserCircle', 'text-blue-500 bg-blue-50', 50),
('first_resume', 'Primeiro Currículo IA', 'Gerou o seu primeiro currículo otimizado com IA.', 'FileText', 'text-purple-500 bg-purple-50', 30),
('first_interview', 'Gelo Quebrado', 'Realizou a sua primeira simulação de entrevista com a IA.', 'MessageSquare', 'text-green-500 bg-green-50', 40),
('five_applications', 'Buscador Activo', 'Registou 5 candidaturas no CRM.', 'Briefcase', 'text-orange-500 bg-orange-50', 50),
('elite_subscriber', 'Membro Premium', 'Fez upgrade para um plano pago na plataforma.', 'Crown', 'text-yellow-600 bg-yellow-100', 100),
('first_job_hunt', 'Job Hunter', 'Usou a IA de pesquisa de vagas pela primeira vez.', 'Search', 'text-indigo-500 bg-indigo-50', 30)
ON CONFLICT (code) DO NOTHING;

-- RLS
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Achievements are viewable by everyone" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Users can view own achievements" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);
