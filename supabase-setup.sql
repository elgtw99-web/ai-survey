-- 在 Supabase 的 SQL Editor 貼上整段，按 Run 一次就好。

create table if not exists public.responses (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nickname   text check (nickname is null or char_length(nickname) <= 30),
  answers    jsonb not null check (pg_column_size(answers) < 20000)
);

alter table public.responses enable row level security;

grant insert on public.responses to anon, authenticated;
grant select, delete on public.responses to authenticated;

-- 任何人（學員，不用登入）只能「新增」，不能讀、改、刪
create policy "anyone can submit" on public.responses
  for insert to anon, authenticated with check (true);

-- 只有登入的講師帳號可以讀取與清除
create policy "instructor can read" on public.responses
  for select to authenticated using (true);
create policy "instructor can delete" on public.responses
  for delete to authenticated using (true);

-- 開啟即時更新（講師頁會自動刷新）
alter publication supabase_realtime add table public.responses;
