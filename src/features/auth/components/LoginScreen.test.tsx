import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { useAuthStore } from '../store';
import { LoginScreen } from './LoginScreen';

beforeEach(() => useAuthStore.getState().signOut());

describe('LoginScreen', () => {
  it('keeps the real providers disabled in the mockup', () => {
    render(<LoginScreen />);

    expect(screen.getByRole('button', { name: /Google/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /e-mailem/ })).toBeDisabled();
  });

  it('signs in with the demo account', async () => {
    const user = userEvent.setup();
    render(<LoginScreen />);

    await user.click(screen.getByRole('button', { name: 'Wejdź jako demo' }));

    expect(useAuthStore.getState().loggedIn).toBe(true);
  });
});
