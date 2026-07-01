-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  native_language TEXT DEFAULT 'fr',
  target_level TEXT DEFAULT 'A1',
  daily_goal_minutes INT DEFAULT 15,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Lessons
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  level TEXT NOT NULL,
  order_index INT NOT NULL,
  estimated_minutes INT,
  prerequisites UUID[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read lessons" ON lessons FOR SELECT USING (true);

-- Units
CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  content JSONB,
  order_index INT NOT NULL
);
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read units" ON units FOR SELECT USING (true);

-- Vocabulary
CREATE TABLE vocabulary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  georgian TEXT NOT NULL,
  transliteration TEXT NOT NULL,
  french TEXT NOT NULL,
  audio_url TEXT,
  image_url TEXT,
  category TEXT,
  difficulty INT DEFAULT 1,
  tags TEXT[]
);
CREATE INDEX idx_vocab_lesson ON vocabulary(lesson_id);
CREATE INDEX idx_vocab_difficulty ON vocabulary(difficulty);
ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read vocabulary" ON vocabulary FOR SELECT USING (true);

-- SRS Cards
CREATE TABLE srs_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  vocabulary_id UUID REFERENCES vocabulary(id) ON DELETE CASCADE,
  ease_factor FLOAT DEFAULT 2.5,
  interval_days INT DEFAULT 0,
  repetitions INT DEFAULT 0,
  next_review DATE DEFAULT CURRENT_DATE,
  last_reviewed TIMESTAMPTZ,
  status TEXT DEFAULT 'new' CHECK (status IN ('new','learning','review','mastered')),
  UNIQUE(user_id, vocabulary_id)
);
CREATE INDEX idx_srs_user_review ON srs_cards(user_id, next_review);
CREATE INDEX idx_srs_status ON srs_cards(status);
ALTER TABLE srs_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own SRS cards" ON srs_cards FOR ALL USING (auth.uid() = user_id);

-- Sessions
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  duration_seconds INT DEFAULT 0,
  exercises_completed INT DEFAULT 0,
  exercises_correct INT DEFAULT 0,
  lesson_ids UUID[],
  status TEXT DEFAULT 'active' CHECK (status IN ('active','paused','completed','abandoned'))
);
CREATE INDEX idx_sessions_user ON sessions(user_id, started_at DESC);
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own sessions" ON sessions FOR ALL USING (auth.uid() = user_id);

-- Exercises
CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  question JSONB NOT NULL,
  correct_answer JSONB NOT NULL,
  difficulty INT DEFAULT 1,
  hints JSONB,
  max_attempts INT DEFAULT 3
);
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read exercises" ON exercises FOR SELECT USING (true);

-- Session Exercises
CREATE TABLE session_exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  exercise_id UUID REFERENCES exercises(id) ON DELETE SET NULL,
  user_answer JSONB,
  is_correct BOOLEAN,
  time_spent_seconds INT,
  attempts INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE session_exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own session exercises" ON session_exercises FOR ALL USING (
  EXISTS (SELECT 1 FROM sessions s WHERE s.id = session_exercises.session_id AND s.user_id = auth.uid())
);

-- Pronunciation Attempts
CREATE TABLE pronunciation_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  vocabulary_id UUID REFERENCES vocabulary(id) ON DELETE SET NULL,
  audio_url TEXT,
  transcription_ia TEXT,
  confidence_score FLOAT,
  phoneme_analysis JSONB,
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_pronunciation_user ON pronunciation_attempts(user_id, created_at DESC);
ALTER TABLE pronunciation_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own pronunciation" ON pronunciation_attempts FOR ALL USING (auth.uid() = user_id);

-- Writing Attempts
CREATE TABLE writing_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  vocabulary_id UUID REFERENCES vocabulary(id) ON DELETE SET NULL,
  stroke_data JSONB NOT NULL,
  recognized_text TEXT,
  accuracy_score FLOAT,
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE writing_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own writing" ON writing_attempts FOR ALL USING (auth.uid() = user_id);

