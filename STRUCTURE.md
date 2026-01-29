# 📂 Project Structure

```
App1/
│
├── 📄 index.html                      # HTML entry point
├── 📄 package.json                    # Dependencies & scripts
├── 📄 vite.config.js                  # Vite configuration
├── 📄 vercel.json                     # Vercel deployment config
├── 📄 netlify.toml                    # Netlify deployment config
├── 📄 .gitignore                      # Git ignore rules
├── 📄 .env.example                    # Environment variables template
│
├── 📁 src/                            # Source code
│   ├── 📄 main.jsx                    # App entry point (Redux, Router, Theme)
│   ├── 📄 App.jsx                     # Main app component (Routes)
│   │
│   ├── 📁 pages/                      # Page components
│   │   ├── 📄 Login.jsx               # Login page (authentication)
│   │   ├── 📄 Signup.jsx              # Signup page (registration)
│   │   └── 📄 Dashboard.jsx           # Main dashboard (products)
│   │
│   ├── 📁 components/                 # Reusable components
│   │   ├── 📄 ProductModal.jsx        # Create/Edit product modal
│   │   └── 📄 ProductDetailModal.jsx  # View product details modal
│   │
│   └── 📁 redux/                      # State management
│       ├── 📄 store.js                # Redux store configuration
│       ├── 📁 api/
│       │   └── 📄 fakestoreApi.js     # RTK Query API slice
│       └── 📁 slices/
│           └── 📄 authSlice.js        # Authentication state
│
└── 📁 docs/                           # Documentation (reference)
    ├── 📄 README.md                   # Main documentation
    ├── 📄 QUICKSTART.md               # Quick start guide
    ├── 📄 PROJECT_SUMMARY.md          # Project completion summary
    ├── 📄 DEPLOYMENT.md               # Deployment instructions
    ├── 📄 DATABASE_GUIDE.md           # Database integration guide
    ├── 📄 API_DOCS.md                 # API documentation
    └── 📄 git-setup.sh                # Git initialization script
```

## 🔄 Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      USER JOURNEY                            │
└─────────────────────────────────────────────────────────────┘

1. Landing (/)
   ↓
   [Auto-redirect to /login]

2. Login Page (/login)
   ↓
   [Enter credentials: mor_2314 / 83r5^_]
   ↓
   [POST /auth/login via RTK Query]
   ↓
   [Token saved to Redux + localStorage]
   ↓
   [Redirect to /dashboard]

3. Dashboard (/dashboard - Protected)
   ↓
   ┌──────────────────────────────────────┐
   │ User Profile (GET /users/:id)        │
   │ - Name, Email, Username, Phone       │
   └──────────────────────────────────────┘
   ↓
   ┌──────────────────────────────────────┐
   │ Products Grid (GET /products)        │
   │ - Filter by category                 │
   │ - View all products                  │
   └──────────────────────────────────────┘
   ↓
   User Actions:
   ├─→ [View Product] → Modal (GET /products/:id)
   ├─→ [Edit Product] → Modal (PUT or PATCH /products/:id)
   ├─→ [Delete Product] → DELETE /products/:id
   ├─→ [Add Product] → Modal (POST /products)
   └─→ [Logout] → Clear auth → Redirect to /login
```

## 🏗️ Architecture Diagram

```
┌───────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                      │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐     │
│  │   Login     │  │   Signup    │  │  Dashboard   │     │
│  │   Page      │  │    Page     │  │    Page      │     │
│  └─────────────┘  └─────────────┘  └──────────────┘     │
│                                            ↓              │
│                          ┌──────────────────────────┐    │
│                          │  Product Components      │    │
│                          │  - ProductModal          │    │
│                          │  - ProductDetailModal    │    │
│                          └──────────────────────────┘    │
└───────────────────────────────────────────────────────────┘
                              ↓
┌───────────────────────────────────────────────────────────┐
│                    STATE MANAGEMENT LAYER                  │
│  ┌────────────────────────────────────────────────────┐  │
│  │              REDUX STORE                            │  │
│  │  ┌─────────────────┐    ┌──────────────────────┐  │  │
│  │  │   Auth Slice    │    │  RTK Query API       │  │  │
│  │  │  - token        │    │  - Products          │  │  │
│  │  │  - userId       │    │  - Categories        │  │  │
│  │  │  - user         │    │  - User              │  │  │
│  │  └─────────────────┘    │  - Caching           │  │  │
│  │                          │  - Invalidation      │  │  │
│  │                          └──────────────────────┘  │  │
│  └────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
                              ↓
┌───────────────────────────────────────────────────────────┐
│                      API LAYER                             │
│  ┌────────────────────────────────────────────────────┐  │
│  │           RTK Query (fetchBaseQuery)                │  │
│  │         Base URL: https://fakestoreapi.com          │  │
│  └────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
                              ↓
┌───────────────────────────────────────────────────────────┐
│                   EXTERNAL API                             │
│  ┌────────────────────────────────────────────────────┐  │
│  │              Fakestore API                          │  │
│  │  - Authentication                                   │  │
│  │  - Products CRUD                                    │  │
│  │  - Categories                                       │  │
│  │  - Users                                            │  │
│  └────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
```

## 📊 Data Flow

```
┌─────────────┐
│   User      │
│  Action     │
└──────┬──────┘
       │
       ↓
