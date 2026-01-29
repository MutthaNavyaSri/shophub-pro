# Database & Authentication Notes

## About Database Requirement

You mentioned needing a **database for login and signup**. Here's what you need to know:

### Current Setup (Demo/Testing)

The current implementation uses **Fakestore API**, which is a:
- ✅ **Fake REST API** for testing and prototyping
- ✅ Perfect for learning and demos
- ❌ **No real database** - data is not persisted
- ❌ POST/PUT/DELETE operations are simulated
- ❌ Cannot create real user accounts

**Current Auth Flow:**
1. Login works with predefined test users from Fakestore API
2. Token is stored in localStorage (for demo purposes)
3. Signup is simulated - it doesn't create real accounts
4. Use test credentials: `mor_2314` / `83r5^_`

### For Production: Real Database Setup

To make this a **production-ready app with real database**, you need:

## Option 1: Use Firebase (Easiest)

Firebase provides authentication and database out of the box.

**Steps:**
1. Create Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication (Email/Password)
3. Enable Firestore Database
4. Install Firebase SDK:
```bash
npm install firebase
```

5. Update authentication to use Firebase:
```javascript
// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  // ...
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

## Option 2: Build Custom Backend

### Tech Stack Options:

#### A. Node.js + Express + MongoDB
```bash
# Backend setup
npm install express mongoose bcrypt jsonwebtoken cors
```

**Features:**
- User registration with hashed passwords
- JWT token generation
- MongoDB for data persistence
- RESTful API endpoints

#### B. Node.js + Express + PostgreSQL
```bash
npm install express pg bcrypt jsonwebtoken cors
```

**Features:**
- Relational database
- Better for complex queries
- Strong data integrity

#### C. Supabase (Backend as a Service)
- PostgreSQL database
- Built-in authentication
- Real-time subscriptions
- Easy to integrate

**Setup:**
```bash
npm install @supabase/supabase-js
```

### Backend Implementation Example

Here's a basic Express + MongoDB backend:

```javascript
// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// User Model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: String,
  lastname: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// Signup Endpoint
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, username, password, firstname, lastname } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      firstname,
      lastname
    });
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')));
```

## Recommended Approach for Your App

### Quick Start (Best for Demo):
**Use current setup** - Works perfectly for portfolio and learning

### For Real Production:

**Option A: Firebase** (Recommended for beginners)
- ✅ No backend code needed
- ✅ Free tier available
- ✅ Secure authentication
- ✅ Real-time database
- ✅ Easy deployment

**Option B: Supabase** (Recommended for developers)
- ✅ Open source
- ✅ PostgreSQL database
- ✅ Built-in auth
- ✅ RESTful API auto-generated
- ✅ Free tier available

**Option C: Custom Backend** (For full control)
- ✅ Complete control over logic
- ✅ Can integrate with any database
- ✅ Custom business rules
- ❌ More work to setup
- ❌ Need to deploy separately

## Migration Steps (When Ready)

1. **Choose your backend solution** (Firebase, Supabase, or Custom)

2. **Update Redux API slice:**
```javascript
// Change base URL from Fakestore to your backend
baseQuery: fetchBaseQuery({ 
  baseUrl: 'https://your-backend.com/api',
  // or
  baseUrl: 'https://your-project.supabase.co',
})
```

3. **Update auth endpoints:**
```javascript
// Update login mutation
login: builder.mutation({
  query: (credentials) => ({
    url: '/auth/login',  // Your backend endpoint
    method: 'POST',
    body: credentials,
  }),
}),

// Update signup mutation
signup: builder.mutation({
  query: (userData) => ({
    url: '/auth/signup',  // Your backend endpoint
    method: 'POST',
    body: userData,
  }),
}),
```

4. **Update product endpoints** to use your backend

5. **Deploy backend** (if custom) to Heroku, Railway, or Render

## Security Considerations for Production

- ✅ Use HTTPS only
- ✅ Store JWT in HTTP-only cookies (not localStorage)
- ✅ Implement refresh token rotation
- ✅ Add rate limiting
- ✅ Validate all inputs
- ✅ Use environment variables for secrets
- ✅ Implement CORS properly
- ✅ Add password strength requirements
- ✅ Add email verification
- ✅ Add 2FA (optional)

## Need Help?

**Firebase Tutorial:** [Firebase Auth Docs](https://firebase.google.com/docs/auth)  
**Supabase Tutorial:** [Supabase Auth Docs](https://supabase.com/docs/guides/auth)  
**MongoDB Tutorial:** [MongoDB University](https://university.mongodb.com/)

---

**Current Status:** ✅ Demo-ready with Fakestore API  
**For Production:** Choose Firebase, Supabase, or Custom Backend
