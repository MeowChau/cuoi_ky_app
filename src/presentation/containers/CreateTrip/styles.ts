import { StyleSheet } from 'react-native';
import Colors from '../../../theme/colors';
import { Size } from '../../../theme/sizes';
import StyleGlobal from '../../../theme/styleGlobals';

export const createTripStyles = StyleSheet.create({
  container: {
    ...StyleGlobal.container,
    backgroundColor: Colors.White,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: Size.Spacing24,
    paddingTop: Size.Spacing16,
    paddingBottom: Size.Spacing24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray200,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Size.Spacing16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Size.Radius8,
    backgroundColor: Colors.Gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Size.Spacing12,
  },
  headerTitle: {
    flex: 1,
  },
  subtitle: {
    marginTop: Size.Spacing4,
  },
  form: {
    paddingHorizontal: Size.Spacing24,
    paddingTop: Size.Spacing24,
  },
  inputGroup: {
    marginBottom: Size.Spacing20,
  },
  label: {
    marginBottom: Size.Spacing8,
  },
  dateRow: {
    flexDirection: 'row',
    gap: Size.Spacing12,
  },
  dateColumn: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: Size.Spacing24,
    paddingVertical: Size.Spacing24,
  },
  createButton: {
    height: 56,
    borderRadius: Size.Radius12,
  },
});