-- Conversation Sessions
CREATE TABLE conversation_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  scenario TEXT NOT NULL,
  messages JSONB DEFAULT '[]',
  ia_persona TEXT DEFAULT 'tutor',
  grammar_errors JSONB DEFAULT '[]',
  vocabulary_used UUID[],
  score INT,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE conversation_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own conversations" ON conversation_sessions FOR ALL USING (auth.uid() = user_id);

-- Achievements
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  condition_type TEXT NOT NULL,
  condition_value INT NOT NULL
);
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read achievements" ON achievements FOR SELECT USING (true);

-- User Achievements
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own achievements" ON user_achievements FOR SELECT USING (auth.uid() = user_id);

-- Analytics
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  total_minutes INT DEFAULT 0,
  exercises_done INT DEFAULT 0,
  accuracy_rate FLOAT DEFAULT 0,
  streak_days INT DEFAULT 0,
  skill_reading INT DEFAULT 0,
  skill_writing INT DEFAULT 0,
  skill_listening INT DEFAULT 0,
  skill_speaking INT DEFAULT 0,
  skill_grammar INT DEFAULT 0,
  skill_vocabulary INT DEFAULT 0,
  difficult_letters JSONB DEFAULT '[]',
  difficult_sounds JSONB DEFAULT '[]',
  forgotten_words UUID[] DEFAULT '{}',
  UNIQUE(user_id, date)
);
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own analytics" ON analytics FOR ALL USING (auth.uid() = user_id);

-- Settings
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  theme TEXT DEFAULT 'system',
  audio_speed TEXT DEFAULT 'normal',
  auto_play_audio BOOLEAN DEFAULT true,
  handwriting_guide BOOLEAN DEFAULT true,
  notifications_enabled BOOLEAN DEFAULT true,
  reminder_time TIME DEFAULT '09:00',
  offline_mode BOOLEAN DEFAULT false
);
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own settings" ON settings FOR ALL USING (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- SM-2 calculation
CREATE OR REPLACE FUNCTION calculate_sm2(
  p_ease_factor FLOAT,
  p_interval INT,
  p_repetitions INT,
  p_quality INT
)
RETURNS TABLE (
  new_ease_factor FLOAT,
  new_interval INT,
  new_repetitions INT,
  next_review_date DATE
) AS $$
DECLARE
  ef FLOAT;
  interval INT;
  reps INT;
BEGIN
  ef := p_ease_factor + (0.1 - (5 - p_quality) * (0.08 + (5 - p_quality) * 0.02));
  IF ef < 1.3 THEN ef := 1.3; END IF;

  IF p_quality < 3 THEN
    reps := 0;
    interval := 1;
  ELSE
    reps := p_repetitions + 1;
    IF reps = 1 THEN interval := 1;
    ELSIF reps = 2 THEN interval := 6;
    ELSE interval := ROUND(p_interval * ef);
    END IF;
  END IF;

  RETURN QUERY SELECT ef, interval, reps, CURRENT_DATE + (interval || ' days')::INTERVAL::DATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get due cards
CREATE OR REPLACE FUNCTION get_due_cards(p_user_id UUID)
RETURNS TABLE (
  card_id UUID,
  vocabulary_id UUID,
  georgian TEXT,
  transliteration TEXT,
  french TEXT,
  status TEXT,
  next_review DATE
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    sc.id AS card_id,
    sc.vocabulary_id,
    v.georgian,
    v.transliteration,
    v.french,
    sc.status,
    sc.next_review
  FROM srs_cards sc
  JOIN vocabulary v ON v.id = sc.vocabulary_id
  WHERE sc.user_id = p_user_id
    AND sc.next_review <= CURRENT_DATE
  ORDER BY sc.next_review ASC, sc.repetitions ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email);
  INSERT INTO settings (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user();
