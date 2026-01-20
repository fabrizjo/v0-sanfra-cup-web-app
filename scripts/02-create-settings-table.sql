-- Create settings table for tournament configuration
CREATE TABLE IF NOT EXISTS tournament_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT NOT NULL UNIQUE,
  setting_value BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO tournament_settings (setting_key, setting_value)
VALUES ('registrations_open', false)
ON CONFLICT (setting_key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE tournament_settings ENABLE ROW LEVEL SECURITY;

-- Allow public to read settings
CREATE POLICY "Allow public to read settings" ON tournament_settings
  FOR SELECT TO anon
  USING (true);

-- Allow authenticated users (admins) to read settings
CREATE POLICY "Allow authenticated read settings" ON tournament_settings
  FOR SELECT TO authenticated
  USING (true);

-- Allow authenticated users (admins) to update settings
CREATE POLICY "Allow authenticated update settings" ON tournament_settings
  FOR UPDATE TO authenticated
  USING (true);
