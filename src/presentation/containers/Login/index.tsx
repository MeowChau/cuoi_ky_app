import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Image, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { CHCText, CHCTextInput, CHCButton, CHCTouchable } from '../../components';
import { useLogin } from './hooks';
import { loginStyles } from './styles';
import Colors from '../../../theme/colors';
import { CompleteProfileModal } from './components/CompleteProfileModal';
import { useGoogleLogin } from './hooks';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    isLoading,
    handleLogin,
  } = useLogin(() => {
    navigation.replace('MainTabs'); // ✅ SỬA TỪ 'Home' THÀNH 'MainTabs'
  });
  const {
    isGoogleLoading,
    showCompleteProfile,
    googleUser,
    handleGoogleSignIn,
    handleCompleteProfile,
  } = useGoogleLogin(() => {
    navigation.replace('MainTabs');
  });

  return (
    <SafeAreaView style={loginStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
      
      <KeyboardAvoidingView
        style={loginStyles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={loginStyles.scrollContent}
        >
          {/* Header */}
          <View style={loginStyles.header}>
            <CHCText type="Heading1" style={loginStyles.title}>
              Đăng nhập
            </CHCText>
            <CHCText type="Body1" color={Colors.Gray600} style={loginStyles.subtitle}>
              Đăng nhập để tiếp tục sử dụng ứng dụng
            </CHCText>
          </View>

          {/* Form */}
          <View style={loginStyles.form}>
            <CHCTextInput
              label="Email"
              placeholder="abc@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <CHCTextInput
              label="Mật khẩu"
              placeholder="**********"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              showPasswordToggle
            />

            {/* Forget Password */}
            <View style={loginStyles.forgotPasswordContainer}>
              <CHCTouchable onPress={() => navigation.navigate('ForgotPassword')}>
                <CHCText type="Body2" color={Colors.Primary500}>
                  Quên mật khẩu?
                </CHCText>
              </CHCTouchable>
            </View>

            {/* Sign In Button */}
            <CHCButton
              title="Đăng nhập"
              onPress={handleLogin}
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
              style={loginStyles.loginButton}
            />
          </View>

          {/* Footer */}
          <View style={loginStyles.footer}>
            {/* Don't have account */}
            <View style={loginStyles.footerRow}>
              <CHCText type="Body2" color={Colors.Gray600}>
                Chưa có tài khoản?{' '}
              </CHCText>
              <CHCTouchable onPress={() => navigation.navigate('Register')}>
                <CHCText type="Body2" color={Colors.Primary500}>
                  Đăng ký
                </CHCText>
              </CHCTouchable>
            </View>

            {/* Or connect */}
            <CHCText type="Body2" color={Colors.Gray600} style={loginStyles.orConnectText}>
              Hoặc đăng nhập với
            </CHCText>

            {/* Google Button */}
            <View style={loginStyles.socialContainer}>
              <CHCTouchable
                style={loginStyles.googleButton}
                onPress={handleGoogleSignIn}  
                disabled={isLoading || isGoogleLoading} 
              >
                {isGoogleLoading ? (
                  <ActivityIndicator size="small" color={Colors.Primary500} />
                ) : (
                  <Image
                    source={require('../../../assets/image/icon-google.png')}
                    style={loginStyles.googleIcon}
                    resizeMode="contain"
                  />
                )}
              </CHCTouchable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CompleteProfileModal
        visible={showCompleteProfile}
        email={googleUser?.email || ''}
        isLoading={isGoogleLoading}
        onSubmit={handleCompleteProfile}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;