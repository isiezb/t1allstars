import { tournamentsAPI } from "@/lib/api";
import CountdownTimer from "./CountdownTimer";

const getRegionFlag = (region: string) => {
  switch (region) {
    case "NA": return "🇺🇸";
    case "EU": return "🇪🇺";
    case "KR": return "🇰🇷";
    default: return "";
  }
};

export default async function HeroSection() {
  let nextTournament = null;
  let nextTournamentDate = null;

  try {
    const tournaments = await tournamentsAPI.getAll();
    // Find the next upcoming tournament
    const upcomingTournaments = tournaments
      .filter(t => t.status === 'upcoming')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (upcomingTournaments.length > 0) {
      nextTournament = upcomingTournaments[0];
      nextTournamentDate = nextTournament.date;
    }
  } catch (error) {
    console.error('Failed to fetch tournaments:', error);
  }

  return (
    <section className="relative bg-gradient-to-br from-tyler1-darker via-tyler1-dark to-tyler1-darker border-b-4 border-tyler1-red">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          {/* Season Badge */}
          <div className="inline-block mb-6">
            <span className="bg-tyler1-red text-white px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase">
              Season 1 Winter 2026
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">
            <span className="text-tyler1-red">TYLER1</span> ALL STARS
          </h1>

          {/* Next Tournament Info */}
          {nextTournament ? (
            <>
              <div className="mb-8">
                <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  NEXT TOURNAMENT: {getRegionFlag(nextTournament.region)} {nextTournament.region}
                </p>
                <p className="text-lg sm:text-xl text-gray-300">
                  {nextTournament.date}
                </p>
              </div>

              {/* Countdown Timer */}
              <CountdownTimer targetDate={nextTournamentDate} />
            </>
          ) : (
            <div className="mb-8">
              <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Season 1 Winter 2026
              </p>
              <p className="text-lg sm:text-xl text-gray-300">
                Schedule coming soon
              </p>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://twitch.tv/loltyler1"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-tyler1-red text-white font-bold text-lg rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-tyler1-red/50 flex items-center gap-2"
            >
              <span className="relative z-10">WATCH LIVE</span>
              <svg
                className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
              </svg>
            </a>

            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Current Prize Pool</p>
              <p className="text-3xl font-bold text-tyler1-gold">$50,000</p>
            </div>
          </div>

          {/* Format Info */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <span className="text-tyler1-red font-bold">⚔️</span>
              <span>8 Players</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-tyler1-red font-bold">🏆</span>
              <span>Best-of-3</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-tyler1-red font-bold">📊</span>
              <span>Double Elimination</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-tyler1-red font-bold">🎮</span>
              <span>1v1 Howling Abyss</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
