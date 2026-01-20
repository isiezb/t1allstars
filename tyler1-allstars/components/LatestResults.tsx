import Link from "next/link";
import { resultsAPI, Result } from "@/lib/api";
import { getRegionFlag } from "@/lib/regions";

export default async function LatestResults() {
  let latestResults: Result[] = [];

  try {
    const results = await resultsAPI.getAll();
    // Get the 2 most recent results (assuming they're ordered by date)
    latestResults = results.slice(0, 2);
  } catch (error) {
    console.error('Failed to fetch results:', error);
    latestResults = [];
  }

  if (latestResults.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-12 bg-tyler1-grey rounded-lg">
          <p className="text-gray-400 text-lg">No results available yet. Check back after the first tournament!</p>
        </div>
      </section>
    );
  }


  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto space-y-6">
        {latestResults.map((result) => (
          <div key={result.id} className="bg-tyler1-grey rounded-lg border-2 border-tyler1-red p-8">
            <div className="text-center mb-8">
              <div className="inline-block bg-tyler1-red/20 border border-tyler1-red rounded-lg px-4 py-2 mb-2">
                <p className="text-tyler1-red font-bold text-sm">{result.tournament.toUpperCase()}</p>
              </div>
              <p className="text-gray-400 text-sm">{result.date}</p>
            </div>

            {/* Winner Section */}
            <div className="bg-tyler1-dark rounded-lg p-6 mb-4 border-2 border-tyler1-gold">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">🏆</div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Champion</p>
                    <p className="text-3xl font-bold text-white mb-1">{result.winner}</p>
                    <p className="text-sm text-yellow-400 flex items-center gap-2">
                      <img src={getRegionFlag(result.region)} alt={`${result.region} flag`} className="h-4 w-auto" />
                      {result.region}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 mb-1">Prize</p>
                  <p className="text-3xl font-bold text-green-400">${result.prize_pool.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Runner-up Section */}
            <div className="bg-tyler1-dark rounded-lg p-6 border border-gray-600">
              <div className="flex items-center gap-4">
                <div className="text-4xl">🥈</div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Runner-up</p>
                  <p className="text-2xl font-bold text-white mb-1">{result.runner_up}</p>
                  <p className="text-sm text-yellow-400 flex items-center gap-2">
                    <img src={getRegionFlag(result.region)} alt={`${result.region} flag`} className="h-4 w-auto" />
                    {result.region}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
