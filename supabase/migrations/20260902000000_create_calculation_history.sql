create table if not exists public.calculation_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  problem_type text not null,
  expression text not null,
  result text not null,
  inputs jsonb not null default '{}'::jsonb,
  solver_result jsonb not null,
  is_favorite boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.calculation_history enable row level security;

create policy "Users can view their own calculation history"
  on public.calculation_history for select
  using (auth.uid() = user_id);

create policy "Users can create their own calculation history"
  on public.calculation_history for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own calculation history"
  on public.calculation_history for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own calculation history"
  on public.calculation_history for delete
  using (auth.uid() = user_id);