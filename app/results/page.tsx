'use client';

import { useState, useEffect } from 'react';
import { resultsAPI, Result } from '@/lib/api';

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const data = await resultsAPI.getAll();
      setResults(data);
    } catch (error) {
      console.error('Failed to fetch results:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRegionColor = (region: string) => {
    switch (region) {
      case 'NA':
        return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'EU':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'KR':
        return 'bg-red-500/20 text-red-400 border-red-500';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Tournament <span className="text-tyler1-red">Results</span>
        </h1>
        <p className="text-xl text-gray-400">
          Complete archive of all tournament outcomes
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Loading results...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12 bg-tyler1-grey rounded-lg border border-tyler1-dark">
          <p className="text-gray-400 text-lg">No results available yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-tyler1-grey rounded-lg border border-tyler1-dark p-6 hover:border-tyler1-red transition-colors"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold border ${getRegionColor(result.region)}`}>
                    {result.region}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{result.tournament}</h2>
                </div>
                <p className="text-gray-400">{result.date}</p>
              </div>

              {/* Winner & Runner-up */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Winner */}
                <div className="bg-tyler1-dark rounded-lg p-6 border-2 border-tyler1-gold">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">🏆</span>
                    <div>
                      <p className="text-sm text-gray-400">Winner</p>
                      <p className="text-2xl font-bold text-white">{result.winner}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Prize Pool</p>
                    <p className="text-xl font-bold text-green-400">${result.prize_pool.toLocaleString()}</p>
                  </div>
                </div>

                {/* Runner-up */}
                <div className="bg-tyler1-dark rounded-lg p-6 border border-gray-600">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">🥈</span>
                    <div>
                      <p className="text-sm text-gray-400">Runner-up</p>
                      <p className="text-xl font-bold text-white">{result.runner_up}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
