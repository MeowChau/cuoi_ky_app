import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/presentation/store/store';
import { AppNavigator } from './src/navigation/AppNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '@env';
import { logout } from './src/presentation/store/slices/authSlice';
import axiosInstance from './src/data/api/axiosConfig';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
});

console.log('=============================');
console.log('GOOGLE_WEB_CLIENT_ID:', GOOGLE_WEB_CLIENT_ID);
console.log('Type:', typeof GOOGLE_WEB_CLIENT_ID);
console.log('Length:', GOOGLE_WEB_CLIENT_ID?.length);
console.log('=============================');

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Listen to axios 401 errors globally
    const interceptor = axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401 && error.config._retry) {
          // Token refresh thất bại -> logout user
          console.log('🚨 Token refresh failed, logging out...');
          dispatch(logout());
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </SafeAreaView>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;