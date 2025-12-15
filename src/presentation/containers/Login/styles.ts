import { StyleSheet } from 'react-native';
import Colors from '../../../theme/colors';
import { Size } from '../../../theme/sizes';
import StyleGlobal from '../../../theme/styleGlobals';

export const loginStyles = StyleSheet.create({
  container: {
    ...StyleGlobal.container,
    backgroundColor: Colors.White,
  },

  keyboardAvoidingView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center', // ✅ Căn giữa theo chiều dọc
    paddingHorizontal: Size.Spacing24,
    paddingVertical: Size.Spacing32,
  },

  header: {
    marginBottom: Size.Spacing32,
    alignItems: 'center',
  },

  title: {
    marginBottom: Size.Spacing8,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: Size.Spacing8,
    textAlign: 'center',
  },

  form: {
    marginTop: Size.Spacing16,
  },

  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: Size.Spacing12,
    marginBottom: Size.Spacing24,
  },

  loginButton: {
    height: 56,
    borderRadius: Size.Radius12,
    marginTop: Size.Spacing8,
  },

  footer: {
    marginTop: Size.Spacing32,
    alignItems: 'center',
  },

  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Size.Spacing16,
  },

  orConnectText: {
    marginBottom: Size.Spacing24,
  },

  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  googleButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.Gray200,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  googleIcon: {
    width: 24,
    height: 24,
  },
});
