'use client';

import { useState } from 'react';
import { pl } from '@/messages/pl';
import { REPORT_REASONS, type ReportReason } from '../schemas';
import { useModerationStore } from '../store';

type ProfileActionsProps = {
  profileId: string;
  profileName: string;
  onBlocked?: () => void;
};

export const ProfileActions = ({
  profileId,
  profileName,
  onBlocked,
}: ProfileActionsProps) => {
  const { report, block } = useModerationStore();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<ReportReason>(REPORT_REASONS[0]);
  const [reported, setReported] = useState(false);

  const close = () => {
    setOpen(false);
    setReported(false);
  };

  return (
    <>
      <button
        aria-label={pl.moderation.open(profileName)}
        onClick={() => setOpen(true)}
        className="size-9 rounded-full bg-black/40 text-lg text-white"
      >
        ⋯
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="moderation-title"
          className="fixed inset-0 z-20 flex items-end justify-center bg-black/70 p-4 sm:items-center"
        >
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-3xl bg-zinc-900 p-6 ring-1 ring-white/10">
            <h2
              id="moderation-title"
              className="text-lg font-semibold text-white"
            >
              {profileName}
            </h2>
            {reported ? (
              <p className="text-sm text-zinc-300">{pl.moderation.reported}</p>
            ) : (
              <>
                <label className="flex flex-col gap-1 text-xs text-zinc-400">
                  {pl.moderation.reason}
                  <select
                    value={reason}
                    onChange={(event) =>
                      setReason(event.target.value as ReportReason)
                    }
                    className="rounded-lg bg-zinc-800 px-2 py-2 text-sm text-zinc-100"
                  >
                    {REPORT_REASONS.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <button
                  onClick={() => {
                    report(profileId, reason);
                    setReported(true);
                  }}
                  className="rounded-full bg-zinc-800 py-3 text-sm font-medium text-white"
                >
                  {pl.moderation.report}
                </button>
                <button
                  onClick={() => {
                    block(profileId);
                    close();
                    onBlocked?.();
                  }}
                  className="rounded-full bg-red-600 py-3 text-sm font-medium text-white"
                >
                  {pl.moderation.block}
                </button>
              </>
            )}
            <button onClick={close} className="text-sm text-zinc-400 underline">
              {reported ? pl.moderation.close : pl.moderation.cancel}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
