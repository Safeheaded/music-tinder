'use client';

import { useState } from 'react';
import { useHydrated } from '@/lib/use-hydrated';
import { pl } from '@/messages/pl';
import { hasActiveFilters } from '../filters';
import { EMPTY_FILTERS, type Profile, type SwipeDirection } from '../schemas';
import { selectDeck } from '../selectors';
import { useDiscoverStore } from '../store';
import { FilterBar } from './FilterBar';
import { MatchDialog } from './MatchDialog';
import { SwipeCard } from './SwipeCard';

export const DiscoverScreen = () => {
  const hydrated = useHydrated();
  const { decisions, filters, swipe, setFilters } = useDiscoverStore();
  const [leaving, setLeaving] = useState<SwipeDirection | null>(null);
  const [matched, setMatched] = useState<Profile | null>(null);

  const deck = selectDeck(decisions, filters);
  const current = deck[0];

  const commitSwipe = () => {
    if (!current || !leaving) return;
    const isMatch = swipe(current.id, leaving);
    setLeaving(null);
    if (isMatch) setMatched(current);
  };

  if (!hydrated) return null;

  return (
    <section className="flex h-full flex-col gap-4 p-4">
      <FilterBar filters={filters} onChange={setFilters} />
      <div className="relative min-h-0 flex-1">
        {current ? (
          <SwipeCard
            key={current.id}
            profile={current}
            leaving={leaving}
            onSwipe={setLeaving}
            onExited={commitSwipe}
          />
        ) : (
          <EmptyState
            canClearFilters={hasActiveFilters(filters)}
            onClearFilters={() => setFilters(EMPTY_FILTERS)}
          />
        )}
      </div>
      <div className="flex justify-center gap-8 pb-2">
        <ActionButton
          label={pl.discover.pass}
          disabled={!current || !!leaving}
          onClick={() => setLeaving('pass')}
          className="bg-zinc-800 text-zinc-200"
        >
          ✕
        </ActionButton>
        <ActionButton
          label={pl.discover.like}
          disabled={!current || !!leaving}
          onClick={() => setLeaving('like')}
          className="bg-fuchsia-600 text-white"
        >
          ♥
        </ActionButton>
      </div>
      {matched && (
        <MatchDialog profile={matched} onClose={() => setMatched(null)} />
      )}
    </section>
  );
};

type ActionButtonProps = {
  label: string;
  disabled: boolean;
  onClick: () => void;
  className: string;
  children: string;
};

const ActionButton = ({
  label,
  disabled,
  onClick,
  className,
  children,
}: ActionButtonProps) => (
  <button
    aria-label={label}
    disabled={disabled}
    onClick={onClick}
    className={`size-16 rounded-full text-2xl shadow-lg disabled:opacity-40 ${className}`}
  >
    {children}
  </button>
);

type EmptyStateProps = {
  canClearFilters: boolean;
  onClearFilters: () => void;
};

const EmptyState = ({ canClearFilters, onClearFilters }: EmptyStateProps) => (
  <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
    <h2 className="text-xl font-semibold text-white">{pl.discover.empty}</h2>
    <p className="text-sm text-zinc-400">{pl.discover.emptyHint}</p>
    {canClearFilters && (
      <button onClick={onClearFilters} className="text-fuchsia-400 underline">
        {pl.discover.clearFilters}
      </button>
    )}
  </div>
);
