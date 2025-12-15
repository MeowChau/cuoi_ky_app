import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { CHCText, CHCButton, CHCTouchable } from '../../../components';
import { Trip } from '../../../../domain/entities/Trip';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';

interface TripDetailModalProps {
  visible: boolean;
  trip: Trip | null;
  onClose: () => void;
  onEdit: (trip: Trip) => void;
  onDelete: (tripId: string, tripTitle: string) => void;
  isLoading?: boolean;
}

export const TripDetailModal: React.FC<TripDetailModalProps> = ({
  visible,
  trip,
  onClose,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatMoney = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getActivityIcon = (): string => {
    return '📍';
  };

  const handleDelete = () => {
    if (!trip) return;
    
    Alert.alert(
      'Xác nhận xóa',
      `Bạn có chắc muốn xóa chuyến đi "${trip.title}"?\n\nHành động này không thể hoàn tác.`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            onDelete(trip.id, trip.title);
            onClose();
          },
        },
      ],
    );
  };

  if (!trip) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <CHCText type="Heading2" style={styles.headerTitle}>
              Chi tiết chuyến đi
            </CHCText>
            <CHCTouchable onPress={onClose} style={styles.closeButton} disabled={isLoading}>
              <CHCText type="Heading3" color={Colors.Gray500}>
                ✕
              </CHCText>
            </CHCTouchable>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.Primary500} />
              <CHCText type="Body2" color={Colors.Gray600} style={styles.loadingText}>
                Đang tải...
              </CHCText>
            </View>
          ) : (
            <ScrollView 
              style={styles.content} 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
            >
              {/* Title */}
              <View style={styles.section}>
                <CHCText type="Heading2" color={Colors.Gray900}>
                  {trip.title}
                </CHCText>
                {trip.description && (
                  <CHCText type="Body2" color={Colors.Gray600} style={styles.description}>
                    {trip.description}
                  </CHCText>
                )}
              </View>

              {/* Date & Duration */}
              <View style={styles.section}>
                <CHCText type="Heading3" color={Colors.Gray900} style={styles.sectionTitle}>
                  📅 Thời gian
                </CHCText>
                <View style={styles.infoRow}>
                  <CHCText type="Body2" color={Colors.Gray700}>
                    Ngày bắt đầu:
                  </CHCText>
                  <CHCText type="Body1" color={Colors.Gray900}>
                    {formatDate(trip.startDate)}
                  </CHCText>
                </View>
                <View style={styles.infoRow}>
                  <CHCText type="Body2" color={Colors.Gray700}>
                    Ngày kết thúc:
                  </CHCText>
                  <CHCText type="Body1" color={Colors.Gray900}>
                    {formatDate(trip.endDate)}
                  </CHCText>
                </View>
                {trip.origin && (
                  <View style={styles.infoRow}>
                    <CHCText type="Body2" color={Colors.Gray700}>
                      Điểm xuất phát:
                    </CHCText>
                    <CHCText type="Body1" color={Colors.Gray900}>
                      {trip.origin}
                    </CHCText>
                  </View>
                )}
                {trip.transportMode && (
                  <View style={styles.infoRow}>
                    <CHCText type="Body2" color={Colors.Gray700}>
                      Phương tiện:
                    </CHCText>
                    <CHCText type="Body1" color={Colors.Gray900}>
                      {trip.transportMode === 'flight' ? '✈️ Máy bay' :
                       trip.transportMode === 'train' ? '🚄 Tàu hỏa' :
                       trip.transportMode === 'bus' ? '🚌 Xe khách' :
                       '🚗 Xe riêng'}
                    </CHCText>
                  </View>
                )}
              </View>

              {/* Budget */}
              <View style={styles.section}>
                <CHCText type="Heading3" color={Colors.Gray900} style={styles.sectionTitle}>
                  💰 Ngân sách
                </CHCText>
                <View style={styles.budgetCard}>
                  <CHCText type="Heading2" color={Colors.Primary500} style={styles.budgetTotal}>
                    {formatMoney(trip.budget.total)}
                  </CHCText>
                  
                  {(trip.budget.flights || trip.budget.hotels || trip.budget.food || 
                    trip.budget.activities || trip.budget.transport || trip.budget.others) && (
                    <View style={styles.budgetBreakdown}>
                      {trip.budget.flights && trip.budget.flights > 0 && (
                        <View style={styles.budgetItem}>
                          <CHCText type="Body2" color={Colors.Gray700}>
                            ✈️ Vé máy bay:
                          </CHCText>
                          <CHCText type="Body2" color={Colors.Gray900} style={styles.budgetValue}>
                            {formatMoney(trip.budget.flights)}
                          </CHCText>
                        </View>
                      )}
                      {trip.budget.hotels && trip.budget.hotels > 0 && (
                        <View style={styles.budgetItem}>
                          <CHCText type="Body2" color={Colors.Gray700}>
                            🏨 Khách sạn:
                          </CHCText>
                          <CHCText type="Body2" color={Colors.Gray900} style={styles.budgetValue}>
                            {formatMoney(trip.budget.hotels)}
                          </CHCText>
                        </View>
                      )}
                      {trip.budget.food && trip.budget.food > 0 && (
                        <View style={styles.budgetItem}>
                          <CHCText type="Body2" color={Colors.Gray700}>
                            🍽️ Ăn uống:
                          </CHCText>
                          <CHCText type="Body2" color={Colors.Gray900} style={styles.budgetValue}>
                            {formatMoney(trip.budget.food)}
                          </CHCText>
                        </View>
                      )}
                      {trip.budget.activities && trip.budget.activities > 0 && (
                        <View style={styles.budgetItem}>
                          <CHCText type="Body2" color={Colors.Gray700}>
                            🎯 Hoạt động:
                          </CHCText>
                          <CHCText type="Body2" color={Colors.Gray900} style={styles.budgetValue}>
                            {formatMoney(trip.budget.activities)}
                          </CHCText>
                        </View>
                      )}
                      {trip.budget.transport && trip.budget.transport > 0 && (
                        <View style={styles.budgetItem}>
                          <CHCText type="Body2" color={Colors.Gray700}>
                            🚕 Di chuyển:
                          </CHCText>
                          <CHCText type="Body2" color={Colors.Gray900} style={styles.budgetValue}>
                            {formatMoney(trip.budget.transport)}
                          </CHCText>
                        </View>
                      )}
                      {trip.budget.others && trip.budget.others > 0 && (
                        <View style={styles.budgetItem}>
                          <CHCText type="Body2" color={Colors.Gray700}>
                            💼 Chi phí khác:
                          </CHCText>
                          <CHCText type="Body2" color={Colors.Gray900} style={styles.budgetValue}>
                            {formatMoney(trip.budget.others)}
                          </CHCText>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              </View>

              {/* Destinations */}
              {trip.destinations && trip.destinations.length > 0 && (
                <View style={styles.section}>
                  <CHCText type="Heading3" color={Colors.Gray900} style={styles.sectionTitle}>
                    📍 Điểm đến ({trip.destinations.length})
                  </CHCText>
                  {trip.destinations.map((dest, index) => (
                    <View key={index} style={styles.destinationItem}>
                      <CHCText type="Body1" color={Colors.Gray900}>
                        {index + 1}. {dest.name}
                      </CHCText>
                    </View>
                  ))}
                </View>
              )}

              {/* Itinerary */}
              {trip.itinerary && trip.itinerary.length > 0 && (
                <View style={styles.section}>
                  <CHCText type="Heading3" color={Colors.Gray900} style={styles.sectionTitle}>
                    📅 Lịch trình chi tiết
                  </CHCText>
                  {trip.itinerary.map((day, index) => (
                    <View key={day.day || index} style={styles.dayCard}>
                      <View style={styles.dayHeader}>
                        <View style={styles.dayNumber}>
                          <CHCText type="Heading3" color={Colors.White}>
                            {day.day || index + 1}
                          </CHCText>
                        </View>
                        <View style={styles.dayInfo}>
                          <CHCText type="Body1" color={Colors.Gray900} style={styles.dayLabel}>
                            Ngày {day.day || index + 1}
                          </CHCText>
                          <CHCText type="Body2" color={Colors.Gray600}>
                            {formatDate(day.date)}
                          </CHCText>
                        </View>
                      </View>

                      {day.activities && day.activities.length > 0 && (
                        <View style={styles.activitiesContainer}>
                          {day.activities.map((activity, actIndex) => (
                            <View key={actIndex} style={styles.activityItem}>
                              <View style={styles.activityTimeBadge}>
                                <CHCText type="Body2" color={Colors.Primary500} style={styles.activityTime}>
                                  {activity.time}
                                </CHCText>
                              </View>
                              <View style={styles.activityContent}>
                                <CHCText type="Body1" color={Colors.Gray900} style={styles.activityTitle}>
                                  {getActivityIcon()} {activity.title}
                                </CHCText>
                                {activity.location && (
                                  <CHCText type="Body2" color={Colors.Gray600}>
                                    📍 {activity.location}
                                  </CHCText>
                                )}
                                {activity.description && (
                                  <CHCText type="Body2" color={Colors.Gray600}>
                                    {activity.description}
                                  </CHCText>
                                )}
                                {activity.cost && activity.cost > 0 && (
                                  <CHCText type="Body2" color={Colors.Primary500} style={styles.activityCost}>
                                    {formatMoney(activity.cost)}
                                  </CHCText>
                                )}
                              </View>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {/* Metadata */}
              {(trip.createdAt || trip.updatedAt) && (
                <View style={styles.section}>
                  <CHCText type="Body2" color={Colors.Gray500} style={styles.metadata}>
                    {trip.createdAt && `Tạo: ${formatDate(trip.createdAt)}`}
                    {trip.updatedAt && trip.updatedAt !== trip.createdAt && 
                     ` • Cập nhật: ${formatDate(trip.updatedAt)}`}
                  </CHCText>
                </View>
              )}
            </ScrollView>
          )}

          {/* Action Buttons */}
          <View style={styles.footer}>
            <CHCButton
              title="✏️ Chỉnh sửa"
              variant="outline"
              onPress={() => {
                onEdit(trip);
                onClose();
              }}
              style={styles.editButton}
              disabled={isLoading}
            />
            <CHCButton
              title="🗑️ Xóa"
              variant="outline"
              onPress={handleDelete}
              style={styles.deleteButton}
              disabled={isLoading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: Size.Radius24,
    borderTopRightRadius: Size.Radius24,
    maxHeight: '90%',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Size.Spacing20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray200,
  },
  headerTitle: {
    color: Colors.Gray900,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Size.Spacing24,
  },
  loadingText: {
    marginTop: Size.Spacing12,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: Size.Spacing20,
    paddingBottom: Size.Spacing24,
  },
  section: {
    marginBottom: Size.Spacing24,
  },
  sectionTitle: {
    marginBottom: Size.Spacing12,
  },
  description: {
    marginTop: Size.Spacing8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Size.Spacing8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray100,
  },
  budgetCard: {
    backgroundColor: Colors.Primary100,
    borderRadius: Size.Radius12,
    padding: Size.Spacing16,
    marginTop: Size.Spacing8,
  },
  budgetTotal: {
    marginBottom: Size.Spacing12,
  },
  budgetBreakdown: {
    marginTop: Size.Spacing12,
    paddingTop: Size.Spacing12,
    borderTopWidth: 1,
    borderTopColor: Colors.Gray200,
    gap: Size.Spacing8,
  },
  budgetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Size.Spacing4,
  },
  budgetValue: {
    fontWeight: '600',
  },
  destinationItem: {
    paddingVertical: Size.Spacing8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray100,
  },
  dayCard: {
    backgroundColor: Colors.Gray100,
    borderRadius: Size.Radius12,
    padding: Size.Spacing16,
    marginBottom: Size.Spacing12,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Size.Spacing12,
    paddingBottom: Size.Spacing12,
    borderBottomWidth: 2,
    borderBottomColor: Colors.Primary500,
    gap: Size.Spacing12,
  },
  dayNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.Primary500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayInfo: {
    flex: 1,
    gap: Size.Spacing4,
  },
  dayLabel: {
    fontWeight: '600',
  },
  activitiesContainer: {
    gap: Size.Spacing12,
    marginTop: Size.Spacing8,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    borderRadius: Size.Radius8,
    padding: Size.Spacing12,
    gap: Size.Spacing12,
    shadowColor: Colors.ShadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activityTimeBadge: {
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTime: {
    fontWeight: '600',
    fontSize: 12,
  },
  activityContent: {
    flex: 1,
    gap: Size.Spacing4,
  },
  activityTitle: {
    marginBottom: Size.Spacing4,
    fontWeight: '500',
  },
  activityCost: {
    fontWeight: '600',
    marginTop: Size.Spacing4,
  },
  metadata: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    padding: Size.Spacing20,
    gap: Size.Spacing12,
    borderTopWidth: 1,
    borderTopColor: Colors.Gray200,
  },
  editButton: {
    flex: 1,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: Colors.Red100,
    borderColor: Colors.Red500,
  },
});

