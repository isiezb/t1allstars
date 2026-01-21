import Link from "next/link";
import { playersAPI, Player } from "@/lib/api";
import PlayerCard from "@/components/cards/PlayerCard";

export default async function FeaturedPlayers() {
  let featuredPlayers: Player[] = [];

  try {
    const allPlayers = await playersAPI.getAll();
    // Get first 4 players or limit based on your logic
    featuredPlayers = allPlayers.slice(0, 4);
  } catch (error) {
    console.error('Failed to fetch players:', error);
    featuredPlayers = [];
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-transparent to-tyler1-dark/50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Featured <span className="text-tyler1-red">Players</span>
        </h2>
        <p className="text-gray-400">Top performers this season</p>
      </div>

      {featuredPlayers.length === 0 ? (
        <div className="text-center py-12 bg-tyler1-grey rounded-lg">
          <p className="text-gray-400 text-lg">No featured players available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlayers.map((player: Player) => (
            <PlayerCard key={player.name} player={player} />
          ))}
        </div>
      )}

      {featuredPlayers.length > 0 && (
        <div className="text-center mt-8">
          <Link
            href="/players"
            className="inline-block text-tyler1-red hover:text-red-500 font-bold transition-colors duration-200"
          >
            View All Players →
          </Link>
        </div>
      )}
    </section>
  );
}
