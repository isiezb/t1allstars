import Link from "next/link";
import { standingsAPI, Standing } from "@/lib/api";

const getRankMedal = (rank: number) => {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return rank;
  }
};

const getRegionColor = (region: string) => {
  switch (region) {
    case "NA":
      return "text-blue-400";
    case "EU":
      return "text-yellow-400";
    case "KR":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
};

export default async function StandingsSection() {
  let standingsData: Standing[] = [];

  try {
    standingsData = await standingsAPI.getAll();
  } catch (error) {
    console.error('Failed to fetch standings:', error);
    standingsData = [];
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Season <span className="text-tyler1-red">Standings</span>
        </h2>
        <p className="text-gray-400 mb-6">
          Top 4 qualify for the Season Finale
        </p>
        <div className="inline-block bg-tyler1-red/10 border border-tyler1-red rounded-lg px-4 py-2">
          <p className="text-tyler1-red font-bold text-sm">
            🏆 Grand Prize: $50,000
          </p>
        </div>
      </div>

      {standingsData.length === 0 ? (
        <div className="text-center py-12 bg-tyler1-grey rounded-lg">
          <p className="text-gray-400 text-lg">No standings data available yet. Check back soon!</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto bg-tyler1-grey rounded-lg border border-tyler1-grey">
            <table className="w-full">
          <thead className="bg-tyler1-dark border-b border-tyler1-grey">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                Player
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                Region
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                Points
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                Tournaments
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                Wins
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                Prize
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-tyler1-dark">
            {standingsData.map((player) => (
              <tr
                key={player.rank}
                className={`hover:bg-tyler1-dark transition-colors duration-150 ${
                  player.rank <= 4 ? "bg-tyler1-red/5 border-l-4 border-l-tyler1-red" : ""
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-xl font-bold text-white">
                    {getRankMedal(player.rank)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/players/${player.name.toLowerCase()}`}
                    className="text-lg font-bold text-white hover:text-tyler1-red transition-colors"
                  >
                    {player.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`font-bold ${getRegionColor(player.region)}`}>
                    {player.region}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-lg font-bold text-tyler1-gold">
                    {player.points}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  {player.tournaments}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-white font-bold">{player.wins}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-green-400 font-bold">
                    ${player.prize.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {standingsData.map((player) => (
          <div
            key={player.rank}
            className={`bg-tyler1-grey rounded-lg p-4 border-2 ${
              player.rank <= 4 ? "border-tyler1-red" : "border-transparent"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-white">
                  {getRankMedal(player.rank)}
                </div>
                <div>
                  <Link
                    href={`/players/${player.name.toLowerCase()}`}
                    className="text-lg font-bold text-white hover:text-tyler1-red"
                  >
                    {player.name}
                  </Link>
                  <div className={`text-sm font-bold ${getRegionColor(player.region)}`}>
                    {player.region}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-tyler1-gold">
                  {player.points}
                </div>
                <div className="text-xs text-gray-400">points</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center border-t border-tyler1-dark pt-3">
              <div>
                <div className="text-sm text-gray-400">Tournaments</div>
                <div className="text-white font-bold">{player.tournaments}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Wins</div>
                <div className="text-white font-bold">{player.wins}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Prize</div>
                <div className="text-green-400 font-bold text-sm">
                  ${player.prize.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/standings"
          className="inline-block text-tyler1-red hover:text-red-500 font-bold transition-colors duration-200"
        >
          View Full Standings →
        </Link>
      </div>
        </>
      )}
    </section>
  );
}
