# Coder History

> Accumulated learnings about this project. Read at session start, append non-obvious discoveries.

<!-- Append entries below this line -->
- 2026-04-19: In today log mutations, always recompute `is_complete` after task/journal writes and sync it both ways to avoid stale streak/history state.
- 2026-04-19: For Azure Static Web Apps static hosting, keep `next.config.ts` on `output: 'export'` with `images.unoptimized: true` and client-side Supabase reads only.
- 2026-04-19: Azure SWA deploy works cleanly with a prebuilt Next.js static export by using `output_location: out` and `skip_app_build: true` in the GitHub Action.
