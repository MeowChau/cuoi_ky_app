import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { LoginUseCase } from '../../../domain/usecases/LoginUseCase';
import { AuthRepositoryImpl } from '../../../data/repositories/authRepositoryImpl';
import {
  authStart,
  authSuccess,
  authFailure,
} from '../../store/slices/authSlice';
import { GoogleLoginUseCase } from '../../../domain/usecases/GoogleLoginUseCase';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { UpdateProfileUseCase } from '../../../domain/usecases/UpdateProfileUseCase';

export const useLogin = (onSuccess: () => void) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const authRepository = new AuthRepositoryImpl();
  const loginUseCase = new LoginUseCase(authRepository);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    setIsLoading(true);
    dispatch(authStart());

    try {
      const response = await loginUseCase.execute({ email, password });

      dispatch(
        authSuccess({
          user: response.user,
          token: response.token,
        }),
      );

      // ✅ BỎ Alert, gọi onSuccess ngay
      onSuccess();
    } catch (error: any) {
      const errorMessage = error.message || 'Đăng nhập thất bại';
      dispatch(authFailure(errorMessage));
      Alert.alert('Lỗi', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    handleLogin,
  };
};
export const useGoogleLogin = (onSuccess: (user: any) => void) => {
  const dispatch = useDispatch();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const [googleUser, setGoogleUser] = useState<any>(null);
  const [googleToken, setGoogleToken] = useState<string>('');

  const authRepository = new AuthRepositoryImpl();
  const googleLoginUseCase = new GoogleLoginUseCase(authRepository);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    dispatch(authStart());

    try {
      // 1. Check if device supports Google Play Services
      await GoogleSignin.hasPlayServices();

      // 2. Sign in and get user info
      const userInfo = await GoogleSignin.signIn();
      
      // 3. Get ID token
      const idToken = userInfo.data?.idToken;

      if (!idToken) {
        throw new Error('Không lấy được token từ Google');
      }

      // 4. Call backend API
      const response = await googleLoginUseCase.execute(idToken);

      // 5. Check if user needs to complete profile
      const needsCompletion = !response.user.phone || 
                             !response.user.name || 
                             response.user.name.trim().length === 0;

      if (needsCompletion) {
        // User mới - hiện modal
        setGoogleUser(response.user);
        setGoogleToken(response.token);
        setShowCompleteProfile(true);
      } else {
        // User cũ - vào app ngay
        dispatch(
          authSuccess({
            user: response.user,
            token: response.token,
          }),
        );
        onSuccess(response.user);
      }
    } catch (error: any) {
      // ⭐ LOG CHI TIẾT HƠN
      console.error('============ Google Sign-In Error ============');
      console.error('Error object:', JSON.stringify(error, null, 2));
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.error('==============================================');
      
      let errorMessage = 'Đăng nhập Google thất bại';
      
      if (error.code === 'SIGN_IN_CANCELLED') {
        errorMessage = 'Bạn đã hủy đăng nhập';
      } else if (error.code === 'IN_PROGRESS') {
        errorMessage = 'Đang xử lý...';
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        errorMessage = 'Thiết bị không hỗ trợ Google Play Services';
      } else if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        errorMessage = 'Cần đăng nhập lại';
      } else if (error.message && error.message.includes('DEVELOPER_ERROR')) {
        errorMessage = 'Lỗi config Google Sign-In. Vui lòng thử lại sau 15 phút.';
      } else if (error.message) {
        errorMessage = error.message;
      }
    
      dispatch(authFailure(errorMessage));
      Alert.alert('Lỗi', errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleCompleteProfile = async (data: { name: string; phone: string }) => {
    setIsGoogleLoading(true);

    try {
      // Update profile
      const updateProfileUseCase = new UpdateProfileUseCase(authRepository);
      const updatedUser = await updateProfileUseCase.execute({
        name: data.name,
        phone: data.phone,
      });

      // Dispatch to Redux
      dispatch(
        authSuccess({
          user: updatedUser,
          token: googleToken,
        }),
      );

      setShowCompleteProfile(false);
      Alert.alert('Thành công', 'Hoàn tất thông tin thành công!', [
        {
          text: 'OK',
          onPress: () => onSuccess(updatedUser),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Lỗi', error.message || 'Cập nhật thông tin thất bại');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return {
    isGoogleLoading,
    showCompleteProfile,
    googleUser,
    handleGoogleSignIn,
    handleCompleteProfile,
  };
};