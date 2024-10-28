import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from 'api/axiosInstance';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser);
        if (user.isVerified) {
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          setAuth({ isAuthenticated: true, user });
        } else {
          console.warn('User is not verified');
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  // New login function for token-based login
  const loginWithToken = async (token) => {
    try {
      const userResponse = await axiosInstance.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Full userResponse:', userResponse);

      const user = userResponse?.data?.data;
  
      // Log the fetched user details
      console.log('Fetched User:', user);

      if (!user) {
        console.error('User data not found in response');
        throw new Error('User data not found');
      }

      // Debugging output
      console.log('Fetched User:', user);
      console.log('User Verification Status:', user.isVerified);
  
      if (user.isVerified) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuth({ isAuthenticated: true, user });
      } else {
        console.warn('User is not verified');
        throw new Error('Please verify your email before logging in.');
      }
    } catch (error) {
      console.log(token);
      console.error('Error logging in with token', error);
      throw error; // Consider re-throwing with additional context or using toast notifications here
    }
  };
  

  // Register function for Restaurateurs
  const registerRestaurateur = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/register/restaurateur', data);
      const { token } = response.data;

      // Log the JWT token
      console.log('JWT Token:', token);

      // Get user info after successful registration
      const userResponse = await axiosInstance.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = userResponse.data.data;

      // Check if the user is verified
      if (user.isVerified) {
        // Store user and token in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        // Set authentication state
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuth({ isAuthenticated: true, user });
      } else {
        console.warn('User is registered but not verified');
        throw new Error('Please verify your email before logging in.');
      }
    } catch (error) {
      console.error('Error registering restaurateur', error);
      throw error;
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
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = userResponse.data.data;

      // Check if the user is verified
      if (user.isVerified) {
        // Store user and token in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        // Set authentication state
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuth({ isAuthenticated: true, user });
      } else {
        console.warn('User is registered but not verified');
        throw new Error('Please verify your email before logging in.');
      }
    } catch (error) {
      console.error('Error registering producteur', error);
      throw error;
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
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = userResponse.data.data;

      // Check if the user is verified
      if (user.isVerified) {
        // Store user and token in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        // Set authentication state
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuth({ isAuthenticated: true, user });
      } else {
        console.warn('User is not verified');
        throw new Error('Please verify your email before logging in.');
      }
    } catch (error) {
      console.error('Error logging in', error);
      throw error;
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
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ auth, registerRestaurateur, registerProducteur, loginWithToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
