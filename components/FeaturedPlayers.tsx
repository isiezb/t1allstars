import Link from "next/link";
import { playersAPI, Player } from "@/lib/api";

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
          <div
            key={player.name}
            className="bg-tyler1-grey rounded-lg overflow-hidden border-2 border-tyler1-dark hover:border-tyler1-red transition-all duration-300 hover:scale-105 group"
          >
            {/* Player Avatar/Header */}
            <div className="relative h-48 bg-gradient-to-br from-tyler1-dark to-tyler1-grey flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-tyler1-red flex items-center justify-center text-4xl font-black text-white border-4 border-white/20">
                {player.name.substring(0, 2).toUpperCase()}
              </div>
              <div
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold border ${getRegionColor(
                  player.region
                )}`}
              >
                {player.region}
              </div>
            </div>

            {/* Player Info */}
            <div className="p-5">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-tyler1-red transition-colors">
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
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <span>X</span>
                    </a>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href={`/players/${player.name.toLowerCase()}`}
                className="block w-full text-center bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
              >
                View Profile
              </Link>
            </div>
          </div>
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
