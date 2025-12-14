import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../domain/entities/User';

interface AuthState {
  user: User | null;
  token: string | null; // ⚠️ Đổi từ "accessToken" thành "token"
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { authStart, authSuccess, authFailure, logout, updateUserProfile } =
  authSlice.actions;
export default authSlice.reducer;
