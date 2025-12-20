import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { CHCText, CHCButton, CHCTouchable } from '../../../components';
import { TripPlan } from '../../../../domain/entities/ChatMessage';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';

interface ItineraryViewProps {
  tripPlan: TripPlan;
  onConfirm?: (tripPlan: TripPlan) => void;
  onEdit?: (tripPlan: TripPlan) => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({ tripPlan, onConfirm, onEdit }) => {
  // Debug log
  React.useEffect(() => {
    console.log('📅 ItineraryView received tripPlan:', JSON.stringify(tripPlan, null, 2));
    console.log('📅 Itinerary length:', tripPlan.itinerary?.length);
    console.log('📅 Budget:', tripPlan.budget);
  }, [tripPlan]);

  const formatDate = (date: Date): string => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      console.warn('⚠️ Invalid date in formatDate:', date);
      return 'N/A';
    }
    return date.toLocaleDateString('vi-VN', {
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

  const getActivityIcon = (type: string): string => {
    switch (type) {
      case 'attraction':
        return '🎯';
      case 'meal':
        return '🍽️';
      case 'checkin':
        return '🏨';
      case 'checkout':
        return '✈️';
      case 'transport':
        return '🚕';
      default:
        return '📍';
    }
  };

  // Validate tripPlan data
  if (!tripPlan) {
    return (
      <View style={styles.container}>
        <CHCText type="Body1" color={Colors.Gray600}>
          ⚠️ Không có dữ liệu lịch trình
        </CHCText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <CHCText type="Heading2" color={Colors.Gray900} style={styles.title}>
            {tripPlan.title || 'Lịch trình du lịch'}
          </CHCText>
          {tripPlan.startDate && tripPlan.endDate && (
            <View style={styles.dateRow}>
              <CHCText type="Body2" color={Colors.Gray600}>
                📅 {formatDate(tripPlan.startDate)} - {formatDate(tripPlan.endDate)}
              </CHCText>
              <CHCText type="Body2" color={Colors.Primary500} style={styles.duration}>
                • {tripPlan.duration} ngày
              </CHCText>
            </View>
          )}
        </View>
      </View>

      {/* Budget Summary */}
      {tripPlan.budget && (
        <View style={styles.budgetCard}>
          <View style={styles.budgetHeader}>
            <CHCText type="Heading3" color={Colors.Gray900}>
              💰 Ngân sách dự kiến
            </CHCText>
            <CHCText type="Heading2" color={Colors.Primary500} style={styles.budgetAmount}>
              {formatMoney(tripPlan.budget.total)}
            </CHCText>
          </View>
          
          {tripPlan.budget.breakdown && (
            <View style={styles.breakdownContainer}>
              <CHCText type="Body2" color={Colors.Gray600} style={styles.breakdownTitle}>
                Chi tiết:
              </CHCText>
              {tripPlan.budget.breakdown.flights > 0 && (
                <View style={styles.breakdownItem}>
                  <View style={styles.breakdownLabel}>
                    <CHCText type="Body2" color={Colors.Gray700}>
                      ✈️ Vé máy bay
                    </CHCText>
                  </View>
                  <CHCText type="Body2" color={Colors.Gray900} style={styles.breakdownValue}>
                    {formatMoney(tripPlan.budget.breakdown.flights)}
                  </CHCText>
                </View>
              )}
              {tripPlan.budget.breakdown.accommodation > 0 && (
                <View style={styles.breakdownItem}>
                  <View style={styles.breakdownLabel}>
                    <CHCText type="Body2" color={Colors.Gray700}>
                      🏨 Khách sạn
                    </CHCText>
                  </View>
                  <CHCText type="Body2" color={Colors.Gray900} style={styles.breakdownValue}>
                    {formatMoney(tripPlan.budget.breakdown.accommodation)}
                  </CHCText>
                </View>
              )}
              {tripPlan.budget.breakdown.food > 0 && (
                <View style={styles.breakdownItem}>
                  <View style={styles.breakdownLabel}>
                    <CHCText type="Body2" color={Colors.Gray700}>
                      🍽️ Ăn uống
                    </CHCText>
                  </View>
                  <CHCText type="Body2" color={Colors.Gray900} style={styles.breakdownValue}>
                    {formatMoney(tripPlan.budget.breakdown.food)}
                  </CHCText>
                </View>
              )}
              {tripPlan.budget.breakdown.activities > 0 && (
                <View style={styles.breakdownItem}>
                  <View style={styles.breakdownLabel}>
                    <CHCText type="Body2" color={Colors.Gray700}>
                      🎯 Hoạt động
                    </CHCText>
                  </View>
                  <CHCText type="Body2" color={Colors.Gray900} style={styles.breakdownValue}>
                    {formatMoney(tripPlan.budget.breakdown.activities)}
                  </CHCText>
                </View>
              )}
              {tripPlan.budget.breakdown.transport > 0 && (
                <View style={styles.breakdownItem}>
                  <View style={styles.breakdownLabel}>
                    <CHCText type="Body2" color={Colors.Gray700}>
                      🚕 Di chuyển
                    </CHCText>
                  </View>
                  <CHCText type="Body2" color={Colors.Gray900} style={styles.breakdownValue}>
                    {formatMoney(tripPlan.budget.breakdown.transport)}
                  </CHCText>
                </View>
              )}
              {tripPlan.budget.breakdown.others > 0 && (
                <View style={styles.breakdownItem}>
                  <View style={styles.breakdownLabel}>
                    <CHCText type="Body2" color={Colors.Gray700}>
                      💼 Chi phí khác
                    </CHCText>
                  </View>
                  <CHCText type="Body2" color={Colors.Gray900} style={styles.breakdownValue}>
                    {formatMoney(tripPlan.budget.breakdown.others)}
                  </CHCText>
                </View>
              )}
            </View>
          )}
        </View>
      )}

      {/* Itinerary Days */}
      {tripPlan.itinerary && tripPlan.itinerary.length > 0 ? (
        <View style={styles.itineraryContainer}>
          <CHCText type="Heading3" color={Colors.Gray900} style={styles.sectionTitle}>
            📅 Lịch trình từng ngày
          </CHCText>
          
          <View style={styles.daysContainer}>
              {tripPlan.itinerary.map((day, index) => {
                if (!day) return null;
                return (
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
                    {day.date && (
                      <CHCText type="Body2" color={Colors.Gray600}>
                        {formatDate(day.date)}
                      </CHCText>
                    )}
                  </View>
                </View>

                {day.activities && day.activities.length > 0 ? (
                    <View style={styles.activitiesContainer}>
                      {day.activities.map((activity, actIndex) => (
                        <View key={activity.id || actIndex} style={styles.activityItem}>
                          <View style={styles.activityTimeBadge}>
                            <CHCText type="Body2" color={Colors.Primary500} style={styles.activityTime}>
                              {activity.time}
                            </CHCText>
                          </View>
                          <View style={styles.activityContent}>
                            <CHCText type="Body1" color={Colors.Gray900} style={styles.activityTitle}>
                              {getActivityIcon(activity.type)} {activity.title}
                            </CHCText>
                            <View style={styles.activityMeta}>
                              {activity.duration && (
                                <CHCText type="Body2" color={Colors.Gray600}>
                                  ⏱️ {activity.duration}
                                </CHCText>
                              )}
                              {activity.cost > 0 && (
                                <CHCText type="Body2" color={Colors.Primary500} style={styles.activityCost}>
                                  {formatMoney(activity.cost)}
                                </CHCText>
                              )}
                            </View>
                          </View>
                        </View>
                      ))}
                    </View>
                ) : (
                  <View style={styles.emptyDayContainer}>
                    <CHCText type="Body2" color={Colors.Gray500} style={styles.emptyDay}>
                      Chưa có hoạt động
                    </CHCText>
                  </View>
                )}
              </View>
                );
              })}
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <CHCText type="Body2" color={Colors.Gray500} style={styles.emptyText}>
            ⚠️ Chưa có lịch trình chi tiết
          </CHCText>
        </View>
      )}

      {/* Action Buttons */}
      {(onConfirm || onEdit) && (
        <View style={styles.actionContainer}>
          {onConfirm && (
            <CHCButton
              title="✅ Xác nhận & Lưu"
              variant="primary"
              onPress={() => {
                Alert.alert(
                  'Xác nhận',
                  'Bạn có muốn lưu lịch trình này không?',
                  [
                    { text: 'Hủy', style: 'cancel' },
                    { 
                      text: 'Xác nhận', 
                      onPress: () => onConfirm(tripPlan),
                      style: 'default'
                    },
                  ]
                );
              }}
              style={styles.confirmButton}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    borderRadius: Size.Radius16,
    padding: Size.Spacing20,
    marginVertical: Size.Spacing8,
    shadowColor: Colors.ShadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    marginBottom: Size.Spacing20,
    paddingBottom: Size.Spacing16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray200,
  },
  headerContent: {
    gap: Size.Spacing8,
  },
  title: {
    marginBottom: Size.Spacing4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.Spacing8,
  },
  duration: {
    fontWeight: '600',
  },
  budgetCard: {
    backgroundColor: Colors.Primary100,
    borderRadius: Size.Radius12,
    padding: Size.Spacing16,
    marginBottom: Size.Spacing20,
  },
  budgetHeader: {
    marginBottom: Size.Spacing12,
  },
  budgetAmount: {
    marginTop: Size.Spacing8,
  },
  breakdownContainer: {
    marginTop: Size.Spacing12,
    paddingTop: Size.Spacing12,
    borderTopWidth: 1,
    borderTopColor: Colors.Gray200,
    gap: Size.Spacing8,
  },
  breakdownTitle: {
    marginBottom: Size.Spacing4,
    fontWeight: '600',
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Size.Spacing4,
  },
  breakdownLabel: {
    flex: 1,
  },
  breakdownValue: {
    fontWeight: '600',
  },
  itineraryContainer: {
    marginTop: Size.Spacing8,
  },
  sectionTitle: {
    marginBottom: Size.Spacing16,
  },
  daysContainer: {
    gap: Size.Spacing16,
  },
  dayCard: {
    width: '100%',
    backgroundColor: Colors.Gray100,
    borderRadius: Size.Radius12,
    padding: Size.Spacing16,
    marginBottom: Size.Spacing12,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Size.Spacing16,
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
  activityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Size.Spacing8,
  },
  activityCost: {
    fontWeight: '600',
  },
  emptyDayContainer: {
    padding: Size.Spacing20,
    alignItems: 'center',
  },
  emptyDay: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  emptyContainer: {
    padding: Size.Spacing20,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  actionContainer: {
    flexDirection: 'row',
    gap: Size.Spacing12,
    marginTop: Size.Spacing20,
    paddingTop: Size.Spacing16,
    borderTopWidth: 1,
    borderTopColor: Colors.Gray200,
  },
  editButton: {
    flex: 1,
  },
  confirmButton: {
    flex: 2,
  },
});

