import axiosInstance from './axiosConfig';
import {
  LoginApiResponse,
  RegisterApiResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  GetCurrentUserResponse,
} from '../models/AuthResponse';
import {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../../domain/repositories/AuthRepository';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginApiResponse> => {
    try {
      const response = await axiosInstance.post<LoginApiResponse>(
        '/auth/login',
        credentials,
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Đăng nhập thất bại. Vui lòng thử lại.');
    }
  },

  register: async (data: RegisterRequest): Promise<RegisterApiResponse> => {
    try {
      const response = await axiosInstance.post<RegisterApiResponse>(
        '/auth/register',
        data,
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Đăng ký thất bại. Vui lòng thử lại.');
    }
  },

  forgotPassword: async (
    data: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> => {
    try {
      const response = await axiosInstance.post<ForgotPasswordResponse>(
        '/auth/forgot-password',
        data,
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Gửi yêu cầu thất bại. Vui lòng thử lại.');
    }
  },

  resetPassword: async (
    data: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> => {
    try {
      const response = await axiosInstance.patch<ResetPasswordResponse>(
        `/auth/reset-password/${data.token}`,
        { newPassword: data.newPassword },
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Đặt lại mật khẩu thất bại. Vui lòng thử lại.');
    }
  },

  getCurrentUser: async (): Promise<GetCurrentUserResponse> => {
    try {
      const response = await axiosInstance.get<GetCurrentUserResponse>(
        '/auth/me',
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Không thể lấy thông tin người dùng.');
    }
  },

  logout: async (): Promise<void> => {
    // Chỉ xóa token ở client
  },
  updateProfile: async (data: {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;

