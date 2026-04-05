-- Add contact fields to subscriptions for checkout identification
ALTER TABLE public.subscriptions 
  ADD COLUMN IF NOT EXISTS user_name TEXT,
  ADD COLUMN IF NOT EXISTS user_email TEXT,
  ADD COLUMN IF NOT EXISTS user_phone TEXT;

-- Update RLS if needed (Admin already has ALL access as per previous migration)
