import { StyleSheet } from 'react-native';
import Colors from '../../../theme/colors';
import { Size } from '../../../theme/sizes';
import StyleGlobal from '../../../theme/styleGlobals';

export const registerStyles = StyleSheet.create({
  container: {
    ...StyleGlobal.container,
    backgroundColor: Colors.White,
  },
  header: {
    paddingHorizontal: Size.Spacing24,
    marginTop: Size.Spacing48,
    marginBottom: Size.Spacing32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Size.Radius8,
    backgroundColor: Colors.Gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Size.Spacing24,
  },
  title: {
    marginBottom: Size.Spacing8,
  },
  subtitle: {
    marginTop: Size.Spacing8,
  },
  form: {
    paddingHorizontal: Size.Spacing24,
    marginTop: Size.Spacing16,
  },
  signupButton: {
    height: 56,
    borderRadius: Size.Radius12,
    marginTop: Size.Spacing24,
  },
  footer: {
    paddingHorizontal: Size.Spacing24,
    marginTop: Size.Spacing32,
    marginBottom: Size.Spacing48,
    alignItems: 'center',
  },
  footerContent: {
    // ✅ THÊM STYLE NÀY
    flexDirection: 'row',
    alignItems: 'center',
  },
});
