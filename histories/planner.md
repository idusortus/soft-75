# Planner History

> Accumulated learnings about this project. Read at session start, append non-obvious discoveries.

<!-- Append entries below this line -->
- 2026-04-19: Chose static export (not hybrid) to avoid Azure SWA hybrid Next.js preview issues. All data from Supabase JS client-side. Much simpler.
- 2026-04-19: Supabase free tier pauses after 1 week inactivity — acceptable for a family tracker used daily.
- 2026-04-19: `is_complete` flag on daily_logs is auto-set when all 4 tasks done + journal non-empty. Streak calculation reads this flag.
