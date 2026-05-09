import axios from 'axios';

const productionApiUrl = 'https://luxuryonwheels.onrender.com/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? productionApiUrl : '/api')
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('low_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default api;
