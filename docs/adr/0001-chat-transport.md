# 0001 - Chat behind a `ChatTransport` interface

## Status

Accepted

## Context

The mockup must demonstrate real-time chat without a custom backend or database, yet stay replaceable by a persistent implementation.

## Decision

The chat UI depends only on `ChatTransport` (`send`, `subscribe`, `close`). Two implementations: `SupabaseBroadcastTransport` (ephemeral Realtime Broadcast, no tables) and `ScriptedBotTransport` (fallback when Supabase is not configured or no peer is present). A factory picks one from environment variables.

## Consequences

- Demo always works, including offline of Supabase.
- The full version adds a database-backed transport without touching the UI.
- Broadcast messages are not persisted; history is kept locally in the store.
