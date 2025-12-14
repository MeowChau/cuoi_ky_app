import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar } from 'react-native';
import { CHCText, CHCTextInput, CHCButton, CHCTouchable } from '../../components';
import { useRegister } from './hooks';
import { registerStyles } from './styles';
import Colors from '../../../theme/colors';

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const {
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
    showConfirmPassword,
    isLoading,
    handleRegister,
  } = useRegister(() => {
    navigation.replace('MainTabs'); // ✅ SỬA TỪ 'Home' THÀNH 'MainTabs'
  });

  return (
    <SafeAreaView style={registerStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
      
      <KeyboardAvoidingView
        style={registerStyles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={registerStyles.header}>
            <CHCTouchable
              style={registerStyles.backButton}
              onPress={() => navigation.goBack()}
            >
              <CHCText type="Heading2">←</CHCText>
            </CHCTouchable>

            <CHCText type="Heading1" style={registerStyles.title}>
              Đăng ký
            </CHCText>
            <CHCText type="Body1" color={Colors.Gray600} style={registerStyles.subtitle}>
              Điền thông tin để tạo tài khoản
            </CHCText>
          </View>

          {/* Form */}
          <View style={registerStyles.form}>
            {/* Name Input */}
            <CHCTextInput
              label="Họ và tên"
              placeholder="Nguyễn Văn A"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoCorrect={false}
            />

            {/* Email Input */}
            <CHCTextInput
              label="Email"
              placeholder="abc@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* Phone Input */}
            <CHCTextInput
              label="Số điện thoại"
              placeholder="0123456789"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoCapitalize="none"
            />

            {/* Password Input */}
            <CHCTextInput
              label="Mật khẩu"
              placeholder="**********"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              showPasswordToggle
            />

            {/* Confirm Password Input */}
            <CHCTextInput
              label="Xác nhận mật khẩu"
              placeholder="**********"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              showPasswordToggle
            />

            {/* Sign Up Button */}
            <CHCButton
              title="Đăng ký"
              onPress={handleRegister}
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
              style={registerStyles.signupButton}
            />
          </View>

          {/* Footer */}
          <View style={registerStyles.footer}>
            <View style={registerStyles.footerContent}>
              <CHCText type="Body2" color={Colors.Gray600}>
                Đã có tài khoản?{' '}
              </CHCText>
              <CHCTouchable onPress={() => navigation.navigate('Login')}>
                <CHCText type="Body2" color={Colors.Primary500}>
                  Đăng nhập
                </CHCText>
              </CHCTouchable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;