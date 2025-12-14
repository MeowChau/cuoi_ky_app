import { StyleSheet } from 'react-native';
import Colors from '../../../theme/colors';
import { Size } from '../../../theme/sizes';
import StyleGlobal from '../../../theme/styleGlobals';

export const onboardingStyles = StyleSheet.create({
  container: {
    ...StyleGlobal.container,
    backgroundColor: Colors.White,
  },
  skipContainer: {
    position: 'absolute',
    top: Size.Spacing16,
    right: Size.Spacing16,
    zIndex: 10,
    paddingVertical: Size.Spacing8,
    paddingHorizontal: Size.Spacing12,
  },
  skipText: {
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: Size.Spacing24,
    paddingBottom: Size.Spacing32,
  },
  button: {
    marginTop: Size.Spacing16,
    height: 56,
    borderRadius: Size.Radius12,
  },
});
