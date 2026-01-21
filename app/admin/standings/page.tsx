'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useEffect, useState } from 'react';
import { standingsAPI, adminStandingsAPI, Standing } from '@/lib/api';

export default function AdminStandings() {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStanding, setEditingStanding] = useState<Standing | null>(null);
  const [formData, setFormData] = useState({
    rank: 1,
    name: '',
    region: 'NA' as 'NA' | 'EU' | 'KR',
    tournaments: 0,
    wins: 0,
    prize: 0,
  });

  useEffect(() => {
    fetchStandings();
  }, []);

  const fetchStandings = async () => {
    try {
      const data = await standingsAPI.getAll();
      setStandings(data);
    } catch (error) {
      console.error('Failed to fetch standings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      if (editingStanding) {
        await adminStandingsAPI.update(editingStanding.id, formData, token);
      } else {
        await adminStandingsAPI.create(formData, token);
      }

      setShowForm(false);
      setEditingStanding(null);
      setFormData({ rank: 1, name: '', region: 'NA', tournaments: 0, wins: 0, prize: 0 });
      fetchStandings();
    } catch (error) {
      alert('Failed to save standing: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleEdit = (standing: Standing) => {
    setEditingStanding(standing);
    setFormData({
      rank: standing.rank,
      name: standing.name,
      region: standing.region,
      tournaments: standing.tournaments,
      wins: standing.wins,
      prize: standing.prize,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name} from standings?`)) return;

    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      await adminStandingsAPI.delete(id, token);
      fetchStandings();
    } catch (error) {
      alert('Failed to delete standing: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingStanding(null);
    setFormData({ rank: 1, name: '', region: 'NA', tournaments: 0, wins: 0, prize: 0 });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Standings <span className="text-tyler1-red">Management</span>
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add Standing'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-tyler1-grey rounded-lg border border-tyler1-dark p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingStanding ? 'Edit Standing' : 'Add New Standing'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Rank *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.rank}
                    onChange={(e) => setFormData({ ...formData, rank: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Player Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  <label className="block text-sm font-bold text-gray-300 mb-2">Tournaments</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.tournaments}
                    onChange={(e) => setFormData({ ...formData, tournaments: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Wins</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.wins}
                    onChange={(e) => setFormData({ ...formData, wins: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Prize Money ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.prize}
                    onChange={(e) => setFormData({ ...formData, prize: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors"
                >
                  {editingStanding ? 'Update Standing' : 'Create Standing'}
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

        {/* Standings Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading standings...</p>
          </div>
        ) : standings.length === 0 ? (
          <div className="text-center py-12 bg-tyler1-grey rounded-lg">
            <p className="text-gray-400 text-lg mb-4">No standings yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Add First Standing
            </button>
          </div>
        ) : (
          <div className="bg-tyler1-grey rounded-lg border border-tyler1-dark overflow-x-auto">
            <table className="w-full">
              <thead className="bg-tyler1-dark border-b border-tyler1-grey">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Rank</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Player</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Region</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Tournaments</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Wins</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Prize</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tyler1-dark">
                {standings.map((standing) => (
                  <tr key={standing.id} className="hover:bg-tyler1-dark transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xl font-bold text-white">
                        {standing.rank <= 3 ? ['🥇', '🥈', '🥉'][standing.rank - 1] : standing.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-white font-bold">{standing.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-white">{standing.region}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{standing.tournaments}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-white font-bold">{standing.wins}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-green-400 font-bold">${standing.prize.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(standing)}
                          className="text-blue-400 hover:text-blue-300 text-sm font-bold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(standing.id, standing.name)}
                          className="text-red-400 hover:text-red-300 text-sm font-bold"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
