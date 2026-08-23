# Gears Virtual Solutions

One-page virtual assistance website for Gears Virtual Solutions — "The moving parts behind your business growth": Next.js (App Router) + Tailwind CSS + Supabase, deployed on Vercel.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your Supabase project values
npm run dev
```

## Supabase

1. Create a project at https://supabase.com.
2. Run `supabase/schema.sql` in the SQL editor. It creates:
   - `inquiries` with RLS (insert-only for anonymous visitors, no public reads);
   - `media_gallery` with RLS (public read, writes restricted to authenticated admins);
   - public `resources` and `portfolio_media` storage buckets with matching policies.
3. Upload the PDFs to the `resources` bucket using these exact object names:
   - `client-onboarding-kit.pdf`
   - `delegation-guide-and-templates.pdf`
   - `tool-stack-directory.pdf`
4. Create the admin account under Authentication → Users (email + password). That user
   is the only one who can publish or delete portfolio media.

## Portfolio admin

| Route | Purpose |
| --- | --- |
| `/hidden-studio-login` | Unlisted Supabase Auth login (noindex) |
| `/admin-dashboard` | Upload photos/videos to `portfolio_media`, delete existing items |

Uploads and deletions call `revalidatePath('/')`, so the public gallery updates without a
redeploy. Photos crossfade in a 4-second carousel; videos autoplay muted in a grid.

## Environment variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon public key |

Set both in Vercel (Project → Settings → Environment Variables) for all environments.
Without them the site still renders; the contact form shows a configuration notice.

## Deploy

Import the repository into Vercel, add the environment variables, and deploy.
Pushes to `main` deploy to production automatically.
