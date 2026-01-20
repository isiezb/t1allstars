'use client';

import { useState, useEffect } from 'react';
import { vodsAPI, VOD } from '@/lib/api';

export default function VODsPage() {
  const [vods, setVods] = useState<VOD[]>([]);
  const [filteredVods, setFilteredVods] = useState<VOD[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVods = async () => {
      try {
        const data = await vodsAPI.getAll();
        setVods(data);
        setFilteredVods(data);
      } catch (error) {
        console.error('Failed to fetch VODs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVods();
  }, []);

  const handleFilter = (filterType: string) => {
    setActiveFilter(filterType);

    if (filterType === 'all') {
      setFilteredVods(vods);
    } else {
      const filtered = vods.filter(vod => {
        if (filterType === 'Full Stream') return vod.type === 'Full Stream';
        if (filterType === 'Highlight') return vod.type === 'Highlight';
        if (filterType === 'POV Stream') return vod.type === 'POV Stream';
        return true;
      });
      setFilteredVods(filtered);
    }
  };

  const getVodIcon = (link: string) => {
    if (link.includes('youtube.com') || link.includes('youtu.be')) {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    } else if (link.includes('twitch.tv')) {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
        </svg>
      );
    }
    return null;
  };

  const getPlatformText = (link: string) => {
    if (link.includes('youtube.com') || link.includes('youtu.be')) return 'Watch on YouTube';
    if (link.includes('twitch.tv')) return 'Watch on Twitch';
    return 'Watch VOD';
  };

  const getPlatformColor = (link: string) => {
    if (link.includes('youtube.com') || link.includes('youtu.be')) return 'text-red-500 hover:text-red-400';
    if (link.includes('twitch.tv')) return 'text-purple-400 hover:text-purple-300';
    return 'text-blue-400 hover:text-blue-300';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Video on <span className="text-tyler1-red">Demand</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Watch past tournaments and highlights
        </p>
      </div>

      {/* Filter Options */}
      <div className="mb-8 flex justify-center gap-4 flex-wrap">
        <button
          onClick={() => handleFilter('all')}
          className={`px-6 py-2 font-bold rounded transition-colors ${
            activeFilter === 'all'
              ? 'bg-tyler1-red text-white'
              : 'bg-tyler1-grey text-gray-300 hover:bg-gray-700'
          }`}
        >
          All VODs
        </button>
        <button
          onClick={() => handleFilter('Full Stream')}
          className={`px-6 py-2 font-bold rounded transition-colors ${
            activeFilter === 'Full Stream'
              ? 'bg-tyler1-red text-white'
              : 'bg-tyler1-grey text-gray-300 hover:bg-gray-700'
          }`}
        >
          Full Tournaments
        </button>
        <button
          onClick={() => handleFilter('Highlight')}
          className={`px-6 py-2 font-bold rounded transition-colors ${
            activeFilter === 'Highlight'
              ? 'bg-tyler1-red text-white'
              : 'bg-tyler1-grey text-gray-300 hover:bg-gray-700'
          }`}
        >
          Highlights
        </button>
        <button
          onClick={() => handleFilter('POV Stream')}
          className={`px-6 py-2 font-bold rounded transition-colors ${
            activeFilter === 'POV Stream'
              ? 'bg-tyler1-red text-white'
              : 'bg-tyler1-grey text-gray-300 hover:bg-gray-700'
          }`}
        >
          POV Streams
        </button>
      </div>

      {/* VOD Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Loading VODs...</p>
        </div>
      ) : filteredVods.length === 0 ? (
        <div className="text-center py-12 bg-tyler1-grey rounded-lg">
          <p className="text-gray-400 text-lg">
            {activeFilter === 'all'
              ? 'No VODs available yet. Check back soon!'
              : `No ${activeFilter} VODs available yet.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVods.map((vod) => (
            <div key={vod.id} className="bg-tyler1-grey rounded-lg overflow-hidden border border-tyler1-dark hover:border-tyler1-red transition-all duration-300 group">
              <div className="aspect-video bg-gradient-to-br from-tyler1-dark to-tyler1-grey flex items-center justify-center relative">
                {vod.thumbnail ? (
                  <img
                    src={vod.thumbnail}
                    alt={vod.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-tyler1-red rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                )}
                {vod.duration && (
                  <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-sm text-white">
                    {vod.duration}
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    vod.type === 'Full Stream' ? 'bg-tyler1-red text-white' :
                    vod.type === 'Highlight' ? 'bg-tyler1-gold text-black' :
                    'bg-purple-600 text-white'
                  }`}>
                    {vod.type === 'Full Stream' ? 'FULL VOD' :
                     vod.type === 'Highlight' ? 'HIGHLIGHTS' :
                     'POV STREAM'}
                  </span>
                  <span className="text-xs text-gray-400">{vod.date}</span>
                </div>
                <h3 className="text-white font-bold mb-2 group-hover:text-tyler1-red transition-colors">
                  {vod.title}
                </h3>
                {vod.description && (
                  <p className="text-sm text-gray-400 mb-3">
                    {vod.description}
                  </p>
                )}
                <a
                  href={vod.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm font-bold ${getPlatformColor(vod.link)}`}
                >
                  {getVodIcon(vod.link)}
                  {getPlatformText(vod.link)}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
