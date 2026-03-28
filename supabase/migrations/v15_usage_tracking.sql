-- ============================================================
-- V15: Usage Tracking for AI Gating
-- ============================================================

CREATE TABLE IF NOT EXISTS public.usage_tracking (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  feature_key TEXT NOT NULL, -- 'ai_test', 'cv_gen', 'interview_sim', 'job_match'
  usage_count INTEGER DEFAULT 0,
  last_used TIMESTAMPTZ DEFAULT NOW(),
  daily_reset_at TIMESTAMPTZ DEFAULT (CURRENT_DATE + INTERVAL '1 day'),
  UNIQUE(user_id, feature_key)
);

ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own usage"
  ON public.usage_tracking FOR SELECT
  USING (auth.uid() = user_id);

-- Function to increment usage safely
CREATE OR REPLACE FUNCTION public.increment_usage(u_id UUID, f_key TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.usage_tracking (user_id, feature_key, usage_count, last_used)
  VALUES (u_id, f_key, 1, NOW())
  ON CONFLICT (user_id, feature_key)
  DO UPDATE SET 
    usage_count = CASE 
      WHEN public.usage_tracking.daily_reset_at < NOW() THEN 1 
      ELSE public.usage_tracking.usage_count + 1 
    END,
    daily_reset_at = CASE 
      WHEN public.usage_tracking.daily_reset_at < NOW() THEN (CURRENT_DATE + INTERVAL '1 day')
      ELSE public.usage_tracking.daily_reset_at
    END,
    last_used = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
