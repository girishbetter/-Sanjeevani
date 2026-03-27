-- Supabase Schema for Sanjeevani

-- Create profile table extending auth.users
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('patient', 'caretaker', 'admin')),
  language TEXT DEFAULT 'hi',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);


-- Create patients table
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  age INTEGER,
  medical_conditions TEXT[],
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- Patients can view their own row
CREATE POLICY "Patients can view own row"
ON patients FOR SELECT
USING (auth.uid() = profile_id);

-- Create links table
CREATE TABLE caretaker_patient_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caretaker_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  relationship TEXT CHECK (relationship IN ('son', 'daughter', 'spouse', 'sibling', 'other')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(caretaker_profile_id, patient_id)
);

ALTER TABLE caretaker_patient_links ENABLE ROW LEVEL SECURITY;

-- Caretakers can view their links
CREATE POLICY "Caretaker can view own links"
ON caretaker_patient_links FOR SELECT
USING (auth.uid() = caretaker_profile_id);

-- Patients can view links pointing to them
CREATE POLICY "Patients can view their links"
ON caretaker_patient_links FOR SELECT
USING (auth.uid() IN (SELECT profile_id FROM patients WHERE id = patient_id));

-- Add caretaker policy to patients based on links
CREATE POLICY "Caretakers can view linked patients"
ON patients FOR SELECT
USING (
  id IN (
    SELECT patient_id FROM caretaker_patient_links 
    WHERE caretaker_profile_id = auth.uid() AND is_active = TRUE
  )
);

-- Medicines table
CREATE TABLE medicines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  generic_name TEXT,
  pill_color TEXT,
  pill_shape TEXT CHECK (pill_shape IN ('round', 'oval', 'capsule')),
  image_url TEXT,
  scheduled_time TIME NOT NULL,
  instructions TEXT,
  days_of_week INTEGER[], -- 0=Sun to 6=Sat
  is_active BOOLEAN DEFAULT TRUE,
  added_by_profile_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;

-- Patient can read own medicines
CREATE POLICY "Patients can read own medicines"
ON medicines FOR SELECT
USING (patient_id IN (SELECT id FROM patients WHERE profile_id = auth.uid()));

-- Caretaker can read linked patient medicines
CREATE POLICY "Caretakers can read linked patient medicines"
ON medicines FOR SELECT
USING (patient_id IN (
  SELECT patient_id FROM caretaker_patient_links 
  WHERE caretaker_profile_id = auth.uid() AND is_active = TRUE
));

-- Caretaker can write linked patient medicines
CREATE POLICY "Caretakers can insert medicines for linked patients"
ON medicines FOR INSERT
WITH CHECK (patient_id IN (
  SELECT patient_id FROM caretaker_patient_links 
  WHERE caretaker_profile_id = auth.uid() AND is_active = TRUE
));
CREATE POLICY "Caretakers can update medicines for linked patients"
ON medicines FOR UPDATE
USING (patient_id IN (
  SELECT patient_id FROM caretaker_patient_links 
  WHERE caretaker_profile_id = auth.uid() AND is_active = TRUE
));


-- Dose logs table
CREATE TABLE dose_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_id UUID REFERENCES medicines(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  scheduled_date DATE DEFAULT CURRENT_DATE,
  scheduled_time TIME NOT NULL,
  taken_at TIMESTAMPTZ,
  status TEXT CHECK (status IN ('pending', 'taken', 'missed')),
  alert_sent BOOLEAN DEFAULT FALSE,
  alert_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(medicine_id, scheduled_date)
);

ALTER TABLE dose_logs ENABLE ROW LEVEL SECURITY;

-- Realtime needs REPLICA IDENTITY FULL
ALTER TABLE dose_logs REPLICA IDENTITY FULL;
ALTER TABLE medicines REPLICA IDENTITY FULL;

-- Patient can read/update own logs
CREATE POLICY "Patients can read own logs"
ON dose_logs FOR SELECT
USING (patient_id IN (SELECT id FROM patients WHERE profile_id = auth.uid()));

CREATE POLICY "Patients can update own logs"
ON dose_logs FOR UPDATE
USING (patient_id IN (SELECT id FROM patients WHERE profile_id = auth.uid()));

-- Caretaker can read linked patient logs
CREATE POLICY "Caretakers can read linked logs"
ON dose_logs FOR SELECT
USING (patient_id IN (
  SELECT patient_id FROM caretaker_patient_links 
  WHERE caretaker_profile_id = auth.uid() AND is_active = TRUE
));

