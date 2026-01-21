'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useEffect, useState } from 'react';
import { rulesAPI, adminRulesAPI } from '@/lib/api';

export default function AdminRules() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const data = await rulesAPI.get();
      setContent(data.content || '');
    } catch (error) {
      console.error('Failed to fetch rules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    setSaving(true);
    try {
      await adminRulesAPI.update(content, token);
      alert('Rules updated successfully!');
    } catch (error) {
      alert('Failed to save rules: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Rules <span className="text-tyler1-red">Management</span>
          </h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Rules'}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading rules...</p>
          </div>
        ) : (
          <div className="bg-tyler1-grey rounded-lg border border-tyler1-dark p-6">
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-300 mb-2">
                Rules Content (Markdown supported)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red font-mono text-sm"
                rows={25}
                placeholder="Enter rules content here in markdown format..."
              />
              <p className="text-xs text-gray-500 mt-2">
                You can use markdown formatting: **bold**, *italic*, # headings, - bullet points, etc.
              </p>
            </div>

            <div className="bg-tyler1-dark rounded-lg p-6 border border-tyler1-grey">
              <h3 className="text-lg font-bold text-white mb-4">Preview:</h3>
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 whitespace-pre-wrap">
                  {content || 'No content yet...'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
