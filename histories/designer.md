# Designer History

> Accumulated learnings about this project. Read at session start, append non-obvious discoveries.

<!-- Append entries below this line -->
- 2026-04-19: Tailwind v4 `@theme` generates utilities automatically — `bg-surface`, `text-text-muted`, `border-border`, `from-accent-from` all work without any config file. Dropped `--color-` prefix from token name to get the utility name.
- 2026-04-19: CSS spinner pattern: `border: Xpx solid color` + `borderTopColor: transparent` in inline style is unambiguous. Avoid mixing Tailwind `border-t-transparent` + `border-{color}` classes — ordering in generated CSS is not guaranteed, and `border-color` shorthand vs `border-top-color` longhand interact differently depending on file position.
- 2026-04-19: SVG `linearGradient` requires a unique `id` per document — safe to use static IDs only when the component renders at most once per page. If the same component renders multiple times (e.g. a list), generate unique IDs with `useId()`.
- 2026-04-19: `TaskCard` children slot for inline sub-components (MindfulnessPicker) keeps task card self-contained while staying extensible — cleaner than prop-drilling a render function.
- 2026-04-19: Dark aesthetic with violet-to-blue gradient on dark (#0f0f0f) background reads well and feels premium. Gradient borders and gradient text are strong accent tools that don't need saturated backgrounds to pop.
