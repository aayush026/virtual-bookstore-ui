import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
        </div>
        <nav className="mt-6">
          <Link
            to="/admin/dashboard"
            className={`flex items-center px-6 py-3 ${location.pathname === '/admin/dashboard' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <span>Dashboard</span>
          </Link>
          <Link
            to="/admin/users"
            className={`flex items-center px-6 py-3 ${location.pathname === '/admin/users' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <span>User Management</span>
          </Link>
          <Link
            to="/admin/books"
            className={`flex items-center px-6 py-3 ${location.pathname === '/admin/books' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <span>Book Management</span>
          </Link>
          <Link
            to="/admin/orders"
            className={`flex items-center px-6 py-3 ${location.pathname === '/admin/orders' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <span>Order Management</span>
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center px-6 py-3 w-full text-left hover:bg-gray-700"
          >
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="px-4 py-3 flex justify-between items-center">
            <h1 className="text-lg font-medium">
              {location.pathname === '/admin/dashboard' && 'Dashboard'}
              {location.pathname === '/admin/users' && 'User Management'}
              {location.pathname === '/admin/books' && 'Book Management'}
              {location.pathname === '/admin/orders' && 'Order Management'}
            </h1>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;