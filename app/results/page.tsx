import LatestResults from "@/components/LatestResults";

// Revalidate data every 30 seconds
export const revalidate = 30;

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
    </div>
  );
}
