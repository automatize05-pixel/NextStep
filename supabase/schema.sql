-- NextStep Supabase Schema

-- Users table extension (Profiles)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  location TEXT,
  current_level TEXT,
  field_of_interest TEXT,
  main_goal TEXT,
  experience_level TEXT,
  has_resume BOOLEAN DEFAULT FALSE,
  has_portfolio BOOLEAN DEFAULT FALSE,
  bio TEXT,
  title TEXT,
  phone TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Experiences
CREATE TABLE public.experiences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  current BOOLEAN DEFAULT FALSE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Education
CREATE TABLE public.education (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  institution TEXT NOT NULL,
  course TEXT NOT NULL,
  degree TEXT,
  start_date DATE,
  end_date DATE,
  current BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Skills
CREATE TABLE public.skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  level TEXT,
  category TEXT, -- 'technical' or 'soft'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Row Level Security (RLS) Configuration

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update own profile."
  ON public.profiles FOR UPDATE
  USING ( auth.uid() = id );

-- Policies for experiences
CREATE POLICY "Users can manage own experiences."
  ON public.experiences FOR ALL
  USING ( auth.uid() = profile_id );

-- Policies for education
CREATE POLICY "Users can manage own education."
  ON public.education FOR ALL
  USING ( auth.uid() = profile_id );

-- Policies for skills
CREATE POLICY "Users can manage own skills."
  ON public.skills FOR ALL
  USING ( auth.uid() = profile_id );

-- Create trigger for auto updated_at
CREATE OR REPLACE FUNCTION handle_updated_at() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql security definer;

-- Trigger to create profile when auth.user created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- System Settings (Global Governance)
CREATE TABLE public.system_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  maintenance_mode BOOLEAN DEFAULT FALSE,
  daily_ai_limit INTEGER DEFAULT 5,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Initialize global settings
INSERT INTO public.system_settings (id, maintenance_mode, daily_ai_limit)
VALUES (1, FALSE, 10)
ON CONFLICT (id) DO NOTHING;

-- User Usage Tracking (Quotas)
CREATE TABLE public.user_usage (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  action_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_usage ENABLE ROW LEVEL SECURITY;

-- Admin can manage system settings
CREATE POLICY "Admin can manage system settings"
  ON public.system_settings FOR ALL
  USING ( auth.jwt() ->> 'email' = 'automatize05@gmail.com' );

-- Public can read system settings (to check maintenance mode)
CREATE POLICY "Public can read system settings"
  ON public.system_settings FOR SELECT
  USING ( true );

-- Users can see their own usage
CREATE POLICY "Users can see own usage"
  ON public.user_usage FOR SELECT
  USING ( auth.uid() = user_id );
