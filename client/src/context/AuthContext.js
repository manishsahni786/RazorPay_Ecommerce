import React, { createContext, useState, useEffect } from 'react';
import '../App.css';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to provide the AuthContext to the application
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  // Handle login
  const login = (token, userData) => {
    setAuthToken(token);
    setUser(userData);
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Handle logout
  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  // Optional: Check token validity or refresh on component mount
  useEffect(() => {
    const verifyToken = async (token) => {
      try {
        // Verify token with your API (if needed)
        // const response = await axios.get('/api/auth/verify', { headers: { Authorization: `Bearer ${token}` } });
        // if (response.data.valid) {
        //   setAuthToken(token);
        //   setUser(response.data.user);
        // } else {
        //   logout();
        // }
      } catch (error) {
        console.error('Token verification failed:', error);
        logout();
      }
    };

    if (authToken) {
      verifyToken(authToken);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
