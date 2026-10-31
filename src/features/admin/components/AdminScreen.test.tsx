import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { useModerationStore } from '@/features/moderation';
import { AdminScreen } from './AdminScreen';

beforeEach(() => useModerationStore.getState().reset());

describe('AdminScreen', () => {
  it('lists sample and user reports', async () => {
    useModerationStore.getState().report('p01', 'Spam');
    render(<AdminScreen />);

    expect(await screen.findAllByRole('listitem')).toHaveLength(4);
    expect(screen.getByText('Marek')).toBeVisible();
  });

  it('bans and unbans a reported profile', async () => {
    const user = userEvent.setup();
    render(<AdminScreen />);

    await user.click(
      (await screen.findAllByRole('button', { name: 'Zbanuj' }))[0],
    );

    expect(screen.getAllByRole('button', { name: 'Odbanuj' })).toHaveLength(1);
  });
});
