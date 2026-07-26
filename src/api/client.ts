import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export const authApi = axios.create({
  baseURL: 'http://localhost:3000/v1/auth',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const coreApi = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

coreApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
