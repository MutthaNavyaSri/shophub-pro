# Deployment Quick Start

## ✅ Your app is now ready for deployment!

### What's Been Updated:

1. **Environment Variables Configuration**
   - Frontend: `.env` and `.env.production` created
   - Backend: Updated `.env` with FRONTEND_URL
   - All hardcoded URLs replaced with environment variables

2. **CORS Configuration**
   - Backend now respects production URLs
   - Automatically handles development and production modes

3. **Image Upload**
   - Works with environment variables
   - Ready for production Cloudinary

---

## 🚀 Deploy in 3 Steps

### Step 1: Deploy Backend to Render
1. Go to [render.com](https://render.com) → Sign up/Login
2. Click "New +" → "Web Service"
3. Connect GitHub repo or upload code
4. Settings:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Root Directory**: `backend`
5. Add these Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://mutthasailaja_db_user:P3EcGHGUPCZd0KWG@cluster0.1qqrus3.mongodb.net/fakestore
   PORT=5000
   JWT_SECRET=fakestore_jwt_secret_key_2026
   NODE_ENV=production
   CLOUDINARY_CLOUD_NAME=dhx4tvsnl
   CLOUDINARY_API_KEY=167269612473368
   CLOUDINARY_API_SECRET=lFXm4TIST3rxUz-WvZc6iyzjv1M
   FRONTEND_URL=https://your-frontend-url.com (update after frontend deploy)
   ```
6. Deploy! Copy the URL (e.g., `https://shophub-backend.onrender.com`)

### Step 2: Deploy Frontend to Vercel
1. Go to [vercel.com](https://vercel.com) → Sign up/Login
2. Click "Add New..." → "Project"
3. Import your GitHub repo
4. Settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
6. Deploy! Copy the URL

### Step 3: Update Backend CORS
1. Go back to Render backend
2. Update Environment Variable:
   ```
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
3. Redeploy backend

---

## 🎉 Done!

Your app is now live:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

**Admin Login:**
- Email: `admin@fakestore.com`
- Password: `admin123`

---

## 📝 Alternative: Deploy Both to Render

**Frontend on Render:**
1. New → "Static Site"
2. Build Command: `npm install && npm run build`
3. Publish Directory: `dist`
4. Environment Variable: `VITE_API_URL=https://backend-url/api`

---

## 🐛 Common Issues

**Frontend can't connect to backend:**
- Check `VITE_API_URL` is correct
- Ensure backend is running
- Test API: `https://backend-url/api/products`

**CORS Error:**
- Update `FRONTEND_URL` in backend to match deployed frontend
- Redeploy backend after changing

**Images not uploading:**
- Verify Cloudinary credentials are set in backend
- Check backend logs for upload errors

---

## 📊 Free Hosting Limits

**Render Free Tier:**
- Backend sleeps after 15 min inactivity
- Wakes up on first request (takes ~30s)

**Vercel Free Tier:**
- 100 GB bandwidth/month
- Perfect for frontend

**MongoDB Atlas:**
- Already configured and working

**Cloudinary:**
- 25 GB storage free
- Already configured

---

Need detailed instructions? Check `DEPLOYMENT.md`
