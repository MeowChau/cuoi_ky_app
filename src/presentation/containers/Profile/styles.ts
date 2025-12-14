import { StyleSheet } from 'react-native';
import Colors from '../../../theme/colors';
import { Size } from '../../../theme/sizes';
import StyleGlobal from '../../../theme/styleGlobals';

export const profileStyles = StyleSheet.create({
  container: {
    ...StyleGlobal.container,
    backgroundColor: Colors.Gray100,
  },
  scrollContent: {
    paddingBottom: Size.Spacing24,
  },
  
  // Header Section
  headerSection: {
    backgroundColor: Colors.White,
    paddingHorizontal: Size.Spacing24,
    paddingVertical: Size.Spacing32,
    borderBottomLeftRadius: Size.Radius24,
    borderBottomRightRadius: Size.Radius24,
    ...StyleGlobal.shadowCard,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: Size.Spacing16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.Primary100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    marginTop: Size.Spacing12,
  },
  userPhone: {
    marginTop: Size.Spacing4,
  },
  
  // Stats Section
  statsSection: {
    paddingHorizontal: Size.Spacing16,
    marginTop: Size.Spacing16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Size.Spacing12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.White,
    padding: Size.Spacing16,
    borderRadius: Size.Radius16,
    ...StyleGlobal.shadowCard,
  },
  statValue: {
    marginTop: Size.Spacing8,
  },
  statLabel: {
    marginTop: Size.Spacing4,
  },
  
  // Chart Section
  chartSection: {
    paddingHorizontal: Size.Spacing16,
    marginTop: Size.Spacing24,
  },
  chartCard: {
    backgroundColor: Colors.White,
    padding: Size.Spacing16,
    borderRadius: Size.Radius16,
    marginBottom: Size.Spacing16,
    ...StyleGlobal.shadowCard,
  },
  chartTitle: {
    marginBottom: Size.Spacing16,
  },
  emptyChart: {
    paddingVertical: Size.Spacing32,
    alignItems: 'center',
  },
  
  // Actions Section
  actionsSection: {
    paddingHorizontal: Size.Spacing16,
    marginTop: Size.Spacing24,
  },
  actionButton: {
    marginBottom: Size.Spacing12,
  },
  logoutButton: {
    backgroundColor: Colors.Red500,
  },
});