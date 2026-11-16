-- Skate Run leaderboard. Paste into Supabase: SQL Editor -> New query -> Run.
create table if not exists public.scores (
  id         bigint generated always as identity primary key,
  name       text not null check (char_length(trim(name)) between 1 and 24),
  org        text check (org is null or char_length(org) <= 40),
  score      integer not null check (score between 100 and 100000),
  created_at timestamptz not null default now()
);

create index if not exists scores_score_idx on public.scores (score desc);

alter table public.scores enable row level security;

-- Anyone can read the board and add a score. Nobody (via the public key) can edit or delete.
create policy "public read"   on public.scores for select using (true);
create policy "public insert" on public.scores for insert with check (true);
