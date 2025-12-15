import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/presentation/store/store'; // ✅ SỬA ĐÂY
import { AppNavigator } from './src/navigation/AppNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '@env';
GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
});
console.log('=============================');
console.log('GOOGLE_WEB_CLIENT_ID:', GOOGLE_WEB_CLIENT_ID);
console.log('Type:', typeof GOOGLE_WEB_CLIENT_ID);
console.log('Length:', GOOGLE_WEB_CLIENT_ID?.length);
console.log('=============================');
function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;