export default function RulesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Tournament <span className="text-tyler1-red">Rules</span>
        </h1>
        <p className="text-xl text-gray-400">
          Official rules and format for Tyler1 All Stars Season 1
        </p>
      </div>

      {/* Tournament Format */}
      <section className="mb-12 bg-tyler1-grey rounded-lg p-8 border border-tyler1-dark">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-tyler1-red">⚔️</span> Tournament Format
        </h2>
        <div className="space-y-4 text-gray-300">
          <div className="flex gap-4">
            <div className="text-tyler1-red font-bold">•</div>
            <div>
              <span className="font-bold text-white">Game Mode:</span> 1v1 Howling Abyss
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-tyler1-red font-bold">•</div>
            <div>
              <span className="font-bold text-white">Format:</span> Double Elimination Bracket
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-tyler1-red font-bold">•</div>
            <div>
              <span className="font-bold text-white">Match Type:</span> Best-of-3 (Finals: Best-of-5)
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-tyler1-red font-bold">•</div>
            <div>
              <span className="font-bold text-white">Players:</span> 8 players per tournament
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-tyler1-red font-bold">•</div>
            <div>
              <span className="font-bold text-white">Regions:</span> NA, EU, and KR rotate weekly
            </div>
          </div>
        </div>
      </section>

      {/* Win Conditions */}
      <section className="mb-12 bg-tyler1-grey rounded-lg p-8 border border-tyler1-dark">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-tyler1-red">🏆</span> Win Conditions
        </h2>
        <div className="space-y-4 text-gray-300">
          <p className="text-white font-bold mb-3">A player wins when ANY of the following occurs:</p>
          <div className="flex gap-4">
            <div className="text-tyler1-red font-bold">1.</div>
            <div>First Blood (killing the enemy champion)</div>
          </div>
          <div className="flex gap-4">
            <div className="text-tyler1-red font-bold">2.</div>
            <div>Destroying the enemy turret</div>
          </div>
          <div className="flex gap-4">
            <div className="text-tyler1-red font-bold">3.</div>
            <div>Reaching 100 CS (minion kills) first</div>
          </div>
        </div>
      </section>

      {/* Champion Select */}
      <section className="mb-12 bg-tyler1-grey rounded-lg p-8 border border-tyler1-dark">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-tyler1-red">🎮</span> Champion Select
        </h2>
        <div className="space-y-4 text-gray-300">
          <div className="flex gap-4">
            <div className="text-tyler1-red font-bold">•</div>
            <div>
              <span className="font-bold text-white">Draft Mode:</span> Blind Pick (both players select simultaneously)
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-tyler1-red font-bold">•</div>
            <div>
              <span className="font-bold text-white">Bans:</span> No champion bans
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-tyler1-red font-bold">•</div>
            <div>
              <span className="font-bold text-white">Mirror Matches:</span> Allowed (both players can pick same champion)
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-tyler1-red font-bold">•</div>
            <div>
              <span className="font-bold text-white">Summoner Spells:</span> Free choice (commonly Flash + Ignite/Exhaust)
            </div>
          </div>
        </div>
      </section>

      {/* Prize Pool */}
      <section className="mb-12 bg-gradient-to-br from-tyler1-red/10 to-tyler1-gold/10 rounded-lg p-8 border-2 border-tyler1-gold">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-tyler1-gold">💰</span> Prize Pool Breakdown
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-tyler1-dark rounded p-4">
            <span className="text-white font-bold">🥇 1st Place:</span>
            <span className="text-2xl font-bold text-tyler1-gold">$10,000</span>
          </div>
          <div className="flex justify-between items-center bg-tyler1-dark rounded p-4">
            <span className="text-white font-bold">🥈 2nd Place:</span>
            <span className="text-2xl font-bold text-green-400">$5,000</span>
          </div>
          <div className="flex justify-between items-center bg-tyler1-dark rounded p-4">
            <span className="text-white font-bold">🥉 3rd Place:</span>
            <span className="text-xl font-bold text-green-400">$2,000</span>
          </div>
          <div className="flex justify-between items-center bg-tyler1-dark rounded p-4">
            <span className="text-white font-bold">4th Place:</span>
            <span className="text-xl font-bold text-green-400">$1,000</span>
          </div>
        </div>
        <div className="mt-6 p-4 bg-tyler1-dark rounded border border-tyler1-red">
          <p className="text-center text-white">
            <span className="font-bold text-tyler1-gold">Season Finale Prize:</span>{" "}
            <span className="text-2xl font-bold text-tyler1-gold">$50,000</span>
          </p>
        </div>
      </section>

      {/* Points System */}
      <section className="mb-12 bg-tyler1-grey rounded-lg p-8 border border-tyler1-dark">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-tyler1-red">📊</span> Points System
        </h2>
        <div className="space-y-3 text-gray-300">
          <p className="text-white font-bold mb-3">Points earned per tournament placement:</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-tyler1-dark rounded p-4">
              <span className="text-tyler1-gold font-bold">1st Place:</span>
              <span className="text-white ml-2">100 points</span>
            </div>
            <div className="bg-tyler1-dark rounded p-4">
              <span className="text-gray-300 font-bold">2nd Place:</span>
              <span className="text-white ml-2">75 points</span>
            </div>
            <div className="bg-tyler1-dark rounded p-4">
              <span className="text-gray-300 font-bold">3rd Place:</span>
              <span className="text-white ml-2">50 points</span>
            </div>
            <div className="bg-tyler1-dark rounded p-4">
              <span className="text-gray-300 font-bold">4th Place:</span>
              <span className="text-white ml-2">35 points</span>
            </div>
            <div className="bg-tyler1-dark rounded p-4">
              <span className="text-gray-300 font-bold">5th-6th:</span>
              <span className="text-white ml-2">20 points</span>
            </div>
            <div className="bg-tyler1-dark rounded p-4">
              <span className="text-gray-300 font-bold">7th-8th:</span>
              <span className="text-white ml-2">10 points</span>
            </div>
          </div>
          <div className="mt-6 p-4 bg-tyler1-red/10 border border-tyler1-red rounded">
            <p className="text-white font-bold">
              🏆 Top 4 players by season points qualify for the Grand Finale
            </p>
          </div>
        </div>
      </section>

      {/* Season Structure */}
      <section className="mb-12 bg-tyler1-grey rounded-lg p-8 border border-tyler1-dark">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-tyler1-red">📅</span> Season Structure
        </h2>
        <div className="space-y-4 text-gray-300">
          <div className="flex gap-4">
            <div className="text-tyler1-red font-bold">•</div>
            <div>
              <span className="font-bold text-white">Duration:</span> 6 weeks (2 tournaments per region)
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-tyler1-red font-bold">•</div>
            <div>
              <span className="font-bold text-white">Schedule:</span> Weekly tournaments rotating NA → EU → KR
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-tyler1-red font-bold">•</div>
            <div>
              <span className="font-bold text-white">Finale:</span> Top 4 players compete for $50,000
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-tyler1-red font-bold">•</div>
            <div>
              <span className="font-bold text-white">Broadcast:</span> All matches streamed live on Tyler1's Twitch
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-tyler1-grey rounded-lg p-8 border border-tyler1-dark">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-tyler1-red">❓</span> Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-white font-bold mb-2">What happens if there's a disconnect?</h3>
            <p className="text-gray-300">
              If a player disconnects within the first 3 minutes, the game is restarted. After 3 minutes,
              the game continues unless both players agree to remake.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">Can players compete in multiple regions?</h3>
            <p className="text-gray-300">
              Players are assigned to their primary region but may be invited as guests to other regional tournaments.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">What patch is used?</h3>
            <p className="text-gray-300">
              Tournaments use the latest live patch available at the time of the event.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
