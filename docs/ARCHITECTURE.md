# Architecture

## Overview

Next.js (App Router) PWA. State lives in Zustand stores persisted to `localStorage`. There is no database in the mockup; the full-version design is described in the README.

## Directory layout

```
src/
├── app/                 routes (thin)
├── features/
│   ├── discover/        profiles, filters, swipe cards, match logic
│   ├── chat/            ChatTransport, bot + Supabase transports, UI
│   ├── moderation/      report/block mockups
│   └── admin/           static admin mockup
├── lib/supabase/        the only place that creates a Supabase client
└── messages/pl.ts       UI strings
```

## Layers

UI components -> hooks -> `api/` functions -> client/transport. A layer only talks to the one below it.

## Extension points

- New chat backend: implement `ChatTransport` (see ADR 0001), select it in one factory.
- New feature: add `src/features/<name>` with an `index.ts` exposing its public API.
- Real data: replace the hardcoded profile source in `discover/api` with a Supabase query; UI and stores stay unchanged.
