"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string | null;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!targetDate) return;

    const tournamentStartDate = new Date(targetDate);
    const tournamentEndDate = new Date(tournamentStartDate.getTime() + 6 * 60 * 60 * 1000); // 6 hours after start

    const calculateTimeLeft = () => {
      const now = new Date();
      const timeUntilStart = +tournamentStartDate - +now;
      const timeUntilEnd = +tournamentEndDate - +now;

      // Check if tournament is currently live (started but not ended)
      if (timeUntilStart <= 0 && timeUntilEnd > 0) {
        setIsLive(true);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
      // Check if tournament has ended (refresh page to show next tournament)
      else if (timeUntilEnd <= 0) {
        router.refresh();
      }
      // Tournament hasn't started yet, show countdown
      else if (timeUntilStart > 0) {
        setIsLive(false);
        setTimeLeft({
          days: Math.floor(timeUntilStart / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeUntilStart / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((timeUntilStart / 1000 / 60) % 60),
          seconds: Math.floor((timeUntilStart / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, router]);

  if (!targetDate) return null;

  // Show LIVE indicator when tournament is active
  if (isLive) {
    return (
      <div className="mb-10">
        <div className="inline-flex items-center gap-3 bg-tyler1-red/20 border-2 border-tyler1-red rounded-lg px-8 py-6 animate-pulse">
          <div className="w-4 h-4 bg-tyler1-red rounded-full animate-ping absolute"></div>
          <div className="w-4 h-4 bg-tyler1-red rounded-full"></div>
          <span className="text-3xl sm:text-4xl font-bold text-tyler1-red ml-2">TOURNAMENT LIVE NOW</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-4 mb-10">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className="bg-tyler1-grey border-2 border-tyler1-red rounded-lg p-4 min-w-[80px]"
        >
          <div className="text-3xl sm:text-4xl font-bold text-tyler1-red">
            {value.toString().padStart(2, "0")}
          </div>
          <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider mt-1">
            {unit}
          </div>
        </div>
      ))}
    </div>
  );
}
