# Setup Guide

## 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (free tier)
3. Wait for it to initialize (~2 min)
4. Go to SQL Editor -> New Query -> paste the contents of `supabase/schema.sql` -> Run
5. Go to Project Settings -> API
6. Copy your **Project URL** and **anon public** key

## 2. Local Development

```bash
cp .env.example .env.local
# Edit .env.local with your Supabase URL and anon key

npm install
npm run dev
# Open http://localhost:3000
```

## 3. Vercel Deployment

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Add New Project → Import your repo
3. Vercel auto-detects Next.js — no build config changes needed
4. Before deploying, add environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
5. Click Deploy — done. Every push to `main` auto-deploys.

No GitHub Actions workflow required. Vercel handles everything.

## 4. Customizing Users

Edit `supabase/schema.sql` and change `'Dad'` and `'Son'` to your actual names before running the schema. Or update directly in Supabase Table Editor.