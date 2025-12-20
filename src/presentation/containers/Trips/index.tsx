import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { CHCText, CHCButton } from '../../components';
import { TripCard } from './components/TripCard';
import { TripDetailModal } from './components/TripDetailModal';
import { useTrips } from './hooks';
import { tripsStyles } from './styles'; // ⭐ Import styles
import Colors from '../../../theme/colors';
import { Trip } from '../../../domain/entities/Trip';

interface TripsScreenProps {
  navigation: any;
}

const TripsScreen: React.FC<TripsScreenProps> = ({ navigation }) => {
  const { trips, isLoading, error, refreshTrips, deleteTrip } = useTrips();
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTripPress = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsModalVisible(true);
  };

  const handleEditTrip = (trip: Trip) => {
    navigation.navigate('CreateTrip', { 
      tripId: trip.id,
      editMode: true,
      tripData: trip 
    });
  };

  const handleDeleteTrip = (tripId: string, tripTitle: string) => {
    deleteTrip(tripId, tripTitle);
    if (selectedTrip?.id === tripId) {
      setIsModalVisible(false);
      setSelectedTrip(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedTrip(null);
  };

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
            onPress={() => handleTripPress(item)}
            onDelete={() => handleDeleteTrip(item.id, item.title)}
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

      {/* Trip Detail Modal */}
      <TripDetailModal
        visible={isModalVisible}
        trip={selectedTrip}
        onClose={handleCloseModal}
        onEdit={handleEditTrip}
        onDelete={handleDeleteTrip}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
};

export default TripsScreen;