# Tyler1 All Stars - Admin Panel Guide

## 🎯 Overview

A comprehensive admin panel has been built to manage all tournament data. You can now add, edit, and delete players, tournaments, standings, and results through an intuitive web interface instead of editing code.

## 🚀 Accessing the Admin Panel

### URL
```
https://your-domain.vercel.app/admin
```

For local development:
```
http://localhost:3000/admin
```

### Login Credentials

You'll need to set up an admin account in your backend. The login page accepts:
- Username
- Password

The backend will return a JWT token which is stored in localStorage for authenticated requests.

## 📊 Admin Panel Structure

### 1. Dashboard (`/admin/dashboard`)
- **Statistics Overview**: View total counts of players, tournaments, standings, and results
- **Quick Actions**: One-click buttons to add new data
- **Getting Started Guide**: Tips for first-time setup

### 2. Players Management (`/admin/players`)
Manage your player roster with full details:

**Fields:**
- Player Name* (required)
- Region* (NA, EU, KR)
- Twitch Username
- Title (e.g., "Top Lane Specialist")
- Record (e.g., "2-1")
- Points
- Main Champions (comma-separated: "Darius, Renekton, Mordekaiser")

**Actions:**
- ✅ Add new players
- ✏️ Edit existing players
- 🗑️ Delete players (with confirmation)

### 3. Tournaments Management (`/admin/tournaments`)
Schedule and manage tournament events:

**Fields:**
- Week Number* (required, must be unique)
- Date* (e.g., "Feb 10, 2026")
- Region* (NA, EU, KR)
- Status* (upcoming, live, complete)
- Participants (comma-separated player names)

**Actions:**
- ✅ Add new tournaments
- ✏️ Edit tournament details
- 🗑️ Delete tournaments
- 🔴 Update status to "live" during tournaments
- ✓ Mark as "complete" after tournaments finish

### 4. Standings Management (`/admin/standings`)
Maintain the season leaderboard:

**Fields:**
- Rank* (required, must be unique)
- Player Name* (required)
- Region* (NA, EU, KR)
- Points
- Tournaments (number participated in)
- Wins
- Prize Money ($)

**Actions:**
- ✅ Add new standings entries
- ✏️ Update player rankings and stats
- 🗑️ Remove entries

**Best Practice:** Update standings after each tournament completes!

### 5. Results Management (`/admin/results`)
Record tournament outcomes:

**Fields:**
- Tournament Name* (e.g., "Week 2 - EU All Stars")
- Date* (e.g., "February 3, 2026")
- Winner* (player name)
- Runner-up* (player name)
- Region* (NA, EU, KR)
- Prize Pool* ($)

**Actions:**
- ✅ Add tournament results
- ✏️ Edit results
- 🗑️ Delete results

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: All admin pages require authentication
- **Auto-redirect**: Unauthenticated users are redirected to login
- **Token Storage**: JWT stored securely in localStorage
- **Session Persistence**: Stays logged in until you click "Logout"

## 🎨 UI Features

- **Tyler1 Branding**: Consistent red/dark theme throughout
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Changes reflect immediately
- **Empty States**: Helpful messages when no data exists
- **Inline Actions**: Edit/Delete buttons on each item
- **Form Validation**: Required fields are enforced
- **Confirmation Dialogs**: Prevents accidental deletions
- **Loading States**: Shows "Loading..." while fetching data
- **Error Handling**: User-friendly error messages

## 📝 Typical Workflow

### Setting Up Your First Tournament

1. **Add Players First**
   - Go to Players page
   - Click "+ Add Player"
   - Fill in player details (at minimum: name and region)
   - Create 8 players for your tournament

2. **Create Tournament Schedule**
   - Go to Tournaments page
   - Click "+ Add Tournament"
   - Set week number, date, region
   - Status: "upcoming"
   - Add participant names (comma-separated)

3. **Initialize Standings**
   - Go to Standings page
   - Add entries for each player
   - Set initial ranks (1-8)
   - Start with 0 points for everyone

4. **During Tournament**
   - Go to Tournaments page
   - Edit the tournament
   - Change status to "live"
   - This will show "🔴 LIVE NOW" on the website

5. **After Tournament Ends**
   - **Record Results**:
     - Go to Results page
     - Add new result with winner and runner-up
     - Set prize pool

   - **Update Tournament Status**:
     - Go to Tournaments page
     - Edit tournament, change status to "complete"

   - **Update Standings**:
     - Go to Standings page
     - Edit each player's entry
     - Update points, tournaments played, wins, and prize money

## 🔄 Data Flow

```
Admin Panel → Backend API → Supabase Database → Frontend Website
```

When you create/edit/delete data in the admin panel:
1. Admin panel sends authenticated request to backend
2. Backend validates JWT token
3. Backend updates Supabase database
4. Frontend website automatically shows updated data on next page load

## 🐛 Troubleshooting

### "Login failed" error
- Check that your backend is running at the correct URL
- Verify your username and password in the backend database
- Check browser console for detailed error messages

### "Failed to fetch" errors
- Ensure backend API is running
- Check that `NEXT_PUBLIC_API_URL` in `.env.local` is correct
- Verify backend has CORS enabled for your frontend domain

### Data not showing on website
- Check that data was successfully saved (refresh admin page)
- Verify backend database has the data
- Clear browser cache and refresh website
- Check browser console for API errors

### Token expired
- Click "Logout" and log back in
- Token is stored in localStorage and persists until logout

## 🚧 Backend Setup Required

Before using the admin panel, ensure your backend has:

1. **Admin Authentication Endpoint**
   - `POST /api/auth/login`
   - Accepts: `{ username, password }`
   - Returns: `{ token }`

2. **CRUD Endpoints** (all require JWT token in Authorization header)
   - Players: POST/PUT/DELETE `/api/players`
   - Tournaments: POST/PUT/DELETE `/api/tournaments`
   - Standings: POST/PUT/DELETE `/api/standings`
   - Results: POST/PUT/DELETE `/api/results`

3. **Middleware**
   - JWT verification middleware
   - CORS configuration allowing your frontend domain

## 📱 Mobile Support

The admin panel is fully responsive:
- **Desktop**: Full table views with all columns
- **Tablet**: Adjusted layouts for smaller screens
- **Mobile**: Card-based layouts, stacked forms

## 💡 Tips & Best Practices

1. **Regular Updates**: Update standings after each tournament
2. **Consistent Naming**: Use same player names across all sections
3. **Backup Data**: Keep records of important data outside the system
4. **Test First**: Try adding/editing one item before bulk operations
5. **Double-Check**: Review tournament status before making it live
6. **Prize Tracking**: Ensure prize money in Results matches Standings
7. **Sequential Weeks**: Create tournaments in order (Week 1, 2, 3...)

## 🎯 Next Steps

After setting up your admin panel:

1. Create an admin user in your backend database
2. Log into the admin panel
3. Add all 8 players for your first tournament
4. Create Week 1 tournament schedule
5. Set up initial standings (all players at rank 1-8, 0 points)
6. When tournament starts, mark it as "live"
7. After tournament, add results and update standings
8. Repeat for subsequent weeks!

## 🆘 Support

If you encounter issues:
1. Check browser console for errors
2. Verify backend logs
3. Ensure all environment variables are set correctly
4. Check that Supabase database is accessible

---

**Built with:** Next.js 15, TypeScript, Tailwind CSS, JWT Authentication

**Deployment:** Works on Vercel, Netlify, or any Next.js hosting platform
