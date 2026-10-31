import { createScriptedBotTransport } from './scriptedBot';
import type { ChatTransportFactory } from './types';

export const createChatTransport: ChatTransportFactory = () =>
  createScriptedBotTransport();
