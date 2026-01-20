import { Player } from "@/lib/api";
import { getRegionColor } from "@/lib/regions";

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="bg-tyler1-grey rounded-lg border-2 border-tyler1-dark hover:border-tyler1-red transition-all duration-300 p-6">
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
              className="text-purple-400 hover:text-purple-300 transition-colors"
              aria-label="Twitch"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
              </svg>
            </a>
          )}
          {player.twitter && (
            <a
              href={`https://twitter.com/${player.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="X (Twitter)"
            >
              <svg
                className="w-5 h-5"
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
  );
}
