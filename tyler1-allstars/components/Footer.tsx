import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-tyler1-darker border-t border-tyler1-grey mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Tyler1 All Stars</h3>
            <p className="text-gray-400 text-sm">
              1v1 League of Legends tournament featuring the best players from NA, EU, and KR.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/rules" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Rules & Format
                </Link>
              </li>
              <li>
                <a href="mailto:tyler1business@gmail.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitch.tv/loltyler1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-colors"
                aria-label="Twitch"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/loltyler1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@loltyler1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.81-.6-4.03-1.37-.01 1.39-.01 2.79 0 4.18 0 2.34-.14 4.71-1.1 6.85-1.02 2.33-3 4.13-5.39 4.95-2.15.76-4.52.79-6.66.04-2.33-.82-4.33-2.67-5.3-4.9-1.14-2.5-1.1-5.48.1-7.89.95-1.9 2.69-3.41 4.74-4 1.15-.33 2.36-.4 3.55-.21v4.09c-.94-.13-1.94-.05-2.82.35-.99.44-1.78 1.27-2.17 2.27-.6 1.51-.3 3.32.78 4.54 1.03 1.17 2.69 1.57 4.19 1.05 1.49-.52 2.52-1.96 2.63-3.53.02-3.82 0-7.65.02-11.47z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@TYLER1LOL"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-tyler1-grey text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Tyler1 All Stars. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
