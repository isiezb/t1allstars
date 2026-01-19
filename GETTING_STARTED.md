# Tyler1 All Stars - Complete Setup Guide

## 🎯 Quick Start (5 Minutes)

Get your tournament website up and running with sample data:

### Step 1: Set Up Supabase Database

1. **Go to your Supabase Dashboard**
   - Navigate to SQL Editor

2. **Create the Database Tables**

   Copy and paste this SQL:

   ```sql
   -- Admins table
   CREATE TABLE admins (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     username TEXT UNIQUE NOT NULL,
     password TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Players table
   CREATE TABLE players (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name TEXT UNIQUE NOT NULL,
     region TEXT NOT NULL CHECK (region IN ('NA', 'EU', 'KR')),
     title TEXT,
     image TEXT,
     description TEXT,
     twitch TEXT,
     champions TEXT[],
     record TEXT,
     points INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Tournaments table
   CREATE TABLE tournaments (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     week INTEGER UNIQUE NOT NULL,
     date TEXT NOT NULL,
     region TEXT NOT NULL CHECK (region IN ('NA', 'EU', 'KR')),
     status TEXT NOT NULL CHECK (status IN ('complete', 'live', 'upcoming')),
     participants TEXT[] DEFAULT '{}',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Standings table
   CREATE TABLE standings (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     rank INTEGER UNIQUE NOT NULL,
     name TEXT NOT NULL,
     region TEXT NOT NULL CHECK (region IN ('NA', 'EU', 'KR')),
     points INTEGER DEFAULT 0,
     tournaments INTEGER DEFAULT 0,
     wins INTEGER DEFAULT 0,
     prize INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Results table
   CREATE TABLE results (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     tournament TEXT NOT NULL,
     date TEXT NOT NULL,
     winner TEXT NOT NULL,
     runner_up TEXT NOT NULL,
     region TEXT NOT NULL CHECK (region IN ('NA', 'EU', 'KR')),
     prize_pool INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. **Run the SQL** - Click "Run" to create all tables

### Step 2: Seed the Database

1. **Navigate to your backend folder**:
   ```bash
   cd /path/to/t1allstarsbackend
   ```

2. **Make sure your `.env` is configured**:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_KEY=your-service-role-key
   JWT_SECRET=your-secret-key
   PORT=5000
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

3. **Run the seed script**:
   ```bash
   npm run seed
   ```

   This creates:
   - ✅ Admin user (admin/admin123)
   - ✅ 8 players with full details
   - ✅ 6 tournaments
   - ✅ 8 standings entries
   - ✅ 2 results

### Step 3: Test Your Site

1. **Visit your website**: `https://your-domain.vercel.app`
   - You should now see players, tournaments, standings, and results

2. **Log into admin panel**: `https://your-domain.vercel.app/admin`
   - Username: `admin`
   - Password: `admin123`
   - ⚠️ **IMPORTANT**: Change this password immediately!

3. **Explore the admin panel**:
   - Dashboard - View statistics
   - Players - Manage roster
   - Tournaments - Update schedule
   - Standings - Track rankings
   - Results - Record outcomes

### Step 4: Customize

Use the admin panel to:
- Edit player information
- Update tournament dates
- Add new participants
- Update standings after tournaments
- Record new results

---

## 📚 Project Structure

```
tyler1-allstars-website/
├── Frontend (Next.js)
│   ├── app/
│   │   ├── page.tsx                 # Homepage
│   │   ├── admin/                   # Admin panel
│   │   │   ├── page.tsx            # Login
│   │   │   ├── dashboard/          # Dashboard
│   │   │   ├── players/            # Players CRUD
│   │   │   ├── tournaments/        # Tournaments CRUD
│   │   │   ├── standings/          # Standings CRUD
│   │   │   └── results/            # Results CRUD
│   │   ├── players/                # Public players page
│   │   ├── schedule/               # Public schedule page
│   │   ├── standings/              # Public standings page
│   │   ├── results/                # Public results page
│   │   ├── rules/                  # Tournament rules
│   │   └── vods/                   # VODs page
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ScheduleSection.tsx     # Fetches from API
│   │   ├── StandingsSection.tsx    # Fetches from API
│   │   ├── FeaturedPlayers.tsx     # Fetches from API
│   │   ├── LatestResults.tsx       # Fetches from API
│   │   └── admin/
│   │       └── AdminLayout.tsx     # Admin sidebar/nav
│   └── lib/
│       ├── api.ts                   # API client functions
│       └── structured-data.ts       # SEO helpers
│
└── Backend (Express + Supabase)
    ├── src/
    │   ├── server.js                # Express server
    │   ├── routes/
    │   │   ├── auth.js             # POST /api/auth/login
    │   │   ├── players.js          # GET/POST/PUT/DELETE /api/players
    │   │   ├── tournaments.js      # GET/POST/PUT/DELETE /api/tournaments
    │   │   ├── standings.js        # GET/POST/PUT/DELETE /api/standings
    │   │   └── results.js          # GET/POST/PUT/DELETE /api/results
    │   ├── controllers/            # Business logic
    │   ├── middleware/
    │   │   └── auth.js            # JWT verification
    │   └── lib/
    │       └── supabase.js        # Supabase client
    └── scripts/
        ├── seed.js                # Populate database
        └── clear.js               # Clear database
```

