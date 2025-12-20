import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import OnboardingScreen from '../presentation/containers/Intro';
import LoginScreen from '../presentation/containers/Login';
import RegisterScreen from '../presentation/containers/Register';
import CreateTripScreen from '../presentation/containers/CreateTrip';
import { MainTabNavigator } from './MainTabNavigator';
import { authSuccess } from '../presentation/store/slices/authSlice';
import { RootState } from '../presentation/store/store';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  CreateTrip: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedIntro, setHasCompletedIntro] = useState(false); // ⭐ Đổi tên và không check AsyncStorage

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      console.log('🔍 Checking auth status...');
      
      // ⭐ XÓA phần check onboarding - không cần nữa
      // const onboardingStatus = await AsyncStorage.getItem('hasSeenOnboarding');
      // setHasSeenOnboarding(onboardingStatus === 'true');
      
      // Chỉ restore session
      const token = await AsyncStorage.getItem('accessToken');
      const userJson = await AsyncStorage.getItem('user');
      
      console.log('🔑 Token found:', !!token);
      console.log('👤 User found:', !!userJson);

      if (token && userJson) {
        const user = JSON.parse(userJson);
        console.log('✅ Restoring session for user:', user.email);
        dispatch(authSuccess({ user, token }));
      } else {
        console.log('❌ No saved session found');
      }
    } catch (error) {
      console.error('❌ Error restoring session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }

  console.log('🚀 Rendering AppNavigator with:', { isAuthenticated, hasCompletedIntro });

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasCompletedIntro ? (
          // ⭐ Luôn hiện Intro đầu tiên (mỗi lần mở app)
          <Stack.Screen name="Onboarding">
            {(props) => (
              <OnboardingScreen 
                {...props} 
                onComplete={() => {
                  // ⭐ KHÔNG save vào AsyncStorage
                  // Chỉ set state để chuyển màn hình
                  setHasCompletedIntro(true);
                }} 
              />
            )}
          </Stack.Screen>
        ) : isAuthenticated ? (
          // Đã đăng nhập -> vào app
          <>
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen name="CreateTrip" component={CreateTripScreen} />
          </>
        ) : (
          // Chưa đăng nhập -> hiện Login/Register
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};