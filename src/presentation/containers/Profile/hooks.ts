import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { container } from '../../../di/container';
import { TOKENS } from '../../../di/tokens';
import { UpdateProfileUseCase } from '../../../domain/usecases/UpdateProfileUseCase';
import {
  selectUser,
  selectProfileStats,
  selectTripsByRegion,
  selectTripsByMonth,
  selectBudgetByQuarter,
} from '../../store/selectors/profileSelectors';
import { updateUserProfile, logout as logoutAction } from '../../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const useProfile = (navigation: any) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const stats = useSelector(selectProfileStats);
  const regionData = useSelector(selectTripsByRegion);
  const monthData = useSelector(selectTripsByMonth);
  const quarterData = useSelector(selectBudgetByQuarter);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProfile = async (data: {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
  }) => {
    setIsUpdating(true);

    try {
      const updateProfileUseCase = container.resolve<UpdateProfileUseCase>(TOKENS.UpdateProfileUseCase);
      const updatedUser = await updateProfileUseCase.execute(data);

      dispatch(updateUserProfile(updatedUser));

      Alert.alert('Thành công', 'Cập nhật thông tin thành công!');
      setShowUpdateModal(false);
    } catch (error: any) {
      Alert.alert('Lỗi', error.message || 'Cập nhật thất bại');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Xác nhận đăng xuất',
      'Bạn có chắc muốn đăng xuất?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: async () => {
            try {
              await GoogleSignin.signOut();
              await AsyncStorage.removeItem('accessToken');
              await AsyncStorage.removeItem('user');
              dispatch(logoutAction());
              navigation.replace('Onboarding');
            } catch (error) {
              console.error('Logout error:', error);
            }
          },
        },
      ],
    );
  };

  return {
    user,
    stats,
    regionData,
    monthData,
    quarterData,
    showUpdateModal,
    setShowUpdateModal,
    isUpdating,
    handleUpdateProfile,
    handleLogout,
  };
};
