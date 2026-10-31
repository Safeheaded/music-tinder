import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MotionGlobalConfig } from 'framer-motion';
import { beforeEach, describe, expect, it } from 'vitest';
import { useModerationStore } from '@/features/moderation';
import { useDiscoverStore } from '../store';
import { DiscoverScreen } from './DiscoverScreen';

MotionGlobalConfig.skipAnimations = true;

beforeEach(() => {
  useDiscoverStore.getState().reset();
  useModerationStore.getState().reset();
});

describe('DiscoverScreen', () => {
  it('shows the first profile and advances after a pass', async () => {
    const user = userEvent.setup();
    render(<DiscoverScreen />);
    expect(await screen.findByRole('article', { name: 'Marek' })).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Pomiń' }));

    expect(await screen.findByRole('article', { name: 'Ola' })).toBeVisible();
  });

  it('shows the match dialog when liking a profile that likes back', async () => {
    const user = userEvent.setup();
    render(<DiscoverScreen />);

    await user.click(await screen.findByRole('button', { name: 'Polub' }));

    expect(await screen.findByRole('dialog')).toHaveTextContent('To match!');
  });

  it('shows only profiles matching the selected role', async () => {
    const user = userEvent.setup();
    render(<DiscoverScreen />);

    await user.selectOptions(await screen.findByLabelText('Rola'), 'DJ');

    expect(await screen.findByRole('article', { name: 'Magda' })).toBeVisible();
  });

  it('shows the empty state when filters leave no profiles', async () => {
    const user = userEvent.setup();
    render(<DiscoverScreen />);

    await user.selectOptions(await screen.findByLabelText('Rola'), 'DJ');
    await user.selectOptions(screen.getByLabelText('Styl'), 'Metal');

    expect(await screen.findByText('Na dziś to wszystko')).toBeVisible();
  });

  it('hides a blocked profile from the deck', async () => {
    const user = userEvent.setup();
    render(<DiscoverScreen />);

    await user.click(
      await screen.findByRole('button', { name: 'Opcje profilu Marek' }),
    );
    await user.click(screen.getByRole('button', { name: 'Zablokuj profil' }));

    expect(await screen.findByRole('article', { name: 'Ola' })).toBeVisible();
    expect(screen.queryByRole('article', { name: 'Marek' })).toBeNull();
  });
});
