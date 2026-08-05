# JOEBEL VA

One-page virtual assistance website: Next.js (App Router) + Tailwind CSS + Supabase, deployed on Vercel.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your Supabase project values
npm run dev
```

## Supabase

1. Create a project at https://supabase.com.
2. Run `supabase/schema.sql` in the SQL editor. It creates the `inquiries` table with
   RLS enabled (insert-only for anonymous visitors, no public reads) and a public
   `resources` storage bucket.
3. Upload the PDFs to the `resources` bucket using these exact object names:
   - `client-onboarding-kit.pdf`
   - `delegation-guide-and-templates.pdf`

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
