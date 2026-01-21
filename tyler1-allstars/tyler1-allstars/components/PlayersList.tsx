import { playersAPI, Player } from "@/lib/api";
import PlayerCard from "@/components/cards/PlayerCard";

export default async function PlayersList() {
  let players: Player[] = [];

  try {
    players = await playersAPI.getAll();
  } catch (error) {
    console.error('Failed to fetch players:', error);
    players = [];
  }

  return (
    <section>
      {players.length === 0 ? (
        <div className="text-center py-12 bg-tyler1-grey rounded-lg">
          <p className="text-gray-400 text-lg">No players available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {players.map((player: Player) => (
            <PlayerCard key={player.name} player={player} />
          ))}
        </div>
      )}
    </section>
  );
}
