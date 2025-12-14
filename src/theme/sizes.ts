import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Size = {
  ScreenWidth: width,
  ScreenHeight: height,
  IsIOS: Platform.OS === 'ios',
  IsAndroid: Platform.OS === 'android',

  // Spacing
  Spacing4: 4,
  Spacing8: 8,
  Spacing12: 12,
  Spacing16: 16,
  Spacing20: 20,
  Spacing24: 24,
  Spacing32: 32,
  Spacing48: 48,

  // Border Radius
  Radius4: 4,
  Radius8: 8,
  Radius12: 12,
  Radius16: 16,
  Radius24: 24,
  RadiusRound: 999,

  // Icons
  IconSmall: 16,
  IconMedium: 24,
  IconLarge: 32,
  IconXLarge: 48,
};
