import Link from "next/link";
import { tournamentsAPI, Tournament } from "@/lib/api";

const getStatusStyles = (status: string) => {
  switch (status) {
    case "complete":
      return "bg-gray-700 border-gray-600 text-gray-400";
    case "live":
      return "bg-red-900/30 border-tyler1-red text-tyler1-red animate-pulse";
    case "upcoming":
      return "bg-tyler1-grey border-green-600 text-green-400";
    default:
      return "bg-tyler1-grey border-tyler1-grey text-white";
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "complete":
      return <span className="text-xs">✅ COMPLETE</span>;
    case "live":
      return <span className="text-xs font-bold">🔴 LIVE NOW</span>;
    case "upcoming":
      return <span className="text-xs">📅 UPCOMING</span>;
    default:
      return null;
  }
};

const getRegionFlag = (region: string) => {
  switch (region) {
    case "NA":
      return "🇺🇸";
    case "EU":
      return "🇪🇺";
    case "KR":
      return "🇰🇷";
    default:
      return "";
  }
};

export default async function ScheduleSection() {
  let scheduleData: Tournament[] = [];

  try {
    scheduleData = await tournamentsAPI.getAll();
  } catch (error) {
    console.error('Failed to fetch tournaments:', error);
    scheduleData = [];
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Tournament <span className="text-tyler1-red">Schedule</span>
        </h2>
        <p className="text-gray-400">Weekly tournaments across all regions</p>
      </div>

      {scheduleData.length === 0 ? (
        <div className="text-center py-12 bg-tyler1-grey rounded-lg">
          <p className="text-gray-400 text-lg">No tournament schedule available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scheduleData.map((item: Tournament) => (
          <div
            key={item.week}
            className={`border-2 rounded-lg p-6 transition-all duration-300 hover:scale-105 ${getStatusStyles(
              item.status
            )}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  Week {item.week}
                </h3>
                <p className="text-sm text-gray-400">{item.date}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl mb-1">{getRegionFlag(item.region)}</div>
                <p className="text-lg font-bold text-white">{item.region}</p>
              </div>
            </div>

            <div className="mb-4">{getStatusBadge(item.status)}</div>

            {item.participants && item.participants.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-2">Participants:</p>
                <div className="flex flex-wrap gap-1">
                  {item.participants.slice(0, 4).map((player, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full bg-tyler1-dark border-2 border-tyler1-red flex items-center justify-center text-xs font-bold"
                      title={player}
                    >
                      {player.substring(0, 2).toUpperCase()}
                    </div>
                  ))}
                  {item.participants.length > 4 && (
                    <div className="w-8 h-8 rounded-full bg-tyler1-dark border-2 border-gray-600 flex items-center justify-center text-xs text-gray-400">
                      +{item.participants.length - 4}
                    </div>
                  )}
                </div>
              </div>
            )}

            {item.status === "live" && (
              <Link
                href="https://twitch.tv/loltyler1"
                target="_blank"
                className="block w-full text-center bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
              >
                WATCH LIVE
              </Link>
            )}

            {item.status === "complete" && (
              <Link
                href={`/results/week-${item.week}`}
                className="block w-full text-center bg-tyler1-grey hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
              >
                View Results
              </Link>
            )}
          </div>
        ))}
        </div>
      )}

      <div className="text-center mt-8">
        <Link
          href="/schedule"
          className="inline-block text-tyler1-red hover:text-red-500 font-bold transition-colors duration-200"
        >
          View Full Schedule →
        </Link>
      </div>
    </section>
  );
}
