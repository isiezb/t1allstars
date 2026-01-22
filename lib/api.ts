const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Tournament {
  id: number;
  week: number;
  date: string;
  region: 'NA' | 'EU' | 'KR';
  status: 'complete' | 'live' | 'upcoming';
  participants: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Player {
  id: number;
  name: string;
  region: 'NA' | 'EU' | 'KR';
  image?: string;
  description?: string;
  twitch?: string;
  twitter?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Standing {
  id: number;
  rank: number;
  name: string;
  region: 'NA' | 'EU' | 'KR';
  tournaments: number;
  wins: number;
  prize: number;
  created_at?: string;
  updated_at?: string;
}

export interface Result {
  id: number;
  tournament: string;
  date: string;
  winner: string;
  runner_up: string;
  region: 'NA' | 'EU' | 'KR';
  prize_pool: number;
  created_at?: string;
  updated_at?: string;
}

export interface Rules {
  id: string | null;
  content: string;
  created_at?: string;
  updated_at?: string | null;
}

export interface VOD {
  id: number;
  title: string;
  link: string;
  type: 'Full Stream' | 'Highlight' | 'POV Stream' | 'Short';
  date: string;
  duration?: string;
  description?: string;
  thumbnail?: string;
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
      // Disable Next.js caching - always fetch fresh data
      cache: 'no-store',
      next: { revalidate: 0 },
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

// Rules API calls
export const rulesAPI = {
  get: () => fetchAPI<Rules>('/rules'),
};

// VOD API calls
export const vodsAPI = {
  getAll: () => fetchAPI<VOD[]>('/vods'),
  getByType: (type: string) => fetchAPI<VOD[]>(`/vods?type=${type}`),
};

// Admin API calls (requires authentication token)
async function fetchAdminAPI<T>(
  endpoint: string,
  options?: RequestInit,
  token?: string
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

export const authAPI = {
  login: (email: string, password: string) =>
    fetchAPI<{ token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};

export const adminPlayersAPI = {
  create: (player: Omit<Player, 'id' | 'created_at' | 'updated_at'>, token: string) =>
    fetchAdminAPI<Player>('/players', { method: 'POST', body: JSON.stringify(player) }, token),
  update: (id: string | number, player: Partial<Player>, token: string) =>
    fetchAdminAPI<Player>(`/players/${id}`, { method: 'PUT', body: JSON.stringify(player) }, token),
  delete: (id: string | number, token: string) =>
    fetchAdminAPI<{ message: string }>(`/players/${id}`, { method: 'DELETE' }, token),
};

export const adminTournamentsAPI = {
  create: (tournament: Omit<Tournament, 'id' | 'created_at' | 'updated_at'>, token: string) =>
    fetchAdminAPI<Tournament>('/tournaments', { method: 'POST', body: JSON.stringify(tournament) }, token),
  update: (id: string | number, tournament: Partial<Tournament>, token: string) =>
    fetchAdminAPI<Tournament>(`/tournaments/${id}`, { method: 'PUT', body: JSON.stringify(tournament) }, token),
  delete: (id: string | number, token: string) =>
    fetchAdminAPI<{ message: string }>(`/tournaments/${id}`, { method: 'DELETE' }, token),
};

export const adminStandingsAPI = {
  create: (standing: Omit<Standing, 'id' | 'created_at' | 'updated_at'>, token: string) =>
    fetchAdminAPI<Standing>('/standings', { method: 'POST', body: JSON.stringify(standing) }, token),
  update: (id: string | number, standing: Partial<Standing>, token: string) =>
    fetchAdminAPI<Standing>(`/standings/${id}`, { method: 'PUT', body: JSON.stringify(standing) }, token),
  delete: (id: string | number, token: string) =>
    fetchAdminAPI<{ message: string }>(`/standings/${id}`, { method: 'DELETE' }, token),
};

export const adminResultsAPI = {
  create: (result: Omit<Result, 'id' | 'created_at' | 'updated_at'>, token: string) =>
    fetchAdminAPI<Result>('/results', { method: 'POST', body: JSON.stringify(result) }, token),
  update: (id: string | number, result: Partial<Result>, token: string) =>
    fetchAdminAPI<Result>(`/results/${id}`, { method: 'PUT', body: JSON.stringify(result) }, token),
  delete: (id: string | number, token: string) =>
    fetchAdminAPI<{ message: string }>(`/results/${id}`, { method: 'DELETE' }, token),
};

export const adminRulesAPI = {
  update: (content: string, token: string) =>
    fetchAdminAPI<Rules>('/rules', { method: 'PUT', body: JSON.stringify({ content }) }, token),
};

export const adminVODsAPI = {
  create: (vod: { link: string; type: 'Full Stream' | 'Highlight' | 'POV Stream' | 'Short' }, token: string) =>
    fetchAdminAPI<VOD>('/vods', { method: 'POST', body: JSON.stringify(vod) }, token),
  update: (id: string | number, vod: { link: string; type: 'Full Stream' | 'Highlight' | 'POV Stream' | 'Short' }, token: string) =>
    fetchAdminAPI<VOD>(`/vods/${id}`, { method: 'PUT', body: JSON.stringify(vod) }, token),
  delete: (id: string | number, token: string) =>
    fetchAdminAPI<{ message: string }>(`/vods/${id}`, { method: 'DELETE' }, token),
};
