import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';

const { width } = Dimensions.get('window');

export const slideStyles = StyleSheet.create({
  container: {
    width,
    flex: 1,
    paddingHorizontal: Size.Spacing24,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: Size.Spacing32,
  },
  image: {
    width: width - 48,
    height: width - 48,
    borderRadius: Size.Radius24,
  },
  textContainer: {
    paddingBottom: Size.Spacing48,
    paddingHorizontal: Size.Spacing16,
  },
  title: {
    textAlign: 'center',
    marginBottom: Size.Spacing16,
    lineHeight: 36,
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Size.Spacing8,
  },
});

export const paginationStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Size.Spacing24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.Gray300,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: Colors.Primary500,
  },
});
