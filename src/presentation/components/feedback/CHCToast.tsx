import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CHCToastProps } from '../type';
import { CHCText } from '../core/CHCText';
import Colors from '../../../theme/colors';

export const CHCToast: React.FC<CHCToastProps> = ({ 
  message, 
  type = 'success', 
  visible,
  onHide: _onHide,
  duration: _duration = 3000 
}) => {
  // Logic màu sắc
  const getBackgroundColor = () => {
    switch(type) {
      case 'error': return Colors.Red500;
      case 'warning': return Colors.Accent700;
      case 'info': return Colors.Blue500;
      default: return Colors.Green500;
    }
  };

  if (!visible) return null;

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <CHCText type="Label" color={Colors.White} style={styles.text}>
        {message}
      </CHCText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60, // Cách top màn hình (SafeArea)
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    zIndex: 9999,
    maxWidth: '90%',
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  text: {
    textAlign: 'center',
  }
});