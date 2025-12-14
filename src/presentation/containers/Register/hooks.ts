import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { RegisterUseCase } from '../../../domain/usecases/RegisterUseCase';
import { AuthRepositoryImpl } from '../../../data/repositories/authRepositoryImpl';
import {
  authStart,
  authSuccess,
  authFailure,
} from '../../store/slices/authSlice';

export const useRegister = (onSuccess: () => void) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const authRepository = new AuthRepositoryImpl();
  const registerUseCase = new RegisterUseCase(authRepository);

  const handleRegister = async () => {
    // Validation
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }

    setIsLoading(true);
    dispatch(authStart());

    try {
      const response = await registerUseCase.execute({
        name,
        email,
        password,
        phone,
      });

      dispatch(
        authSuccess({
          user: response.user,
          token: response.token,
        }),
      );

      // ✅ BỎ Alert, gọi onSuccess ngay
      onSuccess();
    } catch (error: any) {
      const errorMessage = error.message || 'Đăng ký thất bại';
      dispatch(authFailure(errorMessage));
      Alert.alert('Lỗi', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLoading,
    handleRegister,
  };
};
