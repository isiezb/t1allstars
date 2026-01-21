export type Region = 'NA' | 'EU' | 'KR';

export const REGION_FLAG_CODES: Record<Region, string> = {
  NA: 'us',
  EU: 'eu',
  KR: 'kr',
};

export const REGION_COLORS: Record<Region, string> = {
  NA: 'bg-blue-500/20 text-blue-400 border-blue-500',
  EU: 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
  KR: 'bg-red-500/20 text-red-400 border-red-500',
};

export function getRegionFlag(region: string): string {
  const code = REGION_FLAG_CODES[region as Region] || 'un';
  return `https://flagcdn.com/w40/${code}.png`;
}

export function getRegionColor(region: string): string {
  return REGION_COLORS[region as Region] || 'bg-gray-500/20 text-gray-400 border-gray-500';
}

export function getRegionTextColor(region: string): string {
  const textColors: Record<Region, string> = {
    NA: 'text-blue-400',
    EU: 'text-yellow-400',
    KR: 'text-red-400',
  };
  return textColors[region as Region] || 'text-gray-400';
}
