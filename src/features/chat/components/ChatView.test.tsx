import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { useChatStore } from '../store';
import { createScriptedBotTransport } from '../transports/scriptedBot';
import { ChatView } from './ChatView';

const fastBot = () =>
  createScriptedBotTransport({ typingDelayMs: 0, replyDelayMs: 10 });

beforeEach(() => useChatStore.getState().reset());

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
});
