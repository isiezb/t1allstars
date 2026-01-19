'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useEffect, useState } from 'react';
import { resultsAPI, adminResultsAPI, Result } from '@/lib/api';

export default function AdminResults() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingResult, setEditingResult] = useState<Result | null>(null);
  const [formData, setFormData] = useState({
    tournament: '',
    date: '',
    winner: '',
    runner_up: '',
    region: 'NA' as 'NA' | 'EU' | 'KR',
    prize_pool: 0,
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      if (editingResult) {
        await adminResultsAPI.update(editingResult.id, formData, token);
      } else {
        await adminResultsAPI.create(formData, token);
      }

      setShowForm(false);
      setEditingResult(null);
      setFormData({ tournament: '', date: '', winner: '', runner_up: '', region: 'NA', prize_pool: 0 });
      fetchResults();
    } catch (error) {
      alert('Failed to save result: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleEdit = (result: Result) => {
    setEditingResult(result);
    setFormData({
      tournament: result.tournament,
      date: result.date,
      winner: result.winner,
      runner_up: result.runner_up,
      region: result.region,
      prize_pool: result.prize_pool,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string, tournament: string) => {
    if (!confirm(`Are you sure you want to delete result for ${tournament}?`)) return;

    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      await adminResultsAPI.delete(id, token);
      fetchResults();
    } catch (error) {
      alert('Failed to delete result: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingResult(null);
    setFormData({ tournament: '', date: '', winner: '', runner_up: '', region: 'NA', prize_pool: 0 });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Results <span className="text-tyler1-red">Management</span>
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add Result'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-tyler1-grey rounded-lg border border-tyler1-dark p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingResult ? 'Edit Result' : 'Add New Result'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Tournament Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.tournament}
                    onChange={(e) => setFormData({ ...formData, tournament: e.target.value })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                    placeholder="e.g., Week 2 - EU All Stars"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Date *</label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                    placeholder="e.g., February 3, 2026"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Winner *</label>
                  <input
                    type="text"
                    required
                    value={formData.winner}
                    onChange={(e) => setFormData({ ...formData, winner: e.target.value })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Runner-up *</label>
                  <input
                    type="text"
                    required
                    value={formData.runner_up}
                    onChange={(e) => setFormData({ ...formData, runner_up: e.target.value })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Region *</label>
                  <select
                    required
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value as 'NA' | 'EU' | 'KR' })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                  >
                    <option value="NA">NA</option>
                    <option value="EU">EU</option>
                    <option value="KR">KR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Prize Pool ($) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.prize_pool}
                    onChange={(e) => setFormData({ ...formData, prize_pool: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors"
                >
                  {editingResult ? 'Update Result' : 'Create Result'}
                </button>
                <button
                  type="button"
                  onClick={cancelForm}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Results List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading results...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12 bg-tyler1-grey rounded-lg">
            <p className="text-gray-400 text-lg mb-4">No results yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Add First Result
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {results.map((result) => (
              <div
                key={result.id}
                className="bg-tyler1-grey rounded-lg border border-tyler1-dark p-6 hover:border-tyler1-red transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{result.tournament}</h3>
                    <p className="text-sm text-gray-400">{result.date}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(result)}
                      className="text-blue-400 hover:text-blue-300 text-sm font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(result.id, result.tournament)}
                      className="text-red-400 hover:text-red-300 text-sm font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-tyler1-dark rounded-lg p-4 border-2 border-tyler1-gold">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">🏆</span>
                      <div>
                        <p className="text-xs text-gray-400">Champion</p>
                        <p className="text-xl font-bold text-white">{result.winner}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">
                      <span className="font-bold text-white">{result.region}</span> • Prize:
                      <span className="text-green-400 font-bold ml-1">${result.prize_pool.toLocaleString()}</span>
                    </p>
                  </div>

                  <div className="bg-tyler1-dark rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🥈</span>
                      <div>
                        <p className="text-xs text-gray-400">Runner-up</p>
                        <p className="text-xl font-bold text-white">{result.runner_up}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">
                      <span className="font-bold text-white">{result.region}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
