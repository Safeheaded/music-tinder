import { describe, expect, it } from 'vitest';
import { safeNextPath } from './nextPath';

describe('safeNextPath', () => {
  it('keeps internal paths with their query', () => {
    expect(safeNextPath('/chats/p01?room=abc123')).toBe(
      '/chats/p01?room=abc123',
    );
  });

  it.each([null, '', 'https://evil.example', '//evil.example', 'chats'])(
    'falls back to the home page for %j',
    (value) => {
      expect(safeNextPath(value)).toBe('/');
    },
  );
});
