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

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    console.log('AuthProvider useEffect - token:', token, 'userData:', userData);
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('AuthProvider - Setting user from localStorage:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      console.log('Attempting login...', credentials);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      console.log('Login response status:', response.status);
      const data = await response.json();
      console.log('Login API response:', data);
      
      if (response.ok) {
        // The backend should return { user: {...}, token: '...' }
        // But let's handle both cases - nested user object or flat structure
        let userData, token;
        
        if (data.user) {
          // If backend returns { user: {...}, token: '...' }
          userData = data.user;
          token = data.token;
        } else {
          // If backend returns flat user object with token
          userData = {
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            isAdmin: data.isAdmin,
            profilePhoto: data.profilePhoto || {}
          };
          token = data.token;
        }
        
        console.log('Processed user data:', userData);
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Update state
        console.log('Setting user state in AuthContext...');
        setUser(userData);
        
        return { user: userData, token };
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Network error. Please try again.');
    }
  };

  const register = async (userData) => {
    try {
      console.log('Attempting registration...', userData);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      console.log('Registration response status:', response.status);
      const data = await response.json();
      console.log('Registration API response:', data);
      
      if (response.ok) {
        // Handle both response formats
        let newUser, token;
        
        if (data.user) {
          newUser = data.user;
          token = data.token;
        } else {
          newUser = {
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            isAdmin: data.isAdmin,
            profilePhoto: data.profilePhoto || {}
          };
          token = data.token;
        }
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        
        return { user: newUser, token };
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Network error. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  console.log('AuthProvider rendering - user:', user, 'loading:', loading);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};