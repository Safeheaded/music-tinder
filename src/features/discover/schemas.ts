import { z } from 'zod';

export const ROLES = [
  'Wokalista',
  'Gitarzysta',
  'Basista',
  'Perkusista',
  'Klawiszowiec',
  'Producent',
  'DJ',
  'Skrzypek',
] as const;

export const GENRES = [
  'Rock',
  'Jazz',
  'Hip-hop',
  'Elektronika',
  'Pop',
  'Metal',
  'Folk',
  'Soul',
] as const;

export const CITIES = [
  'Warszawa',
  'Kraków',
  'Wrocław',
  'Gdańsk',
  'Poznań',
] as const;

export const profileSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number().int().positive(),
  role: z.enum(ROLES),
  city: z.enum(CITIES),
  genres: z.array(z.enum(GENRES)).min(1),
  bio: z.string(),
  avatar: z.string(),
  likesYouBack: z.boolean(),
});

export const filtersSchema = z.object({
  role: z.enum(ROLES).nullable(),
  genre: z.enum(GENRES).nullable(),
  city: z.enum(CITIES).nullable(),
});

export type Profile = z.infer<typeof profileSchema>;
export type Filters = z.infer<typeof filtersSchema>;
export type SwipeDirection = 'like' | 'pass';

export const EMPTY_FILTERS: Filters = { role: null, genre: null, city: null };
