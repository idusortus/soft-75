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

## 3. Azure Static Web Apps Deployment

1. Push this repo to GitHub
2. Go to [Azure Portal](https://portal.azure.com) → Create Resource → Static Web App
3. Connect to your GitHub repo, branch: `main`
4. Build details:
   - App location: `/`
   - Output location: `out`
   - Skip build: ✅ (we build in CI)
5. After creation, go to your SWA → Settings → Configuration → Add application settings:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
6. In GitHub repo → Settings → Secrets → Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `AZURE_STATIC_WEB_APPS_API_TOKEN` (from Azure Portal → SWA → Manage deployment token)
7. Push to `main` — GitHub Actions will build and deploy automatically

## 4. Customizing Users

Edit `supabase/schema.sql` and change `'Dad'` and `'Son'` to your actual names before running the schema. Or update directly in Supabase Table Editor.