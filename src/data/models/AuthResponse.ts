export interface LoginApiResponse {
  message: string;
  token: string; // ⚠️ Lưu ý: Backend trả về "token", không phải "accessToken"
  user: {
    id: string;
    email: string;
    name: string;
    phone: string;
    avatar?: string;
    isActive?: boolean;
    lastLogin?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface RegisterApiResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    phone: string;
  };
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface GetCurrentUserResponse {
  user: {
    preferences: {
      budgetRange: {
        min: number;
        max: number;
      };
      interests: string[];
      travelStyle: string;
    };
    _id: string;
    email: string;
    name: string;
    phone: string;
    avatar: string | null;
    isActive: boolean;
    travelHistory: any[];
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
  };
}
