# Quick Start Guide

## Get Started in 3 Steps

### 1. Install Dependencies
```bash
cd tyler1-allstars
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

## What You Get

### Homepage Features
- **Hero Banner** - Countdown timer to next tournament with "WATCH LIVE" button
- **Schedule** - 6-week tournament calendar with status indicators (Complete/Live/Upcoming)
- **Standings** - Season leaderboard showing top players and prize money
- **Featured Players** - Player cards with stats, Twitch links, and main champions
- **Latest Results** - Tournament outcomes with winner, prize pool, and VOD links

### Additional Pages
- **/rules** - Complete tournament rules, format, prize breakdown, points system
- **/schedule** - Full tournament calendar with timezone info
- **/standings** - Complete leaderboard
- **/players** - Full player roster with region filters
- **/results** - Tournament archive with season records
- **/vods** - Video library with full broadcasts and highlights

## Customization

### Update Next Tournament Date
Edit `components/HeroSection.tsx`:
```typescript
const nextTournamentDate = new Date("2026-02-10T20:00:00Z");
```

### Update Schedule
Edit the `scheduleData` array in `components/ScheduleSection.tsx`

### Update Standings
Edit the `standingsData` array in `components/StandingsSection.tsx`

### Update Players
Edit the `featuredPlayers` array in `components/FeaturedPlayers.tsx`

### Change Colors
Edit `tailwind.config.ts` to customize the Tyler1 brand colors

## Mobile Responsive
The site is fully mobile-optimized with:
- Hamburger menu navigation
- Touch-friendly buttons
- Responsive tables that convert to cards
- Optimized spacing and typography

## Performance
- All pages are statically generated
- Fast page loads
- SEO optimized
- Production-ready build

## Deploy

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy with one click

### Other Platforms
The site can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- Your own VPS

## Need Help?
Check the main [README.md](README.md) for detailed documentation.
