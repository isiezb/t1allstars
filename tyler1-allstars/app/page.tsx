import HeroSection from "@/components/HeroSection";
import ScheduleSection from "@/components/ScheduleSection";
import StandingsSection from "@/components/StandingsSection";
import LatestResults from "@/components/LatestResults";

// Revalidate data every 30 seconds
export const revalidate = 30;

export default function Home() {
  return (
    <>
      <HeroSection />
      <ScheduleSection />
      <StandingsSection />
      <LatestResults />
    </>
  );
}
