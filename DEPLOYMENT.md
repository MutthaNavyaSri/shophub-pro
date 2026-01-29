# 🚀 Deployment Guide

## Quick Deployment Steps

### Option 1: Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit: Fakestore React App"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"
   - Your app will be live in ~2 minutes!

3. **Or use Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel
```

### Option 2: Deploy to Netlify

1. **Build the project**
```bash
npm run build
```

2. **Deploy via Netlify Dashboard**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Your app will be live instantly!

3. **Or use Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

## Environment Variables

If you need environment variables (for future API keys, etc.):

1. Create `.env` file (already in .gitignore)
2. Add your variables:
```
VITE_API_BASE_URL=https://fakestoreapi.com
VITE_OTHER_KEY=your-value
```

3. In Vercel/Netlify dashboard:
   - Go to Settings → Environment Variables
   - Add each variable
   - Redeploy

## Post-Deployment Checklist

- ✅ Test login functionality
- ✅ Verify all CRUD operations work
- ✅ Check responsive design on mobile
- ✅ Test all routes and navigation
- ✅ Verify toast notifications appear
- ✅ Check category filtering
- ✅ Test PUT vs PATCH updates

## Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records as instructed

## Continuous Deployment

Both Vercel and Netlify support automatic deployments:
- Every push to `main` branch triggers a new deployment
- Pull requests get preview deployments
- Rollback to previous versions anytime

## Troubleshooting

**Build fails?**
- Check Node.js version (requires v16+)
- Run `npm install` again
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

**404 on refresh?**
- Ensure `vercel.json` or `netlify.toml` is configured (already included)
- These files handle SPA routing

**API not working?**
- Check browser console for CORS errors
- Fakestore API should work without CORS issues
- Verify API endpoints in Redux slice

## Performance Tips

- ✅ Images are lazy-loaded
- ✅ Code splitting enabled (React Router)
- ✅ RTK Query caching reduces API calls
- ✅ Production build is minified

## Monitoring

Add analytics (optional):
- Google Analytics
- Vercel Analytics
- Netlify Analytics

---

Need help? Check the main [README.md](./README.md) or open an issue!
