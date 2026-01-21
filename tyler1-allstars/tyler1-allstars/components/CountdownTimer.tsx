"use client";

import { useEffect, useState } from "react";

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
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!targetDate) return;

    const nextTournamentDate = new Date(targetDate);

    const calculateTimeLeft = () => {
      const difference = +nextTournamentDate - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!targetDate) return null;

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
