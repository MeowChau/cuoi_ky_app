import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../domain/entities/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: User | null;
  token: string | null;
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
    // Thêm action để logout từ toàn app khi token hết hạn
    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // Clear AsyncStorage
      AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
    },
    // Thêm action để update token sau khi refresh
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const {
  authStart,
  authSuccess,
  authFailure,
  logout,
  updateUserProfile,
  updateToken,
} = authSlice.actions;

export default authSlice.reducer;