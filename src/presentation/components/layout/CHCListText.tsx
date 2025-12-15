import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CHCListTextProps } from '../type';
import { CHCTouchable } from '../core/CHCTouchable';
import { CHCText } from '../core/CHCText';
import Colors from '../../../theme/colors';

export const CHCListText: React.FC<CHCListTextProps> = ({ 
  label, value, onPress, hasArrow, icon, style 
}) => {
  return (
    <CHCTouchable onPress={onPress} disabled={!onPress} style={[styles.container, style]}>
      <View style={styles.left}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <CHCText type="Body1">{label}</CHCText>
      </View>
      <View style={styles.right}>
        {value && <CHCText type="Body1" color={Colors.Gray500} style={styles.valueText}>{value}</CHCText>}
        {hasArrow && <CHCText color={Colors.Gray400}>{'>'}</CHCText>} 
      </View>
    </CHCTouchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: Colors.Gray200
  },
  left: { flexDirection: 'row', alignItems: 'center' },
  right: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: { marginRight: 12 },
  valueText: { marginRight: 8 },
});