import { AuthRepository } from '../repositories/AuthRepository';
import { User } from '../entities/User';

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export class UpdateProfileUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(request: UpdateProfileRequest): Promise<User> {
    // Validation
    if (request.email && !request.email.includes('@')) {
      throw new Error('Email không hợp lệ');
    }

    if (request.password && request.password.length < 6) {
      throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
    }

    if (request.phone && !/^[0-9]{10}$/.test(request.phone)) {
      throw new Error('Số điện thoại phải có 10 chữ số');
    }

    return await this.authRepository.updateProfile(request);
  }
}