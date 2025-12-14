import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CHCCard, CHCText, CHCTouchable } from '../../../components';
import { Trip } from '../../../../domain/entities/Trip';
import Colors from '../../../../theme/colors';

interface TripCardProps {
  trip: Trip;
  onPress: () => void;
  onDelete: () => void;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onPress, onDelete }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('vi-VN');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <CHCCard style={styles.card}>
      <CHCTouchable onPress={onPress}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <CHCText type="Heading3" style={styles.title} numberOfLines={2}>
              {trip.title}
            </CHCText>
            <CHCTouchable onPress={onDelete} style={styles.deleteButton}>
              <CHCText type="Body1" color={Colors.Red500}>
                🗑️
              </CHCText>
            </CHCTouchable>
          </View>

          {/* Description */}
          {trip.description && (
            <CHCText type="Body2" color={Colors.Gray600} numberOfLines={2} style={styles.description}>
              {trip.description}
            </CHCText>
          )}

          {/* Date Range */}
          <View style={styles.dateContainer}>
            <CHCText type="Body2" color={Colors.Gray500}>
              📅 {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </CHCText>
          </View>

          {/* Budget */}
          <View style={styles.budgetContainer}>
            <CHCText type="Body2" color={Colors.Primary500}>
              💰 {formatCurrency(trip.budget.total)}
            </CHCText>
          </View>

          {/* Destinations */}
          {trip.destinations && trip.destinations.length > 0 && (
            <View style={styles.destinationsContainer}>
              <CHCText type="Body2" color={Colors.Gray500}>
                📍 {trip.destinations.length} điểm đến
              </CHCText>
            </View>
          )}
        </View>
      </CHCTouchable>
    </CHCCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  content: {
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    padding: 4,
  },
  description: {
    marginTop: 4,
  },
  dateContainer: {
    marginTop: 4,
  },
  budgetContainer: {
    marginTop: 4,
  },
  destinationsContainer: {
    marginTop: 4,
  },
});