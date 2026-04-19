# soft-75

> A simple tracker for a soft version of the 'hard 75' program.

This file is the tool-agnostic project context. Codex, Cursor, Aider, Gemini CLI, Zed,
and Copilot all read `AGENTS.md` per the [agents.md](https://agents.md) convention.

## Goal
Create a SPA or web app that allows users to track their daily soft 75 progress. Users must: exercise for 45 minutes a day, read 10 pages of a non-fiction book OR mediate for 10 minutes, drink a gallon of water, and adhere to a diet modification of their choise and write a journal entry every day.

## Stack
Node + TypeScript

## Frameworks / Key Libraries
Next.js, React, Tailwind CSS

## Constraints
usable by at least two distinct users. security isn't a concern. easy to use and track results.

## Workflow
1. Read `PROJECT.md` for the long-form vision.
2. Check `STATE.md` for current status, blockers, in-flight decisions.
3. Check `decisions.md` for architectural decisions already locked in.
4. Per-agent memory lives in `histories/<agent>.md`.
5. Append a session summary to `agent-diary.md` when work completes.
