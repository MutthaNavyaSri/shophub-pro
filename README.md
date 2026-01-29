# ShopHub Pro

A full-stack e-commerce application built with React, Node.js, Express, MongoDB, and Cloudinary.

## 🌟 Features

- **User Authentication** - JWT-based login/signup
- **Product Management** - Full CRUD operations
- **Image Upload** - Local file upload via Cloudinary
- **MongoDB Database** - Real-time data persistence
- **Responsive Design** - Mobile and desktop optimized
- **Modern UI** - Material-UI components with blue gradient theme

## 🛠️ Tech Stack

**Frontend:**
- React 18.2.0 + Vite
- Redux Toolkit + RTK Query
- Material-UI 5
- React Router 6

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multer + Cloudinary (Image Upload)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/your-username/shophub-pro.git
cd shophub-pro
```

2. **Frontend Setup**
```bash
npm install
npm run dev
```

3. **Backend Setup**
```bash
cd backend
npm install
node server.js
```

4. **Configure Environment Variables** (see below)

### Environment Variables

**Frontend (`.env`)**
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend (`backend/.env`)**
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🌐 Deployment

**Quick Deploy Guide**: See [DEPLOY_QUICKSTART.md](./DEPLOY_QUICKSTART.md)

1. **Backend to Render**: Deploy `backend` folder as Web Service
2. **Frontend to Vercel**: Deploy root folder as Static Site
3. Update environment variables on both platforms

## 👤 Default Admin Account

- **Email**: admin@fakestore.com
- **Password**: admin123

## 📝 License

MIT

---

Built with ❤️ using React and Node.js

A comprehensive ReactJS web application that integrates with the Fakestore API, featuring authentication, CRUD operations, and state management using Redux Toolkit with RTK Query.

## 🚀 Live Demo

**Deployed on Vercel:** [Your deployed URL will appear here after deployment]

## ✨ Features

### 1. Authentication System
- **Login Page**: Secure login with email/password validation
- **Signup Page**: User registration with form validation
- **Token Management**: JWT token stored in Redux state and localStorage
- **Protected Routes**: Dashboard accessible only after authentication
- **Auto-redirect**: Redirects to dashboard after successful login

### 2. Dashboard
- **User Profile**: Display logged-in user details
- **Product Listing**: Grid view of all products with images
- **Category Filter**: Filter products by category
- **CRUD Operations**: Full create, read, update, and delete functionality
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

### 3. API Implementation (6+ Operations)
- ✅ **GET** `/products` - Fetch all products
- ✅ **GET** `/products/:id` - Fetch product by ID
- ✅ **GET** `/products/category/:category` - Fetch products by category
- ✅ **POST** `/products` - Create new product
- ✅ **PUT** `/products/:id` - Full product update
- ✅ **PATCH** `/products/:id` - Partial product update
- ✅ **DELETE** `/products/:id` - Delete product
- ✅ **POST** `/auth/login` - User authentication

### 4. State Management
- **Redux Toolkit**: Centralized state management
- **RTK Query**: Efficient API calls with caching
- **Automatic Cache Invalidation**: Updates UI after mutations
- **Loading & Error States**: Proper handling for all API calls

### 5. UI/UX
- **Material UI**: Modern, clean design system
- **Responsive Layout**: Mobile-first approach
- **Toast Notifications**: User feedback for all actions
- **Modal Dialogs**: Create/Edit/View product details
- **Loading Indicators**: Visual feedback during API calls
- **Error Messages**: Clear error communication

## 📁 Project Structure

```
fakestore-react-app/
├── src/
│   ├── components/
│   │   ├── ProductModal.jsx          # Create/Edit product modal
│   │   └── ProductDetailModal.jsx    # View product details
│   ├── pages/
│   │   ├── Login.jsx                 # Login page
│   │   ├── Signup.jsx                # Signup page
│   │   └── Dashboard.jsx             # Main dashboard
│   ├── redux/
│   │   ├── api/
│   │   │   └── fakestoreApi.js       # RTK Query API slice
│   │   ├── slices/
│   │   │   └── authSlice.js          # Auth state management
│   │   └── store.js                  # Redux store configuration
│   ├── App.jsx                       # Main app with routing
│   └── main.jsx                      # App entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **Redux Toolkit** - State management
- **RTK Query** - API data fetching and caching
- **React Router v6** - Client-side routing
- **Material UI v5** - Component library
- **React Toastify** - Toast notifications
- **Vite** - Build tool and dev server
- **Fakestore API** - Backend API

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd App1
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The build files will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🔐 Test Credentials

Use these credentials to login and test the application:

**Username:** `mor_2314`  
**Password:** `83r5^_`

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

Follow the prompts to deploy your application.

### Deploy to Netlify

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build the project**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod --dir=dist
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🔄 API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User authentication |
| GET | `/users/:id` | Get user details |
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get single product |
| GET | `/products/category/:category` | Get products by category |
| GET | `/products/categories` | Get all categories |
| POST | `/products` | Create new product |
| PUT | `/products/:id` | Update product (full) |
| PATCH | `/products/:id` | Update product (partial) |
| DELETE | `/products/:id` | Delete product |

## ⚙️ Key Features Implementation

### 1. Redux Toolkit with RTK Query
```javascript
// API slice with automatic caching and invalidation
export const fakestoreApi = createApi({
  reducerPath: 'fakestoreApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  tagTypes: ['Products', 'User'],
  endpoints: (builder) => ({
    // ... endpoints
  }),
});
```

### 2. Protected Routes
```javascript
const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? children : <Navigate to="/login" replace />;
};
```

### 3. PUT vs PATCH Implementation
- **PUT**: Full update - sends all product fields
- **PATCH**: Partial update - sends only changed fields
- Toggle button in modal to switch between update methods

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: xs, sm, md, lg, xl
- Grid system for flexible layouts
- Touch-friendly interface

## 🎨 UI Components

- **Cards**: Product display
- **Modals**: Create/Edit/View operations
- **Forms**: Input validation
- **Buttons**: Action triggers
- **Icons**: Visual indicators
- **Chips**: Category tags
- **Snackbars**: User feedback

## 🐛 Known Limitations

1. **Fakestore API**: This is a fake REST API for testing
   - POST/PUT/PATCH/DELETE operations don't persist data
   - They return simulated responses
   - Signup endpoint creates a simulated user

2. **Database**: No real database integration
   - Token stored in localStorage for demo purposes
   - In production, use secure backend authentication

## 🔒 Security Notes

⚠️ **Important for Production:**
- Implement secure backend authentication
- Use HTTP-only cookies for tokens
- Add CSRF protection
- Implement rate limiting
- Validate all inputs server-side
- Use environment variables for sensitive data

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Your Name - [Your GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Fakestore API](https://fakestoreapi.com/) - REST API for testing
- [Material UI](https://mui.com/) - Component library
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

---

⭐ **If you find this project useful, please give it a star!** ⭐
