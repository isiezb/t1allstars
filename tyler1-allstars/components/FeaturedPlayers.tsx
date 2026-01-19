import Link from "next/link";

interface Player {
  name: string;
  region: "NA" | "EU" | "KR";
  twitch: string;
  mainChampions: string[];
  record: string;
  points: number;
  avatar?: string;
}

const featuredPlayers: Player[] = [
  {
    name: "Humzh",
    region: "NA",
    twitch: "humzh",
    mainChampions: ["Darius", "Renekton", "Mordekaiser"],
    record: "2-1",
    points: 350,
  },
  {
    name: "AloisNL",
    region: "EU",
    twitch: "alois_nl",
    mainChampions: ["Darius", "Camille", "Sett"],
    record: "1-0",
    points: 300,
  },
  {
    name: "Drututt",
    region: "EU",
    twitch: "drututt",
    mainChampions: ["Camille", "Fiora", "Irelia"],
    record: "1-1",
    points: 250,
  },
  {
    name: "TFBlade",
    region: "NA",
    twitch: "tfblade",
    mainChampions: ["Jax", "Irelia", "Akali"],
    record: "0-2",
    points: 220,
  },
];

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

export default function FeaturedPlayers() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-transparent to-tyler1-dark/50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Featured <span className="text-tyler1-red">Players</span>
        </h2>
        <p className="text-gray-400">Top performers this season</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredPlayers.map((player) => (
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
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <svg
                    className="w-4 h-4 text-purple-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                  <a
                    href={`https://twitch.tv/${player.twitch}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-400 transition-colors"
                  >
                    twitch.tv/{player.twitch}
                  </a>
                </div>
              </div>

              {/* Main Champions */}
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-2">Main Champions:</p>
                <div className="flex gap-2">
                  {player.mainChampions.map((champ, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-tyler1-dark rounded px-2 py-1 text-xs text-center text-white border border-tyler1-grey"
                      title={champ}
                    >
                      {champ}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-tyler1-dark rounded p-2 text-center">
                  <p className="text-xs text-gray-400">Record</p>
                  <p className="text-lg font-bold text-white">{player.record}</p>
                </div>
                <div className="bg-tyler1-dark rounded p-2 text-center">
                  <p className="text-xs text-gray-400">Points</p>
                  <p className="text-lg font-bold text-tyler1-gold">{player.points}</p>
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

      <div className="text-center mt-8">
        <Link
          href="/players"
          className="inline-block text-tyler1-red hover:text-red-500 font-bold transition-colors duration-200"
        >
          View All Players →
        </Link>
      </div>
    </section>
  );
}
