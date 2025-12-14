import React from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { CHCText, CHCButton } from '../../components';
import { TripCard } from './components/TripCard';
import { useTrips } from './hooks';
import { tripsStyles } from './styles'; // ⭐ Import styles
import Colors from '../../../theme/colors';

interface TripsScreenProps {
  navigation: any;
}

const TripsScreen: React.FC<TripsScreenProps> = ({ navigation }) => {
  const { trips, isLoading, error, refreshTrips, deleteTrip } = useTrips();

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View style={tripsStyles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.Primary500} />
          <CHCText type="Body1" color={Colors.Gray500} style={tripsStyles.loadingText}>
            Đang tải danh sách chuyến đi...
          </CHCText>
        </View>
      );
    }

    if (error) {
      return (
        <View style={tripsStyles.centerContainer}>
          <CHCText type="Heading2">⚠️</CHCText>
          <CHCText type="Body1" color={Colors.Red500} style={tripsStyles.errorText}>
            {error}
          </CHCText>
          <CHCButton
            title="Thử lại"
            onPress={refreshTrips}
            variant="outline"
            style={tripsStyles.retryButton}
          />
        </View>
      );
    }

    return (
      <View style={tripsStyles.centerContainer}>
        <CHCText type="Heading1">🗺️</CHCText>
        <CHCText type="Heading3" style={tripsStyles.emptyTitle}>
          Chưa có chuyến đi nào
        </CHCText>
        <CHCText type="Body2" color={Colors.Gray500} style={tripsStyles.emptySubtitle}>
          Hãy tạo chuyến đi đầu tiên của bạn
        </CHCText>
        <CHCButton
  title="Tạo chuyến đi"
  onPress={() => navigation.navigate('CreateTrip')} // ⭐ THAY ĐỔI
  variant="primary"
  style={tripsStyles.createButton}
/>
      </View>
    );
  };

  return (
    <SafeAreaView style={tripsStyles.container}>
      {/* Header */}
      <View style={tripsStyles.header}>
        <CHCText type="Heading2">Chuyến đi của tôi</CHCText>
        {trips.length > 0 && (
         <CHCButton
         title="+ Tạo mới"
         onPress={() => navigation.navigate('CreateTrip')} // ⭐ THAY ĐỔI
         variant="primary"
         style={tripsStyles.headerButton}
       />
        )}
      </View>

      {/* List */}
      <FlatList
        data={trips}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TripCard
            trip={item}
            onPress={() => console.log('Navigate to Trip Detail:', item.id)}
            onDelete={() => deleteTrip(item.id, item.title)}
          />
        )}
        contentContainerStyle={[
          tripsStyles.listContent,
          trips.length === 0 && tripsStyles.listContentEmpty,
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshTrips}
            colors={[Colors.Primary500]}
            tintColor={Colors.Primary500}
          />
        }
        ListEmptyComponent={renderEmpty}
      />
    </SafeAreaView>
  );
};

export default TripsScreen;