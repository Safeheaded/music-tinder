import { describe, expect, it } from 'vitest';
import { conversationKey, generateRoomCode, parseRoomCode } from './roomCode';

describe('parseRoomCode', () => {
  it('accepts short alphanumeric codes', () => {
    expect(parseRoomCode('abc123')).toBe('abc123');
  });

  it.each([null, '', 'ab', 'has space', 'x'.repeat(33), '<script>'])(
    'rejects %j',
    (value) => {
      expect(parseRoomCode(value)).toBeNull();
    },
  );

  it('accepts generated codes', () => {
    expect(parseRoomCode(generateRoomCode())).not.toBeNull();
  });
});

describe('conversationKey', () => {
  it('separates conversations by room', () => {
    expect(conversationKey('p01', null)).toBe('p01');
    expect(conversationKey('p01', 'abc123')).toBe('abc123:p01');
  });
});
