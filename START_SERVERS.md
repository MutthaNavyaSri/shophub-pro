# 🚀 Quick Start - Both Servers

## Start Backend + Frontend Together

### Windows PowerShell:

**Terminal 1 - Backend:**
```powershell
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
npm run dev
```

## Or use this script:

### start-all.ps1 (PowerShell)
```powershell
# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"

# Wait 3 seconds
Start-Sleep -Seconds 3

# Start Frontend  
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host "✅ Both servers starting..."
Write-Host "Backend: http://localhost:5000"
Write-Host "Frontend: http://localhost:3000"
```

## Manual Steps:

1. **Install MongoDB** (if not installed)
   - Download: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud)

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Start Backend:**
   ```bash
   npm run dev
   ```
   Should see: ✅ MongoDB Connected

4. **In NEW terminal, Start Frontend:**
   ```bash
   cd ..
   npm run dev
   ```

5. **Open Browser:**
   - http://localhost:3000

6. **Create Account & Test!**

## Verify Everything Works:

✅ Backend: http://localhost:5000 (should show API docs)
✅ Frontend: http://localhost:3000 (should open app)
✅ MongoDB: Running locally or Atlas connected

## Need Help?

See: MONGODB_SETUP.md for complete guide!
