# Music Tinder (makieta)

Mobile-first PWA: networking dla muzyków - swipe, match i czat 1:1 w czasie rzeczywistym. To makieta pokazująca flow; profile są zhardcodowane, a zdjęcia poglądowe.

## Uruchomienie

```bash
pnpm install
cp .env.example .env.local   # opcjonalnie: klucze Supabase
pnpm dev
```

Bez kluczy Supabase czat działa z botem scenariuszowym.

## Skrypty

`pnpm check` (typy + lint + testy), `pnpm test`, `pnpm e2e` (Playwright, buduje aplikację), `pnpm format`.

## Dokumentacja

- `AGENTS.md` - konwencje kodu
- `docs/ARCHITECTURE.md` - warstwy i struktura
- `docs/adr/` - decyzje architektoniczne
