# 🖼️ Cloudinary Image Upload Setup

## Overview
This app now supports image uploads from your local system. Images are stored on Cloudinary (a cloud-based image hosting service), making them work perfectly in both development and production.

## 🚀 Setup Instructions

### 1. Create a Free Cloudinary Account

1. Visit [https://cloudinary.com/](https://cloudinary.com/)
2. Click **"Sign Up for Free"**
3. Complete the registration (no credit card required)
4. Verify your email

### 2. Get Your Cloudinary Credentials

After logging in:

1. Go to your **Dashboard**
2. You'll see your credentials:
   - **Cloud Name** (e.g., `dxxxxxxxxxxxx`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `Abc123XYZ_randomsecret`)

### 3. Update Backend Environment Variables

Open `backend/.env` and replace the placeholder values:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Example:**
```env
CLOUDINARY_CLOUD_NAME=dzk123abc
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=AbC123XyZ_RandomSecret456
```

### 4. Restart Your Backend Server

```bash
cd backend
node server.js
```

## ✅ How It Works

### For Users:
1. Click **"Add Product"** or **"Edit Product"**
2. Click **"Upload Image"** button
3. Select an image from your computer (JPG, PNG, GIF, WebP)
4. See a live preview
5. Submit the form - image is automatically uploaded to Cloudinary
6. The image URL is saved in MongoDB

### Technical Flow:
```
User selects image → Frontend validates (5MB max) → 
Uploads to /api/upload/upload → Cloudinary stores image → 
Returns secure URL → Product saved with URL in MongoDB
```

## 📝 Features

✅ **Local file upload** - No need for external image hosting
✅ **Image validation** - Only images, max 5MB
✅ **Live preview** - See image before uploading
✅ **Secure storage** - Images stored on Cloudinary CDN
✅ **URL fallback** - Can still paste image URLs if preferred
✅ **Works in deployment** - Production-ready

## 🔒 Security

- Images uploaded to: `shophub-products` folder in your Cloudinary account
- Only authenticated users can upload (JWT required)
- File type validation (images only)
- File size limit (5MB)

## 💰 Free Tier Limits

Cloudinary's free tier includes:
- **25 GB storage**
- **25 GB bandwidth/month**
- Perfect for development and small projects

## 🐛 Troubleshooting

**Error: "Upload failed"**
- Check your Cloudinary credentials in `.env`
- Make sure backend server is running
- Check console for error messages

**Image not showing**
- Verify Cloudinary credentials are correct
- Check your Cloudinary dashboard to see if image uploaded
- Try pasting the Cloudinary URL directly

**"Only image files allowed"**
- Only JPG, PNG, GIF, and WebP are supported
- Check file extension

## 📦 Dependencies Added

Backend:
- `multer` - File upload handling
- `cloudinary` - Cloud image storage
- `dotenv` - Environment variables

Frontend:
- Material-UI `CloudUpload` and `Delete` icons (already included)

---

**Need Help?** Check [Cloudinary Documentation](https://cloudinary.com/documentation)
