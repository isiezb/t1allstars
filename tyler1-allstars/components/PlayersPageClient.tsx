'use client';

import { useState } from 'react';
import { Player } from '@/lib/api';
import { getRegionFlag, Region as BaseRegion } from '@/lib/regions';
import PlayerCard from '@/components/cards/PlayerCard';

type Region = 'ALL' | BaseRegion;

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
          className={`px-6 py-2 font-bold rounded transition-colors ${
            selectedRegion === 'NA'
              ? 'bg-tyler1-red text-white'
              : 'bg-tyler1-grey text-gray-300 hover:bg-gray-700'
          }`}
        >
          {getRegionFlag('NA')} NA
        </button>
        <button
          onClick={() => setSelectedRegion('EU')}
          className={`px-6 py-2 font-bold rounded transition-colors ${
            selectedRegion === 'EU'
              ? 'bg-tyler1-red text-white'
              : 'bg-tyler1-grey text-gray-300 hover:bg-gray-700'
          }`}
        >
          {getRegionFlag('EU')} EU
        </button>
        <button
          onClick={() => setSelectedRegion('KR')}
          className={`px-6 py-2 font-bold rounded transition-colors ${
            selectedRegion === 'KR'
              ? 'bg-tyler1-red text-white'
              : 'bg-tyler1-grey text-gray-300 hover:bg-gray-700'
          }`}
        >
          {getRegionFlag('KR')} KR
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
            <PlayerCard key={player.name} player={player} />
          ))}
        </div>
      )}
    </>
  );
}
