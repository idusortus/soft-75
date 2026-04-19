# Architectural Decisions

> One entry per locked-in choice. Reverse chronological. Concise — not an ADR template.

## Format

    ## YYYY-MM-DD — <decision title>
    **Context:** Why we needed to decide.
    **Choice:** What we chose.
    **Trade-offs:** What we gave up.
    **Revisit:** Trigger that would re-open this decision (or "never").

---

## 2026-04-19 — Vercel for static hosting (switched from Azure SWA)
**Context:** Azure SWA auth/portal friction was unacceptable. Wanted zero-config deployment.
**Choice:** Vercel free tier (Hobby). Connect GitHub repo, add env vars, done. No workflow YAML needed.
**Trade-offs:** Hobby plan is non-commercial. Fine for a family tracker.
**Revisit:** Never — unless usage exceeds free tier (100GB bandwidth/mo).

## 2026-04-19 — Supabase free tier as database
**Context:** Need persistent storage for 2 users. Evaluated Supabase, Azure Cosmos DB, Neon, PlanetScale.
**Choice:** Supabase free tier (500MB Postgres). All queries from browser via Supabase JS client.
**Trade-offs:** Free projects pause after 1 week of inactivity. Zero cost otherwise.
**Revisit:** If pausing becomes annoying — upgrade to $25/mo Pro.

## 2026-04-19 — No authentication; localStorage username selector
**Context:** Zero security requirements. Exactly two family members.
**Choice:** Username stored in localStorage. User-select modal on first visit. No passwords.
**Trade-offs:** No data isolation. Intentionally acceptable.
**Revisit:** Never.

## 2026-04-19 — App-level user gating in AppShell, no React Context
**Context:** Multiple pages need user data; useUser() reads localStorage (fast, synchronous after mount).
**Choice:** Each page calls useUser() independently. AppShell gates rendering children until user is selected, so pages always receive a valid user object.
**Trade-offs:** Two localStorage reads on page load. Acceptable for a 2-user family app.
**Revisit:** If more pages need shared derived state (e.g. computed streak).

## 2026-04-19 — Tailwind v4 CSS-first config; no tailwind.config.ts
**Context:** Project uses Tailwind v4 which supports @theme in CSS instead of JS config.
**Choice:** All design tokens defined in globals.css @theme block. Utilities auto-generated (bg-surface, text-text-muted, border-border, from-accent-from, etc.).
**Trade-offs:** CSS @theme is Tailwind v4-only; can't downgrade to v3 without rewriting.
**Revisit:** Never — v4 is the future.

## 2026-04-19 — SVG LinearGradient with static ID for ProgressRing
**Context:** SVG gradients require a unique `id` on the linearGradient element.
**Choice:** Static ID `ring-gradient`. Acceptable because only one ProgressRing renders per page at a time.
**Trade-offs:** Would break with multiple rings on the same page.
**Revisit:** If ProgressRing is used more than once per page.
