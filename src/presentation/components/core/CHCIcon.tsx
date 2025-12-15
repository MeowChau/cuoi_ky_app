import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CHCIconProps } from '../type';
import Colors from '../../../theme/colors';

// Ví dụ: import Icon from 'react-native-vector-icons/Feather';

export const CHCIcon: React.FC<CHCIconProps> = ({
  name: _name,
  size = 24,
  color = Colors.Gray900,
  style,
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {/* Thay thế dòng dưới bằng Component Icon thực tế của bạn.
         Ví dụ: <Icon name={name} size={size} color={color} />
      */}
      <View style={[styles.placeholder, { width: size, height: size, backgroundColor: color, borderRadius: size / 2 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    opacity: 0.2,
  },
});