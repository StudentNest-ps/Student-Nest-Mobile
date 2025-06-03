import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://student-nest-backend.onrender.com/api', // Updated to point to your backend server
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; 