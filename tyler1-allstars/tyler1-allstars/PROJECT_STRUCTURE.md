# Tyler1 All Stars - Project Structure

## Directory Structure

```
tyler1-allstars/
├── app/                          # Next.js App Router pages
│   ├── globals.css              # Global styles with Tailwind
│   ├── layout.tsx               # Root layout (navbar + footer)
│   ├── page.tsx                 # Homepage (combines all sections)
│   ├── players/
│   │   └── page.tsx            # All players page
│   ├── results/
│   │   └── page.tsx            # Results archive page
│   ├── rules/
│   │   └── page.tsx            # Tournament rules page
│   ├── schedule/
│   │   └── page.tsx            # Full schedule page
│   ├── standings/
│   │   └── page.tsx            # Full standings page
│   └── vods/
│       └── page.tsx            # VOD library page
│
├── components/                   # Reusable React components
│   ├── FeaturedPlayers.tsx      # Player cards grid
│   ├── Footer.tsx               # Site footer with links
│   ├── HeroSection.tsx          # Hero banner with countdown
│   ├── LatestResults.tsx        # Latest tournament results
│   ├── Navbar.tsx               # Navigation header
│   ├── ScheduleSection.tsx      # Tournament calendar
│   └── StandingsSection.tsx     # Leaderboard table
│
├── public/                       # Static assets
│   └── images/                  # (empty - ready for logos/photos)
│
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.js            # PostCSS configuration
├── package.json                 # Dependencies and scripts
├── README.md                    # Full documentation
├── QUICKSTART.md                # Quick start guide
└── .gitignore                   # Git ignore rules
```

## Component Breakdown

### Homepage Components (/)
All sections shown on single scrollable page:

1. **HeroSection**
   - Countdown timer to next tournament
   - "WATCH LIVE" button linking to Twitch
   - Current prize pool display
   - Tournament format quick stats

2. **ScheduleSection**
   - 6-week tournament calendar
   - Visual status indicators (✅ Complete, 🔴 Live, 📅 Upcoming)
   - Region flags (NA/EU/KR)
   - Participant avatars
   - Action buttons (Watch Live / View Results / Add to Calendar)

3. **StandingsSection**
   - Top 8 player leaderboard
   - Medal emojis for top 3 (🥇🥈🥉)
   - Points, tournaments, wins, prize money
   - Region-coded colors
   - Mobile-responsive cards
   - Desktop table view

4. **FeaturedPlayers**
   - Top 4 player showcase
   - Player cards with:
     - Region badge
     - Twitch link
     - Main champions
     - Win/loss record
     - Season points
     - "View Profile" button

5. **LatestResults**
   - Last tournament winner + runner-up
   - Prize money breakdown
   - Quick stats (duration, viewers, etc.)
   - "View Bracket" and "Watch VOD" buttons
   - Previous winners list

### Reusable Components

**Navbar**
- Sticky top navigation
- Mobile hamburger menu
- Links to all pages
- Tyler1 branding

**Footer**
- About section
- Quick links
- Social media icons (Twitch/Twitter/YouTube)
- Copyright info

## Page Routes

| Route | Purpose | Key Features |
|-------|---------|--------------|
| `/` | Homepage | Hero + Schedule + Standings + Players + Results |
| `/rules` | Tournament Rules | Format, win conditions, prizes, points system, FAQ |
| `/schedule` | Full Schedule | Complete calendar, timezone info |
| `/standings` | Full Leaderboard | Complete player rankings |
| `/players` | Player Roster | All participants, region filters |
| `/results` | Results Archive | Past tournaments, season records |
| `/vods` | Video Library | Full broadcasts, highlights, POVs |

## Data Management

All data is currently **hardcoded** in component files for easy customization:

- **Schedule data:** `components/ScheduleSection.tsx` - Line 9
- **Standings data:** `components/StandingsSection.tsx` - Line 15
- **Player data:** `components/FeaturedPlayers.tsx` - Line 12
- **Results data:** `components/LatestResults.tsx` - Embedded in JSX

### Future: Backend Integration
To make data dynamic, you could:
1. Create API routes in `app/api/`
2. Connect to a database (Supabase, MongoDB, etc.)
3. Use SWR or React Query for data fetching
4. Replace hardcoded arrays with API calls

## Styling System

### Tailwind CSS Classes
Custom Tyler1 brand colors defined in `tailwind.config.ts`:

```typescript
tyler1: {
  red: '#E31837',      // Primary brand color
  dark: '#1a1a1a',     // Dark backgrounds
  darker: '#0d0d0d',   // Darkest backgrounds
  grey: '#2a2a2a',     // Accent grey
  gold: '#FFD700',     // Gold for prizes/winners
}
```

### Responsive Breakpoints
- **Mobile:** < 768px (single column, cards)
- **Tablet:** 768px - 1024px (2 columns)
- **Desktop:** > 1024px (3-4 columns, tables)

## Build Output

Production build generates:
- Static HTML for all pages (blazing fast)
- Optimized CSS bundle
- Minimized JavaScript
- SEO-friendly meta tags

## Performance Features

- Static Site Generation (SSG)
- Image optimization ready
- Font optimization
- Minimal JavaScript
- CSS purging (unused styles removed)
- Fast refresh in development
- Production build < 500KB

## Next Steps for Production

1. **Add Real Data**
   - Connect to backend API
   - Dynamic tournament updates

2. **Enhanced Features**
   - User authentication
   - Live bracket updates
   - Player profiles
   - Statistics tracking

3. **SEO Optimization**
   - Add meta descriptions
   - Open Graph tags
   - Sitemap generation

4. **Analytics**
   - Google Analytics
   - User tracking
   - Performance monitoring

5. **CMS Integration**
   - Headless CMS (Strapi, Sanity)
   - Admin dashboard
   - Content management

## Technology Choices

**Why Next.js?**
- Fast static generation
- SEO-friendly
- Easy deployment
- Great developer experience

**Why Tailwind CSS?**
- Rapid development
- Consistent design
- Small production bundle
- Easy customization

**Why TypeScript?**
- Type safety
- Better IDE support
- Fewer bugs
- Professional standard
