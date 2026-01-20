'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { vodsAPI, adminVODsAPI, VOD } from '@/lib/api';
import { useAdminCRUD } from '@/hooks/useAdminCRUD';

type VODFormData = {
  title: string;
  link: string;
  type: 'Full Stream' | 'Highlight' | 'POV Stream';
  date: string;
  duration?: string;
  description?: string;
  thumbnail?: string;
};

export default function AdminVODs() {
  const {
    items: vods,
    loading,
    showForm,
    setShowForm,
    editingItem: editingVOD,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    cancelForm,
  } = useAdminCRUD<VOD, VODFormData>({
    fetchAPI: vodsAPI,
    adminAPI: adminVODsAPI,
    initialFormData: {
      title: '',
      link: '',
      type: 'Full Stream',
      date: '',
      duration: '',
      description: '',
      thumbnail: '',
    },
    entityName: 'VOD',
  });

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            VODs <span className="text-tyler1-red">Management</span>
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add VOD'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-tyler1-grey rounded-lg border border-tyler1-dark p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingVOD ? 'Edit VOD' : 'Add New VOD'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                    placeholder="e.g., Week 2 - EU All Stars"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Link (URL) *</label>
                  <input
                    type="url"
                    required
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                    placeholder="https://twitch.tv/videos/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Type *</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'Full Stream' | 'Highlight' | 'POV Stream' })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                  >
                    <option value="Full Stream">Full Stream</option>
                    <option value="Highlight">Highlight</option>
                    <option value="POV Stream">POV Stream</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Date *</label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                    placeholder="e.g., Feb 3, 2026"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Duration</label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                    placeholder="e.g., 3:47:22"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Thumbnail URL</label>
                  <input
                    type="url"
                    value={formData.thumbnail || ''}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                    placeholder="https://..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-300 mb-2">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                    placeholder="Brief description of the VOD..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors"
                >
                  {editingVOD ? 'Update VOD' : 'Create VOD'}
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

        {/* VODs List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading VODs...</p>
          </div>
        ) : vods.length === 0 ? (
          <div className="text-center py-12 bg-tyler1-grey rounded-lg">
            <p className="text-gray-400 text-lg mb-4">No VODs yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Add First VOD
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vods.map((vod) => (
              <div
                key={vod.id}
                className="bg-tyler1-grey rounded-lg border border-tyler1-dark p-4 hover:border-tyler1-red transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        vod.type === 'Full Stream' ? 'bg-tyler1-red text-white' :
                        vod.type === 'Highlight' ? 'bg-tyler1-gold text-black' :
                        'bg-purple-600 text-white'
                      }`}>
                        {vod.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400">{vod.date}</span>
                    </div>
                    <h3 className="text-white font-bold mb-1">{vod.title}</h3>
                    {vod.duration && (
                      <p className="text-sm text-gray-400">{vod.duration}</p>
                    )}
                  </div>
                </div>

                {vod.description && (
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">{vod.description}</p>
                )}

                <div className="flex items-center gap-2 mb-3">
                  <a
                    href={vod.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-xs font-bold truncate flex-1"
                  >
                    {vod.link}
                  </a>
                </div>

                <div className="flex gap-3 pt-3 border-t border-tyler1-dark">
                  <button
                    onClick={() => handleEdit(vod)}
                    className="text-blue-400 hover:text-blue-300 text-sm font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(vod.id, vod.title)}
                    className="text-red-400 hover:text-red-300 text-sm font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
