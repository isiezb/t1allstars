import HeroSection from "@/components/HeroSection";
import ScheduleSection from "@/components/ScheduleSection";
import StandingsSection from "@/components/StandingsSection";
import FeaturedPlayers from "@/components/FeaturedPlayers";
import LatestResults from "@/components/LatestResults";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ScheduleSection />
      <StandingsSection />
      <FeaturedPlayers />
      <LatestResults />
    </>
  );
}
