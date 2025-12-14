import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CHCGroupProps } from '../type';
import { CHCText } from '../core/CHCText';
import Colors from '../../../theme/colors';

export const CHCGroup: React.FC<CHCGroupProps> = ({ title, children, style }) => {
  return (
    <View style={[styles.wrapper, style]}>
      {title && (
        <CHCText type="Heading3" style={styles.title}>{title}</CHCText>
      )}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 12,
    marginLeft: 4, // Căn chỉnh nhẹ so với card bên dưới
  },
  content: {
    backgroundColor: Colors.White,
    borderRadius: 12,
    overflow: 'hidden',
    // Tùy chọn: có thể thêm shadow hoặc border nếu muốn group nổi bật
    borderWidth: 1,
    borderColor: Colors.Gray100,
  },
});