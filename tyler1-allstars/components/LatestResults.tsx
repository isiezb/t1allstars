import Link from "next/link";

export default function LatestResults() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Latest <span className="text-tyler1-red">Results</span>
        </h2>
        <p className="text-gray-400">Most recent tournament outcome</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Tournament Result Card */}
        <div className="bg-gradient-to-br from-tyler1-grey to-tyler1-dark rounded-lg border-2 border-tyler1-red p-8 mb-8">
          <div className="text-center mb-6">
            <div className="inline-block bg-tyler1-red/20 border border-tyler1-red rounded-lg px-4 py-2 mb-4">
              <p className="text-tyler1-red font-bold text-sm">WEEK 2 - EU ALL STARS</p>
            </div>
            <p className="text-gray-400 text-sm">February 3, 2026</p>
          </div>

          {/* Winner Section */}
          <div className="bg-tyler1-dark rounded-lg p-6 mb-6 border-2 border-tyler1-gold">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="text-5xl">🏆</div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Champion</p>
                  <p className="text-3xl font-bold text-white mb-1">AloisNL</p>
                  <p className="text-sm text-yellow-400">🇪🇺 EU</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Prize</p>
                <p className="text-3xl font-bold text-green-400">$10,000</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-tyler1-grey">
              <p className="text-sm text-gray-400 mb-2">Championship Pick:</p>
              <div className="inline-block bg-tyler1-red/20 border border-tyler1-red rounded px-3 py-1">
                <span className="text-white font-bold">Darius</span>
              </div>
            </div>
          </div>

          {/* Runner-up Section */}
          <div className="bg-tyler1-dark rounded-lg p-6 mb-6 border border-gray-600">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl">🥈</div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Runner-up</p>
                  <p className="text-2xl font-bold text-white mb-1">Drututt</p>
                  <p className="text-sm text-yellow-400">🇪🇺 EU</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Prize</p>
                <p className="text-2xl font-bold text-green-400">$5,000</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-tyler1-dark rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-tyler1-red">8</p>
              <p className="text-xs text-gray-400 mt-1">Players</p>
            </div>
            <div className="bg-tyler1-dark rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-tyler1-red">14</p>
              <p className="text-xs text-gray-400 mt-1">Matches</p>
            </div>
            <div className="bg-tyler1-dark rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-tyler1-red">3:47</p>
              <p className="text-xs text-gray-400 mt-1">Duration</p>
            </div>
            <div className="bg-tyler1-dark rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-tyler1-red">45K</p>
              <p className="text-xs text-gray-400 mt-1">Peak Viewers</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/results/week-2"
              className="flex-1 text-center bg-tyler1-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors duration-200"
            >
              View Full Bracket
            </Link>
            <a
              href="https://twitch.tv/videos/loltyler1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
              </svg>
              Watch VOD
            </a>
          </div>
        </div>

        {/* Previous Winners */}
        <div className="bg-tyler1-grey rounded-lg p-6 border border-tyler1-dark">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>📜</span> Previous Winners
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-tyler1-dark rounded hover:bg-tyler1-dark/70 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🥇</span>
                <div>
                  <p className="font-bold text-white">Week 1 - NA</p>
                  <p className="text-sm text-gray-400">Humzh</p>
                </div>
              </div>
              <Link
                href="/results/week-1"
                className="text-tyler1-red hover:text-red-500 text-sm font-bold"
              >
                View →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          href="/results"
          className="inline-block text-tyler1-red hover:text-red-500 font-bold transition-colors duration-200"
        >
          View All Results →
        </Link>
      </div>
    </section>
  );
}
