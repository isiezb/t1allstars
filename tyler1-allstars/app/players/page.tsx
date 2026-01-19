import FeaturedPlayers from "@/components/FeaturedPlayers";

// Revalidate data every 30 seconds
export const revalidate = 30;

export default function PlayersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          All <span className="text-tyler1-red">Players</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Complete roster of Tyler1 All Stars participants
        </p>

        {/* Region Filter */}
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="px-6 py-2 bg-tyler1-red text-white font-bold rounded hover:bg-red-700 transition-colors">
            All Regions
          </button>
          <button className="px-6 py-2 bg-tyler1-grey text-gray-300 font-bold rounded hover:bg-gray-700 transition-colors">
            🇺🇸 NA
          </button>
          <button className="px-6 py-2 bg-tyler1-grey text-gray-300 font-bold rounded hover:bg-gray-700 transition-colors">
            🇪🇺 EU
          </button>
          <button className="px-6 py-2 bg-tyler1-grey text-gray-300 font-bold rounded hover:bg-gray-700 transition-colors">
            🇰🇷 KR
          </button>
        </div>
      </div>

      <FeaturedPlayers />

      {/* Additional players would be listed here */}
      <div className="mt-12 text-center">
        <p className="text-gray-400">More players coming soon...</p>
      </div>
    </div>
  );
}
