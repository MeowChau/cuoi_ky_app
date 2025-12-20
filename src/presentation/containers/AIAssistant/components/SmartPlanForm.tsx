import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, ScrollView, TextInput, Alert, TouchableOpacity, FlatList } from 'react-native';
import { CHCText, CHCButton, CHCTouchable, CHCDatePicker } from '../../../components';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';

interface SmartPlanFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    destination: string;
    startDate: string;
    duration: number;
    budget: number;
    transportMode: 'flight' | 'personal';
  }) => void;
}

// Danh sách điểm đến phổ biến
const POPULAR_DESTINATIONS = [
  'Đà Nẵng', 'Hội An', 'Phú Quốc', 'Nha Trang', 'Đà Lạt',
  'Hạ Long', 'Sapa', 'Huế', 'Hồ Chí Minh', 'Hà Nội',
  'Mũi Né', 'Cần Thơ', 'Vũng Tàu', 'Tam Đảo', 'Mai Châu'
];

// Tùy chọn số ngày phổ biến
const DURATION_OPTIONS = [
  { label: '1 ngày', value: 1 },
  { label: '2 ngày', value: 2 },
  { label: '3 ngày', value: 3 },
  { label: '4 ngày', value: 4 },
  { label: '5 ngày', value: 5 },
  { label: '7 ngày', value: 7 },
  { label: '10 ngày', value: 10 },
  { label: '14 ngày', value: 14 },
];

// Tùy chọn ngân sách phổ biến
const BUDGET_OPTIONS = [
  { label: '5 triệu', value: 5000000 },
  { label: '10 triệu', value: 10000000 },
  { label: '15 triệu', value: 15000000 },
  { label: '20 triệu', value: 20000000 },
  { label: '30 triệu', value: 30000000 },
  { label: '50 triệu', value: 50000000 },
];

export const SmartPlanForm: React.FC<SmartPlanFormProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  // ✅ TẤT CẢ HOOKS PHẢI Ở ĐẦU, KHÔNG ĐIỀU KIỆN
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [duration, setDuration] = useState('');
  const [budget, setBudget] = useState('');
  const [budgetDisplay, setBudgetDisplay] = useState('');
  const [transportMode, setTransportMode] = useState<'flight' | 'personal'>('flight');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // States cho dropdown/autocomplete
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [showDurationOptions, setShowDurationOptions] = useState(false);
  const [showBudgetOptions, setShowBudgetOptions] = useState(false);
  const [destinationInputMode, setDestinationInputMode] = useState<'select' | 'custom'>('select');
  const [durationInputMode, setDurationInputMode] = useState<'select' | 'custom'>('select');
  const [budgetInputMode, setBudgetInputMode] = useState<'select' | 'custom'>('select');

  // ✅ FUNCTIONS
  const formatCurrency = (value: string) => {
    const number = value.replace(/\D/g, '');
    if (!number) return '';
    return parseInt(number, 10).toLocaleString('vi-VN');
  };

  const handleBudgetChange = (text: string) => {
    const number = text.replace(/\D/g, '');
    setBudget(number);
    setBudgetDisplay(formatCurrency(number));
    setBudgetInputMode('custom');
  };

  const handleDestinationSelect = (dest: string) => {
    setDestination(dest);
    setShowDestinationSuggestions(false);
    setDestinationInputMode('select');
  };

  const handleDurationSelect = (value: number) => {
    setDuration(value.toString());
    setShowDurationOptions(false);
    setDurationInputMode('select');
  };

  const handleBudgetSelect = (value: number) => {
    setBudget(value.toString());
    setBudgetDisplay(formatCurrency(value.toString()));
    setShowBudgetOptions(false);
    setBudgetInputMode('select');
  };

  // Reset form khi đóng modal
  useEffect(() => {
    if (!visible) {
      setDestination('');
      setStartDate(new Date());
      setDuration('');
      setBudget('');
      setBudgetDisplay('');
      setTransportMode('flight');
      setDestinationInputMode('select');
      setDurationInputMode('select');
      setBudgetInputMode('select');
      setShowDestinationSuggestions(false);
      setShowDurationOptions(false);
      setShowBudgetOptions(false);
    }
  }, [visible]);

  const handleSubmit = async () => {
    if (!destination.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập điểm đến');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(startDate);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      Alert.alert('Lỗi', 'Ngày khởi hành phải từ hôm nay trở đi');
      return;
    }

    const durationNum = parseInt(duration, 10);
    if (!duration || durationNum <= 0 || durationNum > 30) {
      Alert.alert('Lỗi', 'Số ngày phải từ 1-30 ngày');
      return;
    }

    const budgetNum = parseInt(budget, 10);
    if (!budget || budgetNum < 1000000) {
      Alert.alert('Lỗi', 'Ngân sách tối thiểu 1,000,000 VNĐ');
      return;
    }

    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, '0');
    const day = String(startDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    setIsSubmitting(true);

    try {
      await onSubmit({
        destination: destination.trim(),
        startDate: formattedDate,
        duration: durationNum,
        budget: budgetNum,
        transportMode,
      });

      setDestination('');
      setStartDate(new Date());
      setDuration('');
      setBudget('');
      setBudgetDisplay('');
      setTransportMode('flight');
    } catch (error) {
      console.error('Form submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <CHCText type="Heading2">🤖 Tạo kế hoạch thông minh</CHCText>
            <CHCTouchable onPress={onClose} style={styles.closeButton} disabled={isSubmitting}>
              <CHCText type="Heading3" color={Colors.Gray500}>
                ✕
              </CHCText>
            </CHCTouchable>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Destination */}
            <View style={styles.field}>
              <View style={styles.labelRow}>
                <CHCText type="Heading3" style={styles.label}>
                  Điểm đến <CHCText color={Colors.Red500}>*</CHCText>
                </CHCText>
                <CHCTouchable
                  onPress={() => {
                    setDestinationInputMode(destinationInputMode === 'select' ? 'custom' : 'select');
                    setShowDestinationSuggestions(false);
                  }}
                  disabled={isSubmitting}
                >
                  <CHCText type="Body2" color={Colors.Primary500}>
                    {destinationInputMode === 'select' ? 'Tự nhập' : 'Chọn từ danh sách'}
                  </CHCText>
                </CHCTouchable>
              </View>
              
              {destinationInputMode === 'select' ? (
                <View>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => setShowDestinationSuggestions(!showDestinationSuggestions)}
                    disabled={isSubmitting}
                  >
                    <CHCText type="Body1" color={destination ? Colors.Gray900 : Colors.Gray400}>
                      {destination || 'Chọn điểm đến'}
                    </CHCText>
                    <CHCText type="Body1" color={Colors.Gray500}>▼</CHCText>
                  </TouchableOpacity>
                  {showDestinationSuggestions && (
                    <View style={styles.suggestionsContainer}>
                      <FlatList
                        data={POPULAR_DESTINATIONS}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.suggestionItem}
                            onPress={() => handleDestinationSelect(item)}
                          >
                            <CHCText type="Body1" color={Colors.Gray900}>{item}</CHCText>
                          </TouchableOpacity>
                        )}
                        nestedScrollEnabled
                        style={styles.suggestionsList}
                      />
                    </View>
                  )}
                </View>
              ) : (
                <TextInput
                  style={styles.input}
                  placeholder="VD: Đà Nẵng, Phú Quốc..."
                  placeholderTextColor={Colors.Gray400}
                  value={destination}
                  onChangeText={(text) => {
                    setDestination(text);
                    setDestinationInputMode('custom');
                  }}
                  editable={!isSubmitting}
                />
              )}
            </View>

            {/* Start Date */}
            <View style={styles.field}>
              <CHCText type="Heading3" style={styles.label}>
                Ngày khởi hành <CHCText color={Colors.Red500}>*</CHCText>
              </CHCText>
              <CHCDatePicker
                value={startDate}
                onChange={setStartDate}
                minimumDate={new Date()}
                placeholder="Chọn ngày khởi hành"
              />
            </View>

            {/* Duration */}
            <View style={styles.field}>
              <View style={styles.labelRow}>
                <CHCText type="Heading3" style={styles.label}>
                  Số ngày <CHCText color={Colors.Red500}>*</CHCText>
                </CHCText>
                <CHCTouchable
                  onPress={() => {
                    setDurationInputMode(durationInputMode === 'select' ? 'custom' : 'select');
                    setShowDurationOptions(false);
                  }}
                  disabled={isSubmitting}
                >
                  <CHCText type="Body2" color={Colors.Primary500}>
                    {durationInputMode === 'select' ? 'Tự nhập' : 'Chọn từ danh sách'}
                  </CHCText>
                </CHCTouchable>
              </View>
              
              {durationInputMode === 'select' ? (
                <View>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => setShowDurationOptions(!showDurationOptions)}
                    disabled={isSubmitting}
                  >
                    <CHCText type="Body1" color={duration ? Colors.Gray900 : Colors.Gray400}>
                      {duration ? `${duration} ngày` : 'Chọn số ngày'}
                    </CHCText>
                    <CHCText type="Body1" color={Colors.Gray500}>▼</CHCText>
                  </TouchableOpacity>
                  {showDurationOptions && (
                    <View style={styles.suggestionsContainer}>
                      <FlatList
                        data={DURATION_OPTIONS}
                        keyExtractor={(item) => item.value.toString()}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.suggestionItem}
                            onPress={() => handleDurationSelect(item.value)}
                          >
                            <CHCText type="Body1" color={Colors.Gray900}>{item.label}</CHCText>
                          </TouchableOpacity>
                        )}
                        nestedScrollEnabled
                        style={styles.suggestionsList}
                      />
                    </View>
                  )}
                </View>
              ) : (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="VD: 3"
                    placeholderTextColor={Colors.Gray400}
                    keyboardType="number-pad"
                    value={duration}
                    onChangeText={(text) => {
                      setDuration(text);
                      setDurationInputMode('custom');
                    }}
                    maxLength={2}
                    editable={!isSubmitting}
                  />
                  <CHCText type="Body2" color={Colors.Gray500} style={styles.hint}>
                    Tối đa 30 ngày
                  </CHCText>
                </View>
              )}
            </View>

            {/* Budget */}
            <View style={styles.field}>
              <View style={styles.labelRow}>
                <CHCText type="Heading3" style={styles.label}>
                  Ngân sách (VNĐ) <CHCText color={Colors.Red500}>*</CHCText>
                </CHCText>
                <CHCTouchable
                  onPress={() => {
                    setBudgetInputMode(budgetInputMode === 'select' ? 'custom' : 'select');
                    setShowBudgetOptions(false);
                  }}
                  disabled={isSubmitting}
                >
                  <CHCText type="Body2" color={Colors.Primary500}>
                    {budgetInputMode === 'select' ? 'Tự nhập' : 'Chọn từ danh sách'}
                  </CHCText>
                </CHCTouchable>
              </View>
              
              {budgetInputMode === 'select' ? (
                <View>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => setShowBudgetOptions(!showBudgetOptions)}
                    disabled={isSubmitting}
                  >
                    <CHCText type="Body1" color={budgetDisplay ? Colors.Gray900 : Colors.Gray400}>
                      {budgetDisplay ? `${budgetDisplay} VNĐ` : 'Chọn ngân sách'}
                    </CHCText>
                    <CHCText type="Body1" color={Colors.Gray500}>▼</CHCText>
                  </TouchableOpacity>
                  {showBudgetOptions && (
                    <View style={styles.suggestionsContainer}>
                      <FlatList
                        data={BUDGET_OPTIONS}
                        keyExtractor={(item) => item.value.toString()}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.suggestionItem}
                            onPress={() => handleBudgetSelect(item.value)}
                          >
                            <CHCText type="Body1" color={Colors.Gray900}>{item.label}</CHCText>
                          </TouchableOpacity>
                        )}
                        nestedScrollEnabled
                        style={styles.suggestionsList}
                      />
                    </View>
                  )}
                </View>
              ) : (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="VD: 10,000,000"
                    placeholderTextColor={Colors.Gray400}
                    keyboardType="number-pad"
                    value={budgetDisplay}
                    onChangeText={handleBudgetChange}
                    editable={!isSubmitting}
                  />
                  <CHCText type="Body2" color={Colors.Gray500} style={styles.hint}>
                    Tối thiểu 1,000,000 VNĐ
                  </CHCText>
                </View>
              )}
            </View>

            {/* Transport Mode */}
            <View style={styles.field}>
              <CHCText type="Heading3" style={styles.label}>
                Phương tiện di chuyển
              </CHCText>
              <View style={styles.transportGrid}>
                {[
                  { value: 'flight', label: '✈️ Máy bay', icon: '✈️' },
                  { value: 'personal', label: '🚗 Xe riêng', icon: '🚗' },
                ].map((item) => (
                  <CHCTouchable
                    key={item.value}
                    style={[
                      styles.transportOption,
                      transportMode === item.value && styles.transportOptionActive,
                    ]}
                    onPress={() => setTransportMode(item.value as any)}
                    disabled={isSubmitting}
                  >
                    <CHCText type="Heading3">{item.icon}</CHCText>
                    <CHCText
                      type="Body2"
                      color={transportMode === item.value ? Colors.Primary500 : Colors.Gray700}
                      style={styles.transportLabel}
                    >
                      {item.label.split(' ')[1]}
                    </CHCText>
                  </CHCTouchable>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <CHCButton
              title="Hủy"
              variant="outline"
              onPress={onClose}
              style={styles.buttonCancel}
              disabled={isSubmitting}
            />
            <CHCButton
              title={isSubmitting ? "Đang tạo..." : "Tạo kế hoạch"}
              variant="primary"
              onPress={handleSubmit}
              style={styles.buttonSubmit}
              disabled={isSubmitting}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Size.Spacing20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray200,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: Size.Spacing20,
  },
  field: {
    marginBottom: Size.Spacing20,
  },
  label: {
    marginBottom: Size.Spacing8,
    color: Colors.Gray800,
  },
  input: {
    backgroundColor: Colors.Gray100,
    borderRadius: Size.Radius12,
    paddingHorizontal: Size.Spacing16,
    paddingVertical: Size.Spacing12,
    fontSize: 16,
    color: Colors.Gray900,
    borderWidth: 1,
    borderColor: Colors.Gray200,
  },
  hint: {
    marginTop: Size.Spacing4,
  },
  transportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Size.Spacing12,
  },
  transportOption: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.Gray100,
    borderRadius: Size.Radius12,
    padding: Size.Spacing12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.Gray200,
  },
  transportOptionActive: {
    backgroundColor: Colors.Primary100,
    borderColor: Colors.Primary500,
  },
  transportLabel: {
    marginTop: Size.Spacing4,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    padding: Size.Spacing20,
    gap: Size.Spacing12,
    borderTopWidth: 1,
    borderTopColor: Colors.Gray200,
  },
  buttonCancel: {
    flex: 1,
  },
  buttonSubmit: {
    flex: 2,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Size.Spacing8,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.Gray100,
    borderRadius: Size.Radius12,
    paddingHorizontal: Size.Spacing16,
    paddingVertical: Size.Spacing12,
    borderWidth: 1,
    borderColor: Colors.Gray200,
  },
  suggestionsContainer: {
    marginTop: Size.Spacing8,
    backgroundColor: Colors.White,
    borderRadius: Size.Radius12,
    borderWidth: 1,
    borderColor: Colors.Gray200,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionsList: {
    maxHeight: 200,
  },
  suggestionItem: {
    paddingHorizontal: Size.Spacing16,
    paddingVertical: Size.Spacing12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray100,
  },
});