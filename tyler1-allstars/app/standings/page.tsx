import StandingsSection from "@/components/StandingsSection";

export default function StandingsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Season <span className="text-tyler1-red">Standings</span>
        </h1>
        <p className="text-xl text-gray-400">
          Current rankings for Season 1 Winter 2026
        </p>
      </div>

      <StandingsSection />
    </div>
  );
}
