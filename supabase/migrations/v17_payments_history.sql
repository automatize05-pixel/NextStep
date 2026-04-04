-- Migration: payments_history table
-- Tracks all subscription purchases/upgrades for revenue reporting

CREATE TABLE IF NOT EXISTS payments_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_id text NOT NULL,              -- 'starter' | 'essential' | 'premium' | 'elite'
  plan_name text NOT NULL,            -- Human readable: 'Primeiro Passo', 'Aceleração Total', etc.
  amount integer NOT NULL,            -- Amount in Kz (e.g. 8500)
  currency text DEFAULT 'AOA',        -- Angola Kwanza
  status text DEFAULT 'active',       -- 'active' | 'cancelled' | 'refunded'
  payment_method text,                -- 'multicaixa' | 'transferencia' | 'outros'
  created_at timestamptz DEFAULT now() NOT NULL,
  cancelled_at timestamptz
);

-- RLS Policies
ALTER TABLE payments_history ENABLE ROW LEVEL SECURITY;

-- Users can see only their own payment history
CREATE POLICY "Users can view own payments"
  ON payments_history FOR SELECT
  USING (auth.uid() = user_id);

-- Only authenticated users can insert (usually done server-side)
CREATE POLICY "Server can insert payments"
  ON payments_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admin view (for the admin panel): a helper function
CREATE OR REPLACE FUNCTION get_payments_summary()
RETURNS TABLE (
  month text,
  total_revenue bigint,
  total_count bigint
) 
LANGUAGE sql SECURITY DEFINER AS $$
  SELECT 
    to_char(date_trunc('month', created_at), 'Mon YYYY') as month,
    sum(amount) as total_revenue,
    count(*) as total_count
  FROM payments_history
  WHERE status = 'active'
  GROUP BY date_trunc('month', created_at)
  ORDER BY date_trunc('month', created_at) ASC
  LIMIT 12;
$$;

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments_history(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payments_plan_id ON payments_history(plan_id);
