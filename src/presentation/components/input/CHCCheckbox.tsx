import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CHCCheckboxProps } from '../type';
import { CHCTouchable } from '../core/CHCTouchable';
import { CHCText } from '../core/CHCText';
import Colors from '../../../theme/colors';

export const CHCCheckbox: React.FC<CHCCheckboxProps> = ({ checked, label, onPress, style }) => {
  return (
    <CHCTouchable onPress={() => onPress(!checked)} style={[styles.row, style]} debounce={false}>
      <View style={[styles.box, checked && styles.checked]}>
        {checked && <View style={styles.innerDot} />}
      </View>
      {label && <CHCText style={styles.label}>{label}</CHCText>}
    </CHCTouchable>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  box: {
    width: 20, height: 20, borderRadius: 4, borderWidth: 2,
    borderColor: Colors.Gray400, marginRight: 8,
    justifyContent: 'center', alignItems: 'center',
  },
  checked: { backgroundColor: Colors.Primary500, borderColor: Colors.Primary500 },
  innerDot: { width: 10, height: 10, backgroundColor: Colors.White, borderRadius: 2 },
  label: { flex: 1 },
});