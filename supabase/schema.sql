-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users (just two family members)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  diet_description TEXT NOT NULL DEFAULT 'No junk food',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed the two users
INSERT INTO users (name, diet_description) VALUES
  ('Dad', 'No junk food'),
  ('Son', 'No junk food')
ON CONFLICT (name) DO NOTHING;

-- Daily progress logs
CREATE TABLE IF NOT EXISTS daily_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  exercise_done BOOLEAN NOT NULL DEFAULT FALSE,
  mindfulness_type TEXT CHECK (mindfulness_type IN ('reading', 'meditation')),
  mindfulness_done BOOLEAN NOT NULL DEFAULT FALSE,
  water_done BOOLEAN NOT NULL DEFAULT FALSE,
  diet_done BOOLEAN NOT NULL DEFAULT FALSE,
  journal_entry TEXT NOT NULL DEFAULT '',
  is_complete BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT daily_logs_user_date_unique UNIQUE (user_id, log_date)
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER daily_logs_updated_at
  BEFORE UPDATE ON daily_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Index for fast user+date queries
CREATE INDEX IF NOT EXISTS idx_daily_logs_user_date ON daily_logs (user_id, log_date DESC);
