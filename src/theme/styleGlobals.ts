import { StyleSheet } from 'react-native';
import Colors from './colors';
import { Size } from './sizes';

const StyleGlobal = StyleSheet.create({
  // Layout
  flex1: { flex: 1 },
  center: { justifyContent: 'center', alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Containers
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  paddingScreen: {
    paddingHorizontal: Size.Spacing16,
  },

  // Shadows (Đổ bóng)
  shadowSmall: {
    shadowColor: Colors.ShadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android
  },
  shadowCard: {
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5, // Android
  },
  shadowFloating: {
    // Nút nổi (FAB)
    shadowColor: Colors.Primary700,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },

  // Cards
  card: {
    backgroundColor: Colors.White,
    borderRadius: Size.Radius16,
    padding: Size.Spacing16,
    marginBottom: Size.Spacing16,
  },
});

export default StyleGlobal;
