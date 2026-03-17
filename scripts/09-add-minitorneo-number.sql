-- Add a text value column to tournament_settings for storing string/number values
ALTER TABLE tournament_settings ADD COLUMN IF NOT EXISTS setting_value_text TEXT;

-- Insert the minitorneo number setting (default to 6)
INSERT INTO tournament_settings (setting_key, setting_value, setting_value_text)
VALUES ('minitorneo_number', false, '6')
ON CONFLICT (setting_key) DO UPDATE SET setting_value_text = '6';
