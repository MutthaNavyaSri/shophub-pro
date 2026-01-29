# 🚀 GitHub + Render + Vercel Deployment Guide

## Step 1: Push to GitHub

### 1.1 Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit - ShopHub Pro ready for deployment"
```

### 1.2 Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click the **"+"** icon → **"New repository"**
3. Name it: `shophub-pro` (or any name you prefer)
4. **Don't** initialize with README (we already have one)
5. Click **"Create repository"**

### 1.3 Push to GitHub
Replace `YOUR-USERNAME` with your GitHub username:
```bash
git remote add origin https://github.com/YOUR-USERNAME/shophub-pro.git
git branch -M main
git push -u origin main
```

✅ Your code is now on GitHub!

---

## Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended)

### 2.2 Deploy Backend
1. Click **"New +"** → **"Web Service"**
2. Click **"Build and deploy from a Git repository"** → **"Next"**
3. Connect your GitHub account if not already connected
4. Select your **`shophub-pro`** repository
5. Configure the service:

**Settings:**
- **Name**: `shophub-backend` (or any name)
- **Region**: Select closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Instance Type**: `Free`

6. Click **"Advanced"** and add Environment Variables:

```env
MONGODB_URI=mongodb+srv://mutthasailaja_db_user:P3EcGHGUPCZd0KWG@cluster0.1qqrus3.mongodb.net/fakestore
PORT=5000
JWT_SECRET=fakestore_jwt_secret_key_2026
NODE_ENV=production
CLOUDINARY_CLOUD_NAME=dhx4tvsnl
CLOUDINARY_API_KEY=167269612473368
CLOUDINARY_API_SECRET=lFXm4TIST3rxUz-WvZc6iyzjv1M
FRONTEND_URL=https://temporary-url.com
```
(We'll update `FRONTEND_URL` after frontend deployment)

7. Click **"Create Web Service"**

8. Wait for deployment (takes 2-3 minutes)

9. **Copy your backend URL**: It will look like `https://shophub-backend.onrender.com`

✅ Backend is live!

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (recommended)

### 3.2 Deploy Frontend
1. Click **"Add New..."** → **"Project"**
2. Click **"Import"** next to your **`shophub-pro`** repository
3. Configure project:

**Settings:**
- **Project Name**: `shophub-frontend` (or any name)
- **Framework Preset**: `Vite` (should auto-detect)
- **Root Directory**: `./` (leave as root)
- **Build Command**: `npm run build` (should be auto-filled)
- **Output Directory**: `dist` (should be auto-filled)

4. Click **"Environment Variables"** and add:

```
Name: VITE_API_URL
Value: https://YOUR-BACKEND-URL.onrender.com/api
```
Replace with your actual backend URL from Step 2.9

5. Click **"Deploy"**

6. Wait for deployment (takes 1-2 minutes)

7. **Copy your frontend URL**: It will look like `https://shophub-frontend.vercel.app`

✅ Frontend is live!

---

## Step 4: Update Backend CORS

### 4.1 Update FRONTEND_URL
1. Go back to your Render dashboard
2. Click on your backend service
3. Go to **"Environment"** tab
4. Find `FRONTEND_URL` and update it to your Vercel URL:
```
FRONTEND_URL=https://shophub-frontend.vercel.app
```
5. Save changes - Render will automatically redeploy

✅ Wait 1-2 minutes for redeployment

---

## Step 5: Test Your App! 🎉

### 5.1 Visit Your Frontend
Open: `https://your-app.vercel.app`

### 5.2 Test Features
1. **Login** with admin credentials:
   - Email: `admin@fakestore.com`
   - Password: `admin123`
2. View products
3. Add a new product with image upload
4. Edit/Delete products

### 5.3 Common Issues

**Frontend can't connect to backend:**
- Check browser console for CORS errors
- Verify `VITE_API_URL` in Vercel environment variables
- Test backend directly: `https://your-backend.onrender.com/api/products`

**Images not uploading:**
- Verify Cloudinary credentials in Render backend environment
- Check Render logs for errors

**Backend slow on first load:**
- Render free tier sleeps after 15 min inactivity
- First request takes ~30 seconds to wake up
- Subsequent requests are fast

---

## 📝 Useful Commands

### Update Your Deployed Apps

**After making code changes:**
```bash
git add .
git commit -m "Your changes description"
git push
```
Both Render and Vercel will auto-deploy!

### View Logs

**Render (Backend):**
- Dashboard → Your service → "Logs" tab

**Vercel (Frontend):**
- Dashboard → Your project → "Deployments" → Latest → "View Function Logs"

---

## 🎯 Your Live URLs

**Frontend**: `https://your-app.vercel.app`  
**Backend API**: `https://your-backend.onrender.com`  
**Admin Email**: `admin@fakestore.com`  
**Admin Password**: `admin123`

---

## 💡 Pro Tips

1. **Render Free Tier**: Backend sleeps after 15 min - keep it awake with uptime monitors
2. **Vercel**: Unlimited deployments on free tier
3. **MongoDB Atlas**: Already configured and working
4. **Cloudinary**: 25GB free storage/bandwidth per month
5. **GitHub**: Every push auto-deploys to both platforms

---

**Need help?** Check:
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

🎉 **Congratulations! Your app is live!**
