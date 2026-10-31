import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useModerationStore } from '../store';
import { ProfileActions } from './ProfileActions';

beforeEach(() => useModerationStore.getState().reset());

const setup = (onBlocked = vi.fn()) => {
  const user = userEvent.setup();
  render(
    <ProfileActions
      profileId="p01"
      profileName="Marek"
      onBlocked={onBlocked}
    />,
  );
  return { user, onBlocked };
};

describe('ProfileActions', () => {
  it('reports a profile with the chosen reason', async () => {
    const { user } = setup();

    await user.click(
      screen.getByRole('button', { name: 'Opcje profilu Marek' }),
    );
    await user.selectOptions(screen.getByLabelText('Powód zgłoszenia'), 'Spam');
    await user.click(screen.getByRole('button', { name: 'Zgłoś profil' }));

    expect(screen.getByText(/Zgłoszenie trafiło do moderacji/)).toBeVisible();
    expect(useModerationStore.getState().reports).toMatchObject([
      { profileId: 'p01', reason: 'Spam' },
    ]);
  });

  it('blocks a profile and notifies the parent', async () => {
    const { user, onBlocked } = setup();

    await user.click(
      screen.getByRole('button', { name: 'Opcje profilu Marek' }),
    );
    await user.click(screen.getByRole('button', { name: 'Zablokuj profil' }));

    expect(onBlocked).toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(useModerationStore.getState().blockedIds).toEqual(['p01']);
  });
});
