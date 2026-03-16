-- Create fsc_minitorneo table for mini tournament standings
CREATE TABLE IF NOT EXISTS fsc_minitorneo (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_name TEXT NOT NULL,
  points NUMERIC(10,1) DEFAULT 0,
  games_played INTEGER DEFAULT 0,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE fsc_minitorneo ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read minitorneo" ON fsc_minitorneo
  FOR SELECT USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert minitorneo" ON fsc_minitorneo
  FOR INSERT TO authenticated WITH CHECK (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update minitorneo" ON fsc_minitorneo
  FOR UPDATE TO authenticated USING (true);

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated delete minitorneo" ON fsc_minitorneo
  FOR DELETE TO authenticated USING (true);

-- Insert initial data from the screenshot
INSERT INTO fsc_minitorneo (team_name, points, games_played, position) VALUES
  ('Team Barazzo', 162.5, 2, 1),
  ('PIAZZA', 155.5, 2, 2),
  ('AC Vis Nova', 152.5, 2, 3),
  ('GLI INGIOCABILI', 152, 2, 4),
  ('rione carmine Fc', 150.5, 2, 5),
  ('GaldiTeam', 149.5, 2, 6),
  ('FC ODDO VIG', 148.5, 2, 7),
  ('nico o cazz', 148, 2, 8),
  ('Scarsenal', 148, 2, 9),
  ('Ippo Team', 147, 2, 10),
  ('AC PICCHIA', 145.5, 2, 11),
  ('Tonyrm', 145.5, 2, 12);
