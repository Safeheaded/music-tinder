export const REPORT_REASONS = [
  'Spam',
  'Fałszywy profil',
  'Niewłaściwe treści',
] as const;

export type ReportReason = (typeof REPORT_REASONS)[number];

export type Report = {
  id: string;
  profileId: string;
  reason: ReportReason;
  createdAt: number;
};