CREATE POLICY "Caretakers can update logs (missed auto marking)"
ON dose_logs FOR UPDATE
USING (patient_id IN (
  SELECT patient_id FROM caretaker_patient_links 
  WHERE caretaker_profile_id = auth.uid() AND is_active = TRUE
));


-- Streaks table
CREATE TABLE streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE UNIQUE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_perfect_date DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks REPLICA IDENTITY FULL;

CREATE POLICY "Patients can view own streaks"
ON streaks FOR SELECT
USING (patient_id IN (SELECT id FROM patients WHERE profile_id = auth.uid()));

CREATE POLICY "Caretakers can view linked patients streaks"
ON streaks FOR SELECT
USING (patient_id IN (
  SELECT patient_id FROM caretaker_patient_links 
  WHERE caretaker_profile_id = auth.uid() AND is_active = TRUE
));


-- Alerts log
CREATE TABLE alerts_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  medicine_id UUID REFERENCES medicines(id),
  caretaker_profile_id UUID REFERENCES profiles(id),
  alert_type TEXT CHECK (alert_type IN ('missed_dose', 'emergency', 'low_streak')),
  channel TEXT CHECK (channel IN ('sms', 'whatsapp', 'browser')),
  status TEXT CHECK (status IN ('sent', 'failed')),
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  payload JSONB
);
ALTER TABLE alerts_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Caretaker can view own alerts"
ON alerts_log FOR SELECT
USING (caretaker_profile_id = auth.uid());


-- Functions
-- 1. generate_todays_logs
CREATE OR REPLACE FUNCTION generate_todays_logs(p_patient_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_dow INTEGER;
BEGIN
  -- get current day of week (0-6)
  v_dow := EXTRACT(DOW FROM CURRENT_DATE);

  INSERT INTO dose_logs (medicine_id, patient_id, scheduled_date, scheduled_time, status)
  SELECT m.id, m.patient_id, CURRENT_DATE, m.scheduled_time, 'pending'
  FROM medicines m
  WHERE m.patient_id = p_patient_id
    AND m.is_active = true
    AND (
      m.days_of_week IS NULL OR 
      array_length(m.days_of_week, 1) IS NULL OR
      v_dow = ANY(m.days_of_week)
    )
  ON CONFLICT (medicine_id, scheduled_date) DO NOTHING;
END;
$$;


-- 2. update_streak
CREATE OR REPLACE FUNCTION update_streak(p_patient_id UUID)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_pending integer;
  v_current integer := 0;
  v_longest integer := 0;
BEGIN
  -- Count pending logs for today
  SELECT COUNT(*) INTO v_pending
  FROM dose_logs
  WHERE patient_id = p_patient_id
    AND scheduled_date = CURRENT_DATE
    AND status != 'taken';

  IF v_pending = 0 THEN
    -- All taken, check if already incremented today
    IF NOT EXISTS (
      SELECT 1 FROM streaks 
      WHERE patient_id = p_patient_id AND last_perfect_date = CURRENT_DATE
    ) THEN
      -- Create or update streak
      INSERT INTO streaks (patient_id, current_streak, longest_streak, last_perfect_date)
      VALUES (p_patient_id, 1, 1, CURRENT_DATE)
      ON CONFLICT (patient_id) DO UPDATE
      SET 
        -- If yesterday was perfect, increment. Else reset to 1
        current_streak = CASE 
          WHEN streaks.last_perfect_date = CURRENT_DATE - INTERVAL '1 day' 
          THEN streaks.current_streak + 1 
          ELSE 1 
        END,
        longest_streak = GREATEST(
          streaks.longest_streak,
          CASE 
            WHEN streaks.last_perfect_date = CURRENT_DATE - INTERVAL '1 day' 
            THEN streaks.current_streak + 1 
            ELSE 1 
          END
        ),
        last_perfect_date = CURRENT_DATE,
        updated_at = NOW()
      RETURNING current_streak INTO v_current;
    ELSE
      -- Already updated today
      SELECT current_streak INTO v_current FROM streaks WHERE patient_id = p_patient_id;
    END IF;
  ELSE
    SELECT current_streak INTO v_current FROM streaks WHERE patient_id = p_patient_id;
  END IF;

  RETURN COALESCE(v_current, 0);
END;
$$;


-- Triggers
-- create_profile_for_user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, role, language)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'role',
    COALESCE(new.raw_user_meta_data->>'language', 'hi')
  );

  -- If the role is patient, also create a patient row implicitly
  IF (new.raw_user_meta_data->>'role') = 'patient' THEN
    INSERT INTO public.patients (profile_id) VALUES (new.id);
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Publication for realtime
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime FOR TABLE dose_logs, medicines, streaks;
