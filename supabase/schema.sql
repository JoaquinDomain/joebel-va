-- Gears Virtual Solutions — Supabase schema
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

-- ---------------------------------------------------------------------------
-- Portfolio media gallery
-- ---------------------------------------------------------------------------

create table if not exists public.media_gallery (
  id uuid primary key default gen_random_uuid(),
  file_url text not null,
  media_type text not null check (media_type in ('photo', 'video')),
  created_at timestamptz not null default now()
);

alter table public.media_gallery enable row level security;

-- Guests may read the gallery without signing in.
drop policy if exists "public can read media_gallery" on public.media_gallery;
create policy "public can read media_gallery"
  on public.media_gallery
  for select
  to anon, authenticated
  using (true);

-- Only signed-in admins may publish or remove media.
drop policy if exists "admins can insert media_gallery" on public.media_gallery;
create policy "admins can insert media_gallery"
  on public.media_gallery
  for insert
  to authenticated
  with check (true);

drop policy if exists "admins can update media_gallery" on public.media_gallery;
create policy "admins can update media_gallery"
  on public.media_gallery
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "admins can delete media_gallery" on public.media_gallery;
create policy "admins can delete media_gallery"
  on public.media_gallery
  for delete
  to authenticated
  using (true);

-- Public-read storage bucket for portfolio photos and videos.
insert into storage.buckets (id, name, public)
values ('portfolio_media', 'portfolio_media', true)
on conflict (id) do update set public = true;

drop policy if exists "public can read portfolio_media" on storage.objects;
create policy "public can read portfolio_media"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'portfolio_media');

drop policy if exists "admins can upload portfolio_media" on storage.objects;
create policy "admins can upload portfolio_media"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'portfolio_media');

drop policy if exists "admins can update portfolio_media" on storage.objects;
create policy "admins can update portfolio_media"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'portfolio_media')
  with check (bucket_id = 'portfolio_media');

drop policy if exists "admins can delete portfolio_media" on storage.objects;
create policy "admins can delete portfolio_media"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'portfolio_media');
