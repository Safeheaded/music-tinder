import { getSupabaseClient } from '@/lib/supabase/client';
import { createScriptedBotTransport } from './scriptedBot';
import { createSupabaseBroadcastTransport } from './supabaseBroadcast';
import type { ChatTransportFactory } from './types';
import { withBotFallback } from './withBotFallback';

export const createChatTransport: ChatTransportFactory = (profileId) => {
  const bot = createScriptedBotTransport();
  const client = getSupabaseClient();
  if (!client) return bot;
  return withBotFallback(
    createSupabaseBroadcastTransport(client, profileId),
    bot,
  );
};
