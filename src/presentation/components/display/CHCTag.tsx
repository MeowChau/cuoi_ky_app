import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CHCTagProps } from '../type';
import { CHCText } from '../core/CHCText';
import Colors from '../../../theme/colors';

export const CHCTag: React.FC<CHCTagProps> = ({ 
  label, 
  color = Colors.Gray100, 
  textColor = Colors.Gray800,
  style
}) => {
  return (
    <View style={[styles.container, { backgroundColor: color }, style]}>
      <CHCText type="Caption" color={textColor} style={styles.text}>
        {label}
      </CHCText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
  },
});