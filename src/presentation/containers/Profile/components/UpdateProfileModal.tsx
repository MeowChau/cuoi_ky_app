import React, { useState, useEffect } from 'react';
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
  CHCTouchable,
} from '../../../components';
import { User } from '../../../../domain/entities/User';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';
import { CHCToast } from '../../../components/feedback/CHCToast';

interface UpdateProfileModalProps {
  visible: boolean;
  user: User | null;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
  }) => void;
}

export const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({
  visible,
  user,
  isLoading,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  const handleSubmit = () => {
    // Validation
    if (password && password !== confirmPassword) {
      CHCToast({
        message: 'Mật khẩu xác nhận không khớp',
        type: 'error',
        visible: true,
      });
      return;
    }

    const updateData: any = {};
    
    if (name !== user?.name) updateData.name = name;
    if (email !== user?.email) updateData.email = email;
    if (phone !== user?.phone) updateData.phone = phone;
    if (password) updateData.password = password;

    onSubmit(updateData);
  };

  const handleClose = () => {
    setPassword('');
    setConfirmPassword('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.header}>
              <CHCText type="Heading3">Cập nhật thông tin</CHCText>
              <CHCTouchable onPress={handleClose} style={styles.closeButton}>
                <CHCText type="Heading3" color={Colors.Gray500}>
                  ✕
                </CHCText>
              </CHCTouchable>
            </View>

            {/* Form */}
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.form}>
                <CHCTextInput
                  label="Họ và tên"
                  placeholder="Nguyễn Văn A"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />

                <CHCTextInput
                  label="Email"
                  placeholder="example@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <CHCTextInput
                  label="Số điện thoại"
                  placeholder="0987654321"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />

                <View style={styles.divider}>
                  <CHCText type="Body1" color={Colors.Gray400}>
                    Để trống nếu không muốn đổi mật khẩu
                  </CHCText>
                </View>

                <CHCTextInput
                  label="Mật khẩu mới (tùy chọn)"
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  showPasswordToggle
                />

                {password.length > 0 && (
                  <CHCTextInput
                    label="Xác nhận mật khẩu"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    showPasswordToggle
                  />
                )}
              </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
              <CHCButton
                title="Hủy"
                onPress={handleClose}
                variant="outline"
                style={styles.cancelButton}
              />
              <CHCButton
                title="Cập nhật"
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
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Size.Spacing24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray200,
  },
  closeButton: {
    padding: Size.Spacing8,
  },
  scrollView: {
    maxHeight: 500,
  },
  form: {
    padding: Size.Spacing24,
    gap: Size.Spacing16,
  },
  divider: {
    marginVertical: Size.Spacing8,
  },
  footer: {
    flexDirection: 'row',
    gap: Size.Spacing12,
    padding: Size.Spacing24,
    borderTopWidth: 1,
    borderTopColor: Colors.Gray200,
  },
  cancelButton: {
    flex: 1,
  },
  submitButton: {
    flex: 1,
  },
});