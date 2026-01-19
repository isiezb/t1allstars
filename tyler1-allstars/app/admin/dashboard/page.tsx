'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { playersAPI, tournamentsAPI, standingsAPI, resultsAPI } from '@/lib/api';

interface Stats {
  players: number;
  tournaments: number;
  standings: number;
  results: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ players: 0, tournaments: 0, standings: 0, results: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [players, tournaments, standings, results] = await Promise.all([
          playersAPI.getAll(),
          tournamentsAPI.getAll(),
          standingsAPI.getAll(),
          resultsAPI.getAll(),
        ]);

        setStats({
          players: players.length,
          tournaments: tournaments.length,
          standings: standings.length,
          results: results.length,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Players', value: stats.players, icon: '👥', color: 'blue', href: '/admin/players' },
    { label: 'Tournaments', value: stats.tournaments, icon: '🏆', color: 'yellow', href: '/admin/tournaments' },
    { label: 'Standings Entries', value: stats.standings, icon: '📈', color: 'green', href: '/admin/standings' },
    { label: 'Results', value: stats.results, icon: '🎯', color: 'red', href: '/admin/results' },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'border-blue-500 bg-blue-500/10',
      yellow: 'border-yellow-500 bg-yellow-500/10',
      green: 'border-green-500 bg-green-500/10',
      red: 'border-tyler1-red bg-tyler1-red/10',
    };
    return colors[color] || colors.red;
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-white mb-8">
          Dashboard <span className="text-tyler1-red">Overview</span>
        </h1>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading statistics...</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {statCards.map((card) => (
                <Link
                  key={card.label}
                  href={card.href}
                  className={`border-2 rounded-lg p-6 transition-all hover:scale-105 ${getColorClasses(
                    card.color
                  )}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-400 text-sm font-bold">{card.label}</p>
                    <span className="text-3xl">{card.icon}</span>
                  </div>
                  <p className="text-4xl font-bold text-white">{card.value}</p>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-tyler1-grey rounded-lg border border-tyler1-dark p-6">
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/admin/players"
                  className="bg-tyler1-dark hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-center"
                >
                  + Add Player
                </Link>
                <Link
                  href="/admin/tournaments"
                  className="bg-tyler1-dark hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-center"
                >
                  + Add Tournament
                </Link>
                <Link
                  href="/admin/standings"
                  className="bg-tyler1-dark hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-center"
                >
                  + Update Standings
                </Link>
                <Link
                  href="/admin/results"
                  className="bg-tyler1-dark hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-center"
                >
                  + Add Result
                </Link>
                <Link
                  href="/admin/rules"
                  className="bg-tyler1-dark hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-center"
                >
                  📝 Edit Rules
                </Link>
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-8 bg-blue-900/20 border border-blue-500 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-2">💡 Getting Started</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Add players first to create your roster</li>
                <li>• Create tournaments with week numbers and regions</li>
                <li>• Update standings after each tournament</li>
                <li>• Record results with winners and prizes</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
