import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance'; // Assuming this is set up to handle API calls

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null
  });

  // Load user and token from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        setAuth({ isAuthenticated: true, user });
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  // Register function for Restaurateurs
  const registerRestaurateur = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/register/restaurateur', data);
      const { token } = response.data;

      // Log the JWT token
      console.log('JWT Token:', token);
      
      // Get user info after successful registration
      const userResponse = await axiosInstance.get('/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const user = userResponse.data.data;
      
      // Store user and token in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      
      // Set authentication state
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAuth({ isAuthenticated: true, user });
      
    } catch (error) {
      console.error('Error registering restaurateur', error);
      throw error; // You might want to handle errors more gracefully in the UI
    }
  };

  // Register function for Producteurs
  const registerProducteur = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/register/producteur', data);
      const { token } = response.data;

      // Log the JWT token
      console.log('JWT Token:', token);
      
      // Get user info after successful registration
      const userResponse = await axiosInstance.get('/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const user = userResponse.data.data;
      
      // Store user and token in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      
      // Set authentication state
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAuth({ isAuthenticated: true, user });
      
    } catch (error) {
      console.error('Error registering producteur', error);
      throw error; // Handle errors gracefully
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const { token } = response.data;

      // Log the JWT token
      console.log('JWT Token:', token);
      
      // Get user info after successful login
      const userResponse = await axiosInstance.get('/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const user = userResponse.data.data;
      
      // Store user and token in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      
      // Set authentication state
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAuth({ isAuthenticated: true, user });
      
    } catch (error) {
      console.error('Error logging in', error);
      throw error; // Handle errors gracefully
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Optionally, you can send a logout request to the server
      await axiosInstance.post('/auth/logout');

      // Remove user and token from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      // Clear authentication state
      setAuth({ isAuthenticated: false, user: null });
      delete axiosInstance.defaults.headers.common['Authorization'];
      
    } catch (error) {
      console.error('Error logging out', error);
      throw error; // Handle errors gracefully
    }
  };

  return (
    <AuthContext.Provider value={{ auth, registerRestaurateur, registerProducteur, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
