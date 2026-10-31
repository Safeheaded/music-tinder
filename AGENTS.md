<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Music Tinder Agent Context

Mobile-first PWA mockup: networking for musicians (swipe, match, 1:1 chat). Profiles are hardcoded; chat runs over a swappable `ChatTransport` (Supabase Realtime Broadcast, scripted bot as fallback). UI copy is Polish, code is English.

## Structure

- `src/app/` - routes only; compose feature components, no logic
- `src/features/<name>/` - `components/`, `api/`, `schemas.ts`, `*.test.ts(x)`, public `index.ts`
- `src/lib/` - shared, feature-agnostic code (e.g. `lib/supabase`)
- `src/messages/pl.ts` - all user-facing strings

## Rules

- Layers: UI -> hooks -> `api/` -> client. Components never call Supabase directly.
- Import a feature only via `@/features/<name>`; inside a feature use relative imports. ESLint enforces this.
- Validate external data with Zod in `schemas.ts`; derive types with `z.infer`.
- Strict TypeScript, no `any`. Prefer small files and pure functions for logic.
- Don't add comments to self-explanatory code. Don't add features beyond the stage plan.
- Every logic module ships with a co-located test. Test visible behavior, not implementation.
- Conventional Commits. `pnpm check` (typecheck, lint, test) must pass; Husky runs it on commit.

See `docs/ARCHITECTURE.md` and `docs/adr/`.
