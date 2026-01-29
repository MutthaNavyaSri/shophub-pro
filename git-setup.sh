# Git Setup and Deployment Commands

# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Fakestore React App with Redux Toolkit RTK Query

Features:
- Login/Signup authentication flow
- Dashboard with user profile
- Full CRUD operations (GET, POST, PUT, PATCH, DELETE)
- Redux Toolkit with RTK Query for state management
- Material UI responsive design
- Toast notifications for user feedback
- Category filtering
- Product modals for create/edit/view
- Protected routes
- Vercel/Netlify deployment ready"

# Create main branch
git branch -M main

# Add your remote repository (replace with your GitHub repo URL)
# git remote add origin https://github.com/yourusername/your-repo.git

# Push to GitHub
# git push -u origin main

# After pushing to GitHub:
# 1. Go to vercel.com and import your GitHub repository
# 2. Or use: vercel --prod
# 3. Your app will be deployed!
