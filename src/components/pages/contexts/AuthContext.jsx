// contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [navigateCallback, setNavigateCallback] = useState(null);

  // Set a callback for navigation that can be called from within the context
  const setNavigate = (callback) => {
    setNavigateCallback(() => callback);
  };

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setUser(data.user);
        
        // Use the navigate callback if available
        if (navigateCallback) {
          navigateCallback('/dashboard');
        }
        
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
    } catch (error) {
      throw new Error(error.message || 'Network error. Please try again.');
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setUser(data.user);
        
        // Use the navigate callback if available
        if (navigateCallback) {
          navigateCallback('/dashboard');
        }
        
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
    } catch (error) {
      throw new Error(error.message || 'Network error. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    
    // Use the navigate callback if available
    if (navigateCallback) {
      navigateCallback('/');
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    setNavigate
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};