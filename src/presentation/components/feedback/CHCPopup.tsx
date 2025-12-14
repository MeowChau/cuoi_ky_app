import React from 'react';
import { Modal, View, StyleSheet, Dimensions } from 'react-native';
import { CHCPopupProps } from '../type';
import { CHCText } from '../core/CHCText';
import { CHCButton } from '../input/CHCButton'; // Import Button nội bộ
import Colors from '../../../theme/colors';

const { width } = Dimensions.get('window');

export const CHCPopup: React.FC<CHCPopupProps> = ({ 
  visible, 
  title, 
  message, 
  onClose, 
  onConfirm,
  confirmText = 'Đồng ý',
  cancelText = 'Đóng'
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <CHCText type="Heading3" style={styles.title}>{title}</CHCText>
          
          <CHCText type="Body1" color={Colors.Gray600} style={styles.message}>
            {message}
          </CHCText>
          
          <View style={styles.actions}>
            <CHCButton 
              title={cancelText} 
              onPress={onClose} 
              variant="outline" 
              style={styles.button} 
            />
            {onConfirm && (
              <View style={styles.spacer} />
            )}
            {onConfirm && (
              <CHCButton 
                title={confirmText} 
                onPress={onConfirm} 
                style={styles.button} 
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { 
    flex: 1, 
    backgroundColor: Colors.Overlay60, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  popup: {
    width: width - 40,
    backgroundColor: Colors.White,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    marginBottom: 24,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
  },
  spacer: {
    width: 12,
  }
});