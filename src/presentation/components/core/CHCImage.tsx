import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { CHCImageProps } from '../type';
import Colors from '../../../theme/colors';

export const CHCImage: React.FC<CHCImageProps> = ({
  source,
  resizeMode = 'cover', // Mặc định là cover cho đẹp
  radius = 0,
  style,
  ...props
}) => {
  return (
    <Image
      source={source}
      resizeMode={resizeMode}
      style={[
        styles.base,
        { borderRadius: radius }, 
        style
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.Gray100, // Màu nền placeholder khi ảnh chưa load
  },
});