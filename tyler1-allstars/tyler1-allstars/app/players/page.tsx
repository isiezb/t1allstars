import PlayersPageClient from "@/components/PlayersPageClient";
import { playersAPI, Player } from "@/lib/api";

// Revalidate data every 30 seconds
export const revalidate = 30;

export default async function PlayersPage() {
  let players: Player[] = [];

  try {
    players = await playersAPI.getAll();
  } catch (error) {
    console.error('Failed to fetch players:', error);
    players = [];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          All <span className="text-tyler1-red">Players</span>
        </h1>
        <p className="text-xl text-gray-400">
          Complete roster of Tyler1 All Stars participants
        </p>
      </div>

      <PlayersPageClient players={players} />
    </div>
  );
}
