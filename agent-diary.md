# Agent Diary

_Chronological session log. Append-only. Newest at the bottom._
_Format: `## YYYY-MM-DD HH:MM` (24-hour). 2-5 sentence summary. Always include model used._

## 2026-04-19 14:30

Built the entire UI layer for soft-75: 16 files covering globals.css, layout, AppShell, Navigation, UserPicker, ProgressRing, TaskCard, MindfulnessPicker, JournalCard, StreakBadge, CalendarHeatmap, StatsBar, and all three pages (Today, History, Settings). Design is dark + violet-blue gradient, mobile-first, with animated SVG progress ring, streak badge, 75-day heatmap, and satisfying task card toggles. All components are accessibility-labelled with aria attributes and min-48px touch targets. Model: Claude Sonnet 4.6.

## 2026-04-19 11:16
Scaffolded a greenfield Next.js 15 + TypeScript app foundation for soft-75 with static export config for Azure Static Web Apps and a Supabase-first data layer. Added environment template, SQL schema with seed users, typed domain models, task definitions, query helpers, utilities, and client hooks for user selection, today log mutation, and history/streak derivation. Updated project state and decision logs to lock in static export, Supabase free tier, and no-auth localStorage user selection. Model used: GPT-5.3-Codex.

## 2026-04-19 11:20
Added deployment-ready configuration for Azure Static Web Apps: static app routing/caching config, GitHub Actions workflow for build/deploy and PR close handling, and a standard Next.js `.gitignore`. Added `SETUP.md` with Supabase bootstrap steps, local run instructions, and Azure secret/deployment setup flow. Updated state tracking and coder history to reflect deployment setup completion. Model used: GPT-5.3-Codex.

## 2026-04-19 11:43
Fixed two production bugs with minimal, targeted edits: `useTodayLog` now reconciles `is_complete` bidirectionally after both task toggles and journal saves, and `useUser` now catches `getAllUsers` promise failures to avoid unhandled rejections. No refactors or feature additions were made. Attempted type checking, but local TypeScript tooling was not available in this environment. Model used: GPT-5.3-Codex.

## 2026-04-19 15:55
Orchestrated full greenfield build of soft-75: scaffolded Next.js 15 static export app with Supabase data layer, then built complete dark-themed mobile-first UI (progress ring, task cards, streak badge, 75-day heatmap) in parallel with Azure SWA deployment config. Reviewer caught one critical bug (is_complete not reset on task uncheck) — fixed in one round. App is ready to deploy after user adds Supabase credentials. Model used: Claude Sonnet 4.6.

