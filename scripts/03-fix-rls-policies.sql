-- Drop existing policies if they exist (to recreate them)
DROP POLICY IF EXISTS "Allow public registration" ON teams;
DROP POLICY IF EXISTS "Allow public to insert players" ON players;
DROP POLICY IF EXISTS "Allow authenticated read teams" ON teams;
DROP POLICY IF EXISTS "Allow authenticated read players" ON players;

-- Make sure RLS is enabled
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Allow ANYONE (including anonymous users) to insert teams
CREATE POLICY "Allow public registration" ON teams
  FOR INSERT 
  WITH CHECK (true);

-- Allow ANYONE to insert players
CREATE POLICY "Allow public to insert players" ON players
  FOR INSERT 
  WITH CHECK (true);

-- Allow ANYONE to read teams (needed for checking if team name exists)
CREATE POLICY "Allow public read teams" ON teams
  FOR SELECT 
  USING (true);

-- Allow ANYONE to read players
CREATE POLICY "Allow public read players" ON players
  FOR SELECT 
  USING (true);

-- Allow authenticated users to update/delete (for admin)
CREATE POLICY "Allow authenticated update teams" ON teams
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete teams" ON teams
  FOR DELETE TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated update players" ON players
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete players" ON players
  FOR DELETE TO authenticated
  USING (true);
