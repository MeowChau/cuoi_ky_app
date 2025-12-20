import { StyleSheet } from 'react-native';
import Colors from '../../../theme/colors';
import { Size } from '../../../theme/sizes';
import StyleGlobal from '../../../theme/styleGlobals';

export const aiAssistantStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },

  headerSafeArea: {
    backgroundColor: Colors.White,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray200,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Size.Spacing16,
    paddingVertical: Size.Spacing12,
    backgroundColor: Colors.White,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.Spacing12,
  },

  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.Primary100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    // Removed marginBottom for compact header
  },

  // ✅ THÊM CLEAR BUTTON
  clearButton: {
    padding: Size.Spacing8,
    paddingHorizontal: Size.Spacing12,
  },

  // ✅ THÊM ERROR BANNER
  errorBanner: {
    backgroundColor: Colors.Red100,
    paddingHorizontal: Size.Spacing16,
    paddingVertical: Size.Spacing8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Red300,
  },

  chatContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },

  messagesList: {
    paddingHorizontal: Size.Spacing12,
    paddingTop: Size.Spacing12,
    paddingBottom: Size.Spacing16,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Size.Spacing32,
  },

  emptyIcon: {
    fontSize: 80,
    marginBottom: Size.Spacing16,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: Size.Spacing8,
    color: Colors.Gray500,
  },
});
