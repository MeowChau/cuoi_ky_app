import React from 'react';
import { ScrollView, SafeAreaView, StatusBar, View } from 'react-native';
import { CHCButton } from '../../components';
import { ProfileHeader } from './components/ProfileHeader';
import { StatsCard } from './components/StatsCard';
import { ChartSection } from './components/ChartSection';
import { UpdateProfileModal } from './components/UpdateProfileModal';
import { useProfile } from './hooks';
import { profileStyles } from './styles';
import Colors from '../../../theme/colors';

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const {
    user,
    stats,
    regionData,
    monthData,
    quarterData,
    showUpdateModal,
    setShowUpdateModal,
    isUpdating,
    handleUpdateProfile,
    handleLogout,
  } = useProfile(navigation);

  // Format số tiền
  const formatMoney = (amount: number): string => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K`;
    }
    return amount.toString();
  };

  return (
    <SafeAreaView style={profileStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={profileStyles.scrollContent}
      >
        {/* Header - User Info */}
        <ProfileHeader user={user} />

        {/* Stats Section */}
        <View style={profileStyles.statsSection}>
          <View style={profileStyles.statsRow}>
            <StatsCard
              icon="🗺️"
              label="Tổng chuyến đi"
              value={stats.totalTrips.toString()}
              color={Colors.Primary500}
            />
            <StatsCard
              icon="💰"
              label="Tổng ngân sách"
              value={`${formatMoney(stats.totalBudget)} đ`}
              color={Colors.Green500}
            />
          </View>

          <View style={[profileStyles.statsRow, { marginTop: 12 }]}>
            <StatsCard
              icon="📊"
              label="TB mỗi chuyến"
              value={`${formatMoney(stats.avgBudget)} đ`}
              color={Colors.Blue500}
            />
            <StatsCard
              icon="📍"
              label="Địa điểm yêu thích"
              value={stats.mostPopularDest}
              color={Colors.Accent500}
            />
          </View>
        </View>

        {/* Charts Section */}
        <ChartSection
          regionData={regionData}
          monthData={monthData}
          quarterData={quarterData}
        />

        {/* Actions Section */}
        <View style={profileStyles.actionsSection}>
          <CHCButton
            title="✏️ Cập nhật thông tin"
            onPress={() => setShowUpdateModal(true)}
            variant="primary"
            style={profileStyles.actionButton}
          />

          <CHCButton
            title="🚪 Đăng xuất"
            onPress={handleLogout}
            variant="primary"
            style={profileStyles.actionButton}
          />
        </View>
      </ScrollView>

      {/* Update Profile Modal */}
      <UpdateProfileModal
        visible={showUpdateModal}
        user={user}
        isLoading={isUpdating}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateProfile}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;