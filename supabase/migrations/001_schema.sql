create table profiles (
  id          uuid references auth.users primary key,
  full_name   text not null,
  age         integer,
  language    text default 'en',
  streak      integer default 0,
  points      integer default 0,
  created_at  timestamptz default now()
);

create table caretakers (
  id          uuid primary key default gen_random_uuid(),
  patient_id  uuid references profiles(id),
  name        text not null,
  phone       text not null,
  relation    text,
  is_active   boolean default true
);

create table medicines (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references profiles(id),
  name        text not null,
  dosage      text not null,
  schedule    jsonb not null,
  color       text,
  shape       text,
  image_url   text,
  is_active   boolean default true,
  created_at  timestamptz default now()
);

create table dose_logs (
  id           uuid primary key default gen_random_uuid(),
  medicine_id  uuid references medicines(id),
  user_id      uuid references profiles(id),
  scheduled_at timestamptz not null,
  taken_at     timestamptz,
  status       text default 'pending',
  created_at   timestamptz default now()
);

create table alerts (
  id           uuid primary key default gen_random_uuid(),
  patient_id   uuid references profiles(id),
  caretaker_id uuid references caretakers(id),
  type         text,
  message      text,
  read         boolean default false,
  created_at   timestamptz default now()
);

alter publication supabase_realtime add table dose_logs;
alter publication supabase_realtime add table alerts;

alter table profiles enable row level security;
alter table medicines enable row level security;
alter table dose_logs enable row level security;
alter table alerts enable row level security;

create policy "Users own their data" on profiles for all using (auth.uid() = id);
create policy "Users own medicines" on medicines for all using (auth.uid() = user_id);
create policy "Users own dose logs" on dose_logs for all using (auth.uid() = user_id);

create or replace function increment_points_and_streak(p_user_id uuid, p_points integer)
returns void
language plpgsql
as $$
begin
  update profiles
  set points = coalesce(points, 0) + p_points,
      streak = coalesce(streak, 0) + 1
  where id = p_user_id;
end;
$$;
