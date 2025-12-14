import { AuthRepository, AuthResponse } from '../repositories/AuthRepository';

export class GoogleLoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(idToken: string): Promise<AuthResponse> {
    if (!idToken || idToken.trim().length === 0) {
      throw new Error('Token Google không hợp lệ');
    }

    return await this.authRepository.loginGoogle(idToken);
  }
}