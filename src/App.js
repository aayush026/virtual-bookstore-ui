// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Import Auth Page
import Auth from './pages/Auth';

// Import Layouts
import AdminLayout from './pages/AdminLayout';
import UserLayout from './pages/UserLayout';
import NotFound from './pages/NotFound';

// Import Admin Components
import AdminDashboard from './components/admin/Dashboard';
import UserManagement from './components/admin/UserManagement';
import BookManagement from './components/admin/BookManagement';
import OrderManagement from './components/admin/OrderManagement';

// Import User Components
import UserDashboard from './components/user/Dashboard';
import Catalog from './components/user/Catalog';
import Cart from './components/user/Cart';
import OrderHistory from './components/user/OrderHistory';
import Profile from './components/user/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Navigate to="/auth" replace />} />
            <Route path="/" element={<Navigate to="/auth" replace />} />
            
            {/* Admin Routes */}
            <Route element={<ProtectedRoute requireAdmin />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="books" element={<BookManagement />} />
                <Route path="orders" element={<OrderManagement />} />
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
              </Route>
            </Route>
            
            {/* User Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/user" element={<UserLayout />}>
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="cart" element={<Cart />} />
                <Route path="orders" element={<OrderHistory />} />
                <Route path="profile" element={<Profile />} />
                <Route index element={<Navigate to="/user/dashboard" replace />} />
              </Route>
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;