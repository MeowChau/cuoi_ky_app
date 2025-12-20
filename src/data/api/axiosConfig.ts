import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import { TokenService } from '../services/TokenService';

const BASE_URL = API_URL
  ? `${API_URL}/api`
  : 'https://app-smart-travel-assistant.onrender.com/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config: any) => {
    try {
      const token = await TokenService.getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('❌ Error getting token:', error);
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response Interceptor với Token Refresh
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (TokenService.getRefreshing()) {
        // Đang refresh -> đợi trong queue
        return new Promise((resolve, reject) => {
          TokenService.addToQueue({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      TokenService.setRefreshing(true);

      try {
        const newToken = await TokenService.refreshAccessToken();
        
        if (newToken) {
          TokenService.processQueue(null, newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } else {
          // Không refresh được -> clear và logout
          TokenService.processQueue(new Error('Token refresh failed'), null);
          // Emit event để navigate to Login
          return Promise.reject(error);
        }
      } catch (refreshError) {
        TokenService.processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        TokenService.setRefreshing(false);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;