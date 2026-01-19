# Tyler1 All Stars Website

A modern, responsive website for Tyler1's All Stars tournament series featuring weekly 1v1 League of Legends competitions across NA, EU, and KR regions.

## Features

### Homepage Sections
- **Hero Section** with live countdown timer to next tournament
- **Tournament Schedule** with weekly calendar showing past, live, and upcoming events
- **Season Standings** leaderboard with sortable player rankings
- **Featured Players** showcase with stats and links
- **Latest Results** from most recent tournament

### Additional Pages
- **/rules** - Complete tournament format, rules, prize pool, and points system
- **/schedule** - Full tournament calendar with timezone information
- **/standings** - Complete season leaderboard
- **/players** - Full roster of all participants
- **/results** - Tournament results archive with season records
- **/vods** - Video on demand library with full broadcasts and highlights

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Optimized for Vercel, Netlify, or any Node.js host

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Design Principles

### Mobile-First
The site is fully responsive with mobile-optimized layouts:
- Collapsible navigation
- Touch-friendly buttons
- Responsive tables that convert to cards on mobile
- Optimized font sizes and spacing

### Dark Mode
Tyler1 brand colors with dark theme:
- **Primary Red:** `#E31837`
- **Dark Background:** `#0d0d0d`
- **Grey Accents:** `#2a2a2a`
- **Gold Highlights:** `#FFD700`

### Performance
- Static generation where possible
- Optimized images and fonts
- Minimal JavaScript bundle
- Fast page transitions

## Customization

### Update Tournament Data

Edit the data in these component files:

- **Schedule:** [components/ScheduleSection.tsx](components/ScheduleSection.tsx)
- **Standings:** [components/StandingsSection.tsx](components/StandingsSection.tsx)
- **Players:** [components/FeaturedPlayers.tsx](components/FeaturedPlayers.tsx)
- **Results:** [components/LatestResults.tsx](components/LatestResults.tsx)

### Change Tournament Date

Update the countdown timer in [components/HeroSection.tsx](components/HeroSection.tsx):

```typescript
const nextTournamentDate = new Date("2026-02-10T20:00:00Z");
```

### Modify Colors

Edit the Tailwind config in [tailwind.config.ts](tailwind.config.ts):

```typescript
colors: {
  tyler1: {
    red: '#E31837',
    dark: '#1a1a1a',
    darker: '#0d0d0d',
    grey: '#2a2a2a',
    gold: '#FFD700',
  },
}
```

## Key Questions Answered in 5 Seconds

The homepage immediately shows:
1. ⏰ **When is the next tournament?** - Hero section with countdown
2. 🏆 **Who's leading the standings?** - Leaderboard table
3. 📺 **Where can I watch live?** - Big "WATCH LIVE" button

## Future Enhancements

- Backend API for dynamic data
- User authentication for player profiles
- Live bracket integration (Challonge/Start.gg)
- Real-time match updates
- TikTok/Twitter social feed integration
- Email notifications for tournament reminders
- Player statistics and head-to-head records

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Built for Tyler1 All Stars tournament series.

## Contact

For questions or issues, please contact the tournament organizers.
