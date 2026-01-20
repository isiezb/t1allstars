export default function VODsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Video on <span className="text-tyler1-red">Demand</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Watch past tournaments and highlights
        </p>
      </div>

      {/* Filter Options */}
      <div className="mb-8 flex justify-center gap-4 flex-wrap">
        <button className="px-6 py-2 bg-tyler1-red text-white font-bold rounded hover:bg-red-700 transition-colors">
          All VODs
        </button>
        <button className="px-6 py-2 bg-tyler1-grey text-gray-300 font-bold rounded hover:bg-gray-700 transition-colors">
          Full Tournaments
        </button>
        <button className="px-6 py-2 bg-tyler1-grey text-gray-300 font-bold rounded hover:bg-gray-700 transition-colors">
          Highlights
        </button>
        <button className="px-6 py-2 bg-tyler1-grey text-gray-300 font-bold rounded hover:bg-gray-700 transition-colors">
          POV Streams
        </button>
      </div>

      {/* VOD Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Week 2 EU */}
        <div className="bg-tyler1-grey rounded-lg overflow-hidden border border-tyler1-dark hover:border-tyler1-red transition-all duration-300 group">
          <div className="aspect-video bg-gradient-to-br from-tyler1-dark to-tyler1-grey flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-tyler1-red rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-sm text-white">
              3:47:22
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-tyler1-red px-2 py-1 rounded text-xs font-bold text-white">
                FULL VOD
              </span>
              <span className="text-xs text-gray-400">Feb 3, 2026</span>
            </div>
            <h3 className="text-white font-bold mb-2 group-hover:text-tyler1-red transition-colors">
              Week 2 - EU All Stars
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              AloisNL wins $10,000 in intense finals vs Drututt
            </p>
            <a
              href="https://twitch.tv/videos/loltyler1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-bold"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
              </svg>
              Watch on Twitch
            </a>
          </div>
        </div>

        {/* Week 1 NA */}
        <div className="bg-tyler1-grey rounded-lg overflow-hidden border border-tyler1-dark hover:border-tyler1-red transition-all duration-300 group">
          <div className="aspect-video bg-gradient-to-br from-tyler1-dark to-tyler1-grey flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-tyler1-red rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-sm text-white">
              4:12:15
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-tyler1-red px-2 py-1 rounded text-xs font-bold text-white">
                FULL VOD
              </span>
              <span className="text-xs text-gray-400">Jan 27, 2026</span>
            </div>
            <h3 className="text-white font-bold mb-2 group-hover:text-tyler1-red transition-colors">
              Week 1 - NA All Stars
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              Humzh dominates NA bracket for $10,000
            </p>
            <a
              href="https://twitch.tv/videos/loltyler1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-bold"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
              </svg>
              Watch on Twitch
            </a>
          </div>
        </div>

        {/* Highlight Reel */}
        <div className="bg-tyler1-grey rounded-lg overflow-hidden border border-tyler1-dark hover:border-tyler1-red transition-all duration-300 group">
          <div className="aspect-video bg-gradient-to-br from-tyler1-dark to-tyler1-grey flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-tyler1-red rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-sm text-white">
              12:34
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-tyler1-gold px-2 py-1 rounded text-xs font-bold text-black">
                HIGHLIGHTS
              </span>
              <span className="text-xs text-gray-400">Feb 4, 2026</span>
            </div>
            <h3 className="text-white font-bold mb-2 group-hover:text-tyler1-red transition-colors">
              Top 5 Plays - Week 2
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              Best moments from EU All Stars tournament
            </p>
            <a
              href="https://www.youtube.com/@Tyler1AllStars"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-red-500 hover:text-red-400 text-sm font-bold"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch on YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Player POV Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Player <span className="text-tyler1-red">POV Streams</span>
        </h2>
        <div className="bg-tyler1-grey rounded-lg p-8 border border-tyler1-dark text-center">
          <p className="text-gray-400 mb-4">
            Watch from your favorite player's perspective
          </p>
          <p className="text-sm text-gray-500">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}
