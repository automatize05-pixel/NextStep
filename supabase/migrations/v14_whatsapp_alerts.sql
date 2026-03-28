-- ============================================================
-- NextStep V14 WhatsApp Alerts Migration
-- Add fields for real-time notifications via WhatsApp
-- ============================================================

-- 1. Add fields to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS phone_number TEXT,
  ADD COLUMN IF NOT EXISTS whatsapp_enabled BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS alert_frequency TEXT DEFAULT 'daily' CHECK (alert_frequency IN ('realtime', 'daily', 'weekly'));

-- 2. Index for phone search (useful for admin nudges)
CREATE INDEX IF NOT EXISTS idx_profiles_phone_number ON public.profiles(phone_number) WHERE phone_number IS NOT NULL;

-- 3. Comments for documentation
COMMENT ON COLUMN public.profiles.phone_number IS 'User WhatsApp contact number';
COMMENT ON COLUMN public.profiles.whatsapp_enabled IS 'Toggle for receiving job alerts and tips via WhatsApp';
COMMENT ON COLUMN public.profiles.alert_frequency IS 'How often the user wants to receive alerts (realtime, daily, weekly)';
