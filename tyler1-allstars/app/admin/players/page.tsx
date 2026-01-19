'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useEffect, useState } from 'react';
import { playersAPI, adminPlayersAPI, Player } from '@/lib/api';

export default function AdminPlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    region: 'NA' as 'NA' | 'EU' | 'KR',
    twitch: '',
    twitter: '',
    record: '',
    points: 0,
  });

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const data = await playersAPI.getAll();
      setPlayers(data);
    } catch (error) {
      console.error('Failed to fetch players:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      if (editingPlayer) {
        await adminPlayersAPI.update(editingPlayer.id, formData, token);
      } else {
        await adminPlayersAPI.create(formData, token);
      }

      setShowForm(false);
      setEditingPlayer(null);
      setFormData({ name: '', region: 'NA', twitch: '', twitter: '', record: '', points: 0 });
      fetchPlayers();
    } catch (error) {
      alert('Failed to save player: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleEdit = (player: Player) => {
    setEditingPlayer(player);
    setFormData({
      name: player.name,
      region: player.region,
      twitch: player.twitch || '',
      twitter: player.twitter || '',
      record: player.record || '',
      points: player.points || 0,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      await adminPlayersAPI.delete(id, token);
      fetchPlayers();
    } catch (error) {
      alert('Failed to delete player: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingPlayer(null);
    setFormData({ name: '', region: 'NA', twitch: '', twitter: '', record: '', points: 0 });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Players <span className="text-tyler1-red">Management</span>
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add Player'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-tyler1-grey rounded-lg border border-tyler1-dark p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingPlayer ? 'Edit Player' : 'Add New Player'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block text-sm font-bold text-gray-300 mb-2">Twitch Username</label>
                  <input
                    type="text"
                    value={formData.twitch}
                    onChange={(e) => setFormData({ ...formData, twitch: e.target.value })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                    placeholder="e.g., loltyler1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">X/Twitter Username</label>
                  <input
                    type="text"
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                    placeholder="e.g., loltyler1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Record</label>
                  <input
                    type="text"
                    value={formData.record}
                    onChange={(e) => setFormData({ ...formData, record: e.target.value })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                    placeholder="e.g., 2-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Points</label>
                  <input
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors"
                >
                  {editingPlayer ? 'Update Player' : 'Create Player'}
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

        {/* Players List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading players...</p>
          </div>
        ) : players.length === 0 ? (
          <div className="text-center py-12 bg-tyler1-grey rounded-lg">
            <p className="text-gray-400 text-lg mb-4">No players yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Add Your First Player
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player) => (
              <div
                key={player.id}
                className="bg-tyler1-grey rounded-lg border border-tyler1-dark p-6 hover:border-tyler1-red transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{player.name}</h3>
                    <p className="text-sm text-gray-400">{player.region}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(player)}
                      className="text-blue-400 hover:text-blue-300 text-sm font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(player.id, player.name)}
                      className="text-red-400 hover:text-red-300 text-sm font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  {player.twitch && (
                    <p className="text-gray-300">
                      <span className="text-gray-400">Twitch:</span> {player.twitch}
                    </p>
                  )}
                  {player.twitter && (
                    <p className="text-gray-300">
                      <span className="text-gray-400">Twitter:</span> {player.twitter}
                    </p>
                  )}
                  {player.record && (
                    <p className="text-gray-300">
                      <span className="text-gray-400">Record:</span> {player.record}
                    </p>
                  )}
                  {player.points !== undefined && (
                    <p className="text-gray-300">
                      <span className="text-gray-400">Points:</span> {player.points}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
