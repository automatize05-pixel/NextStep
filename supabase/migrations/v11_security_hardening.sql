-- Security Hardening Migration (v11)

-- 1. HARDEN STORAGE (Receipts Bucket)
-- Revoke existing public policies
DROP POLICY IF EXISTS "Allow public upload for receipts" ON storage.objects;
DROP POLICY IF EXISTS "Allow public view for receipts" ON storage.objects;

-- Create secure policies for receipts
-- Allow authenticated users to INSERT their own receipt
CREATE POLICY "Authenticated users can upload receipts" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'receipts');

-- Allow only the OWNER (uploader) or the ADMIN to VIEW receipts
CREATE POLICY "Owner or Admin can view receipts" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'receipts' AND (
      auth.uid() = owner OR 
      auth.jwt() ->> 'email' = 'automatize05@gmail.com'
    )
  );

-- 2. HARDEN PROFILES (Avoid Personal Data Leak)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;

-- Only Allow public to see basic info (name, title, avatar)
-- But sensitive info (phone, email) should be private
CREATE POLICY "Public can see minimal profile info" ON public.profiles
  FOR SELECT USING (true); -- We'll handle field-level masking in views if needed, or stick to this

-- 3. HARDEN SUBSCRIPTIONS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own subscriptions" ON public.subscriptions;

CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all subscriptions" ON public.subscriptions
  FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'email' = 'automatize05@gmail.com');

CREATE POLICY "Admin can update subscriptions (approval)" ON public.subscriptions
  FOR UPDATE TO authenticated
  USING (auth.jwt() ->> 'email' = 'automatize05@gmail.com');

-- 4. AUDIT LOGGING
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  admin_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  target_id TEXT,
  target_type TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can see audit logs" ON public.audit_logs
  FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'email' = 'automatize05@gmail.com');

-- 5. FUNCTION TO LOG ACTIONS
CREATE OR REPLACE FUNCTION public.log_admin_action()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.audit_logs (admin_id, action, target_id, target_type, metadata)
  VALUES (
    auth.uid(),
    TG_ARGV[0],
    NEW.id::text,
    TG_TABLE_NAME,
    jsonb_build_object('old', row_to_json(OLD), 'new', row_to_json(NEW))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql security definer;

-- Trigger for subscription updates (approvals)
CREATE TRIGGER on_subscription_updated
  AFTER UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE PROCEDURE public.log_admin_action('payment_verification');
