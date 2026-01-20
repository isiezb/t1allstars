'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useEffect, useState } from 'react';
import { tournamentsAPI, adminTournamentsAPI, Tournament, playersAPI, Player } from '@/lib/api';
import { getStatusBadge } from '@/lib/status';

export default function AdminTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTournament, setEditingTournament] = useState<Tournament | null>(null);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    week: 1,
    date: '',
    time: '',
    region: 'NA' as 'NA' | 'EU' | 'KR',
    status: 'upcoming' as 'complete' | 'live' | 'upcoming',
  });
  const [showAllRegions, setShowAllRegions] = useState(false);

  useEffect(() => {
    fetchTournaments();
    fetchPlayers();
  }, []);

  const fetchTournaments = async () => {
    try {
      const data = await tournamentsAPI.getAll();
      setTournaments(data);
    } catch (error) {
      console.error('Failed to fetch tournaments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlayers = async () => {
    try {
      const data = await playersAPI.getAll();
      setPlayers(data);
    } catch (error) {
      console.error('Failed to fetch players:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      // Combine date and time to create ISO datetime in CST
      // CST is UTC-6, so we need to convert to UTC
      const dateTimeStr = `${formData.date}T${formData.time}:00`;
      const localDate = new Date(dateTimeStr);

      // Convert CST to UTC (add 6 hours)
      const utcDate = new Date(localDate.getTime() + (6 * 60 * 60 * 1000));

      const tournamentData = {
        week: formData.week,
        date: utcDate.toISOString(),
        region: formData.region,
        status: formData.status,
        participants: selectedParticipants,
      };

      if (editingTournament) {
        await adminTournamentsAPI.update(editingTournament.id, tournamentData, token);
      } else {
        await adminTournamentsAPI.create(tournamentData, token);
      }

      setShowForm(false);
      setEditingTournament(null);
      setSelectedParticipants([]);
      setFormData({ week: 1, date: '', time: '', region: 'NA', status: 'upcoming' });
      fetchTournaments();
    } catch (error) {
      alert('Failed to save tournament: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleEdit = (tournament: Tournament) => {
    setEditingTournament(tournament);

    // Convert ISO datetime back to CST for editing
    const utcDate = new Date(tournament.date);
    const cstDate = new Date(utcDate.getTime() - (6 * 60 * 60 * 1000));

    const dateStr = cstDate.toISOString().split('T')[0];
    const timeStr = cstDate.toTimeString().slice(0, 5);

    setFormData({
      week: tournament.week,
      date: dateStr,
      time: timeStr,
      region: tournament.region,
      status: tournament.status,
    });
    setSelectedParticipants(tournament.participants);
    setShowForm(true);
  };

  const handleDelete = async (id: string | number, week: number) => {
    if (!confirm(`Are you sure you want to delete Week ${week}?`)) return;

    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      await adminTournamentsAPI.delete(id, token);
      fetchTournaments();
    } catch (error) {
      alert('Failed to delete tournament: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingTournament(null);
    setSelectedParticipants([]);
    setFormData({ week: 1, date: '', time: '', region: 'NA', status: 'upcoming' });
  };

  const toggleParticipant = (playerName: string) => {
    setSelectedParticipants(prev =>
      prev.includes(playerName)
        ? prev.filter(name => name !== playerName)
        : [...prev, playerName]
    );
  };


  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Tournaments <span className="text-tyler1-red">Management</span>
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add Tournament'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-tyler1-grey rounded-lg border border-tyler1-dark p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingTournament ? 'Edit Tournament' : 'Add New Tournament'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Week Number *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.week}
                      onChange={(e) => setFormData({ ...formData, week: Number(e.target.value) })}
                      className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Date (CST) *</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Time (CST) *</label>
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                      placeholder="20:00"
                    />
                  </div>
                </div>

                <p className="text-xs text-gray-500">Enter date and time in CST (Central Standard Time)</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <label className="block text-sm font-bold text-gray-300 mb-2">Status *</label>
                    <select
                      required
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'complete' | 'live' | 'upcoming' })}
                      className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="live">Live</option>
                      <option value="complete">Complete</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-bold text-gray-300">
                      Select Participants ({selectedParticipants.length} selected)
                    </label>
                    <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={showAllRegions}
                        onChange={(e) => setShowAllRegions(e.target.checked)}
                        className="w-3 h-3 rounded"
                      />
                      Show All Regions
                    </label>
                  </div>
                  
                  {selectedParticipants.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3 p-2 bg-tyler1-dark/50 rounded border border-tyler1-grey/50">
                      {selectedParticipants.map(name => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => toggleParticipant(name)}
                          className="bg-tyler1-red/20 text-tyler1-red border border-tyler1-red px-2 py-1 rounded text-xs flex items-center gap-1 hover:bg-tyler1-red hover:text-white transition-colors"
                        >
                          {name} <span>×</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="bg-tyler1-dark border border-tyler1-grey rounded p-4 max-h-64 overflow-y-auto">
                    {players.length === 0 ? (
                      <p className="text-gray-400 text-sm">No players available. Add players first.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {players
                          .filter(p => showAllRegions || p.region === formData.region || selectedParticipants.includes(p.name))
                          .sort((a, b) => {
                            const aSelected = selectedParticipants.includes(a.name);
                            const bSelected = selectedParticipants.includes(b.name);
                            if (aSelected && !bSelected) return -1;
                            if (!aSelected && bSelected) return 1;
                            return a.name.localeCompare(b.name);
                          })
                          .map((player) => (
                            <label
                              key={player.name}
                              className={`flex items-center gap-2 cursor-pointer p-2 rounded transition-colors ${
                                selectedParticipants.includes(player.name) 
                                  ? 'bg-tyler1-red/10 border border-tyler1-red/30' 
                                  : 'hover:bg-tyler1-grey'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={selectedParticipants.includes(player.name)}
                                onChange={() => toggleParticipant(player.name)}
                                className="w-4 h-4 text-tyler1-red bg-tyler1-dark border-gray-600 rounded focus:ring-tyler1-red focus:ring-2"
                              />
                              <span className="text-white text-sm">{player.name}</span>
                              <span className="text-xs text-gray-400">({player.region})</span>
                            </label>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors"
                >
                  {editingTournament ? 'Update Tournament' : 'Create Tournament'}
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

        {/* Tournaments List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading tournaments...</p>
          </div>
        ) : tournaments.length === 0 ? (
          <div className="text-center py-12 bg-tyler1-grey rounded-lg">
            <p className="text-gray-400 text-lg mb-4">No tournaments yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Add Your First Tournament
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="bg-tyler1-grey rounded-lg border border-tyler1-dark p-6 hover:border-tyler1-red transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Week {tournament.week}</h3>
                    <p className="text-sm text-gray-400">{tournament.date}</p>
                    <p className="text-lg font-bold text-white mt-1">{tournament.region}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleEdit(tournament)}
                      className="text-blue-400 hover:text-blue-300 text-sm font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(tournament.id, tournament.week)}
                      className="text-red-400 hover:text-red-300 text-sm font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className={`inline-block px-3 py-1 rounded text-xs font-bold mb-4 ${getStatusBadge(tournament.status)}`}>
                  {tournament.status.toUpperCase()}
                </div>

                {tournament.participants.length > 0 && (
                  <div>
                    <p className="text-gray-400 text-xs mb-2">{tournament.participants.length} Participants:</p>
                    <div className="flex flex-wrap gap-1">
                      {tournament.participants.slice(0, 4).map((participant, idx) => (
                        <span
                          key={idx}
                          className="bg-tyler1-dark text-xs px-2 py-1 rounded text-white"
                        >
                          {participant}
                        </span>
                      ))}
                      {tournament.participants.length > 4 && (
                        <span className="bg-tyler1-dark text-xs px-2 py-1 rounded text-gray-400">
                          +{tournament.participants.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
