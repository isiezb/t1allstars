'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminApplication() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchApplicationUrl();
  }, []);

  const fetchApplicationUrl = async () => {
    try {
      const response = await fetch(`${API_URL}/application-url`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setUrl(data.url || '');
    } catch (error) {
      console.error('Error fetching application URL:', error);
      setMessage({ type: 'error', text: 'Failed to load application URL' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/application-url`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error('Failed to update');

      setMessage({ type: 'success', text: 'Application URL updated successfully!' });
    } catch (error) {
      console.error('Error updating application URL:', error);
      setMessage({ type: 'error', text: 'Failed to update application URL' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-white mb-8">
          Application <span className="text-tyler1-red">URL</span>
        </h1>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-900/30 border border-green-500 text-green-400'
              : 'bg-red-900/30 border border-red-500 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading...</p>
          </div>
        ) : (
          <div className="bg-tyler1-grey rounded-lg border border-tyler1-dark p-6">
            <h2 className="text-xl font-bold text-white mb-4">Google Form URL</h2>
            <p className="text-gray-400 mb-6">
              Set the Google Form URL that users will be redirected to when they click "Apply Here" on the Apply page.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Application Form URL *
                </label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-2 bg-tyler1-dark border border-tyler1-grey rounded text-white focus:outline-none focus:border-tyler1-red"
                  placeholder="https://forms.google.com/..."
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save URL'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500 rounded-lg">
              <p className="text-blue-400 text-sm">
                <strong>💡 Tip:</strong> Create a Google Form at forms.google.com, then copy the form's URL and paste it here.
              </p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
