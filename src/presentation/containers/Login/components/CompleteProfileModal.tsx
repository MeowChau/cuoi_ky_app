import React, { useState } from 'react';
import {
  View,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  CHCText,
  CHCTextInput,
  CHCButton,
  CHCToast,
} from '../../../components';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';

interface CompleteProfileModalProps {
  visible: boolean;
  email: string;
  isLoading: boolean;
  onSubmit: (data: { name: string; phone: string }) => void;
}

export const CompleteProfileModal: React.FC<CompleteProfileModalProps> = ({
  visible,
  email,
  isLoading,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('error');

  // ⭐ HELPER FUNCTION ĐỂ SHOW TOAST
  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'error') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    
    // Tự động ẩn sau 3 giây
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      showToast('Vui lòng nhập họ và tên', 'error');  // ⭐ SỬ DỤNG
      return;
    }

    if (!phone.trim() || !/^[0-9]{10}$/.test(phone.trim())) {
      showToast('Vui lòng nhập số điện thoại hợp lệ (10 chữ số)', 'error');  // ⭐ SỬ DỤNG
      return;
    }

    onSubmit({
      name: name.trim(),
      phone: phone.trim(),
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}} // Chặn đóng modal
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.header}>
              <CHCText type="Heading1">🎉</CHCText>
              <CHCText type="Heading2" style={styles.title}>
                Chào mừng bạn!
              </CHCText>
              <CHCText type="Body2" color={Colors.Gray600} style={styles.subtitle}>
                Vui lòng hoàn tất thông tin để tiếp tục
              </CHCText>
            </View>

            {/* Form */}
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              <View style={styles.form}>
                {/* Email (Read-only) */}
                <View style={styles.inputGroup}>
                  <CHCText type="Body2" color={Colors.Gray600} style={styles.label}>
                    Email
                  </CHCText>
                  <View style={styles.emailContainer}>
                    <CHCText type="Body1" color={Colors.Gray700}>
                      {email}
                    </CHCText>
                  </View>
                </View>

                {/* Name */}
                <View style={styles.inputGroup}>
                  <CHCTextInput
                    label="Họ và tên *"
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>

                {/* Phone */}
                <View style={styles.inputGroup}>
                  <CHCTextInput
                    label="Số điện thoại *"
                    placeholder="0987654321"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    maxLength={10}
                  />
                </View>

                <View style={styles.note}>
                  <CHCText type="Body2" color={Colors.Gray500}>
                    * Thông tin bắt buộc
                  </CHCText>
                </View>
              </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
              <CHCButton
                title="Hoàn tất"
                onPress={handleSubmit}
                variant="primary"
                isLoading={isLoading}
                disabled={isLoading}
                style={styles.submitButton}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: Size.Radius24,
    borderTopRightRadius: Size.Radius24,
    maxHeight: '80%',
  },
  header: {
    alignItems: 'center',
    padding: Size.Spacing24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray200,
  },
  title: {
    marginTop: Size.Spacing12,
  },
  subtitle: {
    marginTop: Size.Spacing8,
    textAlign: 'center',
  },
  scrollView: {
    maxHeight: 400,
  },
  form: {
    padding: Size.Spacing24,
  },
  inputGroup: {
    marginBottom: Size.Spacing16,
  },
  label: {
    marginBottom: Size.Spacing8,
  },
  emailContainer: {
    backgroundColor: Colors.Gray100,
    padding: Size.Spacing16,
    borderRadius: Size.Radius12,
    borderWidth: 1,
    borderColor: Colors.Gray300,
  },
  note: {
    marginTop: Size.Spacing8,
  },
  footer: {
    padding: Size.Spacing24,
    borderTopWidth: 1,
    borderTopColor: Colors.Gray200,
  },
  submitButton: {
    height: 56,
    borderRadius: Size.Radius12,
  },
});