-- Add sport column to teams table
ALTER TABLE teams ADD COLUMN IF NOT EXISTS sport text DEFAULT 'calcio';

-- Update existing teams to be 'calcio' by default
UPDATE teams SET sport = 'calcio' WHERE sport IS NULL;

-- Add constraint to ensure valid sport values
ALTER TABLE teams ADD CONSTRAINT valid_sport CHECK (sport IN ('calcio', 'volley'));

-- Add separate registration settings for calcio and volley
INSERT INTO tournament_settings (id, setting_key, setting_value, updated_at)
VALUES 
  (gen_random_uuid(), 'registrations_open_calcio', true, now()),
  (gen_random_uuid(), 'registrations_open_volley', true, now())
ON CONFLICT (setting_key) DO NOTHING;

-- Optionally remove the old general setting or keep it for backwards compatibility
-- DELETE FROM tournament_settings WHERE setting_key = 'registrations_open';
