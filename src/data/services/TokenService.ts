import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../api/axiosConfig';

export class TokenService {
  private static isRefreshing = false;
  private static failedQueue: any[] = [];

  static processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    this.failedQueue = [];
  }

  static async refreshAccessToken(): Promise<string | null> {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axiosInstance.post('/auth/refresh', {
        refreshToken,
      });

      const newAccessToken = response.data.accessToken;
      await AsyncStorage.setItem('accessToken', newAccessToken);
      
      return newAccessToken;
    } catch (error) {
      // Refresh token hết hạn -> logout
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
      return null;
    }
  }

  static async getAccessToken(): Promise<string | null> {
    return await AsyncStorage.getItem('accessToken');
  }

  static setRefreshing(status: boolean) {
    this.isRefreshing = status;
  }

  static getRefreshing(): boolean {
    return this.isRefreshing;
  }

  static addToQueue(callback: any) {
    this.failedQueue.push(callback);
  }
}