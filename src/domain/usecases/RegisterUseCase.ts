import {
  AuthRepository,
  RegisterRequest,
  AuthResponse,
} from '../repositories/AuthRepository';

export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(request: RegisterRequest): Promise<AuthResponse> {
    // Validation
    if (!request.name || request.name.trim().length < 2) {
      throw new Error('Tên phải có ít nhất 2 ký tự');
    }

    if (!request.email || !request.email.includes('@')) {
      throw new Error('Email không hợp lệ');
    }

    if (!request.password || request.password.length < 6) {
      throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
    }

    if (!request.phone || request.phone.length < 10) {
      throw new Error('Số điện thoại không hợp lệ');
    }

    return await this.authRepository.register(request);
  }
}
