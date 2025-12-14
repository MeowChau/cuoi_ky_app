import { StyleSheet } from 'react-native';
import Colors from '../../../theme/colors';
import StyleGlobal from '../../../theme/styleGlobals';

export const tripsStyles = StyleSheet.create({
  container: {
    ...StyleGlobal.container,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.White,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray200,
  },
  headerButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  listContent: {
    padding: 16,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 16,
  },
  errorText: {
    marginTop: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
  },
  emptyTitle: {
    marginTop: 16,
  },
  emptySubtitle: {
    marginTop: 8,
    textAlign: 'center',
  },
  createButton: {
    marginTop: 24,
    paddingHorizontal: 32,
  },
});