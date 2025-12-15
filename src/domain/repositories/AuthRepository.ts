import { User } from '../entities/User';
import { UpdateProfileRequest as UpdateProfileUseCaseRequest } from '../usecases/UpdateProfileUseCase';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}
export interface AuthRepository {
  login(request: LoginRequest): Promise<AuthResponse>;
  register(request: RegisterRequest): Promise<AuthResponse>;
  forgotPassword(request: ForgotPasswordRequest): Promise<{ message: string }>;
  resetPassword(request: ResetPasswordRequest): Promise<{ message: string }>;
  getCurrentUser(): Promise<User | null>;
  updateProfile(request: UpdateProfileRequest): Promise<User>;
  logout(): Promise<void>;
  updateProfile(request: UpdateProfileRequest): Promise<User>; 
  loginGoogle(idToken: string): Promise<AuthResponse>; 
}
