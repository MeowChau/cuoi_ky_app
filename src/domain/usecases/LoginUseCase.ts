import {
  AuthRepository,
  LoginRequest,
  AuthResponse,
} from '../repositories/AuthRepository';

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(request: LoginRequest): Promise<AuthResponse> {
    // Validation
    if (!request.email || !request.email.includes('@')) {
      throw new Error('Email không hợp lệ');
    }

    if (!request.password || request.password.length < 6) {
      throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
    }

    return await this.authRepository.login(request);
  }
}
