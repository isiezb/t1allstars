# Deployment Guide - Tyler1 All Stars Website

## Quick Deploy Options

### Option 1: Vercel (Recommended - 2 minutes)

Vercel is made by the Next.js team and offers the best performance.

1. **Push to GitHub**
   ```bash
   cd tyler1-allstars
   git init
   git add .
   git commit -m "Initial Tyler1 All Stars website"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Done! Your site is live at `your-project.vercel.app`

**Advantages:**
- Free tier available
- Automatic deployments on git push
- Global CDN
- Zero configuration
- Built-in analytics

---

### Option 2: Netlify (Alternative - 3 minutes)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `.next` folder
   - Or connect your Git repository
   - Site is live!

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `.next`

---

### Option 3: Docker (For Custom Hosting)

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and run**
   ```bash
   docker build -t tyler1-allstars .
   docker run -p 3000:3000 tyler1-allstars
   ```

---

### Option 4: Traditional VPS (DigitalOcean, AWS, etc.)

**Prerequisites:**
- Ubuntu/Debian server
- Node.js 18+ installed
- Nginx (optional, for reverse proxy)

**Steps:**

1. **Upload files to server**
   ```bash
   scp -r tyler1-allstars user@your-server:/var/www/
   ```

2. **Install and build**
   ```bash
   ssh user@your-server
   cd /var/www/tyler1-allstars
   npm install
   npm run build
   ```

3. **Run with PM2 (process manager)**
   ```bash
   npm install -g pm2
   pm2 start npm --name "tyler1-allstars" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx (optional)**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Environment Variables

If you add backend features, create a `.env.local` file:

```env
# Example environment variables
NEXT_PUBLIC_API_URL=https://api.tyler1allstars.com
NEXT_PUBLIC_TWITCH_CHANNEL=loltyler1
DATABASE_URL=your_database_connection_string
```

**Important:** Never commit `.env.local` to Git!

---

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as shown
4. SSL certificate auto-generated

### Netlify
1. Domain Settings → Add custom domain
2. Update DNS to point to Netlify
3. SSL enabled automatically

### Manual (Nginx)
1. Get SSL certificate with Let's Encrypt:
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```
2. Auto-renewal is configured

---

## Performance Optimization

### Before Deploying

1. **Optimize images**
   - Use WebP format
   - Add images to `public/images/`
   - Use Next.js `<Image>` component

2. **Enable compression**
   - Gzip enabled by default in Vercel/Netlify
   - For manual hosting, enable in Nginx

3. **Check bundle size**
   ```bash
   npm run build
   # Check output for bundle sizes
   ```

### After Deploying

1. **Test performance**
   - [PageSpeed Insights](https://pagespeed.web.dev/)
   - [GTmetrix](https://gtmetrix.com/)

2. **Monitor uptime**
   - UptimeRobot (free)
   - Pingdom
   - Vercel/Netlify analytics

---

## Continuous Deployment

### GitHub Actions (Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm test # if you add tests
```

With Vercel/Netlify, just push to main branch:
```bash
git push origin main
# Auto-deploys to production
```

---

## Rollback Strategy

### Vercel
- Go to Deployments
- Click on previous deployment
- Click "Promote to Production"

### Manual
```bash
# Keep previous builds
pm2 stop tyler1-allstars
cd /var/www/tyler1-allstars-backup
pm2 start npm --name "tyler1-allstars" -- start
```

---

## Monitoring & Analytics

### Add Google Analytics

1. Get tracking ID from Google Analytics
2. Add to `app/layout.tsx`:
   ```tsx
   <Script
     src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
     strategy="afterInteractive"
   />
   ```

### Vercel Analytics
- Enable in Vercel dashboard
- Zero configuration needed

---

## Troubleshooting

### Build fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Memory issues
```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

---

## Security Checklist

- [ ] Environment variables in `.env.local`, not in code
- [ ] `.env.local` added to `.gitignore`
- [ ] HTTPS enabled (auto with Vercel/Netlify)
- [ ] Dependencies up to date (`npm audit`)
- [ ] No API keys in client-side code
- [ ] Rate limiting on API routes (if added)

---

## Backup Strategy

### Database (if you add one)
- Daily automated backups
- Store in separate location
- Test restore process

### Code
- Git repository (GitHub/GitLab)
- Vercel keeps deployment history
- Manual: Keep previous builds

---

## Cost Estimates

### Free Tier (Perfect for Starting)
- **Vercel:** Free for personal projects
- **Netlify:** 100GB bandwidth/month free
- **GitHub Pages:** Free static hosting

### Paid Hosting (If Needed)
- **Vercel Pro:** $20/month
- **DigitalOcean Droplet:** $6/month
- **AWS Lightsail:** $5/month

### Domain
- **.com domain:** ~$12/year
- **DNS:** Free (Cloudflare)
- **SSL:** Free (Let's Encrypt)

---

## Go Live Checklist

- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Update tournament dates/data
- [ ] Test countdown timer
- [ ] Verify all social media links
- [ ] Run performance test
- [ ] Set up analytics
- [ ] Configure custom domain
- [ ] Enable SSL
- [ ] Test on different browsers
- [ ] Create sitemap
- [ ] Submit to Google Search Console

---

## Support & Updates

### Updating Content
1. Edit component files
2. Commit changes
3. Push to GitHub
4. Auto-deploys (if using Vercel/Netlify)

### Adding Features
1. Create new branch
2. Make changes
3. Test locally
4. Merge to main
5. Auto-deploys

---

**Ready to deploy?** Start with Vercel for the easiest experience!
