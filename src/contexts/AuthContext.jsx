import React, { createContext, useState, useEffect, useContext } from 'react';
import { login, logout, getCurrentUser } from '../api/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in (token exists)
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const userData = await getCurrentUser();
          setCurrentUser(userData);
        }
      } catch (err) {
        console.error("Failed to restore session:", err);
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const handleLogin = async (credentials) => {
    setError(null);
    try {
      const response = await login(credentials);
      const { token, user } = response;
      localStorage.setItem('authToken', token);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('authToken');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    isAdmin: currentUser?.role === 'ADMIN',
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};