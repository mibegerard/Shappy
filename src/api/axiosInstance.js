import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.VITE_APP_END_POINT, 
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  // Add authorization token to headers if available
  const token = localStorage.getItem('token');
  config.withCredentials = true;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
},
(error) => {
  return Promise.reject(error);
}
);

// Response interceptor
axiosInstance.interceptors.response.use(
(response) => response,
(error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
  }
  return Promise.reject(error);
}
);

export default axiosInstance;
