const ROOM_CODE_PATTERN = /^[a-z0-9-]{4,32}$/i;

export const parseRoomCode = (value: string | null) =>
  value && ROOM_CODE_PATTERN.test(value) ? value : null;

export const generateRoomCode = () => crypto.randomUUID().slice(0, 8);

export const conversationKey = (profileId: string, roomCode: string | null) =>
  roomCode ? `${roomCode}:${profileId}` : profileId;
