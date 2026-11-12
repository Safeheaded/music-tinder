import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter, useSearchParams } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { useChatStore } from '../store';
import { createScriptedBotTransport } from '../transports/scriptedBot';
import { ChatView } from './ChatView';

vi.mock('@/lib/supabase/client', () => ({
  getSupabaseClient: vi.fn(() => null),
  isSupabaseConfigured: vi.fn(() => false),
}));

const fastBot = () =>
  createScriptedBotTransport({ typingDelayMs: 0, replyDelayMs: 10 });

beforeEach(() => {
  useChatStore.getState().reset();
  vi.mocked(isSupabaseConfigured).mockReturnValue(false);
  vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as never);
});

describe('ChatView', () => {
  it('shows the sent message and the bot reply', async () => {
    const user = userEvent.setup();
    render(<ChatView profileId="p01" transportFactory={fastBot} />);

    await user.type(await screen.findByLabelText('Napisz wiadomość'), 'Hej!');
    await user.click(screen.getByRole('button', { name: 'Wyślij' }));

    expect(await screen.findByText('Hej!')).toBeVisible();
    expect(await screen.findByText(/Od jak dawna grasz/)).toBeVisible();
  });

  it('does not send empty messages', async () => {
    render(<ChatView profileId="p01" transportFactory={fastBot} />);

    expect(
      await screen.findByRole('button', { name: 'Wyślij' }),
    ).toBeDisabled();
  });

  it('keeps history between visits', async () => {
    const user = userEvent.setup();
    const { unmount } = render(
      <ChatView profileId="p01" transportFactory={fastBot} />,
    );
    await user.type(await screen.findByLabelText('Napisz wiadomość'), 'Cześć');
    await user.click(screen.getByRole('button', { name: 'Wyślij' }));
    unmount();

    render(<ChatView profileId="p01" transportFactory={fastBot} />);

    expect(await screen.findByText('Cześć')).toBeVisible();
  });

  it('hides the invite button when Supabase is not configured', async () => {
    render(<ChatView profileId="p01" transportFactory={fastBot} />);

    await screen.findByRole('heading', { name: 'Marek' });
    expect(
      screen.queryByRole('button', { name: 'Zaproś na drugim urządzeniu' }),
    ).toBeNull();
  });

  it('creates a private room and copies its link on invite', async () => {
    vi.mocked(isSupabaseConfigured).mockReturnValue(true);
    const replace = vi.fn();
    vi.mocked(useRouter).mockReturnValue({ replace, push: vi.fn() } as never);
    const user = userEvent.setup();
    render(<ChatView profileId="p01" transportFactory={fastBot} />);

    await user.click(
      await screen.findByRole('button', {
        name: 'Zaproś na drugim urządzeniu',
      }),
    );

    expect(replace).toHaveBeenCalledWith(
      expect.stringMatching(/^\/chats\/p01\?room=[0-9a-f]{8}$/),
    );
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Link skopiowany',
    );
    expect(await navigator.clipboard.readText()).toMatch(
      /\/chats\/p01\?room=[0-9a-f]{8}$/,
    );
  });

  it('joins the room from the URL and keeps its history separate', async () => {
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams('room=abc123') as never,
    );
    const factory = vi.fn(fastBot);
    const user = userEvent.setup();
    render(<ChatView profileId="p01" transportFactory={factory} />);

    await user.type(
      await screen.findByLabelText('Napisz wiadomość'),
      'W pokoju',
    );
    await user.click(screen.getByRole('button', { name: 'Wyślij' }));

    expect(factory).toHaveBeenCalledWith({
      profileId: 'p01',
      roomCode: 'abc123',
    });
    expect(screen.getByText('Pokój prywatny: abc123')).toBeVisible();
    expect(useChatStore.getState().conversations['abc123:p01']).toHaveLength(1);
    expect(useChatStore.getState().conversations['p01']).toBeUndefined();
  });
});
