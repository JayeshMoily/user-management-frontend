# User Management Application

A comprehensive User Management application built with **React 19**, **TypeScript**, **Redux Toolkit**, and **Bootstrap 5**. This application provides a complete solution for user authentication, role-based access control, team management, and real-time group chat functionality.

## 🚀 Features

### Authentication System
- **Login & Registration** with form validation
- **JWT Token-based Authentication** with automatic token management
- **Protected Routes** with role-based access control
- **Auto-logout** on token expiration

### User Management
- **Member List** - View all active team members with search functionality
- **Manage Members** - Edit/delete users with role-based permissions
- **All Members Record** (Admin only) - Comprehensive database view with deleted users
- **Role-based Access** - Admin and Non-admin user roles

### Group Chat
- **Real-time messaging** interface
- **Message history** with proper user attribution
- **Deleted user handling** - Shows "Unknown User" for deleted accounts
- **Responsive chat design** with message alignment based on sender

### UI/UX
- **Collapsible Sidebar Navigation** with Bootstrap Offcanvas
- **Responsive Design** for all screen sizes
- **Bootstrap 5 Components** with minimal custom CSS
- **Loading States** and **Error Handling** throughout
- **Toast Notifications** for user feedback

## 🛠 Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios with interceptors
- **Routing**: React Router v6
- **Styling**: Bootstrap 5 + Bootstrap Icons
- **Authentication**: JWT Token-based

## 📁 Project Structure

```
src/
├── api/                    # API service layer
│   ├── axios.config.ts    # Axios interceptors & base configuration
│   ├── auth.api.ts        # Authentication endpoints
│   ├── users.api.ts       # User management endpoints
│   └── chat.api.ts        # Chat endpoints
├── common/                 # Reusable components
│   ├── components/
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorAlert.tsx
│   │   └── ConfirmDialog.tsx
│   └── layouts/
│       └── ProtectedRoute.tsx
├── features/              # Feature-based modules
│   ├── auth/              # Authentication feature
│   ├── chat/              # Chat feature
│   └── users/             # User management feature
├── hooks/                 # Custom hooks
├── pages/                 # Main page components
├── redux/                 # Redux configuration
├── router/               # Routing configuration
├── styles/               # Global styles
├── types/                # TypeScript interfaces
└── utils/                # Helper functions
```

## 🔧 Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 🔗 API Integration

The application is configured to work with a backend API at `http://localhost:5000/api`. 

### Required API Endpoints:

#### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration

#### User Management
- `GET /api/users` - Get active users
- `GET /api/admin/users/all` - Get all users (admin only)
- `PUT /api/user/:id` - Update user
- `DELETE /api/user/:id` - Delete user

#### Chat
- `GET /api/chat/general` - Get chat history
- `POST /api/chat/send` - Send message

## 🔐 Security Features

- **JWT Token Management** with automatic refresh and logout
- **Role-based Access Control** on frontend routes
- **Input Validation** and sanitization
- **XSS Protection** in chat messages
- **Secure API Communication** with interceptors

## 👥 User Roles

### Admin Users
- Can view, edit, and delete all users
- Access to comprehensive user database
- Full chat functionality
- Access to all features

### Non-Admin Users
- Can view all active members
- Can only edit their own profile
- Full chat functionality
- Restricted access to certain features

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- **Desktop** (Large screens)
- **Tablet** (Medium screens)
- **Mobile** (Small screens)

## 🎨 UI Components

All components are built using Bootstrap 5 utilities:
- **Cards** for user profiles and content sections
- **Modals** for edit forms and confirmations
- **Tables** for data display with sorting
- **Forms** with validation and error states
- **Alerts** for notifications and feedback
- **Badges** for status indicators

## 🚀 Getting Started

1. Make sure your backend API is running on `http://localhost:5000`
2. Start the development server: `npm run dev`
3. Register a new account or login with existing credentials
4. Explore the different features based on your user role

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Follow the existing code structure and patterns
2. Use TypeScript strict mode
3. Follow Bootstrap 5 utility-first approach
4. Add proper error handling and loading states
5. Test all features thoroughly

## 📄 License

This project is for educational purposes as part of the Crisil React Training program.
