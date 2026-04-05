-- Create the 'receipts' storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('receipts', 'receipts', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for receipt upload
CREATE POLICY "Allow public upload for receipts" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'receipts');

CREATE POLICY "Allow public view for receipts" ON storage.objects
  FOR SELECT USING (bucket_id = 'receipts');
