import React, { useState } from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { CHCTouchable } from '../core/CHCTouchable';
import { CHCText } from '../core/CHCText';
import { CHCButton } from './CHCButton';
import Colors from '../../../theme/colors';
import { Size } from '../../../theme/sizes';

interface CHCDatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: 'date' | 'time' | 'datetime';
  placeholder?: string;
  label?: string;
}

export const CHCDatePicker: React.FC<CHCDatePickerProps> = ({ 
  value,
  onChange,
  minimumDate,
  maximumDate,
  mode = 'date',
  placeholder = 'Chọn ngày',
  label,
}) => {
  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value || new Date());

  const displayDate = value 
    ? value.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : placeholder;

  const handleConfirm = () => {
    onChange(tempDate);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempDate(value || new Date());
    setOpen(false);
  };

  return (
    <>
      {/* Label */}
      {label && (
        <CHCText type="Body1" style={styles.label}>
          {label}
        </CHCText>
      )}

      {/* Input */}
      <CHCTouchable onPress={() => setOpen(true)} style={styles.input}>
        <CHCText color={value ? Colors.Gray900 : Colors.Gray400}>
          {displayDate}
        </CHCText>
        <CHCText type="Heading3">📅</CHCText>
      </CHCTouchable>

      {/* Modal with DatePicker */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <CHCText type="Heading3">Chọn ngày</CHCText>
            </View>

            <DatePicker
              date={tempDate}
              onDateChange={setTempDate}
              mode={mode}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              locale="vi"
              androidVariant="nativeAndroid"
            />

            <View style={styles.modalButtons}>
              <CHCButton
                title="Hủy"
                onPress={handleCancel}
                variant="outline"
                style={styles.button}
              />
              <CHCButton
                title="Xác nhận"
                onPress={handleConfirm}
                variant="primary"
                style={styles.button}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: Size.Spacing8,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.Gray300,
    borderRadius: Size.Radius12,
    paddingHorizontal: Size.Spacing16,
    paddingVertical: Size.Spacing12,
    backgroundColor: Colors.Gray500,
    height: 56,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Size.Spacing24,
  },
  modalContent: {
    backgroundColor: Colors.White,
    borderRadius: Size.Radius16,
    padding: Size.Spacing24,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    marginBottom: Size.Spacing16,
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: Size.Spacing12,
    marginTop: Size.Spacing24,
  },
  button: {
    flex: 1,
  },
});