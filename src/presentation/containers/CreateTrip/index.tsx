import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  CHCText,
  CHCTextInput,
  CHCButton,
  CHCTouchable,
  CHCDatePicker,
  CHCDropdown,
} from '../../components';
import { useCreateTrip, TRANSPORT_MODES } from './hooks';
import { createTripStyles } from './styles';
import Colors from '../../../theme/colors';

interface CreateTripScreenProps {
  navigation: any;
}

const CreateTripScreen: React.FC<CreateTripScreenProps> = ({ navigation }) => {
  const {
    title,
    setTitle,
    origin,
    setOrigin,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    transportMode,
    setTransportMode,
    budget,
    setBudget,
    isLoading,
    handleCreateTrip,
  } = useCreateTrip(() => {
    navigation.goBack();
  });

  return (
    <SafeAreaView style={createTripStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />

      <KeyboardAvoidingView
        style={createTripStyles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={createTripStyles.header}>
          <View style={createTripStyles.headerTop}>
            <CHCTouchable
              style={createTripStyles.backButton}
              onPress={() => navigation.goBack()}
            >
              <CHCText type="Heading2">←</CHCText>
            </CHCTouchable>

            <View style={createTripStyles.headerTitle}>
              <CHCText type="Heading2">Tạo chuyến đi mới</CHCText>
            </View>
          </View>

          <CHCText
            type="Body2"
            color={Colors.Gray600}
            style={createTripStyles.subtitle}
          >
            Điền thông tin để lên kế hoạch chuyến đi của bạn
          </CHCText>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={createTripStyles.scrollContent}
        >
          {/* Form */}
          <View style={createTripStyles.form}>
            {/* Title */}
            <View style={createTripStyles.inputGroup}>
              <CHCText type="Body1" style={createTripStyles.label}>
                Tên chuyến đi <CHCText color={Colors.Red500}>*</CHCText>
              </CHCText>
              <CHCTextInput
                placeholder="VD: Chuyến đi Đà Nẵng"
                value={title}
                onChangeText={setTitle}
                autoCapitalize="words"
              />
            </View>

            {/* Origin */}
            <View style={createTripStyles.inputGroup}>
              <CHCText type="Body1" style={createTripStyles.label}>
                Điểm xuất phát
              </CHCText>
              <CHCTextInput
                placeholder="VD: Hà Nội"
                value={origin}
                onChangeText={setOrigin}
                autoCapitalize="words"
              />
            </View>

            {/* Date Range */}
            <View style={createTripStyles.inputGroup}>
              <CHCText type="Body1" style={createTripStyles.label}>
                Thời gian <CHCText color={Colors.Red500}>*</CHCText>
              </CHCText>
              <View style={createTripStyles.dateRow}>
                <View style={createTripStyles.dateColumn}>
                  <CHCText type="Body2" color={Colors.Gray600} style={{ marginBottom: 8 }}>
                    Từ ngày
                  </CHCText>
                  <CHCDatePicker
                    value={startDate}
                    onChange={setStartDate}
                    minimumDate={new Date()}
                    placeholder="Chọn ngày"
                  />
                </View>

                <View style={createTripStyles.dateColumn}>
                  <CHCText type="Body2" color={Colors.Gray600} style={{ marginBottom: 8 }}>
                    Đến ngày
                  </CHCText>
                  <CHCDatePicker
                    value={endDate}
                    onChange={setEndDate}
                    minimumDate={startDate || new Date()}
                    placeholder="Chọn ngày"
                  />
                </View>
              </View>
            </View>

            {/* Transport Mode */}
            <View style={createTripStyles.inputGroup}>
              <CHCText type="Body1" style={createTripStyles.label}>
                Phương tiện di chuyển
              </CHCText>
              <CHCDropdown
                data={TRANSPORT_MODES}
                value={transportMode}
                onSelect={(item) => setTransportMode({ label: item.label, value: item.value.toString() })}
                placeholder="Chọn phương tiện"
              />
            </View>

            {/* Budget */}
            <View style={createTripStyles.inputGroup}>
              <CHCText type="Body1" style={createTripStyles.label}>
                Ngân sách (VNĐ) <CHCText color={Colors.Red500}>*</CHCText>
              </CHCText>
              <CHCTextInput
                placeholder="VD: 5000000"
                value={budget}
                onChangeText={setBudget}
                keyboardType="numeric"
              />
            </View>
          </View>
        </ScrollView>

        {/* Footer Button */}
        <View style={createTripStyles.buttonContainer}>
          <CHCButton
            title="Tạo chuyến đi"
            onPress={handleCreateTrip}
            variant="primary"
            isLoading={isLoading}
            disabled={isLoading}
            style={createTripStyles.createButton}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateTripScreen;