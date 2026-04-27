import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { CHCText, CHCButton, CHCTouchable } from '../../../components';
import { ItineraryDay, Activity } from '../../../../domain/entities/Trip';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';

interface ItineraryEditorProps {
  itinerary: ItineraryDay[];
  startDate: Date | undefined;
  endDate: Date | undefined;
  onChange: (itinerary: ItineraryDay[]) => void;
}

export const ItineraryEditor: React.FC<ItineraryEditorProps> = ({
  itinerary,
  startDate,
  endDate,
  onChange,
}) => {
  const [editingActivity, setEditingActivity] = useState<{ dayIndex: number; activityIndex: number } | null>(null);
  const [daysState, setDaysState] = useState<ItineraryDay[]>(itinerary || []);

  // Đồng bộ khi  itinerary từ BE thay đổi
  useEffect(() => {
    setDaysState(itinerary || []);
  }, [itinerary]);

  // Tạo danh sách ngày dựa trên khoảng thời gian (dùng cho tạo thủ công)
  const generateDaysFromRange = (): ItineraryDay[] => {
    if (!startDate || !endDate) return [];
    const days: ItineraryDay[] = [];
    const current = new Date(startDate);
    let dayNumber = 1;
    while (current <= endDate) {
      days.push({
        day: dayNumber,
        date: current.toISOString().split('T')[0],
        activities: [],
      });
      current.setDate(current.getDate() + 1);
      dayNumber++;
    }
    return days;
  };

  // Nếu có itinerary từ BE (tạo bởi AI) -> dùng đúng số ngày đó
  // Nếu tạo thủ công (itinerary rỗng) -> chỉ tạo khi người dùng ấn nút "+"
  const days: ItineraryDay[] = daysState;

  // Thêm ngày mới sau ngày cuối cùng (dùng cho thủ công)
  const addDayAfterLast = () => {
    updateDays(prev => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      const nextDate = new Date(last.date);
      nextDate.setDate(nextDate.getDate() + 1);
      const next: ItineraryDay = {
        day: (last.day || prev.length) + 1,
        date: nextDate.toISOString().split('T')[0],
        activities: [],
      };
      return [...prev, next];
    });
  };

  // Helper: cập nhật state + notify parent, tránh dùng closure cũ
  const updateDays = (updater: (prev: ItineraryDay[]) => ItineraryDay[]) => {
    setDaysState(prev => {
      const next = updater(prev);
      onChange(next);
      return next;
    });
  };

  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const addActivity = (dayIndex: number) => {
    updateDays(prev => {
      const next = prev.map(d => ({ ...d, activities: [...d.activities] }));
      const newActivity: Activity = { time: '09:00', title: '', location: '', description: '', cost: 0 };
      next[dayIndex].activities.push(newActivity);
      setEditingActivity({ dayIndex, activityIndex: next[dayIndex].activities.length - 1 });
      return next;
    });
  };

  const initDaysFromRange = () => {
    if (!startDate || !endDate) {
      Alert.alert('Lỗi', 'Vui lòng chọn ngày bắt đầu và kết thúc trước khi tạo lịch trình');
      return;
    }
    const generated = generateDaysFromRange();
    updateDays(() => generated);
  };

  const updateActivity = (dayIndex: number, activityIndex: number, field: keyof Activity, value: any) => {
    updateDays(prev => {
      const next = prev.map(d => ({ ...d, activities: [...d.activities] }));
      if (!next[dayIndex]?.activities[activityIndex]) return prev;
      next[dayIndex].activities[activityIndex] = {
        ...next[dayIndex].activities[activityIndex],
        [field]: value,
      };
      return next;
    });
  };

  const deleteActivity = (dayIndex: number, activityIndex: number) => {
    Alert.alert('Xác nhận xóa', 'Bạn có chắc muốn xóa hoạt động này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => {
          updateDays(prev => {
            const next = prev.map(d => ({ ...d, activities: [...d.activities] }));
            next[dayIndex].activities.splice(activityIndex, 1);
            return next;
          });
        },
      },
    ]);
  };

  const ActivityEditorModal = ({ dayIndex, activityIndex }: { dayIndex: number; activityIndex: number }) => {
    const activity = days[dayIndex]?.activities[activityIndex];
    if (!activity) {
      setEditingActivity(null);
      return null;
    }

    const [time, setTime] = useState(activity.time);
    const [title, setTitle] = useState(activity.title);
    const [location, setLocation] = useState(activity.location || '');
    const [description, setDescription] = useState(activity.description || '');
    const [cost, setCost] = useState(activity.cost?.toString() || '0');

    const handleSave = () => {
      if (!title.trim()) {
        Alert.alert('Lỗi', 'Vui lòng nhập tên hoạt động');
        return;
      }
      updateActivity(dayIndex, activityIndex, 'time', time);
      updateActivity(dayIndex, activityIndex, 'title', title.trim());
      updateActivity(dayIndex, activityIndex, 'location', location.trim() || undefined);
      updateActivity(dayIndex, activityIndex, 'description', description.trim() || undefined);
      updateActivity(dayIndex, activityIndex, 'cost', cost ? Number(cost) : 0);
      setEditingActivity(null);
    };

    return (
      <Modal visible transparent animationType="slide" onRequestClose={() => setEditingActivity(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <CHCText type="Heading2">Chỉnh sửa hoạt động</CHCText>
              <CHCTouchable onPress={() => setEditingActivity(null)}>
                <CHCText type="Heading3" color={Colors.Gray500}>
                  ✕
                </CHCText>
              </CHCTouchable>
            </View>

            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <View style={styles.modalForm}>
                <View style={styles.inputGroup}>
                  <CHCText type="Body1" style={styles.label}>
                    Giờ <CHCText color={Colors.Red500}>*</CHCText>
                  </CHCText>
                  <TextInput
                    style={styles.input}
                    value={time}
                    onChangeText={setTime}
                    placeholder="VD: 09:00"
                    placeholderTextColor={Colors.Gray400}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <CHCText type="Body1" style={styles.label}>
                    Tên hoạt động <CHCText color={Colors.Red500}>*</CHCText>
                  </CHCText>
                  <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="VD: Tham quan Bà Nà Hills"
                    placeholderTextColor={Colors.Gray400}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <CHCText type="Body1" style={styles.label}>
                    Địa điểm
                  </CHCText>
                  <TextInput
                    style={styles.input}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="VD: Bà Nà Hills, Đà Nẵng"
                    placeholderTextColor={Colors.Gray400}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <CHCText type="Body1" style={styles.label}>
                    Mô tả
                  </CHCText>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Mô tả chi tiết về hoạt động..."
                    placeholderTextColor={Colors.Gray400}
                    multiline
                    numberOfLines={4}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <CHCText type="Body1" style={styles.label}>
                    Chi phí (VNĐ)
                  </CHCText>
                  <TextInput
                    style={styles.input}
                    value={cost}
                    onChangeText={setCost}
                    placeholder="0"
                    placeholderTextColor={Colors.Gray400}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <CHCButton title="Hủy" variant="outline" onPress={() => setEditingActivity(null)} style={styles.modalButton} />
              <CHCButton title="Lưu" variant="primary" onPress={handleSave} style={styles.modalButton} />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  if (!startDate || !endDate) {
    return (
      <View style={styles.emptyContainer}>
        <CHCText type="Body2" color={Colors.Gray500}>
          Vui lòng chọn ngày bắt đầu và kết thúc để tạo lịch trình
        </CHCText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CHCText type="Heading3" color={Colors.Gray900}>
          📅 Lịch trình chi tiết
        </CHCText>
        <CHCText type="Body2" color={Colors.Gray600}>
          {days.length} ngày
        </CHCText>
      </View>

      {/* Nếu chưa có ngày nào (tạo thủ công) -> hiển thị nút + để tạo */}
      {days.length === 0 && (
        <View style={styles.emptyItinerary}>
          <CHCText type="Body2" color={Colors.Gray600} style={styles.emptyItineraryText}>
            Chưa có lịch trình cho chuyến đi này
          </CHCText>
          <CHCButton
            title="+ Tạo lịch trình theo số ngày"
            variant="outline"
            onPress={initDaysFromRange}
          />
        </View>
      )}

      <View style={styles.daysContainer}>
        {days.map((day, dayIndex) => (
          <View key={day.day} style={styles.dayCard}>
            <View style={styles.dayHeader}>
              <View style={styles.dayNumber}>
                <CHCText type="Heading3" color={Colors.White}>
                  {day.day}
                </CHCText>
              </View>
              <View style={styles.dayInfo}>
                <CHCText type="Body1" color={Colors.Gray900} style={styles.dayLabel}>
                  Ngày {day.day}
                </CHCText>
                <CHCText type="Body2" color={Colors.Gray600}>
                  {formatDate(day.date)}
                </CHCText>
              </View>
            </View>

            <View style={styles.activitiesContainer}>
              {day.activities.length > 0 ? (
                day.activities.map((activity, activityIndex) => (
                  <View key={activityIndex} style={styles.activityItem}>
                    <View style={styles.activityContent}>
                      <View style={styles.activityHeader}>
                        <View style={styles.activityTimeBadge}>
                          <CHCText type="Body2" color={Colors.Primary500} style={styles.activityTime}>
                            {activity.time}
                          </CHCText>
                        </View>
                        <CHCTouchable onPress={() => deleteActivity(dayIndex, activityIndex)} style={styles.deleteActivityButton}>
                          <CHCText type="Body2" color={Colors.Red500}>
                            🗑️
                          </CHCText>
                        </CHCTouchable>
                      </View>
                      <CHCTouchable
                        onPress={() => setEditingActivity({ dayIndex, activityIndex })}
                        style={styles.activityTouchable}
                      >
                        <CHCText type="Body1" color={Colors.Gray900} style={styles.activityTitle}>
                          {activity.title || 'Chưa có tên'}
                        </CHCText>
                        {activity.location && (
                          <CHCText type="Body2" color={Colors.Gray600}>
                            📍 {activity.location}
                          </CHCText>
                        )}
                        {activity.cost && activity.cost > 0 && (
                          <CHCText type="Body2" color={Colors.Primary500}>
                            💰{' '}
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            }).format(activity.cost)}
                          </CHCText>
                        )}
                      </CHCTouchable>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.emptyDay}>
                  <CHCText type="Body2" color={Colors.Gray500}>
                    Chưa có hoạt động
                  </CHCText>
                </View>
              )}

              <CHCButton
                title="+ Thêm hoạt động"
                variant="outline"
                onPress={() => addActivity(dayIndex)}
                style={styles.addActivityButton}
              />
            </View>
          </View>
        ))}
      </View>

      {editingActivity && (
        <ActivityEditorModal dayIndex={editingActivity.dayIndex} activityIndex={editingActivity.activityIndex} />
      )}

      {days.length > 0 && (
        <CHCButton
          title="➕ Thêm ngày mới"
          variant="outline"
          onPress={addDayAfterLast}
          style={styles.addDayButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Size.Spacing16,
  },
  emptyContainer: {
    padding: Size.Spacing20,
    alignItems: 'center',
    backgroundColor: Colors.Gray100,
    borderRadius: Size.Radius12,
    marginTop: Size.Spacing16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Size.Spacing12,
  },
  daysContainer: {
  },
  emptyItinerary: {
    padding: Size.Spacing16,
    borderRadius: Size.Radius12,
    backgroundColor: Colors.Gray100,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Size.Spacing12,
  },
  emptyItineraryText: {
    textAlign: 'center',
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
  },
  activityItem: {
    backgroundColor: Colors.White,
    borderRadius: Size.Radius8,
    padding: Size.Spacing12,
    shadowColor: Colors.ShadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activityContent: {
    gap: Size.Spacing8,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityTimeBadge: {
    backgroundColor: Colors.Primary100,
    paddingHorizontal: Size.Spacing8,
    paddingVertical: Size.Spacing4,
    borderRadius: Size.Radius4,
  },
  activityTime: {
    fontWeight: '600',
    fontSize: 12,
  },
  deleteActivityButton: {
    padding: Size.Spacing4,
  },
  activityTouchable: {
    gap: Size.Spacing4,
  },
  activityTitle: {
    fontWeight: '500',
    marginTop: Size.Spacing4,
  },
  emptyDay: {
    padding: Size.Spacing16,
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderRadius: Size.Radius8,
  },
  addActivityButton: {
    marginTop: Size.Spacing8,
  },
  addDayButton: {
    marginTop: Size.Spacing12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: Size.Radius24,
    borderTopRightRadius: Size.Radius24,
    maxHeight: '90%',
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Size.Spacing20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray200,
  },
  modalContent: {
    flex: 1,
  },
  modalForm: {
    padding: Size.Spacing20,
    gap: Size.Spacing16,
  },
  inputGroup: {
    gap: Size.Spacing8,
  },
  label: {
    color: Colors.Gray900,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.Gray300,
    borderRadius: Size.Radius8,
    padding: Size.Spacing12,
    fontSize: 14,
    color: Colors.Gray900,
    backgroundColor: Colors.White,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: Size.Spacing20,
    gap: Size.Spacing12,
    borderTopWidth: 1,
    borderTopColor: Colors.Gray200,
  },
  modalButton: {
    flex: 1,
  },
});


