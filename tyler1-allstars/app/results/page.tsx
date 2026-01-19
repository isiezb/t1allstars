import LatestResults from "@/components/LatestResults";

export default function ResultsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Tournament <span className="text-tyler1-red">Results</span>
        </h1>
        <p className="text-xl text-gray-400">
          Complete archive of all tournament outcomes
        </p>
      </div>

      <LatestResults />

      {/* Stats & Records Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Season <span className="text-tyler1-red">Records</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-tyler1-grey rounded-lg p-6 border border-tyler1-dark text-center">
            <div className="text-4xl mb-2">⚡</div>
            <h3 className="text-white font-bold mb-2">Fastest Game</h3>
            <p className="text-2xl text-tyler1-gold mb-1">4:23</p>
            <p className="text-sm text-gray-400">Humzh vs. Adrian (Week 1)</p>
          </div>
          <div className="bg-tyler1-grey rounded-lg p-6 border border-tyler1-dark text-center">
            <div className="text-4xl mb-2">🏆</div>
            <h3 className="text-white font-bold mb-2">Most Wins</h3>
            <p className="text-2xl text-tyler1-gold mb-1">Humzh</p>
            <p className="text-sm text-gray-400">2 Tournament Wins</p>
          </div>
          <div className="bg-tyler1-grey rounded-lg p-6 border border-tyler1-dark text-center">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-white font-bold mb-2">Biggest Upset</h3>
            <p className="text-2xl text-tyler1-gold mb-1">NattyNatt</p>
            <p className="text-sm text-gray-400">Beat Drututt (Week 2)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
