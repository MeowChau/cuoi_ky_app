import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CHCCardProps } from '../type';
import Colors from '../../../theme/colors';

export const CHCCard: React.FC<CHCCardProps> = ({ children, style, noShadow, ...props }) => {
  return (
    <View style={[styles.card, !noShadow && styles.shadow, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.White,
    borderRadius: 16,
    padding: 16,
  },
  shadow: {
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  }
});