import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

console.log('🔍 API_URL from .env:', API_URL);

// ✅ THÊM /api vào baseURL
const BASE_URL = API_URL
  ? `${API_URL}/api`
  : 'https://app-smart-travel-assistant.onrender.com/api';

console.log('🚀 Using BASE_URL:', BASE_URL);

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
    console.log('📤 Request URL:', config.baseURL + config.url);
    console.log('📤 Request Method:', config.method);
    console.log('📤 Request Data:', config.data);

    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('❌ Error getting token:', error);
    }
    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  response => {
    console.log('✅ Response Status:', response.status);
    console.log('✅ Response Data:', response.data);
    return response;
  },
  async error => {
    console.error('❌ Response Error:', error.message);
    console.error('❌ Response Status:', error.response?.status);
    console.error('❌ Response Data:', error.response?.data);

    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('accessToken');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
