'use client';

import { useState } from 'react';
import { Player } from '@/lib/api';

const getRegionColor = (region: string) => {
  switch (region) {
    case "NA":
      return "bg-blue-500/20 text-blue-400 border-blue-500";
    case "EU":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500";
    case "KR":
      return "bg-red-500/20 text-red-400 border-red-500";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500";
  }
};

type Region = 'ALL' | 'NA' | 'EU' | 'KR';

export default function PlayersPageClient({ players }: { players: Player[] }) {
  const [selectedRegion, setSelectedRegion] = useState<Region>('ALL');

  const filteredPlayers = selectedRegion === 'ALL'
    ? players
    : players.filter(player => player.region === selectedRegion);

  return (
    <>
      {/* Region Filter */}
      <div className="flex justify-center gap-4 flex-wrap mb-12">
        <button
          onClick={() => setSelectedRegion('ALL')}
          className={`px-6 py-2 font-bold rounded transition-colors ${
            selectedRegion === 'ALL'
              ? 'bg-tyler1-red text-white'
              : 'bg-tyler1-grey text-gray-300 hover:bg-gray-700'
          }`}
        >
          All Regions
        </button>
        <button
          onClick={() => setSelectedRegion('NA')}
          className={`px-6 py-2 font-bold rounded transition-colors flex items-center gap-2 ${
            selectedRegion === 'NA'
              ? 'bg-tyler1-red text-white'
              : 'bg-tyler1-grey text-gray-300 hover:bg-gray-700'
          }`}
        >
          <svg className="w-5 h-4" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="30" fill="#b22234"/>
            <path d="M0,3.46h60M0,6.92h60M0,10.38h60M0,13.84h60M0,17.3h60M0,20.76h60M0,24.22h60M0,27.68h60" stroke="#fff" strokeWidth="2.31"/>
            <rect width="24" height="16.15" fill="#3c3b6e"/>
          </svg>
          NA
        </button>
        <button
          onClick={() => setSelectedRegion('EU')}
          className={`px-6 py-2 font-bold rounded transition-colors flex items-center gap-2 ${
            selectedRegion === 'EU'
              ? 'bg-tyler1-red text-white'
              : 'bg-tyler1-grey text-gray-300 hover:bg-gray-700'
          }`}
        >
          <svg className="w-5 h-4" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="40" fill="#003399"/>
            <g fill="#ffcc00">
              <circle cx="30" cy="8" r="1.5"/>
              <circle cx="35.5" cy="9.5" r="1.5"/>
              <circle cx="39" cy="13.5" r="1.5"/>
              <circle cx="39" cy="19" r="1.5"/>
              <circle cx="39" cy="26.5" r="1.5"/>
              <circle cx="35.5" cy="30.5" r="1.5"/>
              <circle cx="30" cy="32" r="1.5"/>
              <circle cx="24.5" cy="30.5" r="1.5"/>
              <circle cx="21" cy="26.5" r="1.5"/>
              <circle cx="21" cy="19" r="1.5"/>
              <circle cx="21" cy="13.5" r="1.5"/>
              <circle cx="24.5" cy="9.5" r="1.5"/>
            </g>
          </svg>
          EU
        </button>
        <button
          onClick={() => setSelectedRegion('KR')}
          className={`px-6 py-2 font-bold rounded transition-colors flex items-center gap-2 ${
            selectedRegion === 'KR'
              ? 'bg-tyler1-red text-white'
              : 'bg-tyler1-grey text-gray-300 hover:bg-gray-700'
          }`}
        >
          <svg className="w-5 h-4" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
            <rect width="900" height="600" fill="#fff"/>
            <circle cx="450" cy="300" r="120" fill="#c60c30"/>
            <path d="M450 180a120 120 0 0 1 0 240" fill="#003478"/>
            <g fill="#000">
              <path d="M630 210l15 15-15 15-15-15z M660 240l15 15-15 15-15-15z M690 270l15 15-15 15-15-15z"/>
              <path d="M630 330l15 15-15 15-15-15z M660 360l15 15-15 15-15-15z M690 390l15 15-15 15-15-15z"/>
            </g>
          </svg>
          KR
        </button>
      </div>

      {/* Players Grid */}
      {filteredPlayers.length === 0 ? (
        <div className="text-center py-12 bg-tyler1-grey rounded-lg">
          <p className="text-gray-400 text-lg">No players found for this region.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlayers.map((player: Player) => (
            <div
              key={player.name}
              className="bg-tyler1-grey rounded-lg border-2 border-tyler1-dark hover:border-tyler1-red transition-all duration-300 p-6"
            >
              {/* Region Badge */}
              <div className="flex justify-end mb-4">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${getRegionColor(
                    player.region
                  )}`}
                >
                  {player.region}
                </div>
              </div>

              {/* Player Info */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {player.name}
                </h3>
                <div className="flex items-center gap-3 text-sm">
                  {player.twitch && (
                    <a
                      href={`https://twitch.tv/${player.twitch}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                      </svg>
                      <span>Twitch</span>
                    </a>
                  )}
                  {player.twitter && (
                    <a
                      href={`https://twitter.com/${player.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                      title="X (Twitter)"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
