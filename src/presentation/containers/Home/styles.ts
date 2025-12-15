import { StyleSheet } from 'react-native';
import Colors from '../../../theme/colors';
import { Size } from '../../../theme/sizes';
import StyleGlobal from '../../../theme/styleGlobals';

export const homeStyles = StyleSheet.create({
  container: {
    ...StyleGlobal.container,
    backgroundColor: Colors.White,
  },

  scrollContent: {
    paddingBottom: Size.Spacing32,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Size.Spacing24,
    paddingTop: Size.Spacing16,
    paddingBottom: Size.Spacing20,
  },

  userName: {
    marginTop: Size.Spacing4,
  },

  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.Gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchContainer: {
    paddingHorizontal: Size.Spacing24,
    marginBottom: Size.Spacing24,
  },

  // ✅ THÊM WRAPPER CHO INPUT + CLEAR BUTTON
  searchInputWrapper: {
    position: 'relative',
  },

  searchInputContainer: {
    marginBottom: 0,
  },

  // ✅ NÚT XÓA
  clearButton: {
    position: 'absolute',
    right: 12,
    top: 18,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.Gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Size.Spacing16,
    backgroundColor: Colors.Gray100,
    borderRadius: Size.Radius12,
    marginTop: Size.Spacing8,
  },

  searchLoadingText: {
    marginLeft: Size.Spacing8,
  },

  // ✅ ERROR STATE
  searchErrorContainer: {
    padding: Size.Spacing16,
    backgroundColor: Colors.Red100,
    borderRadius: Size.Radius12,
    marginTop: Size.Spacing8,
    alignItems: 'center',
  },

  // ✅ SEARCH RESULTS CONTAINER
  searchResultsContainer: {
    backgroundColor: Colors.White,
    borderRadius: Size.Radius12,
    marginTop: Size.Spacing8,
    ...StyleGlobal.shadowCard,
    maxHeight: 400,
    overflow: 'hidden',
  },

  searchResultsHeader: {
    paddingHorizontal: Size.Spacing16,
    paddingVertical: Size.Spacing12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray200,
    backgroundColor: Colors.Gray100,
  },

  searchResultsList: {
    maxHeight: 350,
  },

  section: {
    marginBottom: Size.Spacing32,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Size.Spacing24,
    marginBottom: Size.Spacing16,
  },

  horizontalList: {
    paddingHorizontal: Size.Spacing24,
    gap: Size.Spacing16,
  },

  weatherGrid: {
    paddingHorizontal: Size.Spacing24,
    gap: Size.Spacing12,
  },
});
