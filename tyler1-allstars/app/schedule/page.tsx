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
    </div>
  );
}
