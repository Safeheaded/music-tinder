export type ChatMessage = {
  id: string;
  sender: 'me' | 'them';
  text: string;
  sentAt: number;
};