---

## 🔄 Data Flow

```
User Action (Admin Panel)
    ↓
Frontend API Call (with JWT token)
    ↓
Backend Express API (validates token)
    ↓
Supabase Database (updates data)
    ↓
Frontend Website (fetches updated data)
    ↓
User Sees Changes
```

---

## 🚀 Deployment Status

### Frontend (Vercel)
- ✅ Repository: github.com/isiezb/t1allstars
- ✅ Auto-deploys on push to main
- ✅ Environment variable: `NEXT_PUBLIC_API_URL`

### Backend (Render)
- ✅ Repository: github.com/isiezb/t1allstarsbackend
- ✅ Service URL: https://t1allstarsbackend.onrender.com
- ✅ Environment variables configured
- ✅ Auto-deploys on push to main

### Database (Supabase)
- ✅ PostgreSQL database
- ✅ Tables created via SQL
- ✅ Service role key configured
- ⏳ Needs seeding (run `npm run seed`)

---

## 🎮 Typical Tournament Workflow

### Before Tournament
1. **Add participants** (if new players)
   - Admin Panel → Players → Add Player

2. **Create tournament entry**
   - Admin Panel → Tournaments → Add Tournament
   - Set week, date, region, participants
   - Status: "upcoming"

3. **Announce on social media**
   - Website shows tournament in "Upcoming" section

### During Tournament
1. **Update tournament status**
   - Admin Panel → Tournaments → Edit
   - Change status to "live"
   - Website shows "🔴 LIVE NOW"

### After Tournament
1. **Record results**
   - Admin Panel → Results → Add Result
   - Enter winner, runner-up, prize pool

2. **Update tournament status**
   - Admin Panel → Tournaments → Edit
   - Change status to "complete"

3. **Update standings**
   - Admin Panel → Standings → Edit each player
   - Update points, tournaments played, wins, prize money

---

## 🔐 Security Checklist

- ✅ JWT authentication for admin API
- ✅ CORS configured for frontend domain
- ✅ Environment variables for secrets
- ✅ Service role key (not anon key) for backend
- ⚠️ Change default admin password (admin123)
- ⚠️ Don't commit .env files
- ⚠️ Use HTTPS in production

---

## 🐛 Troubleshooting

### Frontend shows "No data available"
- Check backend is running: https://t1allstarsbackend.onrender.com/api/health
- Verify database has data: Run `npm run seed` in backend
- Check browser console for API errors
- Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local`

### Admin login fails
- Check backend /api/auth/login endpoint works
- Verify admin user exists in database
- Check JWT_SECRET is set in backend .env
- Try seeding database again: `npm run reset`

### "Table does not exist" error
- Run the SQL schema in Supabase dashboard
- Make sure all 5 tables are created
- Check table names are lowercase

### Changes in admin panel don't show on website
- Hard refresh website (Cmd/Ctrl + Shift + R)
- Check backend logs for errors
- Verify data was saved in Supabase dashboard
- Check browser console for fetch errors

### Render backend not starting
- Check Render dashboard logs
- Verify environment variables are set
- Make sure SUPABASE_URL and keys are correct
- Check syntax errors in code (last commit)

---

## 📖 Documentation

- **ADMIN_PANEL_GUIDE.md** - How to use the admin panel
- **SEED_GUIDE.md** (backend repo) - Database seeding instructions
- **DEPLOYMENT.md** - Deployment configuration

---

## 🎯 Next Steps

1. ✅ Create Supabase tables (SQL above)
2. ✅ Run seed script (`npm run seed`)
3. ✅ Test admin login
4. ✅ Change admin password
5. ⏭️ Customize sample data
6. ⏭️ Add real player information
7. ⏭️ Schedule your first tournament
8. ⏭️ Set up social media integration
9. ⏭️ Add analytics (Google Analytics, etc.)
10. ⏭️ Create promotional content

---

## 💡 Tips

- **Update regularly**: Keep standings current after each tournament
- **Backup data**: Export important data periodically
- **Test changes**: Use clear + seed scripts to test with fresh data
- **Monitor logs**: Check Render logs for backend errors
- **Version control**: Commit changes before major updates
- **Mobile test**: Check site on mobile devices
- **Performance**: Monitor Vercel analytics

---

## 🆘 Need Help?

1. Check browser console for errors
2. Review Render backend logs
3. Verify Supabase database data
4. Check all environment variables
5. Test API endpoints directly (curl or Postman)

---

**Built with:** Next.js 15, TypeScript, Express, Supabase, Tailwind CSS

**Deployed on:** Vercel (Frontend) + Render (Backend) + Supabase (Database)

**Ready to launch your tournament! 🚀**
