import { StyleSheet } from 'react-native';
import Colors from '../../../theme/colors';
import { Size } from '../../../theme/sizes';
import StyleGlobal from '../../../theme/styleGlobals';

export const aiAssistantStyles = StyleSheet.create({
  container: {
    ...StyleGlobal.container,
    backgroundColor: Colors.White,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Size.Spacing24,
    paddingTop: Size.Spacing16,
    paddingBottom: Size.Spacing12,
    backgroundColor: Colors.White,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray200,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.Spacing12,
  },

  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.Primary100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    marginBottom: Size.Spacing4,
  },

  // ✅ THÊM CLEAR BUTTON
  clearButton: {
    padding: Size.Spacing8,
  },

  // ✅ THÊM ERROR BANNER
  errorBanner: {
    backgroundColor: Colors.Error50,
    paddingHorizontal: Size.Spacing16,
    paddingVertical: Size.Spacing12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Error200,
  },

  chatContainer: {
    flex: 1,
    backgroundColor: Colors.Gray50,
  },

  messagesList: {
    paddingHorizontal: Size.Spacing16,
    paddingTop: Size.Spacing16,
    paddingBottom: Size.Spacing24,
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
