import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useDiscoverStore } from '@/features/discover';
import { useChatStore } from '../store';
import { ChatList } from './ChatList';

beforeEach(() => {
  useDiscoverStore.getState().reset();
  useChatStore.getState().reset();
});

describe('ChatList', () => {
  it('invites to match when there are no matches', async () => {
    render(<ChatList />);

    expect(await screen.findByText(/Nie masz jeszcze matchy/)).toBeVisible();
  });

  it('lists matched profiles', async () => {
    useDiscoverStore.getState().swipe('p01', 'like');
    render(<ChatList />);

    expect(await screen.findByRole('link', { name: /Marek/ })).toHaveAttribute(
      'href',
      '/chats/p01',
    );
  });
});
