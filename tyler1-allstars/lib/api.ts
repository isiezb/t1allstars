const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Tournament {
  id: string;
  week: number;
  date: string;
  region: 'NA' | 'EU' | 'KR';
  status: 'complete' | 'live' | 'upcoming';
  participants: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Player {
  id: string;
  name: string;
  region: 'NA' | 'EU' | 'KR';
  title?: string;
  image?: string;
  description?: string;
  twitch?: string;
  champions?: string[];
  record?: string;
  points?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Standing {
  id: string;
  rank: number;
  name: string;
  region: 'NA' | 'EU' | 'KR';
  points: number;
  tournaments: number;
  wins: number;
  prize: number;
  created_at?: string;
  updated_at?: string;
}

export interface Result {
  id: string;
  tournament: string;
  date: string;
  winner: string;
  runner_up: string;
  region: 'NA' | 'EU' | 'KR';
  prize_pool: number;
  created_at?: string;
  updated_at?: string;
}

// Generic fetch function with error handling
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

// Tournament API calls
export const tournamentsAPI = {
  getAll: () => fetchAPI<Tournament[]>('/tournaments'),
  getByWeek: (week: number) => fetchAPI<Tournament>(`/tournaments/${week}`),
};

// Players API calls
export const playersAPI = {
  getAll: () => fetchAPI<Player[]>('/players'),
  getByName: (name: string) => fetchAPI<Player>(`/players/${name}`),
};

// Standings API calls
export const standingsAPI = {
  getAll: () => fetchAPI<Standing[]>('/standings'),
};

// Results API calls
export const resultsAPI = {
  getAll: () => fetchAPI<Result[]>('/results'),
};
