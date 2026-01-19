import ScheduleSection from "@/components/ScheduleSection";

// Revalidate data every 30 seconds
export const revalidate = 30;

export default function SchedulePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Full <span className="text-tyler1-red">Schedule</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Season 1 Winter 2026 - All tournament dates and times
        </p>
      </div>

      <ScheduleSection />

      <div className="mt-16 bg-tyler1-grey rounded-lg p-8 border border-tyler1-dark">
        <h2 className="text-2xl font-bold text-white mb-4">Time Zone Information</h2>
        <div className="space-y-3 text-gray-300">
          <p>
            <span className="font-bold text-white">NA Tournaments:</span> 8:00 PM EST / 5:00 PM PST
          </p>
          <p>
            <span className="font-bold text-white">EU Tournaments:</span> 8:00 PM CET / 2:00 PM EST
          </p>
          <p>
            <span className="font-bold text-white">KR Tournaments:</span> 8:00 PM KST / 6:00 AM EST
          </p>
        </div>
      </div>
    </div>
  );
}
