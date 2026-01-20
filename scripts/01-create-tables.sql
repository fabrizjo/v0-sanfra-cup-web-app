-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create players table
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  jersey_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, jersey_number)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_players_team_id ON players(team_id);

-- Enable Row Level Security
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Allow public to insert teams and players (for registration)
CREATE POLICY "Allow public registration" ON teams
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to insert players" ON players
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow authenticated users (admins) to read everything
CREATE POLICY "Allow authenticated read teams" ON teams
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read players" ON players
  FOR SELECT TO authenticated
  USING (true);