┌─────────────────┐
│  Component      │
│  (Dispatch)     │
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│  RTK Query      │
│  Hook           │
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│  API Slice      │
│  Endpoint       │
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│  Fetch API      │
│  Request        │
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│  Fakestore      │
│  API            │
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│  Response       │
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│  RTK Query      │
│  Cache Update   │
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│  Component      │
│  Re-render      │
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│  UI Update      │
│  + Toast        │
└─────────────────┘
```

## 🔐 Authentication Flow

```
Login Page
    ↓
Enter Credentials (mor_2314 / 83r5^_)
    ↓
useLoginMutation() hook
    ↓
POST /auth/login
    ↓
Receive JWT token
    ↓
dispatch(setCredentials({ token, userId }))
    ↓
├─→ Redux State: { auth: { token, userId, user } }
└─→ localStorage: { token, userId }
    ↓
Protected Route Check
    ↓
useSelector(state => state.auth.token)
    ↓
Token exists? → Allow access to /dashboard
Token missing? → Redirect to /login
```

## 🛠️ CRUD Operations Flow

### CREATE (POST)
```
Click "Add Product" → ProductModal Opens
    ↓
Fill Form (title, price, category, description, image)
    ↓
Click "Create" → useCreateProductMutation()
    ↓
POST /products with product data
    ↓
Response: { id: 21, ...productData }
    ↓
RTK Query invalidates ['Products'] tag
    ↓
useGetAllProductsQuery() refetches
    ↓
UI updates with new product
    ↓
Toast: "Product created successfully!"
```

### READ (GET)
```
Dashboard Loads
    ↓
useGetAllProductsQuery() auto-fetches
    ↓
GET /products
    ↓
Response: [ { id, title, price, ... }, ... ]
    ↓
RTK Query caches data
    ↓
Renders product cards in grid
```

### UPDATE (PUT/PATCH)
```
Click Edit Icon → ProductModal Opens (edit mode)
    ↓
Pre-filled form with existing data
    ↓
Select PUT or PATCH toggle
    ↓
Modify fields → Click "Update"
    ↓
PUT: useUpdateProductMutation() → Sends all fields
PATCH: usePatchProductMutation() → Sends only changed fields
    ↓
PUT /products/:id or PATCH /products/:id
    ↓
Response: Updated product
    ↓
RTK Query invalidates tag for that product
    ↓
UI updates
    ↓
Toast: "Product updated successfully (PUT/PATCH)!"
```

### DELETE (DELETE)
```
Click Delete Icon → Confirmation dialog
    ↓
Confirm deletion
    ↓
useDeleteProductMutation()
    ↓
DELETE /products/:id
    ↓
Response: Deleted product data
    ↓
RTK Query invalidates ['Products'] tag
    ↓
Product removed from UI
    ↓
Toast: "Product deleted successfully!"
```

## 🎨 UI Component Hierarchy

```
App
└── Routes
    ├── /login
    │   └── Login
    │       └── LoginForm
    │
    ├── /signup
    │   └── Signup
    │       └── SignupForm
    │
    └── /dashboard (Protected)
        └── Dashboard
            ├── AppBar
            │   ├── Logo
            │   ├── User Name
            │   └── Logout Button
            │
            ├── User Info Card
            │   └── User Details
            │
            ├── Filter Section
            │   ├── Category Dropdown
            │   └── Add Product Button
            │
            ├── Products Grid
            │   └── Product Cards []
            │       ├── Image
            │       ├── Title
            │       ├── Category Chip
            │       ├── Price
            │       ├── Description
            │       └── Action Buttons
            │           ├── View (Eye Icon)
            │           ├── Edit (Pencil Icon)
            │           └── Delete (Trash Icon)
            │
            ├── Floating Add Button (FAB)
            │
            ├── ProductModal (Create/Edit)
            │   ├── Title Input
            │   ├── Price Input
            │   ├── Category Select
            │   ├── Description Textarea
            │   ├── Image URL Input
            │   ├── Image Preview
            │   └── Action Buttons
            │       ├── Cancel
            │       └── Create/Update
            │
            └── ProductDetailModal (View)
                ├── Product Image
                ├── Title
                ├── Category Chip
                ├── Price
                ├── Rating
                ├── Description
                └── Close Button
```

## 📦 Dependency Tree

```
React 18
├── react-dom
├── react-router-dom (v6)
│   └── Routes, Route, Navigate, Link
│
├── Redux Ecosystem
│   ├── @reduxjs/toolkit
│   │   ├── configureStore
│   │   ├── createSlice
│   │   └── createApi (RTK Query)
│   └── react-redux
│       ├── Provider
│       ├── useSelector
│       └── useDispatch
│
├── Material UI (v5)
│   ├── @mui/material
│   │   └── 20+ components
│   ├── @mui/icons-material
│   │   └── Icons
│   ├── @emotion/react
│   └── @emotion/styled
│
└── react-toastify
    └── Toast notifications
```

This structure ensures:
- ✅ Separation of concerns
- ✅ Reusable components
- ✅ Centralized state management
- ✅ Easy to maintain and scale
- ✅ Clear data flow
- ✅ Type-safe API calls
