import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AuthRepository,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthResponse,
} from '../../domain/repositories/AuthRepository';
import { User } from '../../domain/entities/User'; // ✅ SỬA TỪ 3 CẤPTHÀNH 2 CẤP
import { authApi } from '../api/authApi';
import { UpdateProfileRequest } from '../../domain/usecases/UpdateProfileUseCase';

export class AuthRepositoryImpl implements AuthRepository {
  async updateProfile(request: UpdateProfileRequest): Promise<User> {
    const response = await authApi.updateProfile(request);
    
    // Update AsyncStorage
    const updatedUser = response.user;
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    
    return updatedUser;
  }
  async loginGoogle(idToken: string): Promise<AuthResponse> {
    const response = await authApi.loginGoogle(idToken);
  
    await AsyncStorage.setItem('accessToken', response.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.user));
  
    return {
      token: response.token,
      user: response.user,
    };
  }
  async login(request: LoginRequest): Promise<AuthResponse> {
    const response = await authApi.login(request);

    await AsyncStorage.setItem('accessToken', response.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.user));

    return {
      token: response.token,
      user: response.user,
    };
  }

  async register(request: RegisterRequest): Promise<AuthResponse> {
    const response = await authApi.register(request);

    await AsyncStorage.setItem('accessToken', response.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.user));

    return {
      token: response.token,
      user: response.user,
    };
  }

  async forgotPassword(
    request: ForgotPasswordRequest,
  ): Promise<{ message: string }> {
    const response = await authApi.forgotPassword(request);
    return { message: response.message };
  }

  async resetPassword(
    request: ResetPasswordRequest,
  ): Promise<{ message: string }> {
    const response = await authApi.resetPassword(request);
    return { message: response.message };
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        return JSON.parse(userJson);
      }

      const response = await authApi.getCurrentUser();
      await AsyncStorage.setItem('user', JSON.stringify(response.user));
      return { ...response.user, id: response.user._id } as User;
    } catch {
      return null;
    }
  }

  async logout(): Promise<void> {
    await authApi.logout();
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('user');
  }
}
