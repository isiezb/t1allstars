export type TournamentStatus = 'complete' | 'live' | 'upcoming';

export const STATUS_STYLES: Record<TournamentStatus, string> = {
  complete: 'bg-gray-700 text-gray-300',
  live: 'bg-red-900/30 text-tyler1-red border border-tyler1-red',
  upcoming: 'bg-green-900/30 text-green-400 border border-green-600',
};

export function getStatusBadge(status: string): string {
  return STATUS_STYLES[status as TournamentStatus] || STATUS_STYLES.upcoming;
}
