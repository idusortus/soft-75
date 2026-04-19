# Orchestrator History

> Accumulated learnings about this project. Read at session start, append non-obvious discoveries.

<!-- Append entries below this line -->
- 2026-04-19: First session — greenfield full-stack build. Planner gave decisions but minimal phase detail; supplemented with inline architectural decisions (static export, Supabase, no-auth). Delegated scaffold+data layer to Coder (Phase 1), then Designer (UI) and Coder (deployment config) in parallel (Phase 2). Reviewer caught critical `is_complete` bidirectional reset bug in useTodayLog — important pattern: any flag derived from multiple fields must be reconciled up AND down, not just on completion. Fix-review rounds: 1/2.
