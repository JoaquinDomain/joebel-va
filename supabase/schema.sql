-- JOEBEL VA — Supabase schema
-- Run in the Supabase SQL editor.

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  service_interest text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

-- Anonymous visitors may submit an inquiry, but may never read them back.
drop policy if exists "anon can insert inquiries" on public.inquiries;
create policy "anon can insert inquiries"
  on public.inquiries
  for insert
  to anon, authenticated
  with check (true);

-- No select/update/delete policies: only the service role can read inquiries.

-- Public storage bucket for downloadable PDF resources.
insert into storage.buckets (id, name, public)
values ('resources', 'resources', true)
on conflict (id) do update set public = true;

drop policy if exists "public can read resources" on storage.objects;
create policy "public can read resources"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'resources');
