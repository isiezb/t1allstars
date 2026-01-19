"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Example: Next tournament date - adjust as needed
  const nextTournamentDate = new Date("2026-02-10T20:00:00Z");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +nextTournamentDate - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-tyler1-darker via-tyler1-dark to-tyler1-darker border-b-4 border-tyler1-red">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          {/* Season Badge */}
          <div className="inline-block mb-6">
            <span className="bg-tyler1-red text-white px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase">
              Season 1 Winter 2026
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">
            <span className="text-tyler1-red">TYLER1</span> ALL STARS
          </h1>

          {/* Next Tournament Info */}
          <div className="mb-8">
            <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
              NEXT TOURNAMENT: EU
            </p>
            <p className="text-lg sm:text-xl text-gray-300">
              February 10, 2026 • 8:00 PM CET
            </p>
          </div>

          {/* Countdown Timer */}
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://twitch.tv/loltyler1"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-tyler1-red text-white font-bold text-lg rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-tyler1-red/50 flex items-center gap-2"
            >
              <span className="relative z-10">WATCH LIVE</span>
              <svg
                className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
              </svg>
            </a>

            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Current Prize Pool</p>
              <p className="text-3xl font-bold text-tyler1-gold">$50,000</p>
            </div>
          </div>

          {/* Format Info */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <span className="text-tyler1-red font-bold">⚔️</span>
              <span>8 Players</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-tyler1-red font-bold">🏆</span>
              <span>Best-of-3</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-tyler1-red font-bold">📊</span>
              <span>Double Elimination</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-tyler1-red font-bold">🎮</span>
              <span>1v1 Howling Abyss</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